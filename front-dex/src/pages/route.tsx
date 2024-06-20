import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import your components, make sure these paths are correct
import Header from './Header';
import Home from './Home'; 
import Footer from './Footer';
import Swapping from './Swapping';
import ContactUs from './ContactUS';
import AboutUs from './AboutUS';
import { TokenItem, TokenList } from '../components/TokenList';
import Staking from './Staking';
import Admin from './Admin';

const Index: React.FC = () => {
    return (
        <BrowserRouter basename="/">
            <div className="page-wrapper">
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about-us' element={<AboutUs />} />
                    <Route path='/swapping' element={<Swapping />} />
                    <Route path='/tokens' element={<TokenList />} />
                    <Route path='/Staking' element={<Staking />} />
                    <Route path='/contact-us'  element={<ContactUs />} />
                    <Route path='/admin' element={<Admin />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default Index;
