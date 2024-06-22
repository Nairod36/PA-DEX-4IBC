import { useEffect, useRef, useState } from "react";
import { IToken, TokenSelector } from "./TokenSelector";
import { CoinService } from "../../services";
import { ethers } from "ethers";

import factoryLiquidityPoolABI from "../../web3/ABI/FactoryLiquidityPool.json";
import liquidityPoolABI from "../../web3/ABI/LiquidityPool.json";
import mockERC20ABI from "../../web3/ABI/MockERC20.json";
import { SwapCardV2 } from "./SwapCardV2";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useAccount, useWalletClient } from "wagmi";

export interface ISwap {
  factory_address: string;
}

export const SwapUI = (props: ISwap) => {
  const [userBalance, setUserBalance] = useState<number>(0);
  const [tokenList, setTokenList] = useState<IToken[]>([]);
  const [tokenIn, setTokenIn] = useState<IToken | undefined>();
  const [tokenOut, setTokenOut] = useState<IToken | undefined>();
  const [input, setInput] = useState<number | undefined>();
  const [output, setOutput] = useState<number | undefined>();
  const [availableTokensOut, setAvailableTokensOut] = useState<IToken[]>([]);
  const [availableTokensIn, setAvailableTokensIn] = useState<IToken[]>([]);

  const [currentLiquidityPool, setCurrentLiquidityPool] =
    useState<ethers.Contract | null>(null);
  const [token, setToken] = useState<ethers.Contract | null>(null);

  const [liquidityA, setLiquidityA] = useState(BigInt(0));
  const [liquidityB, setLiquidityB] = useState(BigInt(0));

  const [remaining, setRemaining] = useState<number | string>(0);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  async function setupContract(
    contractAddress: string,
    contractABI: any[]
  ): Promise<ethers.Contract> {
    if (!isConnected) throw new Error("Wallet not connected");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  const getTokens = async () => {
    if (!isConnected) return [];
    const factory = await setupContract(
      props.factory_address,
      factoryLiquidityPoolABI
    );
    const pools = await factory.getAllPools();
    const newTokens: IToken[] = [];

    for (const poolAddress of pools) {
      const pool = await setupContract(poolAddress, liquidityPoolABI);

      const tkA = await pool.tokenA();
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

      if (!newTokens.some((token) => token.address === tokenA.address))
        newTokens.push(tokenA);

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

      if (!newTokens.some((token) => token.address === tokenB.address))
        newTokens.push(tokenB);
    }

    return newTokens;
  };

  const updatePools = async () => {
    if (!isConnected) return;
    const newTokens = await getTokens();
    setTokenList(newTokens);
  };

  useEffect(() => {
    if (isConnected) {
      updatePools();
    }
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected) return;
    if (tokenIn) {
      const factory = async () => {
        const factoryContract = await setupContract(
          props.factory_address,
          factoryLiquidityPoolABI
        );
        const pools = await factoryContract.getAllPools();
        const tokensOut = [];
        for (const poolAddress of pools) {
          const pool = await setupContract(poolAddress, liquidityPoolABI);
          const tkA = await pool.tokenA();
          const tkB = await pool.tokenB();
          if (tkA === tokenIn.address) {
            const tokenB = tokenList.find((token) => token.address === tkB);
            if (tokenB) tokensOut.push(tokenB);
          } else if (tkB === tokenIn.address) {
            const tokenA = tokenList.find((token) => token.address === tkA);
            if (tokenA) tokensOut.push(tokenA);
          }
        }
        setAvailableTokensOut(tokensOut);
      };
      factory();
    } else {
      setAvailableTokensOut(tokenList);
    }

    // Fetch pool if both tokens are selected
    if (tokenIn && tokenOut) {
      getPair();
    }
  }, [tokenIn, tokenList, isConnected]);

  useEffect(() => {
    const updateBalance = async () => {
      const newBalance = await getBalance();
      setUserBalance(newBalance);
    };
    if (isConnected) {
      updateBalance();
    }
  }, [tokenIn, tokenList, isConnected]);

  useEffect(() => {
    if (!isConnected) return;
    if (tokenOut) {
      const factory = async () => {
        const factoryContract = await setupContract(
          props.factory_address,
          factoryLiquidityPoolABI
        );
        const pools = await factoryContract.getAllPools();
        const tokensIn = [];
        for (const poolAddress of pools) {
          const pool = await setupContract(poolAddress, liquidityPoolABI);
          const tkA = await pool.tokenA();
          const tkB = await pool.tokenB();
          if (tkA === tokenOut.address) {
            const tokenB = tokenList.find((token) => token.address === tkB);
            if (tokenB) tokensIn.push(tokenB);
          } else if (tkB === tokenOut.address) {
            const tokenA = tokenList.find((token) => token.address === tkA);
            if (tokenA) tokensIn.push(tokenA);
          }
        }
        setAvailableTokensIn(tokensIn);
      };
      factory();
    } else {
      setAvailableTokensIn(tokenList);
    }

    // Fetch pool if both tokens are selected
    if (tokenIn && tokenOut) {
      getPair();
    }
  }, [tokenOut, tokenList, isConnected]);

  const updateInput = async (newInput: number | null) => {
    if (!isConnected || !newInput) return;
    setInput(newInput);
    const inputAmount = ethers.parseUnits(newInput.toString(), 18);
    const result = await getAmount(inputAmount);
    if (result !== null) {
      const formattedResult = ethers.formatUnits(result, 18);
      const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
      setOutput(Number(resultToTwoDecimals));
    }
  };

  const getPair = async () => {
    if (!isConnected || !tokenIn || !tokenOut) return;
    const factoryLiquidityPool = await setupContract(
      props.factory_address,
      factoryLiquidityPoolABI
    );
    let poolId = await factoryLiquidityPool.getPoolId(
      tokenIn.address,
      tokenOut.address
    );
    let pool = await factoryLiquidityPool.getPool(poolId);

    // Vérifier si le pool est à l'adresse zéro
    if (pool === ethers.ZeroAddress) {
      // Inverser les adresses des tokens et réessayer
      poolId = await factoryLiquidityPool.getPoolId(
        tokenOut.address,
        tokenIn.address
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

    // Clear any existing interval
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(async () => {
      const block_number = await provider.getBlockNumber();
      const currentblock = await provider.getBlock(block_number);
      if (!currentblock) return;
      const remainingTime = 30 + currentblock?.timestamp - Date.now() / 1000;
      if (remainingTime > 0) setRemaining(remainingTime.toFixed(2));
      else {
        setRemaining("New block coming");
        setLiquidityA(await liquidityPool.liquidityA());
        setLiquidityB(await liquidityPool.liquidityB());
      }
    }, 100);
  };

  const updateOutput = async (newOutput: number | null) => {
    if (!isConnected || !newOutput) return;
    setOutput(newOutput);
    const inputAmount = ethers.parseUnits(newOutput.toString(), 18);
    const result = await getAmountReverse(inputAmount);
    if (result !== null) {
      const formattedResult = ethers.formatUnits(result, 18);
      const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
      setInput(Number(resultToTwoDecimals));
    }
  };

  const getAmount = async (_amountIn: bigint): Promise<bigint | null> => {
    if (
      !isConnected ||
      !currentLiquidityPool ||
      liquidityA <= 0 ||
      liquidityB <= 0
    )
      return null;
    const result = await currentLiquidityPool.getAmounts(
      _amountIn,
      liquidityA,
      liquidityB
    );
    if (result[1] >= 0) return result[1];
    return null;
  };

  const getAmountReverse = async (
    _amountout: bigint
  ): Promise<bigint | null> => {
    if (
      !isConnected ||
      !currentLiquidityPool ||
      liquidityA <= 0 ||
      liquidityB <= 0
    )
      return null;
    const result = await currentLiquidityPool.getAmountsReverse(
      _amountout,
      liquidityA,
      liquidityB
    );
    if (result >= 0) return result;
    return null;
  };

  const getBalance = async (): Promise<number> => {
    if (!isConnected || !tokenIn) return 0;
    const token = await setupContract(tokenIn?.address, mockERC20ABI);
    const formattedResult = ethers.formatUnits(
      await token.balanceOf(address),
      18
    );
    const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
    return Number(resultToTwoDecimals);
  };

  const getSwap = async () => {
    if (!isConnected) {
      alert("Please connect your wallet");
      return;
    }

    if (input === null || input === undefined) return;
    if (!tokenIn || !tokenOut) return;
    try {
      console.log(`Liquidity A: ${liquidityA}`);
      console.log(`Liquidity B: ${liquidityB}`);
      console.log(`Input: ${input}`);

      const inputInWei = ethers.parseUnits(input.toString(), 18);
      console.log(`Input in wei: ${inputInWei.toString()}`);

      const token = await setupContract(tokenIn.address, mockERC20ABI);
      if (!token) {
        console.error("Token is not defined");
        return;
      }
      if (!currentLiquidityPool) {
        console.error("Liquidity pool is not defined");
        return;
      }

      console.log("Approving tokens...");
      const approval = await token.approve(
        currentLiquidityPool.getAddress(),
        inputInWei
      );
      await approval.wait();
      console.log("Tokens approved");

      console.log("Swapping tokens...");
      const swap = await currentLiquidityPool.swap(tokenIn.address, inputInWei);
      await swap.wait();
      console.log("Swap successful");
      alert("Swap successful");
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

  const switchTokens = () => {
    const temp = tokenIn;
    const tempL = liquidityA;
    setTokenIn(tokenOut);
    setTokenOut(temp);
    setLiquidityA(liquidityB);
    setLiquidityB(tempL);
    updateInput(output ?? 0);
  };

  // Reference to store the interval ID
  const intervalRef = useRef<number | null>(null);

  // Cleanup interval on component unmount or token change
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null)
        window.clearInterval(intervalRef.current);
    };
  }, [tokenIn, tokenOut]);

  return (
    <>
      <div className="swap-container">
        {!isConnected && <div>Please connect your wallet to proceed.</div>}
        <div className="swapUI">
          <SwapCardV2
            token={tokenIn}
            tokens={availableTokensIn}
            info={userBalance > 0 ? `Balance : ${userBalance.toFixed(2)}` : ""}
            label="Sell"
            amount={input}
            left
            setAmount={updateInput}
            setToken={setTokenIn}
          />
          <SwapCardV2
            token={tokenOut}
            tokens={availableTokensOut}
            info={`${
              isConnected
                ? Number(remaining) > 0
                  ? remaining.toString()
                  : "New block coming"
                : ""
            }`}
            label="Buy"
            amount={output}
            setAmount={updateOutput}
            setToken={setTokenOut}
          />
          <div className="switch-btn" onClick={switchTokens}>
            <FaArrowRightArrowLeft />
          </div>
        </div>
        <div className="swap-btn" onClick={getSwap}>
          <span>SWAP</span>
        </div>
      </div>
    </>
  );
};
