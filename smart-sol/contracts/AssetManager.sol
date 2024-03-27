// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract AssetManager is Ownable {
    struct Asset {
        string name;
        address tokenAddress;
        uint256 price; // Ce prix pourrait être statique ou dynamique selon un oracle par exemple
        uint256 volume;
        uint256 tradeCount;
    }

    Asset[] public assets;

    // Événement pour la création et la mise à jour d'un actif
    event AssetAdded(uint256 indexed assetId, string name, address tokenAddress, uint256 price);
    event AssetUpdated(uint256 indexed assetId, uint256 price, uint256 volume, uint256 tradeCount);

    // Ajouter un nouvel actif à la liste
    function addAsset(string memory name, address tokenAddress, uint256 price) public onlyOwner {
        assets.push(Asset(name, tokenAddress, price, 0, 0));
        emit AssetAdded(assets.length - 1, name, tokenAddress, price);
    }

    // Mettre à jour les informations d'un actif existant
    function updateAsset(uint256 assetId, uint256 price, uint256 volume, uint256 tradeCount) public onlyOwner {
        require(assetId < assets.length, "Asset ID invalide");
        Asset storage asset = assets[assetId];
        asset.price = price;
        asset.volume = volume;
        asset.tradeCount = tradeCount;
        emit AssetUpdated(assetId, price, volume, tradeCount);
    }

    // Récupérer les informations d'un actif spécifique
    function getAsset(uint256 assetId) public view returns (Asset memory) {
        require(assetId < assets.length, "Asset ID invalide");
        return assets[assetId];
    }
}
