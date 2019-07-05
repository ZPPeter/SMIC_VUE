import ListModule from './list-module';
import Ajax from '../../lib/ajax';
import ListMutations from './list-mutations';
class VW_SJMXMutations extends ListMutations {
}
class VW_SJMXModule extends ListModule {
    constructor() {
        super(...arguments);
        this.state = {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            list: new Array(),
            loading: false
        };
        this.actions = {
            async getAll(context, payload) {
                context.state.loading = true;
                //console.log(JSON.stringify(payload.data));
                //alert(JSON.stringify(payload.data));
                let reponse = await Ajax.get('/api/services/app/Person/GetSjmx2', { params: payload.data });
                context.state.loading = false;
                let page = reponse.data.result;
                context.state.totalCount = page.totalCount;
                context.state.list = page.items;
            },
        };
        this.mutations = {
            setCurrentPage(state, page) {
                state.currentPage = page;
            },
            setPageSize(state, pagesize) {
                state.pageSize = pagesize;
            }
        };
    }
}
const vw_sjmxModule = new VW_SJMXModule();
export default vw_sjmxModule;