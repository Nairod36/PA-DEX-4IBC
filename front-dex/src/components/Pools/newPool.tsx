import React, { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

import factoryLiquidityPoolABI from "../../web3/ABI/FactoryLiquidityPool.json";
import liquidityPoolABI from "../../web3/ABI/LiquidityPool.json";
import mockERC20ABI from "../../web3/ABI/MockERC20.json";

interface INewPool {
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

export const NewPool = (props: INewPool) => {
  const [input, setInput] = useState<number | null>(null);
  const [output, setOutput] = useState<number | null>(null);
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

  const [currentLiquidityPool, setCurrentLiquidityPool] =
    useState<ethers.Contract | null>(null);
  const [tkA, setTKA] = useState<ethers.Contract | null>(null);
  const [tkB, setTKB] = useState<ethers.Contract | null>(null);

  const [liquidityA, setLiquidityA] = useState(BigInt(0));
  const [liquidityB, setLiquidityB] = useState(BigInt(0));

  const [remaining, setRemaining] = useState<number|string>(0);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const updateInput = async (newInput: number | null) => {
    if (newInput) {
      setInput(newInput);
      const inputAmount = ethers.parseUnits(newInput.toString(), 18);
      const result = await getAmount(inputAmount);
      if (result !== null) {
        const formattedResult = ethers.formatUnits(result, 18);
        const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
        setOutput(Number(resultToTwoDecimals));
      }
    }
  };

  const updateOutput = async (newOutput: number | null) => {
    if (newOutput) {
      setOutput(newOutput);
      const inputAmount = ethers.parseUnits(newOutput.toString(), 18);
      const result = await getAmountReverse(inputAmount);
      if (result !== null) {
        const formattedResult = ethers.formatUnits(result, 18);
        const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
        setInput(Number(resultToTwoDecimals));
      }
    }
  };

  async function setupContract(
    contractAddress: string,
    contractABI: any[]
  ): Promise<ethers.Contract> {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  const getPear = async () => {
    const currentTokenA = await setupContract(tokenA.address, mockERC20ABI);
    const currentTokenB = await setupContract(tokenB.address, mockERC20ABI);
    setTKA(currentTokenA);
    setTKB(currentTokenB);
    const factoryLiquidityPool = await setupContract(
      props.factory,
      factoryLiquidityPoolABI
    );
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
    setCurrentLiquidityPool(liquidityPool);
    setLiquidityA(await liquidityPool.liquidityA());
    setLiquidityB(await liquidityPool.liquidityB());
    const provider = new ethers.BrowserProvider(window.ethereum);
    setInterval(async () => {
      const block_number = await provider.getBlockNumber();
      const currentblock = await provider.getBlock(block_number);
      if (!currentblock) return;
      const remainingTime = 30 + currentblock?.timestamp - Date.now() / 1000;
      if (remainingTime > 0) setRemaining(remainingTime);
      else {
        setRemaining("New block coming");
        setLiquidityA(await liquidityPool.liquidityA());
        setLiquidityB(await liquidityPool.liquidityB());
      }
    }, 100);
  };

  const getAmount = async (_amountIn: bigint): Promise<bigint | null> => {
    if (!currentLiquidityPool || liquidityA <= 0 || liquidityB <= 0)
      return null;
    const newLiquidityA = liquidityA + _amountIn
    const newLiquidityB = (liquidityB * newLiquidityA) / liquidityA 
    const _output = newLiquidityB - liquidityB
    if (_output >= 0) return _output;
    return null;
  };

  const getAmountReverse = async (_amountout: bigint): Promise<bigint | null> => {
    if (!currentLiquidityPool || liquidityA <= 0 || liquidityB <= 0)
      return null;
    const newLiquidityB = liquidityB + _amountout
    const newLiquidityA = (liquidityA * newLiquidityB) / liquidityB 
    const _output = newLiquidityA - liquidityA
    if (_output >= 0) return _output;
    return null;
  };

  const addCoin = async () => {
    if (input === null) return;
    if (output === null) return;
    try {
        console.log(liquidityA)
        console.log(liquidityB)
        console.log(input)
        console.log(output)
      if (!tkA) return;
      if (!tkB) return;
      if (!currentLiquidityPool) return;

      const inputInWei = ethers.parseUnits(input.toString(), 18);
        const outputInWei = ethers.parseUnits(output.toString(), 18);

      const approvalA = await tkA.approve(
        currentLiquidityPool.getAddress(),
        inputInWei
      );
      await approvalA.wait();
      const approvalB = await tkB.approve(
        currentLiquidityPool.getAddress(),
        outputInWei
      );
      await approvalB.wait();
      const add = await currentLiquidityPool.addLiquidity(tokenA.address, tokenB.address, inputInWei, outputInWei);
      console.log(liquidityA)
      console.log(liquidityB)
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

  useEffect(() => {
    if (isConnected) getPear();
  }, [isConnected]);

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
              </div>
            </div>
          </div>
        ) : (
          <div>Please connect your wallet</div>
        )}
      </div>
    </div>
  );
};
