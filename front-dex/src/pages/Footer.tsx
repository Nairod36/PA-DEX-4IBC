import React from 'react';
import { Link} from 'react-router-dom';

//images
import shape1 from './../assets/images/home-banner/shape1.png';
import bgimage from './../assets/images/background/bg1.jpg';
import logowhite from './../assets/images/logo-white.png';
import flags from './../assets/images/footer/world-map-with-flags1.png';

function Footer(){
    return(
        <>
            <footer className="site-footer style-1" id="footer">
                <img className="bg-shape1" src={shape1} alt="" />
                <div className="footer-top background-luminosity" style={{backgroundImage: "url("+ bgimage +")"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 col-md-12" >
                                <div className="widget widget_about">
                                    <div className="footer-logo logo-white">
                                        <Link to={"/"}><img src={logowhite} alt="" /></Link>
                                    </div>
                                    <p>CryptoZone is a Crypto & Crypto Website by DexignZone lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</p>
                                    <div className="dz-social-icon transparent space-10">
                                        <ul>
                                            <li><a target="_blank" className="fab fa-facebook-f" href="https://www.facebook.com/"></a></li>{" "}
                                            <li><a target="_blank" className="fab fa-instagram" href="https://www.instagram.com/"></a></li>{" "}
                                            <li><a target="_blank" className="fab fa-twitter" href="https://twitter.com/"></a></li>{" "}
                                            <li><a target="_blank" className="fab fa-youtube" href="https://youtube.com/"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6" >
                                <div className="widget widget_services">
                                    <h4 className="widget-title">Other Links</h4>
                                    <ul>
                                        <li><Link to={"/about-us"}>About Us</Link></li>
                                        <li><Link to={"/pricing"}>Pricing Plan</Link></li>
                                        <li><Link to={"/blog-list"}>Blog List</Link></li>
                                        <li><Link to={"/blog-grid"}>Our Blogs</Link></li>
                                        <li><Link to={"/contact-us"}>Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6" >
                                <div className="widget recent-posts-entry">
                                    <h4 className="widget-title">Blog Posts</h4>
                                    <div className="widget-post-bx">
                                        <div className="widget-post clearfix">
                                            <div className="dz-info">
                                                <h6 className="title"><Link to={"/blog-details"}>What is cryptocurrency and how does it work.</Link></h6>
                                                <span className="post-date"> JUNE 18, 2023</span>
                                            </div>
                                        </div>
                                        <div className="post-separator"></div>
                                        <div className="widget-post clearfix">
                                            <div className="dz-info">
                                                <h6 className="title"><Link to={"/blog-details"}>A cryptocurrency is a digital currency.</Link></h6>
                                                <span className="post-date"> AUGUST 22, 2023</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-12" >
                                <div className="widget widget_locations">
                                    <h4 className="widget-title">Locations</h4>
                                    <div className="clearfix">
                                        <h6 className="title">Washington</h6>
                                        <p>1559 Alabama Ave SE, DC 20032, Washington, USA</p>
                                        <img src={flags} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footer-bottom text-center">
                    <div className="container">
                        <span className="copyright-text">Copyright © 2023 <a href="https://dexignzone.com/" target="_blank">DexignZone</a>. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;