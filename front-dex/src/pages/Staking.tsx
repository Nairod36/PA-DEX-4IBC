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
                    <PoolsList address="0xd65024A299c229F99EEBC93527830fd3237452DA"/>
                </div>
            </section>
        </div>
        </>
    );
}

export default Staking;
