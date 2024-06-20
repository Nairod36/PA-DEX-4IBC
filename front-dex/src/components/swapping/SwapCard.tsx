import { useEffect, useState } from "react";

export interface ISwapCardInput {
  input?:number|null
  name: string;
  trigram: string;
  logo: string;
  in?: boolean;
  updateInput?: (input: number | null) => void;
  remaining?:number|string;
}

export const SwapCard = (props: ISwapCardInput) => {

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if(props.updateInput){
      props.updateInput(Number(event.target.value))
    }
  }

  return (
    <>
      <div className="swapCard">
        <div className="swapCard-title">
          <span>{props.name}</span>/
          <span className="trigram">{props.trigram}</span>
        </div>
        <div className="swapCard-input">
          <span>{props.in ? "IN:" : "OUT:"}</span>
          <div className="swapCard-input-field">
            <input
              min={0}
              value={props.input ?? 0}
              onChange={handleChange}
              type="number"
            />
            <img src={props.logo} alt="token logo" />
          </div>
          {props.remaining &&
            <div className="remaining"><i>{typeof props.remaining === 'number' ? props.remaining.toFixed(2) : props.remaining}</i></div>
          }
        </div>
      </div>
    </>
  );
};
