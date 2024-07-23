import React, { ReactNode, useEffect, useState } from "react";
import "./modal.css";
import { IToken } from "../swapping/TokenSelector";
import { PoolStakeLiquidity } from "./PoolStakeLiquidity";
import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import mockERC20ABI from "../../web3/ABI/MockERC20.json";

import factoryStakingPoolABI from "../../web3/ABI/FactoryStakingPool.json";
import stakingPoolABI from "../../web3/ABI/StakingPool.json";

export interface IModal {
  token: IToken;
  factory_address: string;
  show: boolean;
  onClose: () => void;
  refresh: () => void;
}

export const StakeModal = (props: IModal) => {
  if (!props.show) {
    return null;
  }

  const [stakingPool, setStakingPool] = useState<ethers.Contract | null>(null);

  const [amount, setAmount] = useState<number>();

  const [balance, setBalance] = useState(0);

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
    const tk = await setupContract(props.token.address, mockERC20ABI);
    const formattedResult = ethers.formatUnits(await tk.balanceOf(address), 18);
    const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
    setBalance(Number(resultToTwoDecimals));
  };

  const updateAmount = async (newAmount: number) => {
    if (!isConnected || !newAmount || !stakingPool) return;
    setAmount(newAmount);
  };

  const addLiquidity = async () => {
    if (!amount || !stakingPool) return;
    if (amount <= 0) return;
    try {
      console.log(`Amount : ${amount}`);

      const tk = await setupContract(props.token.address, mockERC20ABI);

      const amountInWei = ethers.parseUnits(amount.toString(), 18);
      const approve = await tk.approve(stakingPool.getAddress(), amountInWei);
      console.log(`Approving ${props.token.symbol} for ${amount}...`);
      await approve.wait();
      console.log(`${props.token.symbol} approved.`);

      console.log(`Amount in wei : ${amountInWei}`);

      const stake = await stakingPool.stake(amountInWei);
      console.log(`Staking ...`);
      await stake.wait();
      console.log(`Stake done`);
      alert("Stake successful");
      props.onClose();
      props.refresh();
    } catch (error: any) {
      console.error(error);
    }
  };

  const setup = async () => {
    const factory = await setupContract(
      props.factory_address,
      factoryStakingPoolABI
    );
    const poolId = await factory.getStakingId(props.token.address);
    const pool_address = await factory.getStake(poolId);
    setStakingPool(await setupContract(pool_address, stakingPoolABI));
  };

  useEffect(() => {
    getUserBalances();
    setup();
  }, [props.show]);

  return (
    <>
      <div className="liquidityModal">
        <div className="liquidityModal-content">
          <PoolStakeLiquidity
            amount={amount}
            token={props.token}
            info={balance > 0 ? `Balance : ${balance.toFixed(2)}` : ""}
            label={"Stake"}
            setAmount={updateAmount}
          />
        </div>
        <div onClick={addLiquidity} className="add-btn">
          <span>ADD</span>
        </div>
        <div onClick={props.onClose} className="cancel-btn">
          <span>CANCEL</span>
        </div>
      </div>
    </>
  );
};
