import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { SwapCard } from "./SwapCard"

export interface ISwapAction {
    nameA: string;
    TriA: string;
    logoA: string;
    nameB: string;
    TriB: string;
    logoB: string;
    input: number | null;
    output: number | null;
    remaining:number|string
    updateInput: (input: number | null) => void;
    updateOutput: (input: number | null) => void;
    swapTokens: () => void;
    getSwap: () => void;
  }

export const SwapAction = (props:ISwapAction) => {
    return <>
    <div className="swapAction">
        <SwapCard input={props.input} updateInput={props.updateInput} in name={props.nameA} trigram={props.TriA} logo={props.logoA}/>
        <SwapCard input={props.output} remaining={props.remaining} updateInput={props.updateOutput} name={props.nameB} trigram={props.TriB} logo={props.logoB}/>
        <div onClick={props.swapTokens} className="swapAction-change-btn"><FaArrowRightArrowLeft /></div>
        <div onClick={props.getSwap} className="swapAction-swap-btn"><span>SWAP</span></div>
    </div>
    </>
}