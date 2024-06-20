import React, { useState } from 'react';

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
    );
}

export default Staking;
