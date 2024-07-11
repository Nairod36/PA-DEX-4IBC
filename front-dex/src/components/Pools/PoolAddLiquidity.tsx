import { IToken } from "../swapping/TokenSelector";
import "../swapping/swapUI.css";

export interface IPoolAddLiquidity {
  token: IToken;
  label: string;
  amount: number;
  info?: string;
  left?: boolean;
  setAmount: (amount: number) => void;
}

export const PoolAddLiquidity = (props: IPoolAddLiquidity) => {
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setAmount(Number(event.target.value));
  };

  return (
    <>
      <div className={`swap-section ${props.left ? "left" : "right"}`}>
        <div className="token-select">
          <div className="selected-token">
            <img
              src={props.token.logo ?? "./sampleCoin.png"}
              alt={props.token.name}
              className="token-logo"
            />
            <span className="token-label">{props.token.name}</span>
            <span className="token-symbol">/{props.token.symbol}</span>
          </div>
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
