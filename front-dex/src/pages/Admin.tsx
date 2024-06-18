import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageLayout from './PageLayout';
import AdminSettings from './GlobalSetting'; 
import PlatformStatistics from './PlatformStats';

function Admin() {
    const nav = useNavigate();
    
    const handleLogout = () => {
        // handle user logout
        nav("/login"); 
    };

    return (
        <>
            <div className="page-content">
                <PageLayout desc="Admin section to manage website settings and view reports" pageTitle="Admin Dashboard" />
                <section className="content-inner admin-dashboard-wraper style-1">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-12 m-b30">
                                <div className="info-box">
                                    <h2>Admin Tools</h2>
                                    <p className="font-18">Manage your site content and user data here.</p>
                                    <ul>
                                    <AdminSettings />
                                    <PlatformStatistics />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Admin;
