// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Swap {
    uint256 public swapFee = 100; // 1%
    event TokenSwapped(address indexed user, address fromToken, address toToken, uint256 amount, uint256 receivedAmount);

    function setSwapFee(uint256 _swapFee) public {
        swapFee = _swapFee;
    }

    function tokenSwap(address fromToken, address toToken, uint256 amount, address user) public {
        require(IERC20(fromToken).transferFrom(user, address(this), amount), "Echec du transfert depuis l'utilisateur");

        uint256 feeAmount = (amount * swapFee) / 10000;
        uint256 receivedAmount = amount - feeAmount;

        require(IERC20(toToken).transfer(user, receivedAmount), "Echec du transfert a l'utilisateur");
        emit TokenSwapped(user, fromToken, toToken, amount, receivedAmount);
    }
}
