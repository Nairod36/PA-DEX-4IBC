// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LiquidityPool.sol";

contract FactoryLiquidityPool {
    // Mapping of all created pools
    mapping(bytes32 => LiquidityPool) public pools;
    bytes32[] private poolIds;

    event PoolCreated(LiquidityPool indexed newPool);

    /**
     * @notice Creates a new liquidity pool for the given token pair
     * @param _tokenA The address of token A
     * @param _tokenB The address of token B
     */
    function createLiquidityPool(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) public {
        bytes32 poolId = getPoolId(_tokenA, _tokenB);
        require(address(pools[poolId]) == address(0), "Pool already exists");
        LiquidityPool newPool = new LiquidityPool(_tokenA, _tokenB, _amountA, _amountB);
        require(IERC20(_tokenA).transferFrom(msg.sender, address(newPool),_amountA), "Transfer of TokenA Token failed");
        require(IERC20(_tokenB).transferFrom(msg.sender, address(newPool),_amountB), "Transfer of TokenB Token failed");
        pools[poolId] = newPool;
        poolIds.push(poolId);
        emit PoolCreated(newPool);
    }

    /**
     * @notice Generates a unique pool ID based on the addresses of the token pair
     * @param tokenA The address of token A
     * @param tokenB The address of token B
     * @return The unique pool ID
     */
    function getPoolId(address tokenA, address tokenB) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(tokenA, tokenB));
    }

    /**
     * @notice Returns the liquidity pool for a given pool ID
     * @param _id The ID of the liquidity pool
     * @return The liquidity pool corresponding to the given ID
     */
    function getPool(bytes32 _id) public view returns (LiquidityPool) {
        return pools[_id];
    }

    /**
     * @notice Returns all pool addresses
     * @return An array of all pool addresses
     */
    function getAllPools() public view returns (address[] memory) {
        address[] memory poolAddresses = new address[](poolIds.length);
        for (uint256 i = 0; i < poolIds.length; i++) {
            poolAddresses[i] = address(pools[poolIds[i]]);
        }
        return poolAddresses;
    }
}
