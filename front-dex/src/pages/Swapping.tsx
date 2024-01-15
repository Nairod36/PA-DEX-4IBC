import React, { useState } from 'react';
import PageLayout from './PageLayout';

const coins = ["Bitcoin", "Ethereum", "Litecoin"];

function CoinSwap() {
    const [fromCoin, setFromCoin] = useState(coins[0]);
    const [toCoin, setToCoin] = useState(coins[1]);
    const [amount, setAmount] = useState('');

    const handleSwap = () => {
        // Logic to handle the swap
    };

   // Inside your CoinSwap component's return statement
return (
    <>
        <div className="page-content">
            <PageLayout pageTitle="Coin Swapping" desc={''} />
            <section className="content-inner">
                <div className="container">
                    <div className="section-head text-center">
                        <h2 className="title">Swap Your Cryptocurrency</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="coin-swap-container">
                            <select className="coin-swap-select" value={fromCoin} onChange={(e) => setFromCoin(e.target.value)}>
                                {/* options */}
                            </select>
                            <select className="coin-swap-select" value={toCoin} onChange={(e) => setToCoin(e.target.value)}>
                                {/* options */}
                            </select>
                            <input type="number" className="coin-swap-input" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <button className="swap-button" onClick={handleSwap}>Swap</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
);

}

export default CoinSwap;
