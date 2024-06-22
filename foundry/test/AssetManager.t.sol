// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AssetManager.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../src/MockERC20.sol";

contract AssetManagerTest is Test {
    AssetManager public assetManager;
    MockERC20 public mockToken;
    address public owner;
    address public assetManagerRoleUser;

    function setUp() public {
        owner = address(this);
        assetManagerRoleUser = address(0x123);
        assetManager = new AssetManager();
        mockToken = new MockERC20("Token A", "TKA", 18);

        // Grant ASSET_MANAGER_ROLE to assetManagerRoleUser
        assetManager.grantAssetManager(assetManagerRoleUser);
    }

    function testAddAsset() public {
        vm.prank(assetManagerRoleUser);
        assetManager.addAsset("TestAsset", address(mockToken), 100);

        AssetManager.Asset memory asset = assetManager.getAsset(0);
        assertEq(asset.name, "TestAsset");
        assertEq(asset.tokenAddress, address(mockToken));
        assertEq(asset.price, 100);
        assertEq(asset.volume, 0);
        assertEq(asset.tradeCount, 0);
    }

    function testUpdateAsset() public {
        vm.prank(assetManagerRoleUser);
        assetManager.addAsset("TestAsset", address(mockToken), 100);

        vm.prank(assetManagerRoleUser);
        assetManager.updateAsset(0, 200, 50, 10);

        AssetManager.Asset memory asset = assetManager.getAsset(0);
        assertEq(asset.name, "TestAsset");
        assertEq(asset.tokenAddress, address(mockToken));
        assertEq(asset.price, 200);
        assertEq(asset.volume, 50);
        assertEq(asset.tradeCount, 10);
    }

    function testOnlyAssetManagerCanAddAsset() public {
        address nonAssetManager = address(0x456);
        vm.prank(nonAssetManager);
        vm.expectRevert();
        assetManager.addAsset("TestAsset", address(mockToken), 100);
    }

    function testOnlyAssetManagerCanUpdateAsset() public {
        vm.prank(assetManagerRoleUser);
        assetManager.addAsset("TestAsset", address(mockToken), 100);

        address nonAssetManager = address(0x456);
        vm.prank(nonAssetManager);
        vm.expectRevert();
        assetManager.updateAsset(0, 200, 50, 10);
    }

    function testGrantAssetManagerRole() public {
        address newManager = address(0x789);
        assetManager.grantAssetManager(newManager);

        // Ensure the new manager has been granted the role
        assertTrue(assetManager.hasRole(assetManager.ASSET_MANAGER_ROLE(), newManager));

        vm.prank(newManager);
        assetManager.addAsset("NewAsset", address(mockToken), 150);

        AssetManager.Asset memory asset = assetManager.getAsset(1);
        assertEq(asset.name, "NewAsset");
        assertEq(asset.tokenAddress, address(mockToken));
        assertEq(asset.price, 150);
        assertEq(asset.volume, 0);
        assertEq(asset.tradeCount, 0);
    }

    function testRevokeAssetManagerRole() public {
        address managerToRevoke = assetManagerRoleUser;
        assetManager.revokeAssetManager(managerToRevoke);

        // Ensure the manager has been revoked the role
        assertFalse(assetManager.hasRole(assetManager.ASSET_MANAGER_ROLE(), managerToRevoke));

        vm.prank(managerToRevoke);
        vm.expectRevert();
        assetManager.addAsset("RevokedAsset", address(mockToken), 150);
    }
}
