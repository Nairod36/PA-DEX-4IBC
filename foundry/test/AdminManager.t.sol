// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AdminManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../src/MockERC20.sol";

contract AdminManagerTest is Test {
    AdminManager public adminManager;
    MockERC20 public mockToken;
    address public owner;
    address public user;

    function setUp() public {
        owner = address(this);
        user = address(0x123);
        adminManager = new AdminManager();
        mockToken = new MockERC20("Token A", "TKA", 18);
    }

    function testSetFees() public {
        uint256 newFee = 100;
        adminManager.setFees(newFee);
        assertEq(adminManager.platformFee(), newFee);
    }

    function testBanAddress() public {
        adminManager.banAddress(user);
        assertTrue(adminManager.bannedAddresses(user));
    }

    function testUnbanAddress() public {
        adminManager.banAddress(user);
        adminManager.unbanAddress(user);
        assertFalse(adminManager.bannedAddresses(user));
    }

    function testGrantAsset() public {
        uint256 amount = 1000 * 10**18;
        mockToken.mint(address(adminManager), amount);

        adminManager.grantAsset(user, address(mockToken), amount);

        assertEq(mockToken.balanceOf(user), amount);
    }

    function testOnlyOwnerCanSetFees() public {
        address nonOwner = address(0x456);
        vm.prank(nonOwner);
        vm.expectRevert("Only the owner can perform this action");
        adminManager.setFees(100);
    }

    function testOnlyOwnerCanBanAddress() public {
        address nonOwner = address(0x456);
        vm.prank(nonOwner);
        vm.expectRevert("Only the owner can perform this action");
        adminManager.banAddress(user);
    }

    function testOnlyOwnerCanUnbanAddress() public {
        adminManager.banAddress(user);

        address nonOwner = address(0x456);
        vm.prank(nonOwner);
        vm.expectRevert("Only the owner can perform this action");
        adminManager.unbanAddress(user);
    }

    function testOnlyOwnerCanGrantAsset() public {
        uint256 amount = 1000 * 10**18;
        mockToken.mint(address(adminManager), amount);

        address nonOwner = address(0x456);
        vm.prank(nonOwner);
        vm.expectRevert("Only the owner can perform this action");
        adminManager.grantAsset(user, address(mockToken), amount);
    }
}
