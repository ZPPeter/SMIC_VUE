<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录SMIC系统" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>          
          <Footer :copyright="L('CopyRight')"></Footer>
        </div>
      </Card>
    </div>    
  </div>  
</template>
<script>
import { Component, Vue,Inject } from 'vue-property-decorator';
import LoginForm from '../components/login-form'
import Footer from '../components/Footer'
import iView from 'view-design';
import AbpBase from '../lib/abpbase'
@Component({
  components:{Footer,LoginForm}
})
export default class Login extends AbpBase {  
  loginModel={
    userNameOrEmailAddress:'',
    password:'',
    rememberMe:false
  }  
  async handleSubmit ({ userName,password }) {    
      this.loginModel.userNameOrEmailAddress = userName
      this.loginModel.password = password    
      this.$Message.loading({
          content:this.L('LoginPrompt'),
          duration:0
      })      
      await this.$store.dispatch({
        type:'app/login',
        data:this.loginModel
      })
      location.reload();
    }  
}
</script>
<style>
</style>
