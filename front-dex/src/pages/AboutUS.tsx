import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import PageLayout from './PageLayout';

//Images
import Shape1 from './../assets/images/home-banner/shape1.png';
import Shape3 from './../assets/images/home-banner/shape3.png'; 

import about2 from './../assets/images/about/about-2.jpg';
import about3 from './../assets/images/about/about-3.jpg';
import about4 from './../assets/images/about/about-4.jpg';
import about1 from './../assets/images/about/about-1.jpg';

import videobox from './../assets/images/about/videobx.png';

import bloglg from './../assets/images/blog/blog-ig.png';
import avatar3 from './../assets/images/avatar/avatar3.jpg';

interface ImageBoxProps {
    image: string;
    changeClass: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ image, changeClass }) => {
    return (
        <div className="col-6">
            <div className={`image-box ${changeClass}`}>
                <img src={image} alt="" />
            </div>
        </div>
    );
}


function AboutUs(){
    const nav = useNavigate();
    const formDetails = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nav("/contact-us");
    };
    const [isOpen, setOpen] = useState(false)
    return(
        <>
            <div className="page-content">
                <PageLayout  desc="" pageTitle="About Us" />               
                <section className="content-inner about-sec bg-primary-light">
                    <div className="container">
                        <div className="row about-bx2 style-1 align-items-center">
                            <div className="col-lg-6">
                                <div className="dz-media">
                                    <div className="row align-items-end">                                        
                                        <ImageBox image={about4} changeClass="image-box-1" />
                                        <ImageBox image={about2} changeClass="image-box-2" />                                      
                                    </div>
                                    <div className="row">                                        
                                        <ImageBox image={about3} changeClass="image-box-3" />
                                        <ImageBox image={about1} changeClass="image-box-4" />                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 about-content ps-lg-5 m-b30">
                                <div className="section-head">
                                <h2 className="title">Revolutionizing Digital Asset Trading</h2>
                                    <p className="m-0 lh-base">Our platform offers advanced features for trading digital assets, participating in liquidity pools, and staking, all with full administrative control.</p>
                                </div>
                                <Link to={"/contact-us"} className="btn btn-lg btn-primary btn-shadow text-uppercase">Contact Us</Link>
                            </div>
                        </div>
                    </div>                    
                    <img className="bg-shape1" src={Shape1} alt="" />
					<img className="bg-shape2" src={Shape3} alt="" />
					<img className="bg-shape3" src={Shape3} alt="" />
					<img className="bg-shape4" src={Shape3} alt="" />
                </section>
                <section className="content-inner p-0 bg-primary-light video-bx-wrapper">
                    <img className="bg-shape1" src={Shape1} alt="" />
                    <div className="container wow fadeInUp" data-wow-delay="0.4s">
                        <div className="video-bx style-1">
                            <div className="video-media">
                                <img src={videobox} alt="" />
                                <Link to={"#"} className="popup-youtube play-icon" onClick={()=> setOpen(true)}>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.25 3.75L23.75 15L6.25 26.25V3.75Z" stroke="#9467FE" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content-inner bg-light pricing-plan-wrapper2">
                    <img className="bg-shape2" src={Shape1} alt="" />
                    <div className="container">
                        <div className="section-head text-center">
                            <h2 className="title">Awesome Pricing Plan for <br /> Cryptocurrency Business</h2>
                        </div>
                        <div className="row justify-content-center">
                        </div>
                    </div>    
                </section>
                <section className="form-sec bg-light">
                    <img className="bg-shape2" src={Shape1} alt="" />

                    <div className="container">
                        <div className="bg-primary form-wrapper1 style-1">
                            <div className="row align-items-center">
                                <div className="col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="section-head">
                                        <h5 className="sub-title text-white">JOIN US</h5>
                                        <h2 className="title text-white">We Need Your Help</h2>
                                    </div>
                                </div>
                                <div className="col-xl-9">
                                    <form className="dzForm"  onSubmit={(e) => formDetails(e)}>
                                        <div className="dzFormMsg"></div>
                                            <input type="hidden" className="form-control" name="dzToDo" value="Contact" />
                                            <input type="hidden" className="form-control" name="reCaptchaEnable" value="0" />

                                        <div className="row">
                                            <div className="col-md-4 col-sm-6 m-b30 wow fadeInUp" data-wow-delay="0.1s">
                                                <input name="dzFirstName" required type="text" className="form-control" placeholder="First Name" />
                                            </div>
                                            <div className="col-md-4 col-sm-6 m-b30 wow fadeInUp" data-wow-delay="0.2s">
                                                <input name="dzLastName" required type="text" className="form-control" placeholder="Last Name" />
                                            </div>
                                            <div className="col-md-4 col-sm-6 m-b30 wow fadeInUp" data-wow-delay="0.3s">
                                                <input name="dzEmail" required type="text" className="form-control" placeholder="Email Address" />
                                            </div>
                                            <div className="col-md-4 col-sm-6 m-b30 wow fadeInUp" data-wow-delay="0.4s">
                                                <input name="dzPhoneNumber" required type="text" className="form-control" placeholder="Phone Number" />
                                            </div>
                                            <div className="col-md-4 col-sm-6 m-b30 wow fadeInUp" data-wow-delay="0.5s">
                                                <input name="dzMessage" required type="text" className="form-control" placeholder="Your Message" />
                                            </div>
                                            <div className="col-md-4 col-sm-6 m-b30 wow fadeInUp" data-wow-delay="0.6s">
                                                <button name="submit" type="submit" value="Submit" className="btn btn-dark btn-block h-100">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content-inner bg-white blog-wrapper">
                    <img className="bg-shape1" src={Shape1} alt="" />
                    <div className="container">
						<div className="row">
							<div className="col-xl-7 col-lg-12">
								<div className="section-head " >
									<h6 className="sub-title text-primary">FROM OUR BLOG</h6>
									<h2 className="title">Recent News &amp; Updates</h2>
								</div>
							</div>
							<div className="col-xl-5 col-lg-12 m-b30 " >
								<div className="dz-card style-2" style={{backgroundImage: "url("+ bloglg +")"}}>
									<div className="dz-category">
										<ul className="dz-badge-list">
											<li><Link to={"#"} className="dz-badge">14 Fan 2022</Link></li>
										</ul>
									</div>
									<div className="dz-info">
										<h2 className="dz-title"><Link to={"/blog-details"} className="text-white">Directly support individuals Crypto</Link></h2>
										<div className="dz-meta">
											<ul>
												<li className="post-author">
													<Link to={"#"}>
														<img src={avatar3} alt=""  className="me-2"/>
														<span>By Noare</span>
													</Link>
												</li>
												<li className="post-date"><Link to={"#"}> 12 May 2022</Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                </section>
            </div>
        </>
    )
}
export default AboutUs;