// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StakingPool.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FactoryStakingPool is Ownable {
    mapping (bytes32 => StakingPool) public stakingPools;

    event StakingPoolCreated(StakingPool indexed newStakingPool);
    
    constructor(address initialOwner) Ownable(initialOwner){}

    function createStakingPool(address _stakingToken, uint256 _rewardRate) public onlyOwner {
        require(address(stakingPools[getStakingId(_stakingToken)]) == address(0),"Staking pool already exists.");
        StakingPool newStakingPool = new StakingPool(_stakingToken, _rewardRate);
        require(IERC20(_stakingToken).transferFrom(msg.sender, address(newStakingPool), 10000*1e18), "Transfer of token A failed");
        newStakingPool.grantRole(newStakingPool.ADMIN_ROLE(), msg.sender); // Assign the admin role to the creator
        newStakingPool.grantRole(newStakingPool.STAKER_ROLE(), msg.sender); // Optionally assign the staker role to the creator if needed

        stakingPools[getStakingId(_stakingToken)] = newStakingPool;
        emit StakingPoolCreated(newStakingPool);
    }

    function getStake(bytes32 _skatingId) public view returns(StakingPool){
        return stakingPools[_skatingId];
    }

    function getStakingId(address _token) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_token));
    }
}
