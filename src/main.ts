//import 'babel-polyfill';
import Vue from 'vue';
import App from './app.vue';
import iView from 'iview';
import config from '@/config'
import installPlugins from '@/plugin'
import {router} from './router/index';
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';
import './theme.less';
//import './language';
import Ajax from './lib/ajax';
import Util from './lib/util';
import SignalRAspNetCoreHelper from './lib/SignalRAspNetCoreHelper';
Vue.use(iView);
import store from './store/index';

/**
 * @description 注册admin内置插件
 */
installPlugins(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

import { appRouters,otherRouters} from './router/router';

if(!abp.utils.getCookieValue('Abp.Localization.CultureName')){
  //let language=navigator.language;  
  let language="zh-Hans";
  abp.utils.setCookieValue('Abp.Localization.CultureName',language,new Date(new Date().getTime() + 5 * 365 * 86400000),abp.appPath);
}

if(abp.utils.getCookieValue('Abp.Localization.CultureName')=='zh-CN'){
  let language="zh-Hans";
  abp.utils.setCookieValue('Abp.Localization.CultureName',language,new Date(new Date().getTime() + 5 * 365 * 86400000),abp.appPath);  
}

//默认 NODE_ENV 为环境变量名称
//可自行在 process.env 对象下定义需要使用的变量,在项目中可以根据
//不同的 env 值设置 defaultUrl 或者其他值
//alert('当前 process.env.NODE_ENV 环境变量:' + process.env.NODE_ENV);  // yarn serve -> dev

//navigator.language 获得的语言不一定正确
//alert(navigator.language) -> zh-CN
//服务器是 zh-Hans
//手动修改
//abp.utils.setCookieValue('Abp.Localization.CultureName',"zh-Hans",new Date(new Date().getTime() + 5 * 365 * 86400000),abp.appPath);
Ajax.get('/AbpUserConfiguration/GetAll').then(data=>{  
  //alert(JSON.stringify(data.data.result.localization.languages)) // ABP 内置语言名称，不是 SMIC.Core 里面的 
  //console.log(data.data.result);
  //window.abp.auth 等设置初始化
  Util.abp=Util.extend(true,Util.abp,data.data.result);
  new Vue({
    render: h => h(App),
    router:router,
    store:store,
    data: {
      currentPageName: ''
    },
    async mounted () {
      this.currentPageName = this.$route.name as string;
      await this.$store.dispatch({
        type:'session/init'
      })
      if(!!this.$store.state.session.user&&this.$store.state.session.application.features['SignalR']){
        if (this.$store.state.session.application.features['SignalR.AspNetCore']) {
            SignalRAspNetCoreHelper.initSignalR();
        }
      }
      this.$store.commit('app/initCachepage');
      this.$store.commit('app/updateMenulist');
      Ajax.get('/api/services/app/Session/GetCurrentLoginInformations').then(data=>{
        //console.log(JSON.stringify(data.data.result.application));
        this.$store.state.app.version = "版本:" + data.data.result.application.version +" 【" + Util.dateFormat(data.data.result.application.releaseDate) +"】";
      })
      //let rep = await ajax.get("");
    },
    created () {
      let tagsList:Array<any> = [];
      appRouters.map((item) => {
          if (item.children.length <= 1) {
              tagsList.push(item.children[0]);
          } else {
              tagsList.push(...item.children);
          }
      });
      this.$store.commit('app/setTagsList', tagsList);
    }
  }).$mount('#app')
})

