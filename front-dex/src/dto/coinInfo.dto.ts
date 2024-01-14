export interface ICoinInfo {
    id:string
    name:string
    symbol:string
    rank:number
    logo:string
    description:string
    started_at:string
    contract:string
    links:{
        reddit:string[]
        source_code:string[]
        website:string[]
    }
}