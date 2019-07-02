import { appRouters, otherRouters } from '../../router/router';
import Util from '../../lib/util';
import Vue from 'vue';
import Vuex from 'vuex';
import ajax from '../../lib/ajax';
import appconst from '../../lib/appconst';
Vue.use(Vuex);
class AppModule {
    constructor() {
        this.namespaced = true;
        this.state = {
            cachePage: [],
            lang: '',
            isFullScreen: false,
            openedSubmenuArr: [],
            menuTheme: 'light', //dark
            themeColor: '',
            avatarImgPath: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
            pageOpenedList: [{
                    meta: { title: '主页' },
                    path: '',
                    name: 'home'
                }],
            currentPageName: '',
            currentPath: [
                {
                    meta: { title: '主页' },
                    path: '',
                    name: 'home'
                }
            ],
            menuList: [],
            routers: [
                otherRouters,
                ...appRouters
            ],
            tagsList: [...otherRouters.children],
            messageCount: 0,
            dontCache: [],
            version:'版本:1.00',
            noticeList: [{ read: false, type: 0, title: 'First notice', description: 'One day ago' }, { read: false, type: 1 }, { read: false, type: 0, title: 'Second notice', description: 'One month ago' }]
        };
        this.mutations = {
            logout(state) {
                localStorage.clear();
                sessionStorage.clear();
            },
            setAvatar(state, avatarPath) {
                state.avatarImgPath = avatarPath;
            },
            setTagsList(state, list) {
                state.tagsList.push(...list);
            },
            updateMenulist(state) {
                let menuList = [];
                appRouters.forEach((item, index) => {
                    if (item.permission !== undefined) {
                        let hasPermissionMenuArr = [];
                        hasPermissionMenuArr = item.children.filter(child => {
                            if (child.permission !== undefined) {
                                if (Util.abp.auth.hasPermission(child.permission)) {
                                    return child;
                                }
                            }
                            else {
                                return child;
                            }
                        });
                        if (hasPermissionMenuArr.length > 0) {
                            item.children = hasPermissionMenuArr;
                            menuList.push(item);
                        }
                    }
                    else {
                        if (item.children.length === 1) {
                            menuList.push(item);
                        }
                        else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter(child => {
                                return child;
                            });
                            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                            handledItem.children = childrenArr;
                            menuList.splice(len - 1, 1, handledItem);
                        }
                    }
                });
                state.menuList = menuList;
            },
            changeMenuTheme(state, theme) {
                state.menuTheme = theme;
            },
            changeMainTheme(state, mainTheme) {
                state.themeColor = mainTheme;
            },
            addOpenSubmenu(state, name) {
                let hasThisName = false;
                let isEmpty = false;
                if (name.length === 0) {
                    isEmpty = true;
                }
                if (state.openedSubmenuArr.indexOf(name) > -1) {
                    hasThisName = true;
                }
                if (!hasThisName && !isEmpty) {
                    state.openedSubmenuArr.push(name);
                }
            },
            closePage(state, name) {
                state.cachePage.forEach((item, index) => {
                    if (item === name) {
                        state.cachePage.splice(index, 1);
                    }
                });
            },
            initCachepage(state) {
                if (localStorage.cachePage) {
                    state.cachePage = JSON.parse(localStorage.cachePage);
                }
            },
            removeTag(state, name) {
                state.pageOpenedList.map((item, index) => {
                    if (item.name === name) {
                        state.pageOpenedList.splice(index, 1);
                    }
                });
            },
            pageOpenedList(state, get) {
                let openedPage = state.pageOpenedList[get.index];
                if (get.argu) {
                    openedPage.argu = get.argu;
                }
                if (get.query) {
                    openedPage.query = get.query;
                }
                state.pageOpenedList.splice(get.index, 1, openedPage);
                localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
            },
            clearAllTags(state) {
                state.pageOpenedList.splice(1);
                state.cachePage.length = 0;
                localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
            },
            clearOtherTags(state, vm) {
                let currentName = vm.$route.name;
                let currentIndex = 0;
                state.pageOpenedList.forEach((item, index) => {
                    if (item.name === currentName) {
                        currentIndex = index;
                    }
                });
                if (currentIndex === 0) {
                    state.pageOpenedList.splice(1);
                }
                else {
                    state.pageOpenedList.splice(currentIndex + 1);
                    state.pageOpenedList.splice(1, currentIndex - 1);
                }
                let newCachepage = state.cachePage.filter(item => {
                    return item === currentName;
                });
                state.cachePage = newCachepage;
                localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
            },
            setOpenedList(state) {
                state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouters.children[0]];
            },
            setCurrentPath(state, pathArr) {
                state.currentPath = pathArr;
            },
            setCurrentPageName(state, name) {
                state.currentPageName = name;
            },
            clearOpenedSubmenu(state) {
                state.openedSubmenuArr.length = 0;
            },
            increateTag(state, tagObj) {
                if (!Util.oneOf(tagObj.name, state.dontCache)) {
                    state.cachePage.push(tagObj.name);
                    localStorage.cachePage = JSON.stringify(state.cachePage);
                }
                state.pageOpenedList.push(tagObj);
            }
        };
        this.actions = {
            // 415 (Unsupported Media Type    
            // async login(payload: any) {
            // ActionContext: vuex context参数,vuex 的d.ts 提供有类型 ActionContext
            //async login(content: ActionContext<AppState, any>, payload: any) {
            async login(state, payload) {
                //alert(JSON.stringify(payload));
                let rep = await ajax.post("/api/TokenAuth/Authenticate", payload.data);
                //alert(JSON.stringify(rep));
                var tokenExpireDate = payload.data.rememberMe ? (new Date(new Date().getTime() + 1000 * rep.data.result.expireInSeconds)) : undefined;
                Util.abp.auth.setToken(rep.data.result.accessToken, tokenExpireDate);
                Util.abp.utils.setCookieValue(appconst.authorization.encrptedAuthTokenName, rep.data.result.encryptedAccessToken, tokenExpireDate, Util.abp.appPath);
                // ToDo
                localStorage.avatarImgPath = 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png';
                //alert(localStorage.avatorImgPath);
            },            
        };
    }
}
const appModule = new AppModule();
export default appModule;
//# sourceMappingURL=app.js.map