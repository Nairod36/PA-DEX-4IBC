// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FactoryLiquidityPool.sol";
import "../src/MockERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// forge script script/CreateLiquidityPool.s.sol:CreateLiquidityPool --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --private-key $PRIVATE_KEY --legacy

contract CreateLiquidityPool is Script {

    // To avoid coverage
    function testA() public {}

    function run() external {
        vm.startBroadcast();

        address factoryAddress = vm.envAddress("FACTORY");
        address tokenA = vm.envAddress("TKNA");
        address tokenB = vm.envAddress("TKNB");
        address stardex = vm.envAddress("SDX");

        FactoryLiquidityPool factory = FactoryLiquidityPool(factoryAddress);

        // TKA / TKB
        IERC20(tokenA).approve(address(factory),1000*1e18);
        IERC20(tokenB).approve(address(factory),1000*1e18);
        factory.createLiquidityPool(tokenA, tokenB, 1000*1e18, 1000*1e18);
        
        // TKA / SDX
        IERC20(tokenA).approve(address(factory),1000*1e18);
        IERC20(stardex).approve(address(factory),1000*1e18);
        factory.createLiquidityPool(tokenA, stardex, 1000*1e18, 1000*1e18);
        
        // TKB / SDX
        IERC20(tokenB).approve(address(factory),1000*1e18);
        IERC20(stardex).approve(address(factory),1000*1e18);
        factory.createLiquidityPool(tokenB, stardex, 1000*1e18, 1000*1e18);

        vm.stopBroadcast();
    }
}
