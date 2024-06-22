import "./swapCard.css"

export interface IToken {
    address:string;
    name:string;
    symbol:string;
    logo:string;
}

export interface ITokenSelector {
    token:IToken|undefined;
    tokens:IToken[];
    setToken: (token:IToken|undefined) => void;
}

export const TokenSelector = (props:ITokenSelector) => {

  const selectedToken = props.tokens.find(t => t.name === props.token?.name);

  const handleToken = (event:React.ChangeEvent<HTMLSelectElement>) => {
    props.setToken(props.tokens.find(e => e.name === event.target.value))
  }
    return(
        <>
            <div className="token-select">
      <div className="selected-token">
        {selectedToken ? (
          <>
            <img
              src={selectedToken.logo ?? "./sampleCoin.png"}
              alt={selectedToken.name}
              className="token-logo"
            />
            <span className="token-label">{selectedToken.name}</span>
            <span className="token-symbol">/{selectedToken.symbol}</span>
          </>
        ) : (
          <span>Select a token</span>
        )}
        <span className="dropdown-icon">▼</span>
      </div>
      <select
        value={props.token?.name}
        onChange={handleToken}
        className="hidden-select"
      >
        <option value="">Select a token</option>
        {props.tokens.map((token) => (
          <option key={token.name} value={token.name}>
            {token.name}
          </option>
        ))}
      </select>
    </div>

        </>
    )
}