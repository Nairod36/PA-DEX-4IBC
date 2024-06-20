import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from './../assets/images/logo.png';

function Header() {
    const [headerFix, setHeaderFix] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [isBanned, setIsBanned] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const handleScroll = () => {
            setHeaderFix(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        if (isConnected && address) {
            (async () => {
                try {
                    await registerPublicKey(address);
                    await checkIfBanned(address);
                    await checkIfAdmin(address);
                } catch (error) {
                    console.error('Error:', error);
                }
            })();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isConnected, address]);

    const registerPublicKey = async (publicKey: string) => {
        console.log(API_URL);
        const response = await fetch(`http://localhost:3000/api/register-public-key`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publicKey }),
        });
        const data = await response.json();
        console.log('Register Public Key Response:', data);
        if (!data.success) {
            throw new Error('Failed to register public key');
        }
    };

    const checkIfBanned = async (publicKey: string) => {
        const response = await fetch(`http://localhost:3000/api/check-banned/${publicKey}`);
        const data = await response.json();
        if (data.banned) {
            setIsBanned(true);
            alert('You are banned from using this platform.');
            disconnect(); // Optionally disconnect the user
        }
    };

    const checkIfAdmin = async (publicKey: string) => {
        const response = await fetch(`http://localhost:3000/api/check-admin/${publicKey}`);
        const data = await response.json();
        setIsAdmin(data.isAdmin);
    };

    const handleAdminClick = () => {
        if (isAdmin) {
            navigate('/admin');
        } else {
            alert('You do not have access to the admin page.');
        }
    };

    return (
        <>
            <header className="site-header mo-left header header-transparent style-1">
                <div className={`sticky-header main-bar-wraper navbar-expand-lg ${headerFix ? 'is-fixed' : ''}`}>
                    <div className="main-bar clearfix">
                        <div className="container clearfix">
                            <div className="logo-header">
                                <Link to={"/"} className="logo-dark"><img src={Logo} alt="" /></Link>
                                <Link to={"/"} className="logo-light"><img src={Logo}  alt="" /></Link>
                            </div>
                            
                            <button type="button"
                                className={`navbar-toggler navicon justify-content-end ${sidebarOpen ? 'open' : 'collapsed'}`} 
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>                            
                            <div className="extra-nav">
                                <div className="extra-cell">
                                    {!isBanned && <ConnectButton />}
                                </div>
                            </div>                           
                                
                            <div className={`header-nav navbar-collapse collapse justify-content-end ${sidebarOpen ? 'show' : ''}`} id="navbarNavDropdown">
                                <div className="logo-header mostion">
                                    <NavLink to={"#"} className="logo-dark"><img src={Logo} alt="" /></NavLink>
                                </div>                            
                                <ul className="nav navbar-nav navbar">
                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                    <li><NavLink to={"/swapping"}>Swapping</NavLink></li>
                                    <li><NavLink to={"/tokens"}>Tokens</NavLink></li>
                                    <li><button onClick={handleAdminClick}>Admin</button></li>
                                    <li className={`sub-menu-down ${showMenu ? 'open' : ''}`} id="menushow" onClick={() => setShowMenu(!showMenu)}></li>
                                    <li><NavLink to={"/contact-us"}>Contact Us</NavLink></li>
                                </ul>                               
                            
                                <div className="header-bottom">
                                    <div className="dz-social-icon">
                                        <ul>
                                            <li><a target="_blank" className="fab fa-facebook-f" rel="noreferrer" href="https://www.facebook.com/"></a></li>
                                            <li><a target="_blank" className="fab fa-twitter" rel="noreferrer" href="https://twitter.com/"></a></li>
                                            <li><a target="_blank" className="fab fa-linkedin-in" rel="noreferrer" href="https://www.linkedin.com/"></a></li>
                                            <li><a target="_blank" className="fab fa-instagram" rel="noreferrer" href="https://www.instagram.com/"></a></li>
                                        </ul>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
