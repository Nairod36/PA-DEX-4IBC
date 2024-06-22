// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/FactoryStakingPool.sol";
import "../src/StakingPool.sol";
import "../src/MockERC20.sol";

contract FactoryStakingPoolTest is Test {
    FactoryStakingPool factory;
    MockERC20 stakingToken;
    address owner;

    function setUp() public {
        owner = address(this);  // Utiliser le contrat de test comme propriétaire pour simplifier
        factory = new FactoryStakingPool(owner);
        stakingToken = new MockERC20("Staking Token", "STK", 18);
    }

    function testCreateStakingPool() public {
        uint256 rewardRate = 1e17; // 0.1 token per second per staked token
        stakingToken.mint(owner,10000*1e18);
        stakingToken.approve(address(factory),10000*1e18);
        factory.createStakingPool(address(stakingToken), rewardRate);
        
        bytes32 poolId = factory.getStakingId(address(stakingToken));
        StakingPool newStakingPool = factory.getStake(poolId);

        assertTrue(address(newStakingPool) != address(0), "Staking pool should be created");
        assertTrue(newStakingPool.hasRole(newStakingPool.ADMIN_ROLE(), owner), "Owner should have the admin role");
    }

    function testFailCreateDuplicateStakingPool() public {
        uint256 rewardRate = 1e17; // 0.1 token per second per staked token
        factory.createStakingPool(address(stakingToken), rewardRate);

        // This call should fail because the staking pool for this token already exists
        factory.createStakingPool(address(stakingToken), rewardRate);
    }

    function testRoleAssignmentInNewStakingPool() public {
        uint256 rewardRate = 1e17; // 0.1 token per second per staked token
        stakingToken.mint(owner,10000*1e18);
        stakingToken.approve(address(factory),10000*1e18);
        factory.createStakingPool(address(stakingToken), rewardRate);
        
        bytes32 poolId = factory.getStakingId(address(stakingToken));
        StakingPool newStakingPool = factory.getStake(poolId);

        assertTrue(newStakingPool.hasRole(newStakingPool.STAKER_ROLE(), owner), "Owner should have the staker role");
    }
}
