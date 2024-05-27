import React, { useEffect, useState } from "react";
import App3 from "../Home/web3";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { FaArrowsRotate } from "react-icons/fa6";

import factoryLiquidityPoolABI from "../../web3/ABI/FactoryLiquidityPool.json";
import liquidityPoolABI from "../../web3/ABI/LiquidityPool.json";
import mockERC20ABI from "../../web3/ABI/MockERC20.json";
import { SwapInput } from "./swapInput";

interface CoinSwapProps {
  nameA: string;
  addressA: string;
  logoA: string;
  triA: string;
  nameB: string;
  addressB: string;
  logoB: string;
  triB: string;
  factory: string;
}

export const CoinSwap = (props: CoinSwapProps) => {
  const [input, setInput] = useState<number | null>(null);
  const [tokenA, setTokenA] = useState({
    name: props.nameA,
    address: props.addressA,
    logo: props.logoA,
    tri: props.triA,
  });
  const [tokenB, setTokenB] = useState({
    name: props.nameB,
    address: props.addressB,
    logo: props.logoB,
    tri: props.triB,
  });

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  async function setupContract(
    contractAddress: string,
    contractABI: any[]
  ): Promise<ethers.Contract> {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  const getSwap = async () => {
    if (input === null) return;
    try {
        console.log(tokenA.name)
        console.log(tokenA.address)
        console.log(tokenB.name)
        console.log(tokenB.address)
      const amount = ethers.parseUnits(input.toString(), 18);
      const factoryLiquidityPool = await setupContract(
        props.factory,
        factoryLiquidityPoolABI
      );
      if (!factoryLiquidityPool) return;
      const token = await setupContract(tokenA.address, mockERC20ABI);
      if (!token) return;
      let poolId = await factoryLiquidityPool.getPoolId(
        tokenA.address,
        tokenB.address
      );
      let pool = await factoryLiquidityPool.getPool(poolId);

      // Vérifier si le pool est à l'adresse zéro
      if (pool === ethers.ZeroAddress) {
        // Inverser les adresses des tokens et réessayer
        poolId = await factoryLiquidityPool.getPoolId(
          tokenB.address,
          tokenA.address
        );
        pool = await factoryLiquidityPool.getPool(poolId);
      }

      if (pool === ethers.ZeroAddress) {
        console.error("Le pool n'existe pas pour les paires de tokens fournies.");
        return;
      }
      const liquidityPool = await setupContract(pool, liquidityPoolABI);
      if (!liquidityPool) return;
      const approval = await token.approve(pool, amount);
      await approval.wait();
      console.log(approval);
      const swap = await liquidityPool.swap(tokenA.address, amount);
      console.log(swap);
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") {
        console.error("Transaction rejetée par l'utilisateur");
        alert("Transaction rejetée par l'utilisateur.");
      } else {
        console.error("Une erreur est survenue:", error);
        alert("Une erreur est survenue lors de la transaction.");
      }
    }
  };

  const swapTokens = () => {
    const temp = { ...tokenA };
    setTokenA({ ...tokenB });
    setTokenB(temp);
  };

  return (
    <div
      className="flex min-h-screen items-start justify-center bg-[#1a1a2e] p-4"
      style={{ marginTop: "100px" }}
    >
      <div className="bg-[#16213e] rounded-2xl p-6 w-full max-w-md">
        {isConnected ? (
          <div className="space-y-6">
            <div className="flex flex-col">
              <div
                className="flex items-center justify-between bg-[#0f3460] rounded-lg px-4 py-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <SwapInput
                  input={input}
                  setInput={setInput}
                  nameA={tokenA.name}
                  nameB={tokenB.name}
                  TriA={tokenA.tri}
                  TriB={tokenB.tri}
                  logoA={tokenA.logo}
                  logoB={tokenB.logo}
                />
                {input != null ? <button onClick={getSwap}>GO</button> : <></>}
              </div>
            </div>
          </div>
        ) : (
          <div>Please connect your wallet</div>
        )}
      </div>
      <div
        onClick={swapTokens}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "white",
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "4rem",
          color: "black",
          position: "absolute",
          top: "50%",
        }}
      >
        <FaArrowsRotate />
      </div>
    </div>
  );
};

export default CoinSwap;
