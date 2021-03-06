import Vue from 'vue';
import VueRouter from 'vue-router';
import { routers } from './router';
import iView from 'view-design';
import Util from '../lib/util';
import Cookies from 'js-cookie';
import { appRouters, otherRouters } from './router';
import { LoadingBar } from 'view-design';
Vue.use(VueRouter);
const RouterConfig = {
    // mode: 'history',
    routes: routers
};
export const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    //iView.LoadingBar.start();
    LoadingBar.start();
    Util.title(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') {
        next({
            replace: true,
            name: 'locking'
        });
    }
    else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    }
    else {
        if (!Util.abp.session.userId && to.name !== 'login') {
            next({
                name: 'login'
            });
        }
        else if (!!Util.abp.session.userId && to.name === 'login') {
            Util.title(to.meta.title);
            next({
                name: 'home' // 任何 name 都可以,比如 setting 则显示子菜单的第一个 
            });
        }
        else {            
            const curRouterObj = Util.getRouterObjByName([otherRouters, ...appRouters], to.name);            
            if (curRouterObj && curRouterObj.permission) {
                //检查有无权限                
                if (window.abp.auth.hasPermission(curRouterObj.permission)) {
                    Util.toDefaultPage([otherRouters, ...appRouters], to.name, router, next);
                }
                else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            }
            else {                
                Util.toDefaultPage([...routers], to.name, router, next);  // 无 permission 
            }
        }
    }
});
router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    //iView.LoadingBar.finish();
    LoadingBar.finish();
    window.scrollTo(0, 0);
});
//# sourceMappingURL=index.js.map