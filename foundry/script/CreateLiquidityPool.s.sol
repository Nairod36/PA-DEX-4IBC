// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryLiquidityPool.sol";
import "../test/mocks/MockERC20.sol";

// forge script script/CreateLiquidityPool.s.sol:CreateLiquidityPool --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY

contract CreateLiquidityPool is Script {
    function run() external {
        vm.startBroadcast();

        address factoryAddress = vm.envAddress("FACTORY");
        address tokenA = vm.envAddress("TKNA");
        address tokenB = vm.envAddress("TKNB");

        FactoryLiquidityPool factory = FactoryLiquidityPool(factoryAddress);
        factory.createLiquidityPool(tokenA, tokenB);

        vm.stopBroadcast();
    }
}
