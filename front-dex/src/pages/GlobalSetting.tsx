import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AdminManagerABI from '../web3/ABI/AdminManager.json'; // Importez l'ABI du contrat

function AdminSettings() {
    const [fees, setFees] = useState<number>(0);
    const [banAddress, setBanAddress] = useState<string>('');
    const [assetAddress, setAssetAddress] = useState<string>(''); // Add asset address for donation
    const [assetAmount, setAssetAmount] = useState<number>(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const contractAddress = '0xb2E8Aa1D2Ad719d23AD6f697741Aa052bD624F47'; // Adresse TODO
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const init = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, AdminManagerABI, await signer);
            const admin = await contract.owner();

            setSigner(await signer);
            setContract(contract);

            const userAddress = await (await signer).getAddress();
            if (userAddress.toLowerCase() === admin.toLowerCase()) {
                setIsAdmin(true);
            }
        };

        if (window.ethereum) {
            init();
        } else {
            alert('Please install MetaMask!');
        }
    }, []);

    const handleFeesUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isAdmin) {
            alert('You do not have permission to update fees.');
            return;
        }

        if (!contract) {
            console.error('Contract not initialized');
            return;
        }

        try {
            const tx = await contract.setFees(ethers.parseUnits(fees.toString(), 'ether'));
            await tx.wait();
            alert('Fees updated successfully');
        } catch (error) {
            console.error('Failed to update fees:', error);
            alert('Failed to update fees');
        }
    };

    const handleBanUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Banning user with address: ${banAddress}`);

        if (!contract) {
            console.error('Contract not initialized');
            return;
        }
        
        try {
            const tx = await contract.banAddress(banAddress);
            await tx.wait();
            alert('User banned successfully');
            setBanAddress('');
        } catch (error) {
            console.error('Error banning user:', error);
            alert('An error occurred while banning the user');
        }
    };

    const handleUnbanUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Unbanning user with address: ${banAddress}`);

        if (!contract) {
            console.error('Contract not initialized');
            return;
        }
        
        try {
            const tx = await contract.unbanAddress(banAddress);
            await tx.wait();
            alert('User unbanned successfully');
            setBanAddress('');
        } catch (error) {
            console.error('Error unbanning user:', error);
            alert('An error occurred while unbanning the user');
        }
    };

    const handleDonateAssets = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Donating assets amount: ${assetAmount} to ${assetAddress}`);

        if (!contract) {
            console.error('Contract not initialized');
            return;
        }
        
        try {
            const tx = await contract.grantAsset(assetAddress, ethers.getAddress(assetAddress), ethers.parseUnits(assetAmount.toString(), 'ether'));
            await tx.wait();
            alert('Assets donated successfully');
            setAssetAddress('');
            setAssetAmount(0);
        } catch (error) {
            console.error('Error donating assets:', error);
            alert('An error occurred while donating assets');
        }
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

            <form onSubmit={handleUnbanUser}>
                <label>Unban Address:</label>
                <input type="text" value={banAddress} onChange={(e) => setBanAddress(e.target.value)} />
                <button type="submit">Unban User</button>
            </form>

            <form onSubmit={handleDonateAssets}>
                <label>Donate Assets Amount:</label>
                <input type="number" value={assetAmount} onChange={(e) => setAssetAmount(Number(e.target.value))} />
                <label>Donate to Address:</label>
                <input type="text" value={assetAddress} onChange={(e) => setAssetAddress(e.target.value)} />
                <button type="submit">Donate</button>
            </form>
        </div>
    );
}

export default AdminSettings;
