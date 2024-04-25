// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryStakingPool.sol";
import "../test/mocks/MockERC20.sol";

// forge script script/CreateStakingPool.s.sol:CreateStakingPool --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY

contract CreateStakingPool is Script {
    function run() external {
        vm.startBroadcast();

        address factoryAddress = vm.envAddress("FACTORY_S");
        address tokenA = vm.envAddress("TKNA");

        FactoryStakingPool factory = FactoryStakingPool(factoryAddress);
        factory.createStakingPool(tokenA, 10000);

        vm.stopBroadcast();
    }
}
