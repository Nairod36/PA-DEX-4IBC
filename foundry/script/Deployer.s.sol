// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {console} from "forge-std/Test.sol";
import "forge-std/Script.sol";
import "../src/FactoryLiquidityPool.sol";
import "../src/FactoryStakingPool.sol";
import "../src/MockERC20.sol";

// forge script script/Deployer.s.sol:Deployer --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --legacy --private-key $PRIVATE_KEY

contract Deployer is Script {

    // To avoid coverage
    function testA() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.envAddress("USER_ADDRESS");
        vm.startBroadcast(deployerPrivateKey);

        FactoryLiquidityPool factory = new FactoryLiquidityPool();
        console.log("Factory address:",address(factory));

        FactoryStakingPool factoryS = new FactoryStakingPool(deployerAddress);
        console.log("Staking Factory address:",address(factoryS));

        MockERC20 tokenA = new MockERC20("Token A", "TKA", 18);
        console.log("TokenA address:",address(tokenA));

        MockERC20 tokenB = new MockERC20("Token B", "TKB", 18);
        console.log("TokenB address:",address(tokenB));

        MockERC20 stardex = new MockERC20("StarDex", "SDX", 18);
        console.log("Stardex address:",address(stardex));

        vm.stopBroadcast();
    }
}

