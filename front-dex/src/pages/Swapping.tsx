// CoinSwapping.tsx
import React, { useState } from 'react';
import PageLayout from './PageLayout';
import CoinSwap from '../components/swapping/swapp';

const coins = ["Bitcoin", "Ethereum", "Litecoin"];

function CoinSwapping() {
    const [fromCoin, setFromCoin] = useState(coins[0]);
    const [toCoin, setToCoin] = useState(coins[1]);
    const [amount, setAmount] = useState('');

    const handleSwap = () => {
        console.log(`Swapping ${amount} of ${fromCoin} to ${toCoin}`);
    };

    return (
        <>
            <div className="page-content">
                <PageLayout pageTitle="Coin Swapping" desc={''} />
                <section className="content-inner">
                    <div className="container">
                        <CoinSwap 
                            fromCoin={fromCoin}
                            toCoin={toCoin}
                            amount={amount}
                            onSwap={handleSwap}
                            coins={coins} 
                        />
                    </div>
                </section>
            </div>
        </>
    );
}

export default CoinSwapping;
