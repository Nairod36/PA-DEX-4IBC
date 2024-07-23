import { ethers } from "ethers";

import factoryStakingPoolABI from "../../web3/ABI/FactoryStakingPool.json";
import stakingPoolABI from "../../web3/ABI/StakingPool.json";
import mockERC20ABI from "../../web3/ABI/MockERC20.json";
import { useEffect, useState } from "react";
import { CoinService } from "../../services";
import { PoolItem } from "./PoolItem";

export interface IPoolsList {
  address: string;
}

interface IToken {
  address: string;
  name: string;
  symbol: string;
  logo: string;
}

export interface IPair {
  tokenA: IToken;
  tokenB: IToken;
}

export const PoolsList = (props: IPoolsList) => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tokens, setTokens] = useState<IToken[]>([])

  async function setupContract(
    contractAddress: string,
    contractABI: any[]
  ): Promise<ethers.Contract> {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  const getTokens = async () => {
    const factory = await setupContract(props.address, factoryStakingPoolABI);
    const pools = await factory.getAllPools();
    const newTokens:IToken[] = []

    for (const poolAddress of pools) {
      const pool = await setupContract(poolAddress, stakingPoolABI);

      const tk = await pool.stakingToken();
      // await pool.updateReward()
      const contract = await setupContract(tk, mockERC20ABI);
      const id = (await CoinService.getTokenIdByAddress(tk)) ?? null;
      const logo = id ? await CoinService.getTokenLogoById(id) : null;
      const name = await contract.name();
      const symbol = await contract.symbol();

      const token: IToken = {
        address: tk,
        name: name,
        symbol: symbol,
        logo: logo,
      };
      newTokens.push(token)
    }

    return newTokens;
  };

  const updatePools = async () => {
    const newTokens = await getTokens();
    setTokens(newTokens);
    console.log(newTokens)
    setLoading(false)
  };

  const handleCreateLiquidity = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    updatePools();
  }, []);

  return (
    <>
      {loading && <p>Loading</p>}
      {tokens.length > 0 && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Token</th>
                <th>Volume</th>
                <th>Change</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <PoolItem factory_address={props.address} token={token} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
