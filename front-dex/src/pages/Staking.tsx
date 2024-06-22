import React, { useState } from 'react';
import PageLayout from './PageLayout';

function Staking() {
    const [amount, setAmount] = useState('');
    const [stakeMessage, setStakeMessage] = useState('');

    const handleStake = () => {
        console.log(`Staking ${amount} tokens`);
        setStakeMessage(`You have staked ${amount} tokens.`);
        setAmount('');
    };

    return (
        <div className="page-content">
                    <PageLayout pageTitle="Stacking" desc={''} />

            <div className="container">
                <h1>Staking</h1>
                <p>Stake your tokens to earn rewards.</p>

            <h2>Stake Your Tokens</h2>
            <div>
                <label htmlFor="stakeAmount">Amount to Stake:</label>
                <input
                    type="number"
                    id="stakeAmount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                />
            </div>
            <button onClick={handleStake}>Stake Tokens</button>
            {stakeMessage && <p>{stakeMessage}</p>}
        </div>
    </div>
    );
}

export default Staking;
