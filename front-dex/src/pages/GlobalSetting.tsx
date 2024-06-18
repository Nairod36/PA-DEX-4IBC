import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PlatformFees from '../web3/ABI/AssetManager.json'; // Importez l'ABI du contrat

function AdminSettings() {
    const [fees, setFees] = useState<number>(0);
    const [banAddress, setBanAddress] = useState<string>('');
    const [assetAmount, setAssetAmount] = useState<number>(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const contractAddress = '0xYourContractAddress'; // Adresse de votre contrat déployé

    useEffect(() => {
        const init = async () => {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const contract = new ethers.Contract(contractAddress, PlatformFees.abi, signer);
            // const admin = await contract.admin();

            setProvider(provider);
            setSigner(signer);
            // setContract(contract);

            // const accounts = await provider.listAccounts();
            // if (accounts[0].toLowerCase() === admin.toLowerCase()) {
            //     setIsAdmin(true);
            // }
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

        try {
            // const tx = await contract.updateFee(ethers.utils.parseUnits(fees.toString(), 'ether'));
            // await tx.wait();
            alert('Fees updated successfully');
        } catch (error) {
            console.error('Failed to update fees:', error);
            alert('Failed to update fees');
        }
    };

    const handleBanUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Banning user with address: ${banAddress}`);
        // Implement the ban functionality here
    };

    const handleDonateAssets = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Donating assets amount: ${assetAmount}`);
        // Implement the donate functionality here
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
