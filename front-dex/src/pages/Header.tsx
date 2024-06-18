import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from './../assets/images/logo.png';
import LogoWhite from './../assets/images/logo-white.png';

function Header() {
    const [headerFix, setHeaderFix] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setHeaderFix(window.scrollY > 50);
        });

        // Enregistrement de la clé publique lors de la connexion
        if (isConnected && address) {
            fetch('/api/register-public-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ publicKey: address }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log('Public key registered successfully');
                    } else {
                        console.error('Failed to register public key');
                    }
                })
                .catch((error) => console.error('Error:', error));
        }

        return () => {
            window.removeEventListener('scroll', () => {
                setHeaderFix(false);
            });
        };
    }, [isConnected, address]);

    return (
        <>
            <header className="site-header mo-left header header-transparent style-1">
                <div className={`sticky-header main-bar-wraper navbar-expand-lg ${headerFix ? 'is-fixed' : ''}`}>
                    <div className="main-bar clearfix">
                        <div className="container clearfix">
                            <div className="logo-header">
                                <Link to={"/"} className="logo-dark"><img src={Logo} alt="" /></Link>
                                <Link to={"/"} className="logo-light"><img src={LogoWhite} alt="" /></Link>
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
                                    <ConnectButton />
                                </div>
                            </div>                           
                                
                            <div className={`header-nav navbar-collapse collapse justify-content-end ${sidebarOpen ? 'show' : ''}`} id="navbarNavDropdown">
                                <div className="logo-header mostion">
                                    <NavLink to={"#"} className="logo-dark"><img src={Logo} alt="" /></NavLink>
                                </div>                            
                                <ul className="nav navbar-nav navbar">
                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                    <li><NavLink to={"/about-us"}>About Us</NavLink></li>
                                    <li><NavLink to={"/swapping"}>Swapping</NavLink></li>
                                    <li><NavLink to={"/tokens"}>Tokens</NavLink></li>
                                    <li><NavLink to={"/admin"}>Admin</NavLink></li>
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
