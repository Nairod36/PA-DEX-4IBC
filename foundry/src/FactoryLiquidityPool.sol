// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LiquidityPool.sol";

contract FactoryLiquidityPool {
    // Liste de tous les pools créés
    mapping(bytes32 => LiquidityPool) public pools;

    event PoolCreated(LiquidityPool indexed newPool);

    function createLiquidityPool(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) public {
        bytes32 poolId = getPoolId(_tokenA, _tokenB);
        require(address(pools[poolId]) == address(0), "Pool already exists");
        LiquidityPool newPool = new LiquidityPool(_tokenA, _tokenB, _amountA, _amountB);
        pools[poolId] = newPool;
        emit PoolCreated(newPool);
    }

    // Helper function to generate a unique pool id based on token addresses
    function getPoolId(address tokenA, address tokenB) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(tokenA, tokenB));
    }
}
