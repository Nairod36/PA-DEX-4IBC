// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryLiquidityPool.sol";
import "../test/mocks/MockERC20.sol";

// forge script script/MintTokens.s.sol:MintTokens --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY


contract MintTokens is Script {
    function run() external {
        vm.startBroadcast();

        address to = vm.envAddress("USER_ADDRESS");
        uint256 amount = 1000000*1e18;

        address tokenAddressA = vm.envAddress("TKNA");
        MockERC20 tokenA = MockERC20(tokenAddressA);
        tokenA.mint(to, amount);

        address tokenAddressB = vm.envAddress("TKNB");
        MockERC20 tokenB = MockERC20(tokenAddressB);
        tokenB.mint(to, amount);

        address tokenAddressSDX = vm.envAddress("SDX");
        MockERC20 tokenSDX = MockERC20(tokenAddressSDX);
        tokenSDX.mint(to, amount);

        vm.stopBroadcast();
    }
}