import React, { useState } from 'react';
import PageLayout from './PageLayout';
import CoinSwap from '../components/swapping/swapp';

const coins = ["Bitcoin", "Ethereum", "Litecoin"];

function CoinSwapping() {
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

                        <CoinSwap></CoinSwap>
                    
                </div>
            </section>
        </div>
    </>
);

}

export default CoinSwapping;
