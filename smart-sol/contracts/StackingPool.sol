// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract StakingPool is ReentrancyGuard, Ownable {
    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    // Mapping de l'adresse de l'utilisateur à son stake
    mapping(address => mapping(address => Stake)) public userStakes;

    // Événement pour le staking de tokens
    event TokenStaked(address indexed user, address token, uint256 amount);
    
    // Événement pour le retrait de tokens stakés
    event TokenUnstaked(address indexed user, address token, uint256 amount);

    // Constructeur qui initialise le propriétaire
    constructor(address initialOwner) Ownable(initialOwner) {
    }

    // Fonction pour staker des tokens
    function stakeTokens(address token, uint256 amount) public nonReentrant {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        userStakes[msg.sender][token] = Stake(amount, block.timestamp);
        emit TokenStaked(msg.sender, token, amount);
    }

    // Fonction pour retirer les tokens stakés
    function unstakeTokens(address token) public nonReentrant {
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
