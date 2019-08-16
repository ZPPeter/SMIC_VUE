import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Sjmx from '../entities/sjmx'
//import SjmxTj from '../entities/sjmx_tj'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';

interface SjmxState extends ListState<Sjmx>{
    datas:number[], // 数据类型
    datas_0:number[], // 去年
    datas_1:number[], // 今年
    datas_2:number[]  // GR
}
//interface SjmxTjState extends ListState<SjmxTj>{
//}
class SjmxModule extends ListModule<SjmxState,any,Sjmx>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Sjmx>(),
        loading:false,
        datas:[], // 初始化
        datas_0:[],
        datas_1:[],
        datas_2:[],
    }
    actions={
        async getAll(context:ActionContext<SjmxState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/SJMXAppServices/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Sjmx>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async getRecentSJMX(context:ActionContext<SjmxState,any>){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/SJMXAppServices/GetRecentSJMX');    
            context.state.loading=false;        
            //console.log(reponse.data.result)
            context.state.list=reponse.data.result;            
        },
        async getRecentSJMXBy(context:ActionContext<SjmxState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/SJMXAppServices/GetRecentSJMXBy?q=' + payload.data);
            context.state.loading=false;
            context.state.list=reponse.data.result;            
        },
        async getStatsData(context:ActionContext<SjmxState,any>){
            let reponse=await Ajax.get('/api/services/app/StatsAppServices/getStatsData');
            //console.log(reponse.data.result)
            //context.state.datas=[183,980,93,135,74,3442,125,5512,626,737,888,2999];
            context.state.datas=reponse.data.result;
        },              
        async getQzyStatsData(context:ActionContext<SjmxState,any>){
            let reponse=await Ajax.get('/api/services/app/StatsAppServices/getStatsDataBy?ID=1000');
            //console.log(reponse.data.result[0])
            //context.state.datas_0=[183,198,93,135,74,344,125,512,626,377,238,499];
            //context.state.datas_1=[193,210,113,154,99,432,151,498,324,356,181,520];
            context.state.datas_0 = reponse.data.result[0];         
            context.state.datas_1 = reponse.data.result[1]; //Year Now  
            context.state.datas_2.length = 0; //清空
            for(var i=0;i<12;i++){
            context.state.datas_2.push(
                Math.round(
                    (((context.state.datas_1[i]-context.state.datas_0[i])/context.state.datas_0[i])+1)*100
                    )
                );
            }
            //console.log(context.state.datas_0)
            //console.log(context.state.datas_1)
            //console.log(context.state.datas_2)
        },
        async getGpsStatsData(context:ActionContext<SjmxState,any>){
            let reponse=await Ajax.get('/api/services/app/StatsAppServices/getStatsDataBy?ID=1030');
            //console.log(reponse.data.result)
            //context.state.datas_0=[183,198,93,135,74,344,125,512,626,377,238,499];
            //context.state.datas_1=[193,210,113,154,99,432,151,498,324,356,181,520];
            context.state.datas_0=reponse.data.result[0];
            context.state.datas_1=reponse.data.result[1];
            context.state.datas_2.length = 0; //清空
            for(var i=0;i<12;i++){
            context.state.datas_2.push(
                Math.round(
                    (((context.state.datas_1[i]-context.state.datas_0[i])/context.state.datas_0[i])+1)*100
                    )
                );
            }
        },
        async getQtyStatsData(context:ActionContext<SjmxState,any>){
            let reponse=await Ajax.get('/api/services/app/StatsAppServices/getStatsDataBy?ID=9999');
            //console.log(reponse.data.result)
            //context.state.datas_0=[183,198,93,135,74,344,125,512,626,377,238,499];
            //context.state.datas_1=[193,210,113,154,99,432,151,498,324,356,181,520];
            context.state.datas_0=reponse.data.result[0];
            context.state.datas_1=reponse.data.result[1];
            context.state.datas_2.length = 0; //清空
            for(var i=0;i<12;i++){
            context.state.datas_2.push(
                Math.round(
                    (((context.state.datas_1[i]-context.state.datas_0[i])/context.state.datas_0[i])+1)*100
                    )
                );
            }
        },                
    };
    mutations={
        setCurrentPage(state:SjmxState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:SjmxState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const sjmxModule=new SjmxModule();
export default sjmxModule;