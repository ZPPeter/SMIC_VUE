import ajax from '../../lib/ajax';
import util from '../../lib/util';
class SessionStore {
    constructor() {
        this.namespaced = true;
        this.state = {
            application: null,
            user: null,
            tenant: null
        };
        this.actions = {
            async init(content) {
                let rep = await ajax.get('/api/services/app/Session/GetCurrentLoginInformations', {
                    headers: {
                        'Abp.TenantId': util.abp.multiTenancy.getTenantIdCookie()
                    }
                });
                content.state.application = rep.data.result.application;
                content.state.user = rep.data.result.user;
                //alert(JSON.stringify(content.state.user));
                // ToDo
                // content.state.user.avatarImgPath = 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png';            
                // localStorage.avatarImgPath = 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png';
                // alert(localStorage.avatarImgPath);
                content.state.tenant = rep.data.result.tenant;
                //alert(JSON.stringify(rep.data.result.user));

                // Get Roles
                //alert('/api/services/app/MemberUser/GetRoles?userid='+content.state.user.id);
                //rep = await ajax.get('/api/services/app/MemberUser/GetRoles?userid=' + content.state.user.id);
                //content.state.user.roles = rep.data.result.toString();
                //alert(JSON.stringify(content.state.user))
            }
        };
    }
}
const session = new SessionStore();
export default session;

/*
刷新页面 -> init
*/