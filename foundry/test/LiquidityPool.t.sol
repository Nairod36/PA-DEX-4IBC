// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/LiquidityPool.sol";
import "./mocks/MockERC20.sol";

contract LiquidityPoolTest is Test {
    LiquidityPool public pool;
    MockERC20 public tokenA;
    MockERC20 public tokenB;
    address public owner;

    function setUp() public {
        owner = address(this);
        tokenA = new MockERC20("Token A", "TKNA", 18);
        tokenB = new MockERC20("Token B", "TKNB", 18);

        tokenA.mint(owner, 10000);
        tokenB.mint(owner, 10000);

        pool = new LiquidityPool(address(tokenA), address(tokenB), 0, 0);

        tokenA.approve(address(pool), 10000);
        tokenB.approve(address(pool), 10000);
    }

    function testAddLiquidity() public {
        uint256 amountA = 1000;
        uint256 amountB = 1000;
        
        vm.prank(owner);
        pool.addLiquidity(address(tokenA), address(tokenB), amountA, amountB);

        assertEq(tokenA.balanceOf(address(pool)), amountA, "Pool should have correct amount of tokenA");
        assertEq(tokenB.balanceOf(address(pool)), amountB, "Pool should have correct amount of tokenB");
        assertEq(pool.liquidityA(), amountA, "LiquidityA should match added liquidity");
        assertEq(pool.liquidityB(), amountB, "LiquidityB should match added liquidity");
    }

    function testRemoveLiquidity() public {
        uint256 amountA = 500;
        uint256 amountB = 500;
        
        vm.prank(owner);
        pool.addLiquidity(address(tokenA), address(tokenB), 1000, 1000);
        pool.removeLiquidity(address(tokenA), address(tokenB), amountA, amountB);

        assertEq(tokenA.balanceOf(address(pool)), 500, "Pool should have correct amount of tokenA after removal");
        assertEq(tokenB.balanceOf(address(pool)), 500, "Pool should have correct amount of tokenB after removal");
        assertEq(pool.liquidityA(), 500, "LiquidityA should match remaining liquidity");
        assertEq(pool.liquidityB(), 500, "LiquidityB should match remaining liquidity");
    }

    function testSwapTokenAForTokenB() public {
        uint256 amountIn = 100;
        pool.addLiquidity(address(tokenA), address(tokenB), 1000, 1000);
        uint256 initialReserveA = pool.liquidityA();
        uint256 initialReserveB = pool.liquidityB();

        vm.prank(owner);
        pool.swap(address(tokenA), amountIn);

        (uint256 amountInWithFee, uint256 amountOut) = pool.getAmounts(amountIn, initialReserveA, initialReserveB);

        uint256 newReserveA = pool.liquidityA();
        uint256 newReserveB = pool.liquidityB();

        assertEq(newReserveA, initialReserveA + amountInWithFee, "Reserve A should increase by amount in");
        assertEq(newReserveB, initialReserveB - amountOut, "Reserve B should decrease by amount out");
        assertEq(pool.reserveA(), amountIn - amountInWithFee, "Fees are not stored");
        assertEq(tokenB.balanceOf(owner), 10000 - initialReserveB + amountOut, "Owner balance of Token B incorrect after swap");
    }

    function testSwapTokenBForTokenA() public {
        uint256 amountIn = 100;
        pool.addLiquidity(address(tokenA), address(tokenB), 1000, 1000);
        uint256 initialReserveA = pool.liquidityA();
        uint256 initialReserveB = pool.liquidityB();

        vm.prank(owner);
        pool.swap(address(tokenB), amountIn);

        (uint256 amountInWithFee, uint256 amountOut) = pool.getAmounts(amountIn, initialReserveB, initialReserveA);

        uint256 newReserveA = pool.liquidityA();
        uint256 newReserveB = pool.liquidityB();

        assertEq(newReserveA, initialReserveA - amountOut, "Reserve A should decrease by amount out");
        assertEq(newReserveB, initialReserveB + amountInWithFee, "Reserve B should increase by amount in");
        assertEq(pool.reserveB(), amountIn - amountInWithFee, "Fees are not stored");
        assertEq(tokenA.balanceOf(owner), 10000 - initialReserveA + amountOut, "Owner balance of Token A incorrect after swap");
    }
}
