import React, { useState } from 'react';
import Web3 from 'web3';

const App3: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        await window.ethereum.enable(); // Request access
        setWeb3(web3Instance);
      } catch (error) {
        console.error("User denied wallet access");
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default App3;
