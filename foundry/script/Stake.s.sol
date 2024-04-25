// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryStakingPool.sol";
import "../src/StakingPool.sol";
import "../test/mocks/MockERC20.sol";

// forge script script/Swap.s.sol:Swap --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY

contract Swap is Script {
    function run() external {
        vm.startBroadcast();

        address factoryAddress = vm.envAddress("FACTORY_S");

        FactoryStakingPool factory = FactoryStakingPool(factoryAddress);
        
        bytes32 id = factory.getStakeId(tokenA);

        StakingPool pool = factory.getStake(id);

        MockERC20 tokenERCA = MockERC20(tokenA);

        tokenERCA.approve(address(pool),250);

        pool.stake(250);

        vm.stopBroadcast();
    }
}
