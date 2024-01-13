import axios,{CancelToken} from 'axios'
import { ETime, ICoin } from '../dto'

export class CoinService {
    static async getCoin(coin: string, time: ETime, token?: CancelToken): Promise <ICoin|null>{
        const response = await axios.get(`https://min-api.cryptocompare.com/data/v2/${time}?fsym=${coin}&tsym=USD&limit=24`,{
            cancelToken:token,
            headers:{
                "Authorization":process.env.REACT_APP_CRYPTO_COMPARE_API_TOKEN
            }
        })
        return response.data
    }
}