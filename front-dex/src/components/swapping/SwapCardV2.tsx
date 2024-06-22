import { IToken, TokenSelector } from "./TokenSelector";
import "./swapUI.css"

export interface ISwapCardV2 {
  token: IToken | undefined;
  tokens: IToken[];
  label:string;
  amount?:number;
  info?:string;
  left?:boolean;
  setAmount:(amount:number) => void;
  setToken: (token: IToken | undefined) => void;
}

export const SwapCardV2 = (props: ISwapCardV2) => {

    const handleAmount = (event:React.ChangeEvent<HTMLInputElement>) => {
        props.setAmount(Number(event.target.value))
    }

  return (
    <>
      <div className={`swap-section ${props.left ? "left" : "right"}`}>
        <TokenSelector token={props.token} tokens={props.tokens} setToken={props.setToken} />
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
