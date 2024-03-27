// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract LiquidityPool is ReentrancyGuard {
    struct PoolInfo {
        address tokenA;
        address tokenB;
        uint256 liquidityTokenA;
        uint256 liquidityTokenB;
    }
    
    // Suivi de la liquidité par utilisateur
    mapping(address => mapping(uint256 => PoolInfo)) public userLiquidity;
    
    PoolInfo[] public pools;
    
    event LiquidityAdded(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);
    
    function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) public nonReentrant {
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);
        pools.push(PoolInfo(tokenA, tokenB, amountA, amountB));
        // Stocker la liquidité ajoutée par l'utilisateur
        uint256 poolId = pools.length - 1;
        userLiquidity[msg.sender][poolId] = PoolInfo(tokenA, tokenB, amountA, amountB);
        emit LiquidityAdded(msg.sender, tokenA, tokenB, amountA, amountB);
        }

    // Permettre aux utilisateurs de retirer leur liquidité
    function removeLiquidity(uint256 poolId) public nonReentrant {
        PoolInfo storage pool = userLiquidity[msg.sender][poolId];
        require(pool.liquidityTokenA > 0 && pool.liquidityTokenB > 0, "Aucune liquidité à retirer");
    
        IERC20(pool.tokenA).transfer(msg.sender, pool.liquidityTokenA);
        IERC20(pool.tokenB).transfer(msg.sender, pool.liquidityTokenB);
        emit LiquidityRemoved(msg.sender, pool.tokenA, pool.tokenB, pool.liquidityTokenA, pool.liquidityTokenB);
        
        // Réinitialiser la liquidité de l'utilisateur pour ce pool
        pool.liquidityTokenA = 0;
        pool.liquidityTokenB = 0;
    }

    // Permettre aux utilisateurs de retirer leur liquidité
    function removeLiquidity(uint256 poolId) public nonReentrant {
        PoolInfo storage pool = userLiquidity[msg.sender][poolId];
        require(pool.liquidityTokenA > 0 && pool.liquidityTokenB > 0, "Aucune liquidité à retirer");

        IERC20(pool.tokenA).transfer(msg.sender, pool.liquidityTokenA);
        IERC20(pool.tokenB).transfer(msg.sender, pool.liquidityTokenB);
        emit LiquidityRemoved(msg.sender, pool.tokenA, pool.tokenB, pool.liquidityTokenA, pool.liquidityTokenB);

        // Réinitialiser la liquidité de l'utilisateur pour ce pool
        pool.liquidityTokenA = 0;
        pool.liquidityTokenB = 0;
    }

    // Obtenir les informations de la pool par son ID
    function getPoolInfo(uint256 poolId) public view returns (PoolInfo memory) {
        require(poolId < pools.length, "ID de pool invalide");
        return pools[poolId];
    }

    // Obtenir la liquidité ajoutée par un utilisateur à un pool spécifique
    function getUserLiquidity(address user, uint256 poolId) public view returns (PoolInfo memory) {
        require(poolId < pools.length, "ID de pool invalide");
        return userLiquidity[user][poolId];
    }

}