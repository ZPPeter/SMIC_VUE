import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import store from '@/store';
export default {
  install (Vue, options) {    
    if (options.developmentOff && process.env.NODE_ENV === 'development') return    
    Vue.config.errorHandler = (error, vm, mes) => {
      
      //console.error('捕捉到全局异常：');
      //console.error(error);

      let info = {
        type: 'script',
        code: 0,
        //mes: error.message,
        mes: error, //详细
        url: window.location.href
      }      
      //alert(JSON.stringify(info));
      //alert(error.message); 
      Vue.nextTick(() => {
        if(window.abp.auth.getToken().length==0) // 未登录
          return;
        //alert(error.message); // 500服务器内部错误（Internal server error）主要是由于IWAM账号的密码错误造成的。
        /* 
        错误收集器 admin 未定义错误，error = {} ，error.message = 'admin is not define' ???
        */
        store.dispatch('app/addErrorLog', info)
        //this.$store.dispatch({
        //  type:'app/addErrorLog',
        //  data:info
        //});
      })
    }
  }
}
