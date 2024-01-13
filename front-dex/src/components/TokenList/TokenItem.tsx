import { useEffect, useState } from "react"
import { CoinService } from "../../services"
import { ETime, ICoin } from "../../dto"
import axios from "axios"
import { Linechart } from "./LineChart"

interface ITokenProps{
    id:number
    name:string
    trigram:string
    time:ETime
}

export const TokenItem:React.FC<ITokenProps> = ({id,name,trigram,time}) => {
    
    const [coin,setCoin] = useState<ICoin|null>(null)

    useEffect(()=>{
        // const cancelTokenSrc = axios.CancelToken.source()
        // const fetchData = async () => {
        //     try{
        //         const response = await CoinService.getCoin(trigram,time,cancelTokenSrc.token)
        //         if(response !== null){
        //             setCoin(response)
        //             console.log(response);
                    
        //         } 
        //     }catch(error){
        //         console.error(error)
        //     }
        // }
        // fetchData()
        // Sample ICoin object
    const sampleCoin: ICoin =  {
        Response: 'Success',
        Message: 'Data retrieved successfully',
        HasWarning: false,
        Type: 1,
        Data: {
            Aggregated: true,
            TimeFrom: 1635696000, // Epoch timestamp for 1st November 2021
            TimeTo: 1635782400,   // Epoch timestamp for 2nd November 2021
            Data: [
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 64000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
                {
                    time: 1635696000,
                    high: 65000,
                    low: 62000,
                    open: 63000,
                    volumefrom: 5000,
                    volumeto: 4000,
                    close: 65000,
                    conversionType: 'type',
                    conversionSype: 'symbol'
                },
            ]
        }
    }

    // Set the state
    setCoin(sampleCoin)
    },[])

    return (
        <>
        {coin === null ? 
            <div>Loading</div>
        :
            <tr>
                <td>{id}</td>
                <td>{name} <span className="trigram">{trigram}</span></td>
                <td>{`${coin.Data.Data[24].close}$`}</td>
                <td><div className="change-col negative"><span className="change negative"></span>{`${Math.floor(10000*(coin.Data.Data[24].close - coin.Data.Data[0].close)/coin.Data.Data[24].close)/100}%`}</div></td>
                <td>
                    <Linechart data={[7,5,8,6,4,2,7,7,8,6,4,5,2,1,7,4,8,6,]}/>
                </td>
            </tr>
        }
        </>
    )
}