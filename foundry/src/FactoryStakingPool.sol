// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StakingPool.sol";

contract StakingPoolFactory {
    StakingPool[] public stakingPools;

    event StakingPoolCreated(StakingPool indexed newStakingPool);

    function createStakingPool(address _stakingToken, address _rewardsToken, uint256 _totalReward, uint256 _rewardsDuration) public {
        StakingPool newStakingPool = new StakingPool(_stakingToken, _rewardsToken, _totalReward, _rewardsDuration);
        newStakingPool.grantRole(newStakingPool.ADMIN_ROLE(), msg.sender); // Assign the admin role to the creator
        newStakingPool.grantRole(newStakingPool.STAKER_ROLE(), msg.sender); // Optionally assign the staker role to the creator if needed

        stakingPools.push(newStakingPool);
        emit StakingPoolCreated(newStakingPool);
    }

    function getStakingPools() public view returns (StakingPool[] memory) {
        return stakingPools;
    }
}
