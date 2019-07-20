<template>
  <div class="user-avatar-dropdown">
    <div class="notice-avatar-dropdown">
      <Poptip trigger="hover" placement="top-start" v-model="visible" style="cursor:auto;">
        <Avatar :src="userAvatar" />
        <Icon :size="18" type="md-arrow-dropdown"></Icon>
        <div slot="content" class="content">        
          <Avatar :src="userAvatar" id="avatar" />&nbsp;
          {{userSurename}}        
          <hr />
          <hr style="height:15px;border:0px;" />          
          <a href='javascript:;' @click="changePwdModelShow=true" style="color:rgb(100, 100, 100);">
            <Icon type="md-key" size="21"/>&nbsp;&nbsp;&nbsp;修改密码</a>
          <!-- 
            <Button type="text" @click="changePwdModelShow=true">修改密码</Button>
            <Button type="primary" @click="handleClick('changePassword')">修改密码</Button> -->
          <br />
          <Icon type="md-person" size="21"/>
          <Button type="text" @click="change=true">修改头像</Button>
          <br />
          <Icon type="md-settings" size="21"/>
          <Button type="text" @click="change=true">我的设置</Button>
          <br />                    
          <Button shape="circle" icon="md-exit" @click="handleClick('logout')">注销</Button>
        </div>
      </Poptip>
    </div>
    <change-pwd v-model="changePwdModelShow" @save-success="logout"></change-pwd>
  </div>
</template>

<script type="ts">
import "./user.less";
import util from "../../../lib/util";
import ChangePwd from "./change-pwd.vue";
export default {
  components: {
    ChangePwd
  },
  name: "User",
  props: {
    userAvatar: {
      type: String,
      default: ""
    },
    userSurename: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      visible: false,
      changePwdModelShow: false,
      loading: true
    };
  },
  methods: {
    close() {
      this.visible = false;
    },
    logout() {
      this.$store.commit("app/logout", this);
      util.abp.auth.clearToken();
      location.reload();
      /*
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      }) */
    },
    changePassword() {
      this.$router.push({
        // 修改 url，完成跳转
        name: "changePassword"
      });
    },
    /*ownSpace() {
      util.openNewPage(this, "ownspace_index", null, null);
      this.$router.push({
        name: "ownspace_index"
      });
    },*/
    handleClick(name) {
      this.close();
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "changePassword":
          this.changePassword();
          break;
      }
    },
    created() {
    },
  },
};
</script>

<!-- scoped 不起作用??? -->
<style scoped>
.ivu-poptip-body {
  padding: 2px 2px;
}
.ivu-poptip-body-content {
  overflow: auto;
  background-color: cadetblue;
}
</style>
<style>
.content {  
  width:158px;
  cursor: auto;
  padding: 0px;
  line-height: 50px;
  margin: 0px;
  font-size: 14px;    
}
</style>