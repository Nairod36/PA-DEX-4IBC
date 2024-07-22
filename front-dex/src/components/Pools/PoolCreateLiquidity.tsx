import { IToken } from "../swapping/TokenSelector";
import "../swapping/swapUI.css";

export interface IPoolAddLiquidity {
  label: string;
  address:string|null;
  setAddress:(address:string)=>void;
  amount: number;
  info?: string;
  left?: boolean;
  setAmount: (amount: number) => void;
}

export const PoolCreateLiquidity = (props: IPoolAddLiquidity) => {
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setAmount(Number(event.target.value));
  };
  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setAddress(event.target.value);
  };

  return (
    <>
      <div className={`swap-section ${props.left ? "left" : "right"}`}>
        <div className="input-field">
          <label>Token Address</label>
          {props.address ?
          <input
            type="text"
            value={props.address}
            onChange={handleAddress}
            placeholder="0x000..."
          />
          :          
          <input
            type="text"
            onChange={handleAddress}
            placeholder="0x000..."
          />}
        </div>
        <div className="input-field">
          <label>{props.label}</label>
          <input
            type="number"
            value={props.amount}
            onChange={handleAmount}
            placeholder="0.0"
          />
          <div className="info">{props.info}</div>
        </div>
      </div>
    </>
  );
};
