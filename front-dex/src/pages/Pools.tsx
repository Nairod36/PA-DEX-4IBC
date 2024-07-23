import { PoolsList } from "../components/Pools/poolsList"
import PageLayout from "./PageLayout"

export const Pools = () => {
    return(
        <>
            <div className="page-content">
                <PageLayout pageTitle="Pool" desc={''} />
                <section style={{paddingTop:"0px",minHeight:"500px"}} className="content-inner">
                    <div className="container">
                        <PoolsList address="0x04a13B2C96D3D4A7EAce69C810cD6382a62Cf7d2"/>
                    </div>
                </section>
            </div>
        </>
    )
}