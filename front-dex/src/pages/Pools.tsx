import { PoolsList } from "../components/Pools/poolsList"
import PageLayout from "./PageLayout"

export const Pools = () => {
    return(
        <>
            <div className="page-content">
                <PageLayout pageTitle="Pool" desc={''} />
                <section style={{paddingTop:"0px",minHeight:"500px"}} className="content-inner">
                    <div className="container">
                        <PoolsList address="0xB0e31f36C66C218b8201fd55c2A4A9956e2254Ab"/>
                    </div>
                </section>
            </div>
        </>
    )
}