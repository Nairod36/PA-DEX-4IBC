// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {console, Test} from "forge-std/Test.sol";
import "./mocks/MockERC20.sol";
import "../src/FactoryLiquidityPool.sol";
import "../src/LiquidityPool.sol";

contract FactoryLiquidityPoolTest is Test {
    address owner;
    FactoryLiquidityPool factory;
    MockERC20 tokenA;
    MockERC20 tokenB;
    MockERC20 sdx;

    function setUp() public {
        owner = address(this);
        sdx = new MockERC20("StarDex Token", "SDX", 18);
        factory = new FactoryLiquidityPool(address(sdx));
        tokenA = new MockERC20("Token A", "TKA", 18);
        tokenB = new MockERC20("Token B", "TKB", 18);
        sdx.mint(owner,100000*1e18);
    }

    function testCreateLiquidityPool() public {
        sdx.approve(address(factory),10000*1e18);
        factory.createLiquidityPool(address(tokenA), address(tokenB));
        bytes32 poolId = factory.getPoolId(address(tokenA), address(tokenB));
        LiquidityPool pool = factory.getPool(poolId);
        
        assertTrue(address(pool) != address(0), "Pool should be created");
        assertEq(pool.tokenA(), address(tokenA), "Token A address should match");
        assertEq(pool.tokenB(), address(tokenB), "Token B address should match");
    }

    function testFailCreateDuplicateLiquidityPool() public {
        factory.createLiquidityPool(address(tokenA), address(tokenB));
        factory.createLiquidityPool(address(tokenA), address(tokenB));  // This should fail
    }
}