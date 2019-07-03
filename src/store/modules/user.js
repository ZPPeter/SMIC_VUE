import ListModule from './list-module';
import User from '../entities/user';
import Ajax from '../../lib/ajax';
import ListMutations from './list-mutations';
class UserMutations extends ListMutations {
}
class UserModule extends ListModule {
    constructor() {
        super(...arguments);
        this.state = {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            list: new Array(),
            loading: false,
            editUser: new User(),
            roles: new Array()
        };
        this.actions = {
            async getAll(context, payload) {
                context.state.loading = true;

                let reponse = await Ajax.get('/api/services/app/User/GetAll', { params: payload.data });
                context.state.loading = false;
                let page = reponse.data.result;
                context.state.totalCount = page.totalCount;
                context.state.list = page.items;
                
                /* abp.dapper 版本需要完善 分页等
                  let reponse = await Ajax.get('/api/services/app/Person/GetDapperPersons',{params:payload.data});
                  context.state.loading = false;
                  context.state.totalCount = 1;//page.totalCount;
                  context.state.list = reponse.data.result;
                */

            },
            async create(context, payload) {
                await Ajax.post('/api/services/app/User/Create', payload.data);
            },
            async update(context, payload) {
                await Ajax.put('/api/services/app/User/Update', payload.data);
            },
            async delete(context, payload) {
                await Ajax.delete('/api/services/app/User/Delete?Id=' + payload.data.id);
            },
            async get(context, payload) {
                let reponse = await Ajax.get('/api/services/app/User/Get?Id=' + payload.id);
                return reponse.data.result;
            },
            async getRoles(context) {
                let reponse = await Ajax.get('/api/services/app/User/GetRoles');
                context.state.roles = reponse.data.result.items;
            },
            async changeLanguage(context, payload) {
                await Ajax.post('/api/services/app/User/ChangeLanguage', payload.data);
            }
        };
        this.mutations = {
            setCurrentPage(state, page) {
                state.currentPage = page;
            },
            setPageSize(state, pagesize) {
                state.pageSize = pagesize;
            },
            edit(state, user) {
                state.editUser = user;
            }
        };
    }
}
const userModule = new UserModule();
export default userModule;
//# sourceMappingURL=user.js.map