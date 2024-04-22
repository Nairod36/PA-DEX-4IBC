// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LiquidityPool.sol";

contract LiquidityPoolFactory {
    // Liste de tous les pools créés
    LiquidityPool[] public pools;

    event PoolCreated(LiquidityPool indexed newPool);

    function createLiquidityPool() public {
        LiquidityPool newPool = new LiquidityPool();
        pools.push(newPool);
        emit PoolCreated(newPool);
    }

    function getPools() public view returns (LiquidityPool[] memory) {
        return pools;
    }
}
