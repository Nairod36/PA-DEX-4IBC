// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryLiquidityPool.sol";
import "../src/LiquidityPool.sol";
import "../src/MockERC20.sol";

// forge script script/Swap.s.sol:Swap --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY --legacy

contract Swap is Script {

    // To avoid coverage
    function testA() public {}

    function run() external {
        vm.startBroadcast();

        address factoryAddress = vm.envAddress("FACTORY");
        address tokenA = vm.envAddress("TKNA");
        address tokenB = vm.envAddress("TKNB");

        FactoryLiquidityPool factory = FactoryLiquidityPool(factoryAddress);
        
        bytes32 id = factory.getPoolId(tokenA,tokenB);

        LiquidityPool pool = factory.getPool(id);

        MockERC20 tokenERCA = MockERC20(tokenA);

        tokenERCA.approve(address(pool),28960000000000000000);

        pool.swap(tokenA,28960000000000000000);

        vm.stopBroadcast();
    }
}
