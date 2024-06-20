// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LiquidityPool is ReentrancyGuard {
    
    struct PoolInfo {
        uint256 liquidityTokenA;
        uint256 liquidityTokenB;
    }

    address public tokenA;
    address public tokenB;
    uint256 public liquidityA;
    uint256 public liquidityB;
    uint256 public reserveA;
    uint256 public reserveB;

    address public starDexToken;
    
    // Pool identifier is a keccak256 hash of token addresses
    mapping(address => PoolInfo) public userLiquidity;
    
    event LiquidityAdded(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);

    /**
     * @notice Initializes the liquidity pool with given token addresses and StarDex token
     * @param _tokenA Address of token A
     * @param _tokenB Address of token B
     * @param _starDexToken Address of StarDex token
     */
    constructor(address _tokenA, address _tokenB, address _starDexToken) {
        tokenA = _tokenA;
        tokenB = _tokenB;
        starDexToken = _starDexToken;
    }

    /**
     * @notice Adds liquidity to the pool
     * @param _tokenA Address of token A
     * @param _tokenB Address of token B
     * @param _amountA Amount of token A to add
     * @param _amountB Amount of token B to add
     */
    function addLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) public nonReentrant {
        require(_amountA > 0 && _amountB > 0, "Amounts must be greater than zero");
        
        // Transfer tokens to the pool
        require(IERC20(tokenA).transferFrom(msg.sender, address(this), _amountA), "Transfer of token A failed");
        require(IERC20(tokenB).transferFrom(msg.sender, address(this), _amountB), "Transfer of token B failed");
        require(IERC20(starDexToken).transfer(msg.sender, (_amountA + _amountB)), "Transfer of StarDex Token failed");
        
        // Update pool and user liquidity information
        liquidityA += _amountA;
        liquidityB += _amountB;
        userLiquidity[msg.sender].liquidityTokenA += _amountA;
        userLiquidity[msg.sender].liquidityTokenB += _amountB;
        
        emit LiquidityAdded(msg.sender, _tokenA, _tokenB, _amountA, _amountB);
    }

    /**
     * @notice Removes liquidity from the pool
     * @param _tokenA Address of token A
     * @param _tokenB Address of token B
     * @param _amountA Amount of token A to remove
     * @param _amountB Amount of token B to remove
     */
    function removeLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) public nonReentrant {
        PoolInfo storage userPool = userLiquidity[msg.sender];
        
        require(userPool.liquidityTokenA >= _amountA && userPool.liquidityTokenB >= _amountB, "Not enough liquidity");
        
        // Update liquidity in pool and for user
        liquidityA -= _amountA;
        liquidityB -= _amountB;
        userPool.liquidityTokenA -= _amountA;
        userPool.liquidityTokenB -= _amountB;
        
        // Transfer tokens back to the user
        require(IERC20(tokenA).transfer(msg.sender, _amountA), "Transfer of token A failed");
        require(IERC20(tokenB).transfer(msg.sender, _amountB), "Transfer of token B failed");
        
        emit LiquidityRemoved(msg.sender, _tokenA, _tokenB, _amountA, _amountB);
    }

    /**
 * @notice Swaps a given amount of input token for the other token in the pair
 * @param _tokenIn Address of the input token
 * @param _amountIn Amount of the input token to swap
 */
function swap(address _tokenIn, uint256 _amountIn) public nonReentrant {
    require(address(_tokenIn) == address(tokenA) || address(_tokenIn) == address(tokenB), "Token not found in pair");
    
    if (address(_tokenIn) == address(tokenA)) {
        require(liquidityA > _amountIn, "Not enough liquidity");   

        // Transfer tokens to the pool
        require(IERC20(tokenA).transferFrom(msg.sender, address(this), _amountIn), "Transfer of token A failed");

        // Calculate amounts considering fees
        (uint256 amountIn, uint256 amountOut) = getAmounts(_amountIn, liquidityA, liquidityB);
        liquidityA += amountIn;
        reserveA += (_amountIn - amountIn);
        liquidityB -= amountOut;

        // Ensure that amountOut does not cause underflow
        require(liquidityB >= amountOut, "Liquidity pool underflow");

        // Transfer output tokens to the user
        require(IERC20(tokenB).transfer(msg.sender, amountOut), "Transfer of token B failed");

    } else if (address(_tokenIn) == address(tokenB)) {
        require(liquidityB > _amountIn, "Not enough liquidity");   

        // Transfer tokens to the pool
        require(IERC20(tokenB).transferFrom(msg.sender, address(this), _amountIn), "Transfer of token B failed");

        // Calculate amounts considering fees
        (uint256 amountIn, uint256 amountOut) = getAmounts(_amountIn, liquidityB, liquidityA);
        liquidityB += amountIn;
        reserveB += (_amountIn - amountIn);
        liquidityA -= amountOut;

        // Ensure that amountOut does not cause underflow
        require(liquidityA >= amountOut, "Liquidity pool underflow");

        // Transfer output tokens to the user
        require(IERC20(tokenA).transfer(msg.sender, amountOut), "Transfer of token A failed");
    }
}


    /**
     * @notice Calculates the amounts for a swap based on the constant product formula (x * y = k)
     * @param _amountIn Amount of input token
     * @param _liquidityIn Liquidity of input token in the pool
     * @param _liquidityOut Liquidity of output token in the pool
     * @return amountInWithFee Amount of input token with fee applied
     * @return amountOut Amount of output token
     */
    function getAmounts(uint256 _amountIn, uint256 _liquidityIn, uint256 _liquidityOut) public pure returns (uint256,uint256) {
        require(_amountIn > 0, "Invalid input amount");
        require(_liquidityIn > 0 && _liquidityOut > 0, "Insufficient liquidity");
        uint256 amountInWithFee = _amountIn * 970;
        uint256 numerator = _liquidityIn * _liquidityOut * 1000;
        uint256 denominator = _liquidityIn * 1000 + amountInWithFee;
        uint256 newLiquidityOut = numerator / denominator;
        return((amountInWithFee / 1000), (_liquidityOut - newLiquidityOut));
    }

    /**
     * @notice Calculates the amounts for a swap based on the constant product formula (x * y = k)
     * @param _amountOut Amount of output token
     * @param _liquidityIn Liquidity of input token in the pool
     * @param _liquidityOut Liquidity of output token in the pool
     * @return amountInWithFee Amount of input token with fee applied
     */
    function getAmountsReverse(uint256 _amountOut, uint256 _liquidityIn, uint256 _liquidityOut) public pure returns (uint256 amountInWithFee) {
        require(_amountOut > 0, "Invalid output amount");
        require(_liquidityIn > 0 && _liquidityOut > 0, "Insufficient liquidity");
        
        // Calculate the amount of input tokens needed before applying the fee
        uint256 numerator = _liquidityIn * _amountOut * 1000;
        uint256 denominator = (_liquidityOut - _amountOut) * 970;
        uint256 amountIn = numerator / denominator;
        
        // Apply the fee
        amountInWithFee = amountIn;
    }
}