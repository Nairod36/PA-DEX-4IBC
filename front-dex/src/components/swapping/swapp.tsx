import React, { useState } from 'react';
import App3 from '../Home/web3';

const CoinSwap: React.FC = () => {
    const [payToken, setPayToken] = useState<string>('eth');
    const [receiveToken, setReceiveToken] = useState<string>('usdt');

    return (
        <div className="flex min-h-screen items-start justify-center bg-[#1a1a2e] p-4" style={{ marginTop: '100px' }}>
            <div className="bg-[#16213e] rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between mb-6">
                    <button className="bg-[#e94560] text-white rounded-lg px-4 py-1">Échanger</button>
                    <button className="text-[#e94560] rounded-lg px-4 py-1">Acheter</button>
                </div>
                <div className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-[#e94560] mb-2">Vous payez</label>
                        <div className="flex items-center justify-between bg-[#0f3460] rounded-lg px-4 py-3">
                            <select 
                                value={payToken} 
                                onChange={(e) => setPayToken(e.target.value)} 
                                className="bg-[#16213e] text-white rounded-lg"
                            >
                                <option value="eth">ETH</option>
                                <option value="btc">BTC</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#e94560] mb-2">Vous avez reçu</label>
                        <div className="flex items-center justify-between bg-[#0f3460] rounded-lg px-4 py-3">
                            <select 
                                value={receiveToken} 
                                onChange={(e) => setReceiveToken(e.target.value)} 
                                className="bg-[#16213e] text-white rounded-lg"
                            >
                                <option value="usdt">USDT</option>
                                <option value="dai">DAI</option>
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
