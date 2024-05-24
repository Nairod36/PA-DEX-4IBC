// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title AdminManager
 * @dev Contract for managing admin-specific tasks such as setting platform fees, banning addresses, and granting assets.
 */
contract AdminManager {
    address public owner;

    /**
     * @dev Sets the contract deployer as the owner.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Modifier to check if the caller is the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Platform fee
    uint256 public platformFee;

    /**
     * @dev Sets the platform fee. Only callable by the owner.
     * @param _fee The new platform fee.
     */
    function setFees(uint256 _fee) external onlyOwner {
        platformFee = _fee;
    }

    // Mapping to track banned addresses
    mapping(address => bool) public bannedAddresses;

    /**
     * @dev Bans an address. Only callable by the owner.
     * @param _user The address to ban.
     */
    function banAddress(address _user) external onlyOwner {
        bannedAddresses[_user] = true;
    }

    /**
     * @dev Unbans an address. Only callable by the owner.
     * @param _user The address to unban.
     */
    function unbanAddress(address _user) external onlyOwner {
        bannedAddresses[_user] = false;
    }

    /**
     * @dev Grants assets to an address. Only callable by the owner.
     * @param _to The address to grant assets to.
     * @param _token The address of the ERC20 token contract.
     * @param _amount The amount of tokens to grant.
     */
    function grantAsset(address _to, address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(_to, _amount);
    }
}
