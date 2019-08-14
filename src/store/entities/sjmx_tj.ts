import Entity from './entity'

export default class SjmxTj extends Entity<number>{
    qzy:number;     //全部全站仪
    qzy_now:number; //本年度
    gps:number;     //全部GPS
    gps_now:number; //本年度
    jwy:number;     //全部经纬仪
    jwy_now:number; //本年度
    szy:number;     //全部水准仪
    szy_now:number; //本年度
    sccjy:number;     //全部手持测距仪
    sccjy_now:number; //本年度
    qty:number;     //全部其它
    qty_now:number; //本年度   

}