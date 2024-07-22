// CoinSwapping.tsx
import React, { useState } from 'react';
import PageLayout from './PageLayout';
import { SwapUI } from '../components/swapping/SwapUI';

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
                <section style={{paddingTop:"0px"}} className="content-inner">
                    <div className="container">
                        <SwapUI factory_address='0x04a13B2C96D3D4A7EAce69C810cD6382a62Cf7d2'/>
                    </div>
                </section>
            </div>
        </>
    );
}

export default CoinSwapping;
