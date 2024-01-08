import React from 'react';

import PageLayout from './PageLayout';

import Shap1 from './../assets/images/home-banner/shape1.png';
import Shap3 from './../assets/images/home-banner/shape3.png';

function Pricing(){
    return(
        <>
            <div className="page-content">
                <PageLayout pageTitle="Pricing Table" desc={''} />
            </div>
            <section className="content-inner pricing-plan-wrapper bg-primary-light">
                <img className="bg-shape2" src={Shap1} alt="" />
                <img className="bg-shape3" src={Shap1} alt="" />
                <img className="bg-shape1" src={Shap3} alt="" />
                <img className="bg-shape4" src={Shap3} alt="" />
                <img className="bg-shape5" src={Shap3} alt="" />
                <div className="container">
                    <div className="section-head text-center">
                        <h2 className="title">Awesome Pricing Plan for Cryptocurrency Business</h2>
                    </div>
                    <div className="row justify-content-center">
                    </div>
                </div>
            </section>
        </>
    )
}
export  default Pricing;