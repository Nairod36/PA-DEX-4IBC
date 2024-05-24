// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title AssetManager
 * @dev Contract for managing assets with roles for asset managers
 */
contract AssetManager is AccessControl {
    struct Asset {
        string name;
        address tokenAddress;
        uint256 price;
        uint256 volume;
        uint256 tradeCount;
    }

    bytes32 public constant ASSET_MANAGER_ROLE = keccak256("ASSET_MANAGER_ROLE");
    Asset[] public assets;

    /**
     * @dev Emitted when a new asset is added.
     * @param assetId The ID of the asset.
     * @param name The name of the asset.
     * @param tokenAddress The address of the token associated with the asset.
     * @param price The initial price of the asset.
     */
    event AssetAdded(uint256 indexed assetId, string name, address tokenAddress, uint256 price);

    /**
     * @dev Emitted when an asset is updated.
     * @param assetId The ID of the asset.
     * @param price The updated price of the asset.
     * @param volume The updated volume of the asset.
     * @param tradeCount The updated trade count of the asset.
     */
    event AssetUpdated(uint256 indexed assetId, uint256 price, uint256 volume, uint256 tradeCount);

    /**
     * @dev Constructor that grants the contract deployer the default admin role and asset manager role.
     */
    constructor() {
        // Grant the contract deployer the default admin role: they can manage other roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        // Grant the asset manager role to the deployer
        _grantRole(ASSET_MANAGER_ROLE, msg.sender);
    }

    /**
     * @dev Adds a new asset. Can only be called by an account with the ASSET_MANAGER_ROLE.
     * @param name The name of the asset.
     * @param tokenAddress The address of the token associated with the asset.
     * @param price The initial price of the asset.
     */
    function addAsset(string memory name, address tokenAddress, uint256 price) public onlyRole(ASSET_MANAGER_ROLE) {
        assets.push(Asset(name, tokenAddress, price, 0, 0));
        emit AssetAdded(assets.length - 1, name, tokenAddress, price);
    }

    /**
     * @dev Updates an existing asset. Can only be called by an account with the ASSET_MANAGER_ROLE.
     * @param assetId The ID of the asset.
     * @param price The updated price of the asset.
     * @param volume The updated volume of the asset.
     * @param tradeCount The updated trade count of the asset.
     */
    function updateAsset(uint256 assetId, uint256 price, uint256 volume, uint256 tradeCount) public onlyRole(ASSET_MANAGER_ROLE) {
        require(assetId < assets.length, "Invalid asset ID");
        Asset storage asset = assets[assetId];
        asset.price = price;
        asset.volume = volume;
        asset.tradeCount = tradeCount;
        emit AssetUpdated(assetId, price, volume, tradeCount);
    }

    /**
     * @dev Returns the details of an asset.
     * @param assetId The ID of the asset.
     * @return The asset details.
     */
    function getAsset(uint256 assetId) public view returns (Asset memory) {
        require(assetId < assets.length, "Invalid asset ID");
        return assets[assetId];
    }

    /**
     * @dev Grants the ASSET_MANAGER_ROLE to an account. Can only be called by an account with the DEFAULT_ADMIN_ROLE.
     * @param account The account to grant the role to.
     */
    function grantAssetManager(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ASSET_MANAGER_ROLE, account);
    }

    /**
     * @dev Revokes the ASSET_MANAGER_ROLE from an account. Can only be called by an account with the DEFAULT_ADMIN_ROLE.
     * @param account The account to revoke the role from.
     */
    function revokeAssetManager(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(ASSET_MANAGER_ROLE, account);
    }
}
