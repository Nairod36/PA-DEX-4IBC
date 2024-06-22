// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/LiquidityPool.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../src/MockERC20.sol";

contract LiquidityPoolTest is Test {
    LiquidityPool public liquidityPool;
    MockERC20 public tokenA;
    MockERC20 public tokenB;

    address public user1;
    address public user2;

    function setUp() public {
        tokenA = new MockERC20("Token A", "TKA",18);
        tokenB = new MockERC20("Token B", "TKB",18);

        tokenA.mint(address(this), 10000 ether);
        tokenB.mint(address(this), 10000 ether);


        liquidityPool = new LiquidityPool(address(tokenA), address(tokenB), 1000 ether, 1000 ether);
        
        tokenA.transfer(address(liquidityPool),1000 ether);
        tokenB.transfer(address(liquidityPool),1000 ether);

        user1 = address(0x1);
        user2 = address(0x2);

        tokenA.mint(user1, 2000 ether);
        tokenB.mint(user1, 2000 ether);
        tokenA.mint(user2, 2000 ether);
        tokenB.mint(user2, 2000 ether);
    }

    function testAddLiquidity() public {
        vm.startPrank(user1);

        tokenA.approve(address(liquidityPool), 500 ether);
        tokenB.approve(address(liquidityPool), 500 ether);
        liquidityPool.addLiquidity(address(tokenA), address(tokenB), 500 ether, 500 ether);

        (uint256 liquidityTokenA, uint256 liquidityTokenB) = liquidityPool.userLiquidity(user1);
        assertEq(liquidityTokenA, 500 ether);
        assertEq(liquidityTokenB, 500 ether);
        assertEq(liquidityPool.liquidityA(), 1500 ether);
        assertEq(liquidityPool.liquidityB(), 1500 ether);

        vm.stopPrank();
    }

    function testRemoveLiquidity() public {
        vm.startPrank(user1);

        tokenA.approve(address(liquidityPool), 500 ether);
        tokenB.approve(address(liquidityPool), 500 ether);
        liquidityPool.addLiquidity(address(tokenA), address(tokenB), 500 ether, 500 ether);

        liquidityPool.removeLiquidity(address(tokenA), address(tokenB), 200 ether, 200 ether);

        (uint256 liquidityTokenA, uint256 liquidityTokenB) = liquidityPool.userLiquidity(user1);
        assertEq(liquidityTokenA, 300 ether);
        assertEq(liquidityTokenB, 300 ether);
        assertEq(liquidityPool.liquidityA(), 1300 ether);
        assertEq(liquidityPool.liquidityB(), 1300 ether);

        vm.stopPrank();
    }

    function testSwap() public {
        vm.startPrank(user1);

        (uint256 amountIn, uint256 amountOut) = liquidityPool.getAmounts(100 ether,liquidityPool.liquidityA(),liquidityPool.liquidityB());
        tokenA.approve(address(liquidityPool), 100 ether);

        liquidityPool.swap(address(tokenA), 100 ether);

        uint256 balanceB = tokenB.balanceOf(user1);
        assertGt(balanceB, 0); // Check that user1 received tokenB
        assertEq(liquidityPool.liquidityA(), 1000 ether + amountIn); // initial liquidity + swap amount
        assertEq(liquidityPool.liquidityB(), 1000 ether - amountOut);

        vm.stopPrank();
    }

    function testClaimRewards() public {
        vm.startPrank(user1);

        tokenA.approve(address(liquidityPool), 500 ether);
        tokenB.approve(address(liquidityPool), 500 ether);
        liquidityPool.addLiquidity(address(tokenA), address(tokenB), 500 ether, 500 ether);

        vm.stopPrank();
        vm.startPrank(user2);

        tokenA.approve(address(liquidityPool), 100 ether);
        liquidityPool.swap(address(tokenA), 100 ether);

        vm.stopPrank();
        vm.startPrank(user1);

        liquidityPool.claimRewards();

        uint256 rewardA = liquidityPool.getUserRewardsA();
        uint256 rewardB = liquidityPool.getUserRewardsB();
        assertEq(rewardA, 0);
        assertEq(rewardB, 0);

        vm.stopPrank();
    }

    function testRewardAfterAddingLiquidity() public {
        vm.startPrank(user1);

        tokenA.approve(address(liquidityPool), 500 ether);
        tokenB.approve(address(liquidityPool), 500 ether);
        liquidityPool.addLiquidity(address(tokenA), address(tokenB), 500 ether, 500 ether);

        vm.stopPrank();
        vm.startPrank(user2);

        tokenA.approve(address(liquidityPool), 100 ether);
        liquidityPool.swap(address(tokenA), 100 ether);

        vm.stopPrank();
        vm.startPrank(user1);

        liquidityPool.claimRewards();
        uint256 initialRewardA = liquidityPool.getUserRewardsA();
        uint256 initialRewardB = liquidityPool.getUserRewardsB();

        tokenA.approve(address(liquidityPool), 1000 ether);
        tokenB.approve(address(liquidityPool), 1000 ether);
        liquidityPool.addLiquidity(address(tokenA), address(tokenB), 1000 ether, 1000 ether);

        liquidityPool.claimRewards();
        uint256 newRewardA = liquidityPool.getUserRewardsA();
        uint256 newRewardB = liquidityPool.getUserRewardsB();

        assertEq(initialRewardA, 0);
        assertEq(initialRewardB, 0);
        assertEq(newRewardA, 0);
        assertEq(newRewardB, 0);

        vm.stopPrank();
    }
}
