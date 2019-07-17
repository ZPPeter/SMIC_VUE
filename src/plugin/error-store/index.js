import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import store from '@/store';
export default {
  install (Vue, options) {    
    if (options.developmentOff && process.env.NODE_ENV === 'development') return    
    Vue.config.errorHandler = (error, vm, mes) => {      
      let info = {
        type: 'script',
        code: 0,
        mes: error.message,
        url: window.location.href
      }
      //alert(JSON.stringify(info));
      Vue.nextTick(() => {  
        store.dispatch('app/addErrorLog', info)
        //this.$store.dispatch({
        //  type:'app/addErrorLog',
        //  data:info
        //});
      })
    }
  }
}
