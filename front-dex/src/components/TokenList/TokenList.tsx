import { ETime } from "../../dto"
import PageLayout from "../../pages/PageLayout"
import { TokenItem } from "./TokenItem"
import Shap1 from '../../assets/images/home-banner/shape1.png';
import Shap3 from '../../assets/images/home-banner/shape3.png';

interface IToken {
    id:number
    name:string
    trigram:string
    time:ETime
}

const tokens:IToken[] = [
    {id:1,name:'Ether',trigram:'ETH',time:ETime.Day},
    {id:2,name:'Bitcoin',trigram:'BTC',time:ETime.Day},
    {id:3,name:'Arbitreum',trigram:'ARB',time:ETime.Day},
]

export const TokenList = () => {
    

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
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Token name</th>
                                    <th>Price</th>
                                    <th>Change</th>
                                </tr>
                            </thead>
                            <tbody>
                        {tokens.map(token => (
                            <TokenItem id={token.id} name={token.name} trigram={token.trigram} time={token.time}/>
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