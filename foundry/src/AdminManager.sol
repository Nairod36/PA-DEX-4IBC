// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AdminManager {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Seul le proprietaire peut effectuer cette action");
        _;
    }

    // Définir les frais de la plateforme
    uint256 public platformFee;

    function setFees(uint256 _fee) external onlyOwner {
        platformFee = _fee;
    }

    // Mapping pour suivre les adresses bannies
    mapping(address => bool) public bannedAddresses;

    function banAddress(address _user) external onlyOwner {
        bannedAddresses[_user] = true;
    }

    function unbanAddress(address _user) external onlyOwner {
        bannedAddresses[_user] = false;
    }

    // Fonction pour donner des actifs gratuitement
    function grantAsset(address _to, address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(_to, _amount);
    }
}
