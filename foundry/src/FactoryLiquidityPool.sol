// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LiquidityPool.sol";

contract FactoryLiquidityPool {
    // Mapping of all created pools
    mapping(bytes32 => LiquidityPool) private pools;

    event PoolCreated(LiquidityPool indexed newPool);

    address public starDexToken;

    /**
     * @notice Initializes the factory contract with the StarDex token address
     * @param _starDexToken The address of the StarDex token
     */
    constructor(address _starDexToken) {
        starDexToken = _starDexToken;
    }

    /**
     * @notice Creates a new liquidity pool for the given token pair
     * @param _tokenA The address of token A
     * @param _tokenB The address of token B
     */
    function createLiquidityPool(address _tokenA, address _tokenB) public {
        bytes32 poolId = getPoolId(_tokenA, _tokenB);
        require(address(pools[poolId]) == address(0), "Pool already exists");
        LiquidityPool newPool = new LiquidityPool(_tokenA, _tokenB, starDexToken);
        require(IERC20(starDexToken).transferFrom(msg.sender, address(newPool), 10000 * 1e18), "Transfer of StarDex Token failed");
        pools[poolId] = newPool;
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
}
