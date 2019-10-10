import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import app from './modules/app';
import session from './modules/session';
import account from './modules/account';
import user from './modules/user';
import member from './modules/member';
import vw_sjmx from './modules/vw_sjmx';
import wtd from './modules/wtd';
import sjmx from './modules/sjmx';
import info from './modules/info';
import role from './modules/role';
import tenant from './modules/tenant';
import notice from './modules/notice';
import ur_notice from './modules/ur_notice';
const store = new Vuex.Store({
    state: {
    //
    },
    mutations: {
    //
    },
    actions: {},
    modules: {
        app,
        session,
        account,
        user,
        member,
        role,
        tenant,
        vw_sjmx,
        wtd,
        sjmx,
        info,
        notice,
        ur_notice
    }
});
export default store;
//# sourceMappingURL=index.js.map