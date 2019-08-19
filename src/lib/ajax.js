//import '@babel/polyfill';
import axios from 'axios';
import appconst from './appconst';
import Vue from 'vue';
import store from '@/store';

// 使用自定义配置新建一个 axios 实例
const ajax = axios.create({
    baseURL: appconst.remoteServiceBaseUrl,
    timeout: 30000
});

// Ajax 错误收集
const addErrorLog = errorInfo => {
    const { statusText, status, request: { responseURL } } = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    }
    //if (!responseURL.includes('save_error_logger')){
    if (responseURL && !responseURL.includes('save_error_logger')) {
        store.dispatch('app/addErrorLog', info);
    }
    if (!responseURL) {  // for IE
        store.dispatch('app/addErrorLog', info);
    }
}

// axios interceptors 拦截器中添加headers 属性
ajax.interceptors.request.use(function (config) {
    if (!!window.abp.auth.getToken()) {
        config.headers.common["Authorization"] = "Bearer " + window.abp.auth.getToken();
    }
    config.headers.common[".AspNetCore.Culture"] = window.abp.utils.getCookieValue("Abp.Localization.CultureName");
    config.headers.common["Abp.TenantId"] = window.abp.multiTenancy.getTenantIdCookie();
    return config;
}, function (error) {
    return Promise.reject(error);
});

let vm = new Vue({});

// response
ajax.interceptors.response.use((respon) => {
    return respon;
}, (error) => {
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
        vm.$Modal.error({ title: error.response.data.error.message, content: error.response.data.error.details });
    }
    else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
        vm.$Modal.error({
            //title: window.abp.localization.localize("LoginFailed"), 
            title: '发生错误',
            content: error.response.data.error.message
        });
    }
    else if (!error.response) {
        vm.$Modal.error(window.abp.localization.localize('UnknownError'));
    }
    setTimeout(() => {
        vm.$Message.destroy();
    }, 1000);

    //alert((error.response.status===404));
    if (error.response.status === 404) {
        vm.$Modal.error({
            title: '404 错误',
            content: '请求的服务器资源不存在！'
        });
    }
    if (error.response.status === 500) {
        if (error.response.config.url.includes('/api/TokenAuth/Authenticate')) {
            vm.$Modal.error({
                title: '登录失败',
                content: '用户名或者密码错误！'
            });
        }
        else {
            vm.$Modal.error({
                title: '500 错误',
                content: '未知错误！'
            });
        }
    }
    else
        addErrorLog(error.response);

    return Promise.reject(error);
});
export default ajax;