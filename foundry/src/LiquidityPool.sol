// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

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
    
    // Pool identifier is a keccak256 hash of token addresses
    mapping(address => PoolInfo) public userLiquidity;
    
    event LiquidityAdded(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);

    constructor(address _tokenA, address _tokenB){
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function addLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) public nonReentrant {
        require(_amountA > 0 && _amountB > 0, "Amounts must be greater than zero");
        
        // Transfer tokens to the pool
        require(IERC20(tokenA).transferFrom(msg.sender, address(this), _amountA), "Transfer of token A failed");
        require(IERC20(tokenB).transferFrom(msg.sender, address(this), _amountB), "Transfer of token B failed");
        
        // Update pool and user liquidity information
        liquidityA += _amountA;
        liquidityB += _amountB;
        userLiquidity[msg.sender].liquidityTokenA += _amountA;
        userLiquidity[msg.sender].liquidityTokenB += _amountB;
        
        emit LiquidityAdded(msg.sender, _tokenA, _tokenB, _amountA, _amountB);
    }

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

    function swap(address _tokenIn, uint256 _amountIn) public nonReentrant{
        require(address(_tokenIn) == address(tokenA) || address(_tokenIn) == address(tokenB),"Token not found in pair");
        if(address(_tokenIn) == address(tokenA)){
            require(liquidityA > _amountIn, "Not enough liquidity");   

            // Transfer tokens to the pool
            require(IERC20(tokenA).transferFrom(msg.sender, address(this), _amountIn), "Transfer of token A failed");

            (uint256 amountIn, uint256 amountOut) = getAmounts(_amountIn ,liquidityA, liquidityB);
            liquidityA += amountIn;
            reserveA += _amountIn - amountIn;
            liquidityB -= amountOut;
            require(IERC20(tokenB).transfer(msg.sender, amountOut), "Transfer of token A failed");

        }else if(address(_tokenIn) == address(tokenB)){
            require(liquidityB > _amountIn, "Not enough liquidity");   

            // Transfer tokens to the pool
            require(IERC20(tokenB).transferFrom(msg.sender, address(this), _amountIn), "Transfer of token B failed");

            (uint256 amountIn, uint256 amountOut) = getAmounts(_amountIn ,liquidityB, liquidityA);
            liquidityB += amountIn;
            reserveB += _amountIn - amountIn;
            liquidityA -= amountOut;
            require(IERC20(tokenA).transfer(msg.sender, amountOut), "Transfer of token B failed");
        }
    }

    // Price calculation using the constant product formula (x * y = k)
    function getAmounts(uint256 _amountIn, uint256 _liquidityIn, uint256 _liquidityOut) public pure returns (uint256,uint256) {
        require(_amountIn > 0, "Invalid input amount");
        require(_liquidityIn > 0 && _liquidityOut > 0, "Insufficient liquidity");
        uint256 amountInWithFee = _amountIn * 970;
        uint256 numerator = _liquidityIn * _liquidityOut * 1000;
        uint256 denominator = _liquidityIn * 1000 + amountInWithFee;
        uint256 newLiquidityOut = numerator / denominator;
        return((amountInWithFee / 1000), (_liquidityOut - newLiquidityOut));
    }
}
