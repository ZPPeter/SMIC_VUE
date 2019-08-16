import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Info from '../entities/info'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';

interface InfoState extends ListState<Info>{
    infoDetail:Info
}
class InfoModule extends ListModule<InfoState,any,Info>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Info>(),
        loading:false,
        infoDetail: new Info()
    }
    actions={
        async update(context, payload) {
            await Ajax.put('/api/services/app/HomeInfo/Update', payload.data);
        },
        async getInfoData(context:ActionContext<InfoState,any>){            
            let reponse=await Ajax.get('/api/services/app/HomeInfo/GetById?Id=1');
            //console.log(reponse.data.result);
            context.state.infoDetail= reponse.data.result;
            //{title:'消息',description:"<span style='font-size:14px;color:red;'>Hello,欢迎使用本系统，在使用过程中有什么问题请联系管理员。</span>"}
        },
    };
    mutations={
        setCurrentPage(state:InfoState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:InfoState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state) {            
            state.editInfo = state.infoDetail;
        }        
    }
}
const infoModule=new InfoModule();
export default infoModule;