// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/FactoryLiquidityPool.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../src/MockERC20.sol";

contract FactoryLiquidityPoolTest is Test {
    FactoryLiquidityPool public factory;
    MockERC20 public tokenA;
    MockERC20 public tokenB;

    address public user1;

    function setUp() public {
        tokenA = new MockERC20("Token A", "TKA", 18);
        tokenB = new MockERC20("Token B", "TKB", 18);

        tokenA.mint(address(this), 10000 ether);
        tokenB.mint(address(this), 10000 ether);

        factory = new FactoryLiquidityPool();

        user1 = address(0x1);

        tokenA.mint(user1, 5000 ether);
        tokenB.mint(user1, 5000 ether);
    }

    function testCreateLiquidityPool() public {
        vm.startPrank(user1);
        tokenA.approve(address(factory), 1000 ether);
        tokenB.approve(address(factory), 1000 ether);

        factory.createLiquidityPool(address(tokenA), address(tokenB), 1000 ether, 1000 ether);

        bytes32 poolId = factory.getPoolId(address(tokenA), address(tokenB));
        LiquidityPool pool = factory.getPool(poolId);

        assertEq(address(pool), address(factory.pools(poolId)));
        vm.stopPrank();
    }

    function testGetAllPools() public {
        vm.startPrank(user1);
        tokenA.approve(address(factory), 2000 ether);
        tokenB.approve(address(factory), 2000 ether);

        factory.createLiquidityPool(address(tokenA), address(tokenB), 1000 ether, 1000 ether);

        address[] memory pools = factory.getAllPools();

        assertEq(pools.length, 1);
        vm.stopPrank();
    }

    function testTransferTokensDuringCreation() public {
        vm.startPrank(user1);
        tokenA.approve(address(factory), 1000 ether);
        tokenB.approve(address(factory), 1000 ether);

        factory.createLiquidityPool(address(tokenA), address(tokenB), 1000 ether, 1000 ether);

        bytes32 poolId = factory.getPoolId(address(tokenA), address(tokenB));
        LiquidityPool pool = factory.getPool(poolId);

        assertEq(tokenA.balanceOf(address(pool)), 1000 ether);
        assertEq(tokenB.balanceOf(address(pool)), 1000 ether);
        vm.stopPrank();
    }

    function testRevertIfPoolAlreadyExists() public {
        vm.startPrank(user1);
        tokenA.approve(address(factory), 1000 ether);
        tokenB.approve(address(factory), 1000 ether);

        factory.createLiquidityPool(address(tokenA), address(tokenB), 1000 ether, 1000 ether);

        vm.expectRevert("Pool already exists");
        factory.createLiquidityPool(address(tokenA), address(tokenB), 1000 ether, 1000 ether);
        vm.stopPrank();
    }
}
