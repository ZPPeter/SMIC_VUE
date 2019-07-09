import main from '../views/main.vue';
export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter = {
    path: '/',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: () => import('../views/login.vue')
};
// 一级路由不显示在左侧菜单区
// 不是[{...}];
export const otherRouters = {
    path: '/main',  // 浏览器显示路径，仅仅显示用
    name: 'main',   // next({name: 'xxx'}); 调用
    permission: '',
    meta: { title: '管理菜单' },
    component: main,  // 上面的 import main from '../views/main.vue'; 在 main.vue 里面有个 <router-view></router-view> 加载路由节点
    children: [
        { path: 'home', meta: { title: '主页' }, name: 'home', component: () => import('../views/home/home.vue') }
    ]
};

// ...appRouters, 对象展开运算符,二级路由,即 子菜单
// [{...}];
export const appRouters = [{
        path: '/main',
        name: 'setting',
        permission: '',
        meta: { title: 'ManageMenu' },  // 中文化名称在 abp 后台设置 window.abp
        icon: '&#xe650;',
        component: main,
        children: [
            { path: 'user', icon: '&#xe634;', permission: 'Pages.Users', meta: { title: '用户' }, name: 'user', component: () => import('../views/setting/user/user.vue') },
            { path: 'role', icon: '&#xe607;', permission: 'Pages.Roles', meta: { title: '角色' }, name: 'role', component: () => import('../views/setting/role/role.vue') },
            //{ path: 'test', icon: '&#xe608;', permission: 'Pages.Roles', meta: { title: '测试' }, name: 'test', component: () => import('../views/setting/test/test.vue') },
            { path: 'tenant', icon: '&#xe64d;', permission:  'Pages.Tenants', meta: { title: '多租户' }, name: 'tenant', component: () => import('../views/setting/tenant/tenant.vue') },
            { path: 'vw_sjmx', icon: '&#xe608;', permission: 'Pages.Tenants', meta: { title: '送检明细' }, name: 'vw_sjmx', component: () => import('../views/sdim/vw_sjmx/vw_sjmx.vue') }
        ]
}, {
    path: '/manage',
    name: 'manage',
    permission: '',
    meta: { title: '会员管理' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'member', icon: '&#xe608;', permission: 'Pages.Roles',  meta: { title: '会员' }, name: 'member', component: () => import('../views/manage/member/member.vue') }
    ]
}];

// 一级路由不显示在左侧菜单区域
export const routers = [
    loginRouter,
    locking,
    ...appRouters,//...appRouters, 对象展开运算符,二级路由，显示与左侧
    otherRouters
];
//# sourceMappingURL=router.js.map