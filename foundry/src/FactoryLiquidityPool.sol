// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LiquidityPool.sol";

contract FactoryLiquidityPool {
    // Liste de tous les pools créés
    mapping(bytes32 => LiquidityPool) private pools;

    event PoolCreated(LiquidityPool indexed newPool);

    address public starDexToken;

    constructor(address _starDexToken){
        starDexToken = _starDexToken;
    }

    function createLiquidityPool(address _tokenA, address _tokenB) public {
        bytes32 poolId = getPoolId(_tokenA, _tokenB);
        require(address(pools[poolId]) == address(0), "Pool already exists");
        LiquidityPool newPool = new LiquidityPool(_tokenA, _tokenB, starDexToken);
        require(IERC20(starDexToken).transferFrom(msg.sender, address(newPool), 10000*1e18), "Transfer of StarDex Token failed");
        pools[poolId] = newPool;
        emit PoolCreated(newPool);
    }

    function getPoolId(address tokenA, address tokenB) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(tokenA, tokenB));
    }

    function getPool(bytes32 _id) public view returns(LiquidityPool){
        return pools[_id];
    }
}
