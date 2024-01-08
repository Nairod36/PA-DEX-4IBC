import React from 'react';

import coin1 from './../../assets/images/coins/coin1.png';
import coin3 from './../../assets/images/coins/coin3.png';
import coin4 from './../../assets/images/coins/coin4.png';

const cardData = [
    {image: coin4, title:'Bitcoin', subtitle:'BTC', price:'16,048.40', percent:'-1.26'},
    {image: coin3, title:'Ethereum', subtitle:'ETH', price:'1,122.44', percent:'-1.55'},
    {image: coin1, title:'Tether', subtitle:'USDT', price:'1.00', percent:'0.0099'},
];

function BannerCard(){
    return(
        <>
            {cardData.map((data, index)=>(
                <div className="col-lg-4 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" key={index}>
                    <div className="icon-bx-wraper style-1 box-hover">
                        <div className="icon-media">
                            <img src={data.image} alt="" />
                            <div className="icon-info">
                                <h5 className="title">{data.title}</h5>
                                <span>{data.subtitle}</span>
                            </div>
                        </div>
                        <div className="icon-content">
                            <ul className="price">
                                <li>
                                    <h6 className="mb-0 amount">${data.price}</h6>
                                    <span className= {`percentage ${index===2 ? "text-green" : "text-red"}`}>{data.percent}%</span>
                                </li>
                                <li>
                                    <span>Latest price</span>
                                    <span>24h change</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default BannerCard;