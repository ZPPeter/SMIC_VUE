import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Sjmx from '../entities/sjmx'
//import SjmxTj from '../entities/sjmx_tj'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';

interface SjmxState extends ListState<Sjmx>{
    datas:number[]
}
//interface SjmxTjState extends ListState<SjmxTj>{
//}
class SjmxModule extends ListModule<SjmxState,any,Sjmx>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Sjmx>(),
        loading:false        
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
        async getStatistics(context:ActionContext<SjmxState,any>){            
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/SJMXAppServices/GetRecentSJMX');    
            context.state.loading=false;
            //console.log(reponse.data.result)            
            context.state.datas=[183,98790,93,135,74,3442,125,5512,626,7377,8838,29999];                        
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