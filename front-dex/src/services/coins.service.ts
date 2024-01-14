import axios,{CancelToken} from 'axios'
import { ETime, ICoin } from '../dto'

export class CoinService {
    static async getCoin(coin: string, time: ETime, token?: CancelToken): Promise <ICoin|null>{
        let limit:number
        switch(time){
            case ETime.Day:
                limit = 24
                break
            case ETime.Hour:
                limit = 60
                break
            case ETime.Minute:
                limit = 60
                break
        }
        const response = await axios.get(`https://min-api.cryptocompare.com/data/v2/${time}?fsym=${coin}&tsym=USD&limit=${limit}`,{
            cancelToken:token,
            headers:{
                "Authorization":process.env.REACT_APP_CRYPTO_COMPARE_API_TOKEN
            }
        })
        return response.data
    }
}