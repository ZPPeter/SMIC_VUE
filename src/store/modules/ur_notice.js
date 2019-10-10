import ListModule from './list-module';
import Notice from '../entities/notice';
import Ajax from '../../lib/ajax';
class UrNoticeModule extends ListModule {
    constructor() {
        super(...arguments);
        this.state = {
            totalCount: 0,
            unreadCount: 0,
            currentPage: 1,
            pageSize: 5,
            list: new Array(),
            loading: false
        };
        this.actions = {
            async getAll(context, payload) {
                //alert(JSON.stringify(payload.data))
                context.state.loading = true;
                let reponse = await Ajax.get('/api/services/app/HomeInfo/GetPagedNoReadNotice', { params: payload.data });
                context.state.loading = false;
                //alert(JSON.stringify(reponse.data.result))
                let page = reponse.data.result;
                context.state.totalCount = page.totalCount;
                context.state.list = page.items;
            },
            async setReadLastNoticeTime(context) {
                await Ajax.post('/api/services/app/Session/SetReadLastNoticeTime'); 
            },
            async getUnreadCount(context) {
                let rep = await Ajax.get('/api/services/app/HomeInfo/GetNoReadNoticeCount');
                context.state.unreadCount = rep.data.result;
            }                                    
        };
        this.mutations = {
            setCurrentPage(state, page) {
                state.currentPage = page;
            }
        };
    }
}
const ur_noticeModule = new UrNoticeModule();
export default ur_noticeModule;