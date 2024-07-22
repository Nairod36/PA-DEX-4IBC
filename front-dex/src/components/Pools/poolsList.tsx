import { ethers } from "ethers";

import factoryLiquidityPoolABI from "../../web3/ABI/FactoryLiquidityPool.json";
import liquidityPoolABI from "../../web3/ABI/LiquidityPool.json";
import mockERC20ABI from "../../web3/ABI/MockERC20.json";
import { useEffect, useState } from "react";
import { CoinService } from "../../services";
import { PoolItem } from "./PoolItem";
import { NewPool } from "./NewPool";
import { CreateLiquidityModal } from "./CreateLiquidityModal";

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
  const [pairList, setPairList] = useState<IPair[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  async function setupContract(
    contractAddress: string,
    contractABI: any[]
  ): Promise<ethers.Contract> {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  const getPairs = async () => {
    const factory = await setupContract(props.address, factoryLiquidityPoolABI);
    const pools = await factory.getAllPools();
    const newPairs: IPair[] = [];

    for (const poolAddress of pools) {
      const pool = await setupContract(poolAddress, liquidityPoolABI);

      const tkA = await pool.tokenA();
      // await pool.updateReward()
      const contractA = await setupContract(tkA, mockERC20ABI);
      const idA = (await CoinService.getTokenIdByAddress(tkA)) ?? null;
      const logoA = idA ? await CoinService.getTokenLogoById(idA) : null;
      const nameA = await contractA.name();
      const symbolA = await contractA.symbol();

      const tokenA: IToken = {
        address: tkA,
        name: nameA,
        symbol: symbolA,
        logo: logoA,
      };

      const tkB = await pool.tokenB();
      const contractB = await setupContract(tkB, mockERC20ABI);
      const idB = (await CoinService.getTokenIdByAddress(tkB)) ?? null;
      const logoB = idB ? await CoinService.getTokenLogoById(idB) : null;
      const nameB = await contractB.name();
      const symbolB = await contractB.symbol();

      const tokenB: IToken = {
        address: tkB,
        name: nameB,
        symbol: symbolB,
        logo: logoB,
      };

      const pair: IPair = {
        tokenA,
        tokenB,
      };

      newPairs.push(pair);
    }

    return newPairs;
  };

  const updatePools = async () => {
    const newPairs = await getPairs();
    setPairList(newPairs);
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
      {pairList.length > 0 && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Pair</th>
                <th>Ratio</th>
                <th>Volume</th>
                <th>Change</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pairList.map((pair) => (
                <PoolItem factory_address={props.address} pair={pair} />
              ))}
            </tbody>
          </table>
        </>
      )}
      {!loading && (
        <table className="table" style={{borderBottomWidth:"6px"}}>
          <NewPool onclick={handleCreateLiquidity} />
        </table>
      )}
      <CreateLiquidityModal
        show={showModal}
        onClose={closeModal}
        factory_address={props.address}
      />
    </>
  );
};
