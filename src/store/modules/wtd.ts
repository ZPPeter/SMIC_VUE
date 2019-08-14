import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Wtd from '../entities/wtd'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';

interface WtdState extends ListState<Wtd>{
}
class WtdModule extends ListModule<WtdState,any,Wtd>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Wtd>(),
        loading:false,
        editRole:new Wtd(),
        permissions:new Array<string>()
    }
    actions={
        async getAll(context:ActionContext<WtdState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/WTDAppServices/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Wtd>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async getRecentWTD(context:ActionContext<WtdState,any>){
            context.state.loading=true;            
            let reponse=await Ajax.get('/api/services/app/WTDAppServices/GetRecentWTD');            
            context.state.loading=false;
            //console.log(reponse.data.result)
            context.state.list=reponse.data.result;
        },
        async getRecentWTDBy(context:ActionContext<WtdState,any>,payload:any){     
            context.state.loading=true;       
            let reponse=await Ajax.get('/api/services/app/WTDAppServices/GetRecentWTDBy?q=' + payload.data);   
            context.state.loading=false;         
            context.state.list=reponse.data.result;            
        }        
    };
    mutations={
        setCurrentPage(state:WtdState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:WtdState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const wtdModule=new WtdModule();
export default wtdModule;