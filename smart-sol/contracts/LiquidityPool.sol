// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LiquidityPool is ReentrancyGuard {
    struct PoolInfo {
        address tokenA;
        address tokenB;
        uint256 liquidityTokenA;
        uint256 liquidityTokenB;
    }
    
    mapping(address => mapping(uint256 => PoolInfo)) public userLiquidity;
    PoolInfo[] public pools;
    
    event LiquidityAdded(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);
    
    function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) public nonReentrant {
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);
        pools.push(PoolInfo(tokenA, tokenB, amountA, amountB));
        uint256 poolId = pools.length - 1;
        userLiquidity[msg.sender][poolId] = PoolInfo(tokenA, tokenB, amountA, amountB);
        emit LiquidityAdded(msg.sender, tokenA, tokenB, amountA, amountB);
    }

    function removeLiquidity(uint256 poolId) public nonReentrant {
        PoolInfo storage pool = userLiquidity[msg.sender][poolId];
        require(pool.liquidityTokenA > 0 && pool.liquidityTokenB > 0, "Aucune liquidite a retirer");

        IERC20(pool.tokenA).transfer(msg.sender, pool.liquidityTokenA);
        IERC20(pool.tokenB).transfer(msg.sender, pool.liquidityTokenB);
        emit LiquidityRemoved(msg.sender, pool.tokenA, pool.tokenB, pool.liquidityTokenA, pool.liquidityTokenB);

        pool.liquidityTokenA = 0;
        pool.liquidityTokenB = 0;
    }
}
