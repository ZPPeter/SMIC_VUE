import Vue from 'vue';
import App from './app.vue';
import iView from 'iview';
import config from '@/config'
import installPlugin from '@/plugin'
import {router} from './router/index';
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';
import './theme.less';
import Ajax from './lib/ajax';
import Util from './lib/util';
import SignalRAspNetCoreHelper from './lib/SignalRAspNetCoreHelper';
Vue.use(iView);
import store from './store/index';

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
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
//navigator.language 获得的语言不一定正确
//alert(navigator.language) -> zh-CN
//手动修改
//abp.utils.setCookieValue('Abp.Localization.CultureName',"zh-Hans",new Date(new Date().getTime() + 5 * 365 * 86400000),abp.appPath);

Ajax.get('/AbpUserConfiguration/GetAll').then(data=>{
  //alert(JSON.stringify(data.data.result.localization.languages)) // ABP 内置语言名称，不是 SMIC.Core 里面的 
  //console.log(data.data.result);
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

