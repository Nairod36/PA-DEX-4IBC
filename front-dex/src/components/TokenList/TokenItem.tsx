import { useEffect, useState } from "react"
import { CoinService } from "../../services"
import { ETime, ICoin, ICoinInfo } from "../../dto"
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
    const [coinInfo,setCoinInfo] = useState<ICoinInfo|null>(null)
    const [coinPrices,setCoinPrices] = useState<number[]>([])
    

    useEffect(()=>{
        const cancelTokenSrc = axios.CancelToken.source()
        const fetchData = async () => {
            try{
                const response = await CoinService.getCoin(trigram,time,cancelTokenSrc.token)
                if(response !== null){
                    setCoin(response)
                    setCoinPrices(getClosePrices(response))  
                    // console.log(trigram);
                    
                    // console.log(response);
                    
                } 
            }catch(error){
                console.error(error)
            }
            try{
                const response = await CoinService.getCoinInfo(name,trigram,cancelTokenSrc.token)
                if(response !== null){
                    setCoinInfo(response)
                    // console.log(trigram);                    
                    // console.log(response);
                    
                } 
            }catch(error){
                console.error(error)
            }
        }
        if(process.env.REACT_APP_CRYPTO_COMPARE_API_TOKEN !== undefined && process.env.REACT_APP_ALLOWED_FETCH == '1'){
            fetchData()
        }
        
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
                    close: Math.random()*50000+50000,
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
    if(coin == null){
        setCoin(sampleCoin)
        setCoinPrices(getClosePrices(sampleCoin))
    }
    },[time])

    const getClosePrices = (coin: ICoin) => {
        return coin.Data.Data.map(item => item.close);
    }

    return (
        <>
        {coin === null ? 
            <div>Loading</div>
        :
            <tr>
                <td>{id}</td>
                <td><div className="logo-col"><img className="logo-token" src={coinInfo !== null ? coinInfo.logo : "./sampleCoin.png"}/></div></td>
                <td><div className={name.length > 9 ? "name-too-long" : ""}>{name}</div><span className="trigram">{trigram}</span></td>
                <td>{`${coin.Data.Data[24].close}$`}</td>
                <td><div className={`change-col ${coinPrices[coinPrices.length - 1] >= coinPrices[0] ? 'positive' : 'negative'}`}><span className="change"></span>{`${Math.floor(10000*(coin.Data.Data[24].close - coin.Data.Data[0].close)/coin.Data.Data[24].close)/100}%`}</div></td>
                <td>{`${Math.floor(Math.random()*5)/10} Md $`}</td>
                <td>{`${Math.floor(Math.random()*3)/10} Md $`}</td>
                <td>
                    <Linechart data={coinPrices}/>
                </td>
            </tr>
        }
        </>
    )
}