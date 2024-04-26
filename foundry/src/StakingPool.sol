// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract StakingPool is ReentrancyGuard, AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant STAKER_ROLE = keccak256("STAKER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    IERC20 public stakingToken;
    uint256 public totalStaked;
    uint256 public rewardRate; // Rewards per token per second
    mapping(address => uint256) public balances;
    mapping(address => uint256) public rewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event LiquidityAdded(address indexed user, uint256 amount);

    constructor(address _stakingToken, uint256 _rewardRate) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        stakingToken = IERC20(_stakingToken);
        rewardRate = _rewardRate;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + rewardRate * (block.timestamp - lastUpdateTime) * 1e18 / totalStaked;
    }

    function earned(address account) public view returns (uint256) {
        return balances[account] * (rewardPerToken() - rewardPerTokenPaid[account]) / 1e18 + rewards[account];
    }

    function updateReward(address account) internal {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] = earned(account);
            rewardPerTokenPaid[account] = rewardPerTokenStored;
        }
    }

    function stake(uint256 _amount) public nonReentrant {
        updateReward(msg.sender);
        totalStaked += _amount;
        balances[msg.sender] += _amount;
        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount) public nonReentrant {
        require(_amount <= balances[msg.sender], "Insufficient balance to unstake");
        updateReward(msg.sender);
        totalStaked -= _amount;
        balances[msg.sender] -= _amount;
        stakingToken.safeTransfer(msg.sender, _amount);
        emit Unstaked(msg.sender, _amount);
    }

    function claimReward() public nonReentrant {
        updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            stakingToken.safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }
}
