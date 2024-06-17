import React, { useEffect, useState } from 'react';

function PlatformStatistics() {
    const [stats, setStats] = useState({ users: 0, transactions: 0, totalAssets: 0 });

    useEffect(() => {
        // Fetch platform statistics from the backend
        const fetchStats = async () => {
            console.log('Fetching platform statistics...');
            // Simulation, replace with actual API call
            // Exemple: const response = await fetch('/api/platform-stats');
            // const data = await response.json();
            // setStats(data);
            // Here we simulate some data
            setStats({ users: 1000, transactions: 350, totalAssets: 1500 });
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1>Platform Statistics</h1>
            <p>Number of Users: {stats.users}</p>
            <p>Number of Transactions: {stats.transactions}</p>
            <p>Total Assets: {stats.totalAssets}</p>
        </div>
    );
}

export default PlatformStatistics;
