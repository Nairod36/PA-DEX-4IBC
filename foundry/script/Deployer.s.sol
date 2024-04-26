// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {console} from "forge-std/Test.sol";
import "forge-std/Script.sol";
import "../src/FactoryLiquidityPool.sol";
import "../src/FactoryStakingPool.sol";
import "../test/mocks/MockERC20.sol";

// forge script script/FactoryLiquidityPool.s.sol:Deployer --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv

contract Deployer is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.envAddress("USER_ADDRESS");
        vm.startBroadcast(deployerPrivateKey);

        MockERC20 stardexToken = new MockERC20("Stardex Token", "SDX", 18);
        console.log("stardex Token address:",address(stardexToken));

        FactoryLiquidityPool factory = new FactoryLiquidityPool(address(stardexToken));
        console.log("Factory address:",address(factory));

        MockERC20 tokenA = new MockERC20("Token A", "TKA", 18);
        console.log("TokenA address:",address(tokenA));

        MockERC20 tokenB = new MockERC20("Token B", "TKB", 18);
        console.log("TokenB address:",address(tokenB));

        FactoryStakingPool factoryS = new FactoryStakingPool(deployerAddress);
        console.log("Staking Factory address:",address(factoryS));

        vm.stopBroadcast();
    }
}

