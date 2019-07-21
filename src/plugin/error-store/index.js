import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import store from '@/store';
import util from '../../lib/util'
export default {
  install (Vue, options) {    
    if (options.developmentOff && process.env.NODE_ENV === 'development') return    
    Vue.config.errorHandler = (error, vm, mes) => {
      
      //console.error('捕捉到全局异常：');
      //console.error(error);

      let info = {
        type: 'script',
        code: 0,
        mes: error.message,
        //mes: error, //详细,只能  console.log(error) 查看, JSON 无法系列化详细内容 
        url: window.location.href
      }      
      //alert(JSON.stringify(info));
      
      console.log(error) //详情,内有回车换行等

      Vue.nextTick(() => {
        if(window.abp.auth.getToken().length==0) // 未登录
          return;
        //alert(error.message); // 500服务器内部错误（Internal server error）主要是由于IWAM账号的密码错误造成的。
        /* 
        错误收集器 admin 未定义错误，error = {} 但是 error.message = 'admin is not define' 
        因为 JSON.stringify(error) = {}
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
