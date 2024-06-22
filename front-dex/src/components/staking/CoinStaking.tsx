import React from 'react';
import PageLayout from './PageLayout';
import Staking from '../../pages/Staking';

function CoinStaking() {
    return (
        <>
            <div className="page-content">
                <PageLayout pageTitle="Coin Staking" desc={''}>
                    <section className="content-inner">
                        <div className="container">
                            <Staking />
                        </div>
                    </section>
                </PageLayout>
            </div>
        </>
    );
}

export default CoinStaking;
