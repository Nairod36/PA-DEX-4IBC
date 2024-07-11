import { useAccount, useWalletClient } from "wagmi";
import { IPair } from "./poolsList";
import { ethers } from "ethers";

import factoryLiquidityPoolABI from "../../web3/ABI/FactoryLiquidityPool.json";
import liquidityPoolABI from "../../web3/ABI/LiquidityPool.json";
import { useEffect, useState } from "react";
import { Linechart } from "../TokenList";

import "./poolItem.css";
import { PoolClaim } from "./PoolClaim";
import { AddLiquidityModal } from "./AddLiquidityModal";

export interface IPoolItem {
  pair: IPair;
  factory_address: string;
}

export const PoolItem = (props: IPoolItem) => {
  const [ratio, setRatio] = useState("");
  const [volume, setVolume] = useState<number>(0);
  const [volumes, setVolumes] = useState<number[]>([]);
  const [userLiquidity, setUserLiquidity] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)

  const [currentLiquidityPool, setCurrentLiquidityPool] =
    useState<ethers.Contract | null>(null);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const fetchVolumes = async (): Promise<number[]> => {
    const numberOfPools = 10; // Définir combien de pools vous voulez générer
    const minLiquidity = 1000; // Valeur minimale plausible pour la somme des liquidités
    const maxLiquidity = 1000000; // Valeur maximale plausible pour la somme des liquidités

    const generateRandomLiquidity = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const volumes = [];
    for (let i = 0; i < numberOfPools; i++) {
      volumes.push(generateRandomLiquidity(minLiquidity, maxLiquidity));
    }

    return volumes;
  };

  async function setupContract(
    contractAddress: string,
    contractABI: any[]
  ): Promise<ethers.Contract> {
    if (!isConnected) throw new Error("Wallet not connected");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  const claim = async () => {
    if(!currentLiquidityPool)return;
    const claiming = await currentLiquidityPool.claimRewards()
    console.log("Claiming...")
    await claiming.wait()
    console.log("Claim success")
    alert("Claim success")
}

    const handleClaim = () => {
        claim()
    }

  const getVolume = async () => {
    const factory = await setupContract(
      props.factory_address,
      factoryLiquidityPoolABI
    );
    const poolId = await factory.getPoolId(
      props.pair.tokenA.address,
      props.pair.tokenB.address
    );
    const pool_address = await factory.getPool(poolId);
    const pool = await setupContract(pool_address, liquidityPoolABI);
    setCurrentLiquidityPool(pool)
    const liquidityA = await pool.liquidityA();
    const formattedLiquidityA = ethers.formatUnits(liquidityA, 18);
    const resultToTwoDecimalsA = parseFloat(formattedLiquidityA).toFixed(2);
    const liquidityB = await pool.liquidityB();
    const formattedLiquidityB = ethers.formatUnits(liquidityB, 18);
    const resultToTwoDecimalsB = parseFloat(formattedLiquidityB).toFixed(2);
    const diviser = Math.min(Number(liquidityA), Number(liquidityB));
    const ratioA = (Number(liquidityA) / diviser).toFixed(1);
    const ratioB = (Number(liquidityB) / diviser).toFixed(1);
    const ratio = `${ratioA}:${ratioB}`;
    const userLiquidities:bigint[] = await pool.getUserLiquidity();
    const total:number = userLiquidities.map(e=>Number(e)).reduce((ac,cu)=>(ac + cu))
    setUserLiquidity(total)
    setRatio(ratio);
    setVolume(Number(resultToTwoDecimalsA) + Number(resultToTwoDecimalsB));
    setVolumes(await fetchVolumes());
  };

  useEffect(() => {
    getVolume();
  }, []);

  const handleAddLiquidity = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <tr>
        <td></td>
        <td></td>
        <td>
          <div className="token-pair">
            <div className="token-pair-item">
              <img src={props.pair.tokenA.logo ?? "sampleCoin.png"} />
              <span className="trigram">{props.pair.tokenA.symbol}</span>
            </div>
            <span>/</span>
            <div className="token-pair-item">
              <img src={props.pair.tokenB.logo ?? "sampleCoin.png"} />
              <span className="trigram">{props.pair.tokenB.symbol}</span>
            </div>
          </div>
        </td>
        <td>{ratio}</td>
        <td>{volume.toFixed(3)}</td>
        <td>
          <Linechart data={volumes} />
        </td>
        <td>
          {userLiquidity > 0 ?
            <PoolClaim add={handleAddLiquidity} claim={handleClaim}/>
          :
          <>
            <div onClick={handleAddLiquidity} className="pool-btn">
                <span>ADD</span>
            </div>
          </>
          }
        </td>
      </tr>
      <AddLiquidityModal refresh={getVolume} factory_address={props.factory_address} tokenA={props.pair.tokenA} tokenB={props.pair.tokenB} show={showModal} onClose={closeModal}/>
    </>
  );
};
