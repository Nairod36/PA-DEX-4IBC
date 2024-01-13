import { ICoinDataPerTime } from ".";

export interface ICoinData {
    Aggregated:boolean;
    TimeFrom:EpochTimeStamp;
    TimeTo:EpochTimeStamp;
    Data:ICoinDataPerTime[]
}