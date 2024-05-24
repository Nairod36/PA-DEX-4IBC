// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StakingPool.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FactoryStakingPool is Ownable {
    mapping (bytes32 => StakingPool) private stakingPools;

    event StakingPoolCreated(StakingPool indexed newStakingPool);
    
    /**
     * @notice Initializes the factory contract with the initial owner
     * @param initialOwner The address of the initial owner of the contract
     */
    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @notice Creates a new staking pool
     * @param _stakingToken Address of the staking token
     * @param _rewardRate Reward rate per token per second for the staking pool
     */
    function createStakingPool(address _stakingToken, uint256 _rewardRate) public onlyOwner {
        require(address(stakingPools[getStakingId(_stakingToken)]) == address(0), "Staking pool already exists.");
        StakingPool newStakingPool = new StakingPool(_stakingToken, _rewardRate);
        require(IERC20(_stakingToken).transferFrom(msg.sender, address(newStakingPool), 10000 * 1e18), "Transfer of staking token failed");
        newStakingPool.grantRole(newStakingPool.ADMIN_ROLE(), msg.sender); // Assign the admin role to the creator
        newStakingPool.grantRole(newStakingPool.STAKER_ROLE(), msg.sender); // Optionally assign the staker role to the creator if needed

        stakingPools[getStakingId(_stakingToken)] = newStakingPool;
        emit StakingPoolCreated(newStakingPool);
    }

    /**
     * @notice Returns the staking pool for a given staking ID
     * @param _stakingId The ID of the staking pool
     * @return The staking pool corresponding to the given ID
     */
    function getStake(bytes32 _stakingId) public view returns (StakingPool) {
        return stakingPools[_stakingId];
    }

    /**
     * @notice Generates a staking pool ID based on the staking token address
     * @param _token The address of the staking token
     * @return The staking pool ID
     */
    function getStakingId(address _token) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_token));
    }
}
