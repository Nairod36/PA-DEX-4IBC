import { ethers } from "ethers";
import { useState } from "react";

export interface ISwapInput {
  nameA: string;
  TriA: string;
  logoA: string;
  nameB: string;
  TriB: string;
  logoB: string;
  input: number | null;
  remaining:number
  setInput: (input: number | null) => void;
  getAmount: (amount:bigint) => Promise<bigint|null>;
}

export const SwapInput = (props: ISwapInput) => {
  const [output, setOutput] = useState<string | null>(null);

  const handleChange = (e: any) => {
    props.setInput(e.target.value);
    updatePrice(e.target.value);
  };

  const updatePrice = async (input:number) => {
    // TODO
    if (input === null || input == 0) setOutput(null);
    else{
      const inputAmount = ethers.parseUnits(input.toString(), 18)
      console.log(inputAmount)
      const result = await props.getAmount(inputAmount)
      console.log(result)
      if(result !== null){
        const formattedResult = ethers.formatUnits(result, 18);
      console.log(formattedResult)
      const resultToTwoDecimals = parseFloat(formattedResult).toFixed(2);
      console.log(resultToTwoDecimals)
        setOutput(resultToTwoDecimals);
      }
    }
    };

  return (
    <>
      <div
        className="swap-input"
        style={{
          width: "38rem",
          height: "18rem",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <input
          type="number"
          style={{
            border: "0",
            background: "#452f7e",
            color: "white",
            height: "100%",
            fontSize: "98px",
            fontWeight: "bold",
            textAlign: "center",
            width: "80%",
          }}
          onChange={handleChange}
        />
        <div
          style={{
            height: "100%",
            width: "20%",
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>{props.nameA}</span>
          <span className="trigram">{props.TriA}</span>
          <img style={{ marginTop: "25px" }} width={"80%"} src={props.logoA} />
        </div>
      </div>

      <div
        className="flex swap-input"
        style={{
          width: "38rem",
          height: "18rem",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            border: "0",
            background: "#452f7e",
            color: "white",
            height: "100%",
            fontSize: "98px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
        >
          {output != null ? 
          <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
          <span>{output.toString()}</span>
          <span style={{fontSize:"1.1rem", opacity:"75%"}}>{props.remaining > 0 ? props.remaining.toFixed(2) : "New block coming"}</span>
          </div>
           : 
           <></>}
        </div>
        <div
          style={{
            height: "100%",
            width: "20%",
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>{props.nameB}</span>
          <span className="trigram">{props.TriB}</span>
          <img style={{ marginTop: "25px" }} width={"80%"} src={props.logoB} />
        </div>
      </div>
    </>
  );
};
