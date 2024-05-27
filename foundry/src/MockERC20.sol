// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol, uint8 decimals)
        ERC20(name, symbol) {
    }

    // Function to mint new tokens; only callable by the contract owner for simplicity
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    // Function to explicitly set approvals, useful for setting up test conditions
    function approve(address spender, uint256 amount) public override returns (bool) {
        return super.approve(spender, amount);
    }
}
