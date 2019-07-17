<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvatar" />
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="changePassword_">
          <Poptip placement="bottom-end" @on-popper-show="getNotices">
            修改密码
            <div slot="content" class="content">
              <div>修改密码界面</div>
              <div>修改密码界面</div>
              <div>修改密码界面</div>
              <div>修改密码界面</div>
            </div>
          </Poptip>
        </DropdownItem>
        <DropdownItem name="changePassword">
          <Poptip placement="bottom-end">
            修改密码_新页面
            <div slot="content" class="content">
              <div>...</div>
            </div>
          </Poptip>
        </DropdownItem>        
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import "./user.less";
import util from "../../../lib/util";
// import { mapActions } from 'vuex'
export default {
  noticeSpinShow:true,
  name: "User",
  props: {
    userAvatar: {
      type: String,
      default: ""
    }
  },
  methods: {
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
    getNotices(){
        setTimeout(()=>{
            this.noticeSpinShow=false;
        },2000)
    },
    /*ownSpace() {
      util.openNewPage(this, "ownspace_index", null, null);
      this.$router.push({
        name: "ownspace_index"
      });
    },*/
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "changePassword":
          this.changePassword();
          break;
      }    
    }    
  }
};
</script>
<style scoped>
    .content{
        padding:-8px -16px;
    }
</style>
