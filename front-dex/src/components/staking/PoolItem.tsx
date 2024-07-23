import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

import factoryStakingPoolABI from "../../web3/ABI/FactoryStakingPool.json";
import stakingPoolABI from "../../web3/ABI/StakingPool.json";
import { useEffect, useState } from "react";
import { Linechart } from "../TokenList";

import "./poolItem.css";
import { StakeModal } from "./StakeModal";
import { IToken } from "../swapping/TokenSelector";

export interface IPoolItem {
  token: IToken;
  factory_address: string;
}

export const PoolItem = (props: IPoolItem) => {
  const [ratio, setRatio] = useState("");
  const [volume, setVolume] = useState<number>(0);
  const [volumes, setVolumes] = useState<number[]>([]);
  const [userLiquidity, setUserLiquidity] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [currentStakingPool, setCurrentStakingPool] =
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
    if (!currentStakingPool) return;
    const claiming = await currentStakingPool.claimRewards();
    console.log("Claiming...");
    await claiming.wait();
    console.log("Claim success");
    alert("Claim success");
  };

  const handleClaim = () => {
    claim();
  };

  const getVolume = async () => {
    const factory = await setupContract(
      props.factory_address,
      factoryStakingPoolABI
    );
    const poolId = await factory.getStakingId(
      props.token.address,
    );
    const pool_address = await factory.getStake(poolId);
    const pool = await setupContract(pool_address, stakingPoolABI);
    setCurrentStakingPool(pool);
    const liquidity = await pool.totalStaked();
    const formattedLiquidity = ethers.formatUnits(liquidity, 18);
    const resultToTwoDecimals = parseFloat(formattedLiquidity).toFixed(2);
    // const userLiquidities: bigint[] = await pool.getUserLiquidity();
    // const total: number = userLiquidities
    //   .map((e) => Number(e))
    //   .reduce((ac, cu) => ac + cu);
    // setUserLiquidity(total);
    setVolume(Number(resultToTwoDecimals));
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
              <img src={props.token.logo ?? "sampleCoin.png"} />
              <span className="trigram">{props.token.symbol}</span>
            </div>
          </div>
        </td>
        <td>{volume.toFixed(3)}</td>
        <td>
          <Linechart data={volumes} />
        </td>
        <td>
          <div onClick={handleAddLiquidity} className="pool-btn">
            <span>ADD</span>
          </div>
        </td>
      </tr>
      <StakeModal
        refresh={getVolume}
        factory_address={props.factory_address}
        token={props.token}
        show={showModal}
        onClose={closeModal}
      />
    </>
  );
};
