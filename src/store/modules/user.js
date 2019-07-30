import ListModule from './list-module';
import User from '../entities/user';
import Ajax from '../../lib/ajax';
import Vue from 'vue';
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
                //alert(JSON.stringify(payload.data));
                //let reponse = await Ajax.get('/api/services/app/User/GetAll', { params: payload.data });
                let reponse = await Ajax.get('/api/services/app/MemberUser/GetPagedMemberUsers', { params: payload.data });
                context.state.loading = false;
                let page = reponse.data.result;
                //alert(JSON.stringify(page.items[2]));
                context.state.totalCount = page.totalCount;
                context.state.list = page.items;
                //alert(JSON.stringify(context.state.list[2]));
            },
            async changepassword(context, payload) {
                //alert(JSON.stringify(payload.data));
                await Ajax.post('/api/services/app/User/ChangePassword', payload.data);
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
            async resetpassword(context, payload) {
                let vm = new Vue({});
                //alert(JSON.stringify(payload.data));
                let reponse = await Ajax.post('/api/services/app/User/ResetPassword', payload.data);
                if(reponse.data.result===true){
                    vm.$Message.success('密码重置成功！'); //  this.$Message 不会显示的
                }
            },
            async uploadavatar(context,payload){
                //let vm = new Vue({});
                //alert(JSON.stringify(payload.data));
                let reponse = await Ajax.post('/api/services/app/UploadAvatar/UploadFile', payload.data);
                return reponse.data.result;
                //if(reponse.data.result==="OK"){
                //    vm.$Message.success('头像修改成功！'); //  this.$Message 不会显示的
                //}                
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
            async edit(state, user) {
                state.editUser = user;             
            }
        };
    }
}
const userModule = new UserModule();
export default userModule;
//# sourceMappingURL=user.js.map