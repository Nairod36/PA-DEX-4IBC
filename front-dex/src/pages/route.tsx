import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import your components, make sure these paths are correct
import Header from './Header';
import Home from './Home'; 
import Footer from './Footer';
import Pricing from './Pricing';
import ContactUs from './ContactUS';
import AboutUs from './AboutUS';

const Index: React.FC = () => {
    return (
        <BrowserRouter basename="/">
            <div className="page-wrapper">
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about-us' element={<AboutUs />} />
                    <Route path='/pricing' element={<Pricing />} />
                    <Route path='/contact-us'  element={<ContactUs />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default Index;
