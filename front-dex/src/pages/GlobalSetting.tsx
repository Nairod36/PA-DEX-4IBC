import React, { useState } from 'react';

function AdminSettings() {
    const [fees, setFees] = useState<number>(0);
    const [banAddress, setBanAddress] = useState<string>('');
    const [assetAmount, setAssetAmount] = useState<number>(0);

    const handleFeesUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Updating platform fees to: ${fees}%`);
    };

    const handleBanUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Banning user with address: ${banAddress}`);
    };

    const handleDonateAssets = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Donating assets amount: ${assetAmount}`);
    };

    return (
        <div>
            <form onSubmit={handleFeesUpdate}>
                <label>Set Platform Fees (%):</label>
                <input type="number" value={fees} onChange={(e) => setFees(Number(e.target.value))} />
                <button type="submit">Update Fees</button>
            </form>

            <form onSubmit={handleBanUser}>
                <label>Ban Address:</label>
                <input type="text" value={banAddress} onChange={(e) => setBanAddress(e.target.value)} />
                <button type="submit">Ban User</button>
            </form>

            <form onSubmit={handleDonateAssets}>
                <label>Donate Assets Amount:</label>
                <input type="number" value={assetAmount} onChange={(e) => setAssetAmount(Number(e.target.value))} />
                <button type="submit">Donate</button>
            </form>
        </div>
    );
}

export default AdminSettings;
