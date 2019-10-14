import ListModule from './list-module';
import Notice from '../entities/notice';
import Ajax from '../../lib/ajax';
class NoticeModule extends ListModule {
    constructor() {
        super(...arguments);
        this.state = {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            list: new Array(),
            loading: false,
            editNotice: new Notice()
        };
        this.actions = {
            async getAll(context, payload) {
                //alert(JSON.stringify(payload.data))
                context.state.loading = true;
                let reponse = await Ajax.get('/api/services/app/HomeInfo/GetPaged', { params: payload.data });                
                context.state.loading = false;
                let page = reponse.data.result;
                context.state.totalCount = page.totalCount;
                context.state.list = page.items;
            },
            async create(context, payload) {
                await Ajax.post('/api/services/app/HomeInfo/Create', payload.data);
            },
            async update(context, payload) {
                //console.log(payload.data);
                //修改日期
                await Ajax.put('/api/services/app/HomeInfo/Update', payload.data);
            },            
            async delete(context, payload) {
                await Ajax.delete('/api/services/app/HomeInfo/Delete?Id=' + payload.data.id);
            },
            async get(context, payload) {
                let reponse = await Ajax.get('/api/services/app/HomeInfo/GetById?Id=' + payload.id);
                return reponse.data.result;
            },
            async setReadLastNoticeTime(content) {
                //let reponse = await Ajax.post('/api/services/app/Session/SetReadLastNoticeTime');
            }            
        };
        this.mutations = {
            setCurrentPage(state, page) {
                state.currentPage = page;
            },
            setPageSize(state, pagesize) {
                state.pageSize = pagesize;
            },
            edit(state, notice) {
                state.editNotice = notice;
            }
        };
    }
}
const noticeModule = new NoticeModule();
export default noticeModule;