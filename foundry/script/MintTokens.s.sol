// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryLiquidityPool.sol";
import "../test/mocks/MockERC20.sol";

// forge script script/MintTokens.s.sol:MintTokens --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY


contract MintTokens is Script {
    function run() external {
        vm.startBroadcast();

        address tokenAddress = vm.envAddress("TKNB");
        address to = vm.envAddress("USER_ADDRESS");
        uint256 amount = 1000000*1e18;

        MockERC20 token = MockERC20(tokenAddress);
        token.mint(to, amount);

        vm.stopBroadcast();
    }
}