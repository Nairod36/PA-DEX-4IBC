import React, { useEffect, useState } from 'react';

function PlatformStatistics() {
    const [stats, setStats] = useState({ totalUsers: 0, bannedUsers: 0, activeUsers: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log('Fetching platform statistics...');
                const response = await fetch('/api/platform-stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching platform statistics:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1>Platform Statistics</h1>
            <p>Total Users: {stats.totalUsers}</p>
            <p>Banned Users: {stats.bannedUsers}</p>
            <p>Active Users: {stats.activeUsers}</p>
        </div>
    );
}

export default PlatformStatistics;
