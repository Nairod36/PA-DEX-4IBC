// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryStakingPool.sol";
import "../src/StakingPool.sol";
import "../test/mocks/MockERC20.sol";

// forge script script/Claim.s.sol:Claim --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY

contract Claim is Script {
    function run() external {
        vm.startBroadcast();

        address factoryAddress = vm.envAddress("FACTORY_S");

        FactoryStakingPool factory = FactoryStakingPool(factoryAddress);
        
        bytes32 id = factory.getStakeId(tokenA);

        StakingPool pool = factory.getStake(id);

        pool.claimReward();

        vm.stopBroadcast();
    }
}
