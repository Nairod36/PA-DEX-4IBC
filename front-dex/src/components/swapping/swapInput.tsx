import { useState } from "react";

export interface ISwapInput {
  nameA: string;
  TriA: string;
  logoA: string;
  nameB: string;
  TriB: string;
  logoB: string;
  input: number | null;
  setInput: (input: number | null) => void;
}

export const SwapInput = (props: ISwapInput) => {
  const [output, setOutput] = useState<number | null>(null);

  const handleChange = (e: any) => {
    console.log(e.target.value);
    props.setInput(e.target.value);
    fetchPrice();
  };

  const fetchPrice = () => {
    // TODO
    if (props.input === null) setOutput(null);
    else setOutput(Math.floor(Math.random() * props.input * 100) / 100);
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
          {output != null ? <span>{output}</span> : <></>}
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
