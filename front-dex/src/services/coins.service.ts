import axios,{CancelToken} from 'axios'
import { ETime, ICoin, ICoinInfo } from '../dto'

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
    static async getCoinInfo(name: string, symbol: string, token?: CancelToken): Promise <ICoinInfo|null>{
        const formated = name.replaceAll(' ','-')
        const id = `${symbol.toLowerCase()}-${formated.toLowerCase()}`
        const response = await axios.get(`https://api.coinpaprika.com/v1/coins/${id}`,{
            cancelToken:token
        })
        return response.data
    }

    static async getTokenIdByAddress(tokenAddress:string) {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenAddress}`,{
                headers:{
                    "x_cg_demo_api_key":process.env.REACT_APP_CRYPTO_COMPARE_API_TOKEN
                }
            });
            return response.data.id;
        } catch (error:any) {
            if (error.response && error.response.status === 404) {
              console.warn(`Token not found on CoinGecko: ${tokenAddress}`);
              return null;
            } else {
              console.error('Error fetching token ID:', error);
              return null;
            }
        }
    }
    
    // Fonction pour obtenir le logo du token à partir de son ID
    static async getTokenLogoById(tokenId:any) {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}`,{
                headers:{
                    "x_cg_demo_api_key":process.env.REACT_APP_CRYPTO_COMPARE_API_TOKEN
                }
            });
            return response.data.image.large;
        } catch (error) {
            console.error('Error fetching token logo:', error);
            return null;
        }
    }
}