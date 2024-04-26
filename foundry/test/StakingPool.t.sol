// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/StakingPool.sol";
import "./mocks/MockERC20.sol";

contract StakingPoolTest is Test {
    StakingPool pool;
    MockERC20 stakingToken;
    address staker;

    function setUp() public {
        staker = address(this); // Utilisez le contrat de test comme staker pour la simplicité
        stakingToken = new MockERC20("Staking Token", "STK", 18);
        pool = new StakingPool(address(stakingToken), 1e18); // Set reward rate to 1 token per second per staked token

        stakingToken.mint(staker, 1000 * 1e18);
        stakingToken.approve(address(pool), 1000 * 1e18);
    }

    function testStake() public {
        uint256 stakeAmount = 100 * 1e18;
        pool.stake(stakeAmount);

        assertEq(pool.totalStaked(), stakeAmount, "Total staked should match staked amount");
        assertEq(pool.balances(staker), stakeAmount, "Staker balance should match staked amount");
    }

    function testUnstake() public {
        uint256 stakeAmount = 100 * 1e18;
        pool.stake(stakeAmount);
        pool.unstake(stakeAmount);

        assertEq(pool.totalStaked(), 0, "Total staked should be zero after unstake");
        assertEq(pool.balances(staker), 0, "Staker balance should be zero after unstake");
    }

    function testClaimReward() public {
        uint256 stakeAmount = 100 * 1e18;
        pool.stake(stakeAmount);

        // Fast forward time to accumulate some rewards
        vm.warp(block.timestamp + 100); // Advance by 100 seconds

        uint256 expectedRewards = stakeAmount * 10; // As reward rate is 1 token per second per token staked
        uint256 actualRewards = pool.earned(staker); // Getting the actual calculated rewards before claiming

        // Debugging output to understand the discrepancy
        console.log("Expected Rewards:", expectedRewards);
        console.log("Actual Calculated Rewards:", actualRewards);

        pool.claimReward();
        uint256 actualClaimedRewards = stakingToken.balanceOf(staker);

        // Additional debug output to see claimed amount
        console.log("Actual Claimed Rewards:", actualClaimedRewards);

        assertEq(actualClaimedRewards, expectedRewards, "Staker should have claimed correct amount of rewards");

    }
}
