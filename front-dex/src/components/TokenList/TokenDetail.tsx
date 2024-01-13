import { useEffect } from "react"
import { CoinService } from "../../services"
import { ETime } from "../../dto"
import axios from "axios"

export const TokenDetail = () => {

    useEffect(()=>{
        const cancelTokenSrc = axios.CancelToken.source()
        const fetchData = async () => {
            try{
                const response = await CoinService.getCoin("ETH",ETime.Day,cancelTokenSrc.token)
                console.log(response);
            }catch(error){
                console.error(error)
            }
        }
        fetchData()
    },[])
    return (
        <>

        </>
    )
}