declare global {
    interface RouterMeta {
        title: string;
    }
    interface Router {
        path: string;
        name: string;
        icon?: string;
        permission?: string;
        meta?: RouterMeta;
        component: any;
        children?: Array<Router>;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import main from '../views/main.vue'

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter: Router = {
    path: '/',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: () => import('../views/login.vue')
};
export const otherRouters: Router = {
    path: '/main',
    name: 'main',
    permission: '',
    meta: { title: '管理菜单' },
    component: main,
    children: [
        { path: 'home', meta: { title: '主页' }, name: 'home', component: () => import('../views/home/home.vue') }
    ]
}
export const appRouters: Array<Router> = [{
    path: '/main1',
    name: 'setting',
    permission: '',
    meta: { title: 'ManageMenu' },
    icon: '&#xe650;',
    component: main,
    children: [
        { path: 'user', icon: '&#xe634;',permission: 'Pages.Users', meta: { title: '用户' }, name: 'user', component: () => import('../views/setting/user/user.vue') },
        { path: 'role', icon: '&#xe607;',permission: 'Pages.Roles', meta: { title: '角色' }, name: 'role', component: () => import('../views/setting/role/role.vue') },
        { path: 'test', icon: '&#xe608;',permission: 'Pages.Roles', meta: { title: '测试' }, name: 'test', component: () => import('../views/setting/test/test.vue') },
        { path: 'tenant', icon: '&#xe64d;',permission: 'Pages.Tenants', meta: { title: '多租户' }, name: 'tenant', component: () => import('../views/setting/tenant/tenant.vue')}
    ]
}]
//...appRouters,// 对象展开运算符,二级路由
export const routers = [
    loginRouter,
    locking,    
    ...appRouters,
    otherRouters
];
