import { PoolsList } from "../components/Pools/poolsList"
import PageLayout from "./PageLayout"

export const Pools = () => {
    return(
        <>
            <div className="page-content">
                <PageLayout pageTitle="Pool" desc={''} />
                <section style={{paddingTop:"0px"}} className="content-inner">
                    <div className="container">
                        <PoolsList address="0x6FB6b3e6Eecd49Cd771264fA97e69d771bDCEb32"/>
                    </div>
                </section>
            </div>
        </>
    )
}