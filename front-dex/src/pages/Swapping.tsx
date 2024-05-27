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
                            nameA='TokenA'
                            nameB='TokenB'
                            addressA="0x822E1c8eF3f6741893931bBE9C19B01537f3E946"
                            logoA='./sampleCoin.png'
                            triA='TKA'
                            logoB='./sampleCoin.png'
                            triB='TKB'
                            factory="0x11749D3838ED9456E299E724bCD47504cdcd955b"
                            addressB="0x892da913F2095E43e2010F2fc5fD3FE9014cE832"
                        />
                    </div>
                </section>
            </div>
        </>
    );
}

export default CoinSwapping;
