// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {console, Test} from "forge-std/Test.sol";
import "./mocks/MockERC20.sol";
import "../src/FactoryLiquidityPool.sol";
import "../src/LiquidityPool.sol";

contract FactoryLiquidityPoolTest is Test {
    FactoryLiquidityPool factory;
    MockERC20 tokenA;
    MockERC20 tokenB;

    function setUp() public {
        factory = new FactoryLiquidityPool();
        tokenA = new MockERC20("Token A", "TKA", 18);
        tokenB = new MockERC20("Token B", "TKB", 18);
    }

    function testCreateLiquidityPool() public {
        factory.createLiquidityPool(address(tokenA), address(tokenB), 1000, 1000);
        bytes32 poolId = factory.getPoolId(address(tokenA), address(tokenB));
        LiquidityPool pool = factory.pools(poolId);
        
        assertTrue(address(pool) != address(0), "Pool should be created");
        assertEq(pool.tokenA(), address(tokenA), "Token A address should match");
        assertEq(pool.tokenB(), address(tokenB), "Token B address should match");
        assertEq(pool.liquidityA(), 1000, "Initial reserve for token A should be 1000");
        assertEq(pool.liquidityB(), 1000, "Initial reserve for token B should be 1000");
    }

    function testFailCreateDuplicateLiquidityPool() public {
        factory.createLiquidityPool(address(tokenA), address(tokenB), 1000, 1000);
        factory.createLiquidityPool(address(tokenA), address(tokenB), 1000, 1000);  // This should fail
    }
}