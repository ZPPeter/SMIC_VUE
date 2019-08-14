import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import store from '@/store';
import util from '../../lib/util'
export default {
  install (Vue, options) {    
    if (options.developmentOff && process.env.NODE_ENV === 'development') return    
    Vue.config.errorHandler = (error, vm, mes) => {     
      //alert(error.message.includes('Cannot read property'))
      if(error.message.includes('Cannot read property')){
        new Vue({}).$Modal.error({ title: '客户端源码错误', content: error.message + '<br>请联系管理员解决!'}); // 不处理会 endless loop
        return;
      }
      console.error('Vue errorHandler：' + error); //详情,内有回车换行等
      //console.log(error); //详情,内有回车换行等

      let info = {
        type: 'script',
        code: 0,
        mes: error.message,
        //mes: error, //详细,只能  console.log(error) 查看, JSON 无法系列化详细内容 
        url: window.location.href
      }      
      //alert(JSON.stringify(info));

      Vue.nextTick(() => {
        if(window.abp.auth.getToken().length==0) // 未登录
          return;
        
        //alert('src/plugin/error-store/index.js:'+error.message); // 500服务器内部错误（Internal server error）主要是由于IWAM账号的密码错误造成的。
        
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
