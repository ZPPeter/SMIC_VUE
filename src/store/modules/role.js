import ListModule from './list-module';
import Role from '../entities/role';
import Ajax from '../../lib/ajax';
class RoleModule extends ListModule {
    constructor() {
        super(...arguments);
        this.state = {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            list: new Array(),
            loading: false,
            editRole: new Role(),
            permissions: new Array()
        };
        this.actions = {
            async getAll(context, payload) {
                context.state.loading = true;
                let reponse = await Ajax.get('/api/services/app/Role/GetAll', { params: payload.data });
                context.state.loading = false;
                let page = reponse.data.result;
                context.state.totalCount = page.totalCount;
                context.state.list = page.items;
            },
            async create(context, payload) {
                await Ajax.post('/api/services/app/Role/Create', payload.data);
            },
            async update(context, payload) {
                await Ajax.put('/api/services/app/Role/Update', payload.data);
            },
            async delete(context, payload) {
                await Ajax.delete('/api/services/app/Role/Delete?Id=' + payload.data.id);
            },
            async get(context, payload) {
                let reponse = await Ajax.get('/api/services/app/Role/Get?Id=' + payload.id);
                return reponse.data.result;
            },
            async getAllPermissions(context) {
                let reponse = await Ajax.get('/api/services/app/Role/getAllPermissions');
                context.state.permissions = reponse.data.result.items;
            }
        };
        this.mutations = {
            setCurrentPage(state, page) {
                state.currentPage = page;
            },
            setPageSize(state, pagesize) {
                state.pageSize = pagesize;
            },
            edit(state, role) {
                state.editRole = role;
            }
        };
    }
}
const roleModule = new RoleModule();
export default roleModule;
//# sourceMappingURL=role.js.map