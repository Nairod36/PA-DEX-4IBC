// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LiquidityPool is ReentrancyGuard {
    struct PoolInfo {
        uint256 liquidityTokenA;
        uint256 liquidityTokenB;
    }
    
    // Pool identifier is a keccak256 hash of token addresses
    mapping(bytes32 => PoolInfo) public pools;
    mapping(address => mapping(bytes32 => PoolInfo)) public userLiquidity;
    
    event LiquidityAdded(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);

    function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) public nonReentrant {
        require(amountA > 0 && amountB > 0, "Amounts must be greater than zero");
        bytes32 poolId = getPoolId(tokenA, tokenB);
        
        // Transfer tokens to the pool
        require(IERC20(tokenA).transferFrom(msg.sender, address(this), amountA), "Transfer of token A failed");
        require(IERC20(tokenB).transferFrom(msg.sender, address(this), amountB), "Transfer of token B failed");
        
        // Update pool and user liquidity information
        pools[poolId].liquidityTokenA += amountA;
        pools[poolId].liquidityTokenB += amountB;
        userLiquidity[msg.sender][poolId].liquidityTokenA += amountA;
        userLiquidity[msg.sender][poolId].liquidityTokenB += amountB;
        
        emit LiquidityAdded(msg.sender, tokenA, tokenB, amountA, amountB);
    }

    function removeLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) public nonReentrant {
        bytes32 poolId = getPoolId(tokenA, tokenB);
        PoolInfo storage userPool = userLiquidity[msg.sender][poolId];
        
        require(userPool.liquidityTokenA >= amountA && userPool.liquidityTokenB >= amountB, "Not enough liquidity");
        
        // Update liquidity in pool and for user
        pools[poolId].liquidityTokenA -= amountA;
        pools[poolId].liquidityTokenB -= amountB;
        userPool.liquidityTokenA -= amountA;
        userPool.liquidityTokenB -= amountB;
        
        // Transfer tokens back to the user
        require(IERC20(tokenA).transfer(msg.sender, amountA), "Transfer of token A failed");
        require(IERC20(tokenB).transfer(msg.sender, amountB), "Transfer of token B failed");
        
        emit LiquidityRemoved(msg.sender, tokenA, tokenB, amountA, amountB);
    }

    // Helper function to generate a unique pool id based on token addresses
    function getPoolId(address tokenA, address tokenB) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(tokenA, tokenB));
    }
}
