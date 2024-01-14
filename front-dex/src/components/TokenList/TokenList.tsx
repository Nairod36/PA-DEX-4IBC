import { ETime } from "../../dto"
import PageLayout from "../../pages/PageLayout"
import { TokenItem } from "./TokenItem"
import Shap1 from '../../assets/images/home-banner/shape1.png';
import Shap3 from '../../assets/images/home-banner/shape3.png';
import { Dropdown } from "react-bootstrap";
import { useState } from "react";

interface IToken {
    id:number
    name:string
    trigram:string
}

const tokens:IToken[] = [
    {id:1,name:'Ether',trigram:'ETH'},
    {id:2,name:'Bitcoin',trigram:'BTC'},
    {id:3,name:'Arbitreum',trigram:'ARB'},
    {id:4,name:'Solana',trigram:'SOL'},
    {id:5,name:'Binance Coin',trigram:'BNB'},
    {id:6,name:'Avalanche',trigram:'AVAX'},
    {id:7,name:'Dogecoin',trigram:'DOGE'},
]

export const TokenList = () => {
    
    const [selectTime,setSelectTime] = useState<[ETime,string]>([ETime.Day,"1D"])

    return (
        <>
        <div className="page-content">
                <PageLayout pageTitle="Tokens" desc={''} />
            </div>
            <section className="content-inner pricing-plan-wrapper bg-primary-light">
                <img className="bg-shape2" src={Shap1} alt="" />
                <img className="bg-shape3" src={Shap1} alt="" />
                <img className="bg-shape1" src={Shap3} alt="" />
                <img className="bg-shape4" src={Shap3} alt="" />
                <img className="bg-shape5" src={Shap3} alt="" />
                <div className="container">
                    <div className="section-head text-center">
                        <div className="col-md-2">
                            <Dropdown className="select-drop">
                                <Dropdown.Toggle as="div" className="i-false select-drop-toggle select-time">
                                    {selectTime[1]} <i className="fa-sharp fa-solid fa-angle-down" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>setSelectTime([ETime.Day,"1D"])}>1D</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>setSelectTime([ETime.Hour,"1H"])}>1H</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>setSelectTime([ETime.Minute,"1M"])}>1M</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Token name</th>
                                    <th>Price</th>
                                    <th>Change</th>
                                    <th>Trade Volume</th>
                                    <th>Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                        {tokens.map(token => (
                            <TokenItem id={token.id} name={token.name} trigram={token.trigram} time={selectTime[0]}/>
                        ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row justify-content-center">
                    </div>
                </div>
            </section>
        </>
    )
}