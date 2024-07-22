import React, { ReactNode, useEffect, useState } from "react";
import "./modal.css";
import { IToken } from "../swapping/TokenSelector";
import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import mockERC20ABI from "../../web3/ABI/MockERC20.json";

import factoryLiquidityPoolABI from "../../web3/ABI/FactoryLiquidityPool.json";
import liquidityPoolABI from "../../web3/ABI/LiquidityPool.json";
import { PoolCreateLiquidity } from "./PoolCreateLiquidity";

export interface IModal {
  show: boolean;
  factory_address: string;
  onClose: () => void;
}

export const CreateLiquidityModal = (props: IModal) => {
  if (!props.show) {
    return null;
  }

  const [addressA, setAdressA] = useState<string | null>(null);
  const [addressB, setAdressB] = useState<string | null>(null);

  const [tokenA, setTokenA] = useState<ethers.Contract | null>();
  const [tokenB, setTokenB] = useState<ethers.Contract | null>();

  const [factoryLiquidityPool, setFactoryLiquidityPoolB] =
    useState<ethers.Contract | null>();

  const [amountA, setAmountA] = useState(0);
  const [amountB, setAmountB] = useState(0);

  const [balanceA, setBalanceA] = useState(0);
  const [balanceB, setBalanceB] = useState(0);

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

  const getUserBalances = async () => {
    if (!addressA || !addressB) return;
    const tkA = await setupContract(addressA, mockERC20ABI);
    const formattedResultA = ethers.formatUnits(
      await tkA.balanceOf(address),
      18
    );
    const resultToTwoDecimalsA = parseFloat(formattedResultA).toFixed(2);
    setBalanceA(Number(resultToTwoDecimalsA));
    const tkB = await setupContract(addressB, mockERC20ABI);
    const formattedResultB = ethers.formatUnits(
      await tkB.balanceOf(address),
      18
    );
    const resultToTwoDecimalsB = parseFloat(formattedResultB).toFixed(2);
    setBalanceB(Number(resultToTwoDecimalsB));
  };

  const createLiquidity = async () => {
    if (!addressA || !addressB) return;
    if (!amountA || !amountB || !factoryLiquidityPool) return;
    if (amountA <= 0 || amountB <= 0) return;
    try {
      console.log(`AmountA : ${amountA}`);
      console.log(`AmountB : ${amountB}`);

      const tkA = await setupContract(addressA, mockERC20ABI);
      const tkB = await setupContract(addressB, mockERC20ABI);

      const amountAInWei = ethers.parseUnits(amountA.toString(), 18);
      const approveA = await tkA.approve(
        factoryLiquidityPool.getAddress(),
        amountAInWei
      );
      console.log(`Approving ${tkA.symbol()} for ${amountA}...`);
      await approveA.wait();
      console.log(`${tkA.symbol()} approved.`);

      const amountBInWei = ethers.parseUnits(amountB.toString(), 18);
      const approveB = await tkB.approve(
        factoryLiquidityPool.getAddress(),
        amountBInWei
      );
      console.log(`Approving ${tkB.symbol()} for ${amountA}...`);
      await approveB.wait();
      console.log(`${tkB.symbol()} approved.`);

      console.log(`AmountA in wei : ${amountAInWei}`);
      console.log(`AmountB in wei : ${amountBInWei}`);

      const newPool = await factoryLiquidityPool.createLiquidityPool(
        addressA,
        addressB,
        amountAInWei,
        amountBInWei
      );
      console.log(`Creating liquidity ...`);
      await newPool.wait();
      console.log(`Creation done`);
      alert("Add successful");
      props.onClose();
      // props.refresh();
    } catch (error: any) {
      console.error(error);
    }
  };

  const setup = async () => {
    const factory = await setupContract(
      props.factory_address,
      factoryLiquidityPoolABI
    );
    setFactoryLiquidityPoolB(factory);
  };

  useEffect(() => {
    // getUserBalances();
    setup();
  }, [props.show]);

  return (
    <>
      <div className="liquidityModal">
        <div className="liquidityModal-content">
          <PoolCreateLiquidity
            left
            amount={amountA}
            address={addressA}
            setAddress={setAdressA}
            setAmount={setAmountA}
            label={"Amount"}
          />
          <PoolCreateLiquidity
            amount={amountB}
            address={addressB}
            setAddress={setAdressB}
            setAmount={setAmountB}
            label={"Amount"}
          />
        </div>
        <div
          onClick={
            !addressA || !addressB || amountA <= 0 || amountB <= 0
              ? () => {}
              : createLiquidity
          }
          className={`add-btn ${
            !addressA || !addressB || amountA <= 0 || amountB <= 0
              ? "disabled"
              : ""
          }`}
        >
          <span>CREATE</span>
        </div>
        <div onClick={props.onClose} className="cancel-btn">
          <span>CANCEL</span>
        </div>
      </div>
    </>
  );
};
