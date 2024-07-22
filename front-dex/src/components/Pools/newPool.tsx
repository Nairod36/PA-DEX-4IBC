import "./newPool.css"

export interface INewPool {
    onclick:()=>void
}

export const NewPool = (props:INewPool) => {
    return(
        <>
            <tr>
                <td onClick={props.onclick} style={{padding:"2px"}} colSpan={7}>
                    <div className="newPool-btn"><span>NEW POOL</span></div>
                </td>
            </tr>
        </>
    )
}