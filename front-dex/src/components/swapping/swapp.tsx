import React, { useState } from 'react';
import App3 from '../Home/web3';

interface CoinSwapProps {
    fromCoin: string;
    toCoin: string;
    amount: string;
    onSwap: () => void; 
    coins: string[];
}

const CoinSwap: React.FC<CoinSwapProps> = ({ fromCoin, toCoin, amount, onSwap, coins }) => {
    const [receiveToken, setReceiveToken] = useState<string>(toCoin);
    const [payToken, setPayToken] = useState<string>(fromCoin);
    const [payAmount, setPayAmount] = useState<string>(''); 
    const [receiveAmount, setReceiveAmount] = useState<string>('');



    return (
        <div className="flex min-h-screen items-start justify-center bg-[#1a1a2e] p-4" style={{ marginTop: '100px' }}>
            <div className="bg-[#16213e] rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between mb-6">
                    <button className="bg-violet  text-white rounded-lg px-4 py-1">Échanger</button>
                    <button className="bg-violet  text-[#e94560] text-white rounded-lg px-4 py-1">Acheter</button>
                </div>
                <div className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-[#e94560] mb-2">Vous payez</label>
                        <div className="flex items-center justify-between bg-[#0f3460] rounded-lg px-4 py-3">
                            <input 
                                type="number"
                                value={payAmount}
                                onChange={(e) => setPayAmount(e.target.value)}
                                className="bg-violet text-white rounded-lg mr-2"
                                placeholder="Quantité"
                                style={{ width: '15%' }}

                            />

                            <select 
                                value={payToken} 
                                onChange={(e) => setPayToken(e.target.value)} 
                                className="bg-violet text-white rounded-lg"
                                style={{ width: '30%' }}
                            >
                                  {coins.map((coin, index) => (
                                    <option key={index} value={coin}>{coin}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#e94560] mb-2">Vous avez reçu</label>
                        <div className="flex items-center justify-between bg-[#0f3460] rounded-lg px-4 py-3">
                            <input 
                                type="number"
                                value={receiveAmount}
                                onChange={(e) => setReceiveAmount(e.target.value)}
                                className="bg-violet text-white rounded-lg mr-2"
                                placeholder="Quantité"
                                style={{ width: '15%' }}
                            />
                            <select 
                                value={receiveToken} 
                                onChange={(e) => setReceiveToken(e.target.value)} 
                                className="bg-violet text-white rounded-lg"
                                style={{ width: '30%' }}
                            >
                               {coins.map((coin, index) => (
                                    <option key={index} value={coin}>{coin}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <App3/>
                    
                </div>
            </div>
        </div>
    );
};

export default CoinSwap;
