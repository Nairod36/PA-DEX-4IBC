// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StakingPool.sol";

contract StakingPoolFactory {
    StakingPool[] public stakingPools;

    event StakingPoolCreated(StakingPool indexed newStakingPool);

    function createStakingPool() public {
        StakingPool newStakingPool = new StakingPool();
        newStakingPool.grantRole(newStakingPool.ADMIN_ROLE(), msg.sender); // Assigne le rôle d'admin au créateur
        newStakingPool.grantRole(newStakingPool.STAKER_ROLE(), msg.sender); // Assigne le rôle de staker au créateur
        stakingPools.push(newStakingPool);
        emit StakingPoolCreated(newStakingPool);
    }

    function getStakingPools() public view returns (StakingPool[] memory) {
        return stakingPools;
    }
}
