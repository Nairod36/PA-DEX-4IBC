// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract StakingPool is ReentrancyGuard, AccessControl {
    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    // Définition des rôles
    bytes32 public constant STAKER_ROLE = keccak256("STAKER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    mapping(address => mapping(address => Stake)) public userStakes;

    event TokenStaked(address indexed user, address token, uint256 amount);
    event TokenUnstaked(address indexed user, address token, uint256 amount);

    constructor() {
        // Grant the contract deployer the default admin role: they can grant/revoke any roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        // Grant the deployer also as ADMIN_ROLE for management
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function addStaker(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(STAKER_ROLE, account);
    }

    function removeStaker(address account) public onlyRole(ADMIN_ROLE) {
        _revokeRole(STAKER_ROLE, account);
    }

    function stakeTokens(address token, uint256 amount) public onlyRole(STAKER_ROLE) nonReentrant {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        userStakes[msg.sender][token] = Stake(amount, block.timestamp);
        emit TokenStaked(msg.sender, token, amount);
    }

    function unstakeTokens(address token) public onlyRole(STAKER_ROLE) nonReentrant {
        Stake storage stake = userStakes[msg.sender][token];
        require(block.timestamp > stake.startTime, "Staking period not yet finished");
        uint256 amount = stake.amount;
        require(amount > 0, "No tokens staked");
        
        IERC20(token).transfer(msg.sender, amount);
        emit TokenUnstaked(msg.sender, token, amount);
        
        // Réinitialiser le stake
        stake.amount = 0;
        stake.startTime = 0;
    }
}
