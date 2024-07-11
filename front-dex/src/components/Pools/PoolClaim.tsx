export interface IPoolClaim {
    claim:()=>void
    add:()=>void
}

export const PoolClaim = (props:IPoolClaim) => {
    return(
        <>
        <div className="pool-claim">
            <div onClick={props.add}>ADD</div>
            <div onClick={props.claim}>CLAIM</div>
        </div>
        </>
    )
}