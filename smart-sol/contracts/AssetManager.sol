// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AssetManager is Ownable(address(0)) {
    struct Asset {
        string name;
        address tokenAddress;
        uint256 price;
        uint256 volume;
        uint256 tradeCount;
    }

    Asset[] public assets;

    event AssetAdded(uint256 indexed assetId, string name, address tokenAddress, uint256 price);
    event AssetUpdated(uint256 indexed assetId, uint256 price, uint256 volume, uint256 tradeCount);

    function addAsset(string memory name, address tokenAddress, uint256 price) public onlyOwner {
        assets.push(Asset(name, tokenAddress, price, 0, 0));
        emit AssetAdded(assets.length - 1, name, tokenAddress, price);
    }

    function updateAsset(uint256 assetId, uint256 price, uint256 volume, uint256 tradeCount) public onlyOwner {
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
}
