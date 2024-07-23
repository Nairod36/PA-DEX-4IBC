import React, { useState } from 'react';
import PageLayout from './PageLayout';
import { PoolsList } from '../components/staking/poolsList';

function Staking() {

    return (
        <>
        <div className="page-content">
            <PageLayout pageTitle="Pool" desc={''} />
            <section style={{paddingTop:"0px",minHeight:"500px"}} className="content-inner">
                <div className="container">
                    <PoolsList address="0x7F145944d374980229C7c136515b80f67626bF81"/>
                </div>
            </section>
        </div>
        </>
    );
}

export default Staking;
