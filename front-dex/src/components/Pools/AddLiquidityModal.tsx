import React, { ReactNode, useEffect, useState } from 'react';
import './modal.css';
import { IToken } from '../swapping/TokenSelector';
import { PoolAddLiquidity } from './PoolAddLiquidity';
import { ethers } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';
import mockERC20ABI from "../../web3/ABI/MockERC20.json";

import factoryLiquidityPoolABI from "../../web3/ABI/FactoryLiquidityPool.json";
import liquidityPoolABI from "../../web3/ABI/LiquidityPool.json";

export interface IModal{
    tokenA:IToken;
    tokenB:IToken;
    factory_address:string;
    show:boolean;
    onClose:()=>void;
    refresh:()=>void;
}

export const AddLiquidityModal = (props:IModal) => {
  if (!props.show) {
    return null;
  }

  const [liquidityPool, setLiquidityPool] = useState<ethers.Contract|null>(null)

  const [amountA, setAmountA] = useState(0)
  const [amountB, setAmountB] = useState(0)

  const [balanceA,setBalanceA] = useState(0)
  const [balanceB,setBalanceB] = useState(0)

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
    const tkA = await setupContract(props.tokenA.address,mockERC20ABI)
    const formattedResultA = ethers.formatUnits(
        await tkA.balanceOf(address),
        18
      );
      const resultToTwoDecimalsA = parseFloat(formattedResultA).toFixed(2);
      setBalanceA(Number(resultToTwoDecimalsA))
    const tkB = await setupContract(props.tokenB.address,mockERC20ABI)
    const formattedResultB = ethers.formatUnits(
        await tkB.balanceOf(address),
        18
      );
      const resultToTwoDecimalsB = parseFloat(formattedResultB).toFixed(2);
      setBalanceB(Number(resultToTwoDecimalsB))
  }

  const updateAmountA = async (newAmountA:number) => {
    if (!isConnected || !newAmountA || !liquidityPool) return;
    setAmountA(newAmountA);
    const newAmountAInWei = ethers.parseUnits(newAmountA.toString(), 18);
    const result = await liquidityPool.getAmountForAdd(props.tokenA.address, newAmountAInWei);
    if (result !== null) {
      const formattedResult = ethers.formatUnits(result, 18);
      const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
      setAmountB(Number(resultToTwoDecimals));
    }
  }

  const updateAmountB = async (newAmountB:number) => {
    if (!isConnected || !newAmountB || !liquidityPool) return;
    setAmountB(newAmountB);
    const newAmountBInWei = ethers.parseUnits(newAmountB.toString(), 18);
    const result = await liquidityPool.getAmountForAdd(props.tokenB.address, newAmountBInWei);
    if (result !== null) {
      const formattedResult = ethers.formatUnits(result, 18);
      const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
      setAmountA(Number(resultToTwoDecimals));
    }
  }

  const addLiquidity = async () => {
    if(!amountA || !amountB || !liquidityPool)return
    if(amountA <= 0 || amountB <= 0) return
    try{

      console.log(`AmountA : ${amountA}`)
      console.log(`AmountB : ${amountB}`)

      const tkA = await setupContract(props.tokenA.address, mockERC20ABI)
      const tkB = await setupContract(props.tokenB.address, mockERC20ABI)
  
      const amountAInWei = ethers.parseUnits(amountA.toString(), 18);
      const approveA = await tkA.approve(liquidityPool.getAddress(),amountAInWei);
      console.log(`Approving ${props.tokenA.symbol} for ${amountA}...`)
      await approveA.wait()
      console.log(`${props.tokenA.symbol} approved.`)
  
      const amountBInWei = ethers.parseUnits(amountB.toString(), 18);
      const approveB = await tkB.approve(liquidityPool.getAddress(),amountBInWei);
      console.log(`Approving ${props.tokenB.symbol} for ${amountA}...`)
      await approveB.wait()
      console.log(`${props.tokenB.symbol} approved.`)

      console.log(`AmountA in wei : ${amountAInWei}`)
      console.log(`AmountB in wei : ${amountBInWei}`)

      const add = await liquidityPool.addLiquidity(props.tokenA.address, props.tokenB.address, amountAInWei, amountBInWei)
      console.log(`Adding liquidity ...`)
      await add.wait()
      console.log(`Add done`)
      alert("Add successful")
      props.onClose()
      props.refresh()

    }catch(error:any){
      console.error(error)
    }
  }

  const setup = async() => {    
    const factory = await setupContract(props.factory_address,factoryLiquidityPoolABI)
    const poolId = await factory.getPoolId(props.tokenA.address,props.tokenB.address)
    const pool_address = await factory.getPool(poolId)
    setLiquidityPool(await setupContract(pool_address, liquidityPoolABI)) 
  }

  useEffect(()=>{
    getUserBalances()
    setup()
  },[props.show])

  return (
    <>
      <div className="liquidityModal">
        <div className="liquidityModal-content">
            <PoolAddLiquidity amount={amountA} left token={props.tokenA} info={balanceA > 0 ? `Balance : ${balanceA.toFixed(2)}` : ""} label={'Add'} setAmount={updateAmountA}/>
            <PoolAddLiquidity amount={amountB} token={props.tokenB} info={balanceB > 0 ? `Balance : ${balanceB.toFixed(2)}` : ""} label={'Add'} setAmount={updateAmountB}/>
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
