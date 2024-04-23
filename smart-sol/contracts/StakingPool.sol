// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/Math.sol";

contract StakingPool is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using Math for uint256;

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 rewardDebt;
    }

    bytes32 public constant STAKER_ROLE = keccak256("STAKER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    IERC20 public rewardsToken;
    IERC20 public stakingToken;

    uint256 public rewardRate;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    uint256 public rewardsDuration;

    uint256 private _totalSupply;

    mapping(address => Stake) public stakes;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(address _stakingToken, address _rewardsToken, uint256 _totalReward, uint256 _rewardsDuration) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);

        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
        rewardsDuration = _rewardsDuration;
        rewardRate = _totalReward / _rewardsDuration;

        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    function setRewardsDuration(uint256 _newDuration) public onlyRole(ADMIN_ROLE) {
        require(_newDuration > 0, "Rewards duration must be positive");
        rewardsDuration = _newDuration;
        rewardRate = rewardsToken.balanceOf(address(this)) / rewardsDuration; // Assuming all tokens are already deposited
    }

    function stake(uint256 amount) public nonReentrant onlyRole(STAKER_ROLE) {
    updateReward(msg.sender);

        if (amount > 0) {
            stakingToken.safeTransferFrom(msg.sender, address(this), amount);

            // Correct handling of tryAdd
            (bool successTotal, uint256 newTotalSupply) = _totalSupply.tryAdd(amount);
            require(successTotal, "Overflow in total supply");

            (bool successStake, uint256 newStakeAmount) = stakes[msg.sender].amount.tryAdd(amount);
            require(successStake, "Overflow in stake amount");

            _totalSupply = newTotalSupply;
            stakes[msg.sender].amount = newStakeAmount;

            emit Staked(msg.sender, amount);
        }
    }


   function withdraw(uint256 amount) public nonReentrant onlyRole(STAKER_ROLE) {
    require(amount <= stakes[msg.sender].amount, "Cannot withdraw more than staked");
    updateReward(msg.sender);

        if (amount > 0) {
            (bool successStake, uint256 newStakeAmount) = stakes[msg.sender].amount.trySub(amount);
            require(successStake, "Underflow in stake amount");

            (bool successTotal, uint256 newTotalSupply) = _totalSupply.trySub(amount);
            require(successTotal, "Underflow in total supply");

            stakes[msg.sender].amount = newStakeAmount;
            _totalSupply = newTotalSupply;

            stakingToken.safeTransfer(msg.sender, amount);
            emit Withdrawn(msg.sender, amount);
        }
    }


    function getReward() public nonReentrant onlyRole(STAKER_ROLE) {
        updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardsToken.safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    function updateReward(address account) internal {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        if (account != address(0)) {
            rewards[account] = earned(account);
            stakes[account].rewardDebt = rewardPerTokenStored;
        }
    }

    function rewardPerToken() public view returns (uint256) {
        if (_totalSupply == 0) {
            return 0;
        }
        uint256 timeElapsed = block.timestamp - lastUpdateTime;
        (bool mulSuccess, uint256 multiplied) = rewardRate.tryMul(timeElapsed);
        (bool divSuccess, uint256 divided) = multiplied.tryDiv(_totalSupply);
        return rewardPerTokenStored + (divSuccess ? divided : 0);
    }

    function earned(address account) public view returns (uint256) {
        uint256 currentRewardPerToken = rewardPerToken();
        uint256 rewardDelta = currentRewardPerToken - stakes[account].rewardDebt;

        // Utilisation sécurisée de la multiplication et de la division
        (bool mulSuccess, uint256 multiplied) = stakes[account].amount.tryMul(rewardDelta);
        require(mulSuccess, "Multiplication overflow");

        (bool divSuccess, uint256 rewardsEarned) = multiplied.tryDiv(1e18);
        require(divSuccess, "Division by zero");

        uint256 totalRewards = rewardsEarned + rewards[account];
        return totalRewards;
    }

}

