import appconst from './appconst';
class Util {
    constructor() {
        this.abp = window.abp;
    }
    loadScript(url) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    }
    title(title) {
        //let appname=this.abp.localization.localize('AppName',appconst.localization.defaultLocalizationSourceName);
        let page = this.abp.localization.localize(title, appconst.localization.defaultLocalizationSourceName);
        //window.document.title = appname+'--'+page;
        window.document.title = '仪器检定数据处理系统' + ' - ' + page;
    }
    inOf(arr, targetArr) {
        let res = true;
        arr.forEach(item => {
            if (targetArr.indexOf(item) < 0) {
                res = false;
            }
        });
        return res;
    }
    oneOf(ele, targetArr) {
        if (targetArr.indexOf(ele) >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    showThisRoute(itAccess, currentAccess) {
        if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
            return this.oneOf(currentAccess, itAccess);
        }
        else {
            return itAccess === currentAccess;
        }
    }
    getRouterObjByName(routers, name) {
        if (!name || !routers || !routers.length) {
            return null;
        }
        // debugger;
        let routerObj = null;
        for (let item of routers) {
            if (item.name === name) {
                return item;
            }
            routerObj = this.getRouterObjByName(item.children, name);
            if (routerObj) {
                return routerObj;
            }
        }
        return null;
    }
    toDefaultPage(routers, name, route, next) {
        let len = routers.length;
        let i = 0;
        let notHandle = true;
        while (i < len) {
            if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
                route.replace({
                    name: routers[i].children[0].name
                });
                notHandle = false;
                next();
                break;
            }
            i++;
        }
        if (notHandle) {
            next();
        }
    }
    handleTitle(vm, item) {
        if (typeof item.meta.title === 'object') {
            return vm.$t(item.title.i18n);
        }
        else {
            return item.meta.title;
        }
    }
    setCurrentPath(vm, name) {
        let title = '';
        let isOtherRouter = false;
        vm.$store.state.app.routers.forEach((item) => {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    title = this.handleTitle(vm, item);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            }
            else {
                item.children.forEach((child) => {
                    if (child.name === name) {
                        title = this.handleTitle(vm, child);
                        if (item.name === 'otherRouter') {
                            isOtherRouter = true;
                        }
                    }
                });
            }
        });
        let currentPathArr = [];
        if (name === 'home') {
            currentPathArr = [
                {
                    meta: { title: this.handleTitle(vm, this.getRouterObjByName(vm.$store.state.app.routers, 'home')) },
                    path: 'main/home',
                    name: 'home',
                    icon: 'ios-home'
                }
            ];
        }
        else if ((name.indexOf('index') >= 0 || isOtherRouter) && name !== 'home') {
            currentPathArr = [
                {
                    meta: { title: this.handleTitle(vm, this.getRouterObjByName(vm.$store.state.app.routers, 'home')) },
                    path: 'main/home',
                    name: 'home',
                    icon: 'ios-home'
                },
                {
                    meta: { title: title },
                    path: '',
                    name: name,
                    icon: ''
                }
            ];
        }
        else {
            let currentPathObj = vm.$store.state.app.routers.filter((item) => {
                if (item.children.length <= 1) {
                    return item.children[0].name === name || item.name === name;
                }
                else {
                    let i = 0;
                    let childArr = item.children;
                    let len = childArr.length;
                    while (i < len) {
                        if (childArr[i].name === name) {
                            return true;
                        }
                        i++;
                    }
                    return false;
                }
            })[0];
            if (currentPathObj.children && currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
                currentPathArr = [
                    {
                        meta: { title: 'HomePage' },
                        path: 'main/home',
                        name: 'home',
                        icon: 'ios-home'
                    }
                ];
            }
            else if (currentPathObj.children && currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
                currentPathArr = [
                    {
                        meta: { title: 'HomePage' },
                        path: 'main/home',
                        name: 'home',
                        icon: 'ios-home'
                    },
                    {
                        meta: { title: currentPathObj.meta.title },
                        path: '',
                        name: name,
                        icon: ''
                    }
                ];
            }
            else {
                let childObj = currentPathObj.children.filter((child) => {
                    return child.name === name;
                })[0];
                currentPathArr = [
                    {
                        meta: { title: 'HomePage' },
                        path: 'main/home',
                        name: 'home',
                        icon: 'ios-home'
                    },
                    {
                        meta: { title: currentPathObj.meta.title },
                        path: '',
                        name: '',
                        icon: ''
                    },
                    {
                        meta: { title: childObj.meta.title },
                        path: currentPathObj.path + '/' + childObj.path,
                        name: name,
                        icon: childObj.icon
                    }
                ];
            }
        }
        vm.$store.commit('app/setCurrentPath', currentPathArr);
        return currentPathArr;
    }
    openNewPage(vm, name, argu, query) {
        let pageOpenedList = vm.$store.state.app.pageOpenedList;
        let openedPageLen = pageOpenedList.length;
        let i = 0;
        let tagHasOpened = false;
        while (i < openedPageLen) {
            if (name === pageOpenedList[i].name) { // 页面已经打开
                vm.$store.commit('app/pageOpenedList', {
                    index: i,
                    argu: argu,
                    query: query
                });
                tagHasOpened = true;
                break;
            }
            i++;
        }
        if (!tagHasOpened) {
            let tag = vm.$store.state.app.tagsList.filter((item) => {
                if (item.children) {
                    return name === item.children[0].name;
                }
                else {
                    return name === item.name;
                }
            });
            tag = tag[0];
            if (tag) {
                tag = tag.children ? tag.children[0] : tag;
                if (argu) {
                    tag.argu = argu;
                }
                if (query) {
                    tag.query = query;
                }
                vm.$store.commit('app/increateTag', tag);
            }
        }
        vm.$store.commit('app/setCurrentPageName', name);
    }
    fullscreenEvent(vm) {
        vm.$store.commit('app/initCachepage');
        // 权限菜单过滤相关
        vm.$store.commit('app/updateMenulist');
        // 全屏相关
    }
    extend(...args) {
        let options, name, src, srcType, copy, copyType, copyIsArray, clone, target = args[0] || {}, i = 1, length = args.length, deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = args[i] || {};
            i++;
        }
        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = args[i]) !== null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    srcType = Array.isArray(src) ? 'array' : typeof src;
                    if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && srcType === 'array' ? src : [];
                        }
                        else {
                            clone = src && srcType === 'object' ? src : {};
                        }
                        target[name] = this.extend(deep, clone, copy);
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
    dateFormat(o) {
        return (new Date(o)).Format("yyyy.MM.dd");
    }
    debugObjectAttr(o, status = true) {
        var obj = o;
        for (var n in obj) {
            console.log("属性名:" + n);
            if (!n.startsWith('_') && status)
                console.log("属性值:" + obj[n]);
        }
    }
}
const util = new Util();
export default util;
//# sourceMappingURL=util.js.map

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) === prefix;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

//alert((new Date()).Format("yyyy.MM.dd"));
//alert(("123.png").endsWith('.png'));