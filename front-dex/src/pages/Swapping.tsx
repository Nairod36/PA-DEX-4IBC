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
                <section style={{paddingTop:"0px"}} className="content-inner">
                    <div className="container">
                        <CoinSwap
                            nameA='TokenA'
                            nameB='TokenB'
                            addressA="0x69c424BD90d9D5dC6ec19a46fe89A0a072dAb57c"
                            logoA='./sampleCoin.png'
                            triA='TKA'
                            logoB='./sampleCoin.png'
                            triB='TKB'
                            factory="0xA3038E1d084733019A471A01082709FBF57521BA"
                            addressB="0x80849999eb9B4c9a479f257d48A079F7A74f76c6"
                        />
                    </div>
                </section>
            </div>
        </>
    );
}

export default CoinSwapping;
