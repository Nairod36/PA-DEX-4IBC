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
    uint256 public totalFeesA;
    uint256 public totalFeesB;

    mapping(address => PoolInfo) public userLiquidity;
    mapping(address => uint256) public userRewardDebtA;
    mapping(address => uint256) public userRewardDebtB;
    mapping(address => uint256) public userRewardsA;
    mapping(address => uint256) public userRewardsB;

    event LiquidityAdded(
        address indexed user,
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB
    );
    event LiquidityRemoved(
        address indexed user,
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB
    );
    event RewardClaimed(address indexed user, uint256 rewardA, uint256 rewardB);

    /**
     * @notice Initializes the liquidity pool with given token addresses and initial liquidity
     * @param _tokenA Address of token A
     * @param _tokenB Address of token B
     * @param _amountA Initial amount of token A
     * @param _amountB Initial amount of token B
     */
    constructor(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) {
        require(_tokenA != address(0), "Token A address null");
        require(_tokenB != address(0), "Token B address null");
        require(_amountA > 0, "Amount A null");
        require(_amountB > 0, "Amount B null");
        tokenA = _tokenA;
        tokenB = _tokenB;
        liquidityA = _amountA;
        liquidityB = _amountB;
    }

    /**
     * @notice Adds liquidity to the pool
     * @param _tokenA Address of token A
     * @param _tokenB Address of token B
     * @param _amountA Amount of token A to add
     * @param _amountB Amount of token B to add
     */
    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) public nonReentrant {
        require(
            _amountA > 0 && _amountB > 0,
            "Amounts must be greater than zero"
        );

        // Update user rewards before changing liquidity
        updateReward(msg.sender);

        // Transfer tokens to the pool
        require(
            IERC20(tokenA).transferFrom(msg.sender, address(this), _amountA),
            "Transfer of token A failed"
        );
        require(
            IERC20(tokenB).transferFrom(msg.sender, address(this), _amountB),
            "Transfer of token B failed"
        );

        // Update pool and user liquidity information
        liquidityA += _amountA;
        liquidityB += _amountB;
        userLiquidity[msg.sender].liquidityTokenA += _amountA;
        userLiquidity[msg.sender].liquidityTokenB += _amountB;

        // Update reward debt after changing liquidity
        updateUserRewardDebt(msg.sender);

        emit LiquidityAdded(msg.sender, _tokenA, _tokenB, _amountA, _amountB);
    }

    /**
     * @notice Removes liquidity from the pool
     * @param _tokenA Address of token A
     * @param _tokenB Address of token B
     * @param _amountA Amount of token A to remove
     * @param _amountB Amount of token B to remove
     */
    function removeLiquidity(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) public nonReentrant {
        PoolInfo storage userPool = userLiquidity[msg.sender];

        require(
            userPool.liquidityTokenA >= _amountA &&
                userPool.liquidityTokenB >= _amountB,
            "Not enough liquidity"
        );

        // Update user rewards before changing liquidity
        updateReward(msg.sender);

        // Update liquidity in pool and for user
        liquidityA -= _amountA;
        liquidityB -= _amountB;
        userPool.liquidityTokenA -= _amountA;
        userPool.liquidityTokenB -= _amountB;

        // Transfer tokens back to the user
        require(
            IERC20(tokenA).transfer(msg.sender, _amountA),
            "Transfer of token A failed"
        );
        require(
            IERC20(tokenB).transfer(msg.sender, _amountB),
            "Transfer of token B failed"
        );

        // Update reward debt after changing liquidity
        updateUserRewardDebt(msg.sender);

        emit LiquidityRemoved(msg.sender, _tokenA, _tokenB, _amountA, _amountB);
    }

    /**
     * @notice Swaps a given amount of input token for the other token in the pair
     * @param _tokenIn Address of the input token
     * @param _amountIn Amount of the input token to swap
     */
    function swap(address _tokenIn, uint256 _amountIn) public nonReentrant {
        require(
            address(_tokenIn) == address(tokenA) ||
                address(_tokenIn) == address(tokenB),
            "Token not found in pair"
        );

        if (address(_tokenIn) == address(tokenA)) {
            require(liquidityA > _amountIn, "Not enough liquidity");

            // Transfer tokens to the pool
            require(
                IERC20(tokenA).transferFrom(
                    msg.sender,
                    address(this),
                    _amountIn
                ),
                "Transfer of token A failed"
            );

            // Calculate amounts considering fees
            (uint256 amountInWithFee, uint256 amountOut) = getAmounts(
                _amountIn,
                liquidityA,
                liquidityB
            );

            // Calculate minimum amount out with 5% slippage tolerance
            uint256 minAmountOut = (amountOut * 95) / 100;
            require(amountOut >= minAmountOut, "Slippage too high");

            totalFeesA += (_amountIn - amountInWithFee);

            liquidityA += amountInWithFee;
            liquidityB -= amountOut;

            // Ensure that amountOut does not cause underflow
            require(liquidityB >= amountOut, "Liquidity pool underflow");

            // Transfer output tokens to the user
            require(
                IERC20(tokenB).transfer(msg.sender, amountOut),
                "Transfer of token B failed"
            );
        } else if (address(_tokenIn) == address(tokenB)) {
            require(liquidityB > _amountIn, "Not enough liquidity");

            // Transfer tokens to the pool
            require(
                IERC20(tokenB).transferFrom(
                    msg.sender,
                    address(this),
                    _amountIn
                ),
                "Transfer of token B failed"
            );

            // Calculate amounts considering fees
            (uint256 amountInWithFee, uint256 amountOut) = getAmounts(
                _amountIn,
                liquidityB,
                liquidityA
            );

            // Calculate minimum amount out with 5% slippage tolerance
            uint256 minAmountOut = (amountOut * 95) / 100;
            require(amountOut >= minAmountOut, "Slippage too high");

            totalFeesB += (_amountIn - amountInWithFee);

            liquidityB += amountInWithFee;
            liquidityA -= amountOut;

            // Ensure that amountOut does not cause underflow
            require(liquidityA >= amountOut, "Liquidity pool underflow");

            // Transfer output tokens to the user
            require(
                IERC20(tokenA).transfer(msg.sender, amountOut),
                "Transfer of token A failed"
            );
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
    function getAmounts(
        uint256 _amountIn,
        uint256 _liquidityIn,
        uint256 _liquidityOut
    ) public pure returns (uint256, uint256) {
        require(_amountIn > 0, "Invalid input amount");
        require(
            _liquidityIn > 0 && _liquidityOut > 0,
            "Insufficient liquidity"
        );
        uint256 amountInWithFee = (_amountIn * 970) / 1000;
        uint256 numerator = _liquidityIn * _liquidityOut;
        uint256 denominator = _liquidityIn + amountInWithFee;
        uint256 newLiquidityOut = numerator / denominator;
        uint256 amountOut = _liquidityOut - newLiquidityOut;
        return (amountInWithFee, amountOut);
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

    /**
     * @notice Updates the reward for a user based on their liquidity and the total fees collected.
     * @dev This function is called internally to update the user's pending rewards.
     * @param user The address of the user for whom the rewards are being updated.
     */
    function updateReward(address user) internal {
        if (userLiquidity[user].liquidityTokenA > 0) {
            uint256 pendingRewardA = (userLiquidity[user].liquidityTokenA *
                (totalFeesA - userRewardDebtA[user])) / liquidityA;
            userRewardsA[user] += pendingRewardA;
        }
        if (userLiquidity[user].liquidityTokenB > 0) {
            uint256 pendingRewardB = (userLiquidity[user].liquidityTokenB *
                (totalFeesB - userRewardDebtB[user])) / liquidityB;
            userRewardsB[user] += pendingRewardB;
        }
        updateUserRewardDebt(user);
    }

    /**
     * @notice Updates the reward debt of a user to the current total fees.
     * @dev This function is called internally after the user's liquidity changes to update the user's reward debt.
     * @param user The address of the user for whom the reward debt is being updated.
     */
    function updateUserRewardDebt(address user) internal {
        userRewardDebtA[user] = totalFeesA;
        userRewardDebtB[user] = totalFeesB;
    }

    /**
     * @notice Allows a user to claim their accumulated rewards.
     * @dev This function updates the user's rewards and transfers the accumulated rewards to the user.
     */
    function claimRewards() public nonReentrant {
        updateReward(msg.sender);
        uint256 rewardA = userRewardsA[msg.sender];
        uint256 rewardB = userRewardsB[msg.sender];
        userRewardsA[msg.sender] = 0;
        userRewardsB[msg.sender] = 0;
        require(
            IERC20(tokenA).transfer(msg.sender, rewardA),
            "Transfer of token A failed"
        );
        require(
            IERC20(tokenB).transfer(msg.sender, rewardB),
            "Transfer of token B failed"
        );
        emit RewardClaimed(msg.sender, rewardA, rewardB);
    }

    /**
     * @notice Retrieves the accumulated rewards of token A for a user.
     * @return The amount of token A rewards accumulated by the sender.
     */
    function getUserRewardsA() external view returns (uint256) {
        return userRewardsA[msg.sender];
    }

    /**
     * @notice Retrieves the accumulated rewards of token B for a user.
     * @return The amount of token B rewards accumulated by the sender.
     */
    function getUserRewardsB() external view returns (uint256) {
        return userRewardsB[msg.sender];
    }
}
