import ListModule from './list-module';
import Tenant from '../entities/tenant';
import Ajax from '../../lib/ajax';
class TenantModule extends ListModule {
    constructor() {
        super(...arguments);
        this.state = {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            list: new Array(),
            loading: false,
            editTenant: new Tenant()
        };
        this.actions = {
            async getAll(context, payload) {
                context.state.loading = true;
                let reponse = await Ajax.get('/api/services/app/Tenant/GetAll', { params: payload.data });
                context.state.loading = false;
                let page = reponse.data.result;
                context.state.totalCount = page.totalCount;
                context.state.list = page.items;
            },
            async create(context, payload) {
                await Ajax.post('/api/services/app/Tenant/Create', payload.data);
            },
            async update(context, payload) {
                await Ajax.put('/api/services/app/Tenant/Update', payload.data);
            },
            async delete(context, payload) {
                await Ajax.delete('/api/services/app/Tenant/Delete?Id=' + payload.data.id);
            },
            async get(context, payload) {
                let reponse = await Ajax.get('/api/services/app/Tenant/Get?Id=' + payload.id);
                return reponse.data.result;
            }
        };
        this.mutations = {
            setCurrentPage(state, page) {
                state.currentPage = page;
            },
            setPageSize(state, pagesize) {
                state.pageSize = pagesize;
            },
            edit(state, tenant) {
                state.editTenant = tenant;
            }
        };
    }
}
const tenantModule = new TenantModule();
export default tenantModule;
//# sourceMappingURL=tenant.js.map