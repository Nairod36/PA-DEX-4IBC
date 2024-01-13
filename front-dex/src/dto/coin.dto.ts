import { ICoinData } from ".";

export interface ICoin {
    Response:string;
    Message:string;
    HasWarning:boolean;
    Type:number;
    Data:ICoinData
}