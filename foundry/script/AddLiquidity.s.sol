// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryLiquidityPool.sol";
import "../src/LiquidityPool.sol";
import "../test/mocks/MockERC20.sol";

// forge script script/AddLiquidity.s.sol:AddLiquidity --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY --legacy

contract AddLiquidity is Script {
    function run() external {
        vm.startBroadcast();

        address factoryAddress = vm.envAddress("FACTORY");
        address tokenA = vm.envAddress("TKNA");
        address tokenB = vm.envAddress("TKNB");

        FactoryLiquidityPool factory = FactoryLiquidityPool(factoryAddress);
        
        bytes32 id = factory.getPoolId(tokenA,tokenB);

        LiquidityPool pool = factory.getPool(id);

        MockERC20 tokenERCA = MockERC20(tokenA);
        MockERC20 tokenERCB = MockERC20(tokenB);

        tokenERCA.approve(address(pool),500*1e18);
        tokenERCB.approve(address(pool),500*1e18);

        pool.addLiquidity(tokenA,tokenB,500*1e18,500*1e18);

        vm.stopBroadcast();
    }
}
