// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

    event AssetAdded(uint256 indexed assetId, string name, address tokenAddress, uint256 price);
    event AssetUpdated(uint256 indexed assetId, uint256 price, uint256 volume, uint256 tradeCount);

    constructor() {
        // Grant the contract deployer the default admin role: they can manage other roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        // Grant the asset manager role to the deployer
        _grantRole(ASSET_MANAGER_ROLE, msg.sender);
    }

    function addAsset(string memory name, address tokenAddress, uint256 price) public onlyRole(ASSET_MANAGER_ROLE) {
        assets.push(Asset(name, tokenAddress, price, 0, 0));
        emit AssetAdded(assets.length - 1, name, tokenAddress, price);
    }

    function updateAsset(uint256 assetId, uint256 price, uint256 volume, uint256 tradeCount) public onlyRole(ASSET_MANAGER_ROLE) {
        require(assetId < assets.length, "Asset ID invalide");
        Asset storage asset = assets[assetId];
        asset.price = price;
        asset.volume = volume;
        asset.tradeCount = tradeCount;
        emit AssetUpdated(assetId, price, volume, tradeCount);
    }

    function getAsset(uint256 assetId) public view returns (Asset memory) {
        require(assetId < assets.length, "Asset ID invalide");
        return assets[assetId];
    }

    // Functions to manage roles
    function grantAssetManager(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ASSET_MANAGER_ROLE, account);
    }

    function revokeAssetManager(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(ASSET_MANAGER_ROLE, account);
    }
}
