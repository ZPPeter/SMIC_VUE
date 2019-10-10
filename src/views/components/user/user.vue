<template>
  <div class="user-avatar-dropdown">
    <div class="notice-avatar-dropdown">
      <Poptip trigger="hover" placement="top-start" v-model="visible" style="cursor:auto;">
        <Avatar :src="userAvatar" />
        <Icon :size="18" type="md-arrow-dropdown"></Icon>
        <div slot="content" class="content">
          <Tooltip
            max-width="200"
            :content="userRoles"
          >
            <Avatar :src="userAvatar" id="avatar" />
          </Tooltip>
          &nbsp;
          {{userSurename}}
          <hr />
          <hr style="height:15px;border:0px;" />
          <a href="javascript:;" @click="changePwdModelShow=true">
            <Icon type="md-key" size="21" />&nbsp;&nbsp;&nbsp;修改密码
          </a>
          <!-- 
            <Button type="text" @click="changePwdModelShow=true">修改密码</Button>
          <Button type="primary" @click="handleClick('changePassword')">修改密码</Button>-->
          <br />
          <a href="javascript:;" @click="changeAwatarModelShow=true">
            <Icon type="md-person" size="21" />&nbsp;&nbsp;&nbsp;修改头像
          </a>
          <br />
          <div style="text-align: center;">
            <Button
              size="large"
              shape="circle"
              icon="md-exit"
              @click="handleClick('logout')"
            >&nbsp;退出系统</Button>
          </div>
        </div>
      </Poptip>
    </div>
    <change-pwd v-model="changePwdModelShow" @save-success="logout"></change-pwd>
    <change-awatar v-model="changeAwatarModelShow" @save-success="reload_"></change-awatar>
  </div>
</template>

<script type="ts">
import "./user.less";
import util from "../../../lib/util";
import ChangePwd from "./change-pwd.vue";
import ChangeAwatar from "./change-awatar.vue";
export default {
  components: {
    ChangePwd,
    ChangeAwatar
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
    userRoles:{
      type:String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      changePwdModelShow: false,
      changeAwatarModelShow: false,
      loading: true
    };
  },
  methods: {
    close() {
      this.visible = false;
    },
    reload_() {
      location.reload(); //this.reload() 无效
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
    /*changePassword() {
      this.$router.push({
        // 修改 url，完成跳转
        name: "changePassword"
      });
    },
    ownSpace() {
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
        /*case "changePassword":
          this.changePassword();
          break;*/
      }
    },
    created() {}
  }
};
</script>

<!-- scoped 不起作用??? -->
<style scoped>
a:link {
  color: black;
} /* 未访问的链接 */
a:visited {
  color: black;
} /* 已访问的链接 */
a:hover {
  color: rgb(6, 155, 248);
} /* 当有鼠标悬停在链接上 */
a:active {
  color: black;
} /* 被选择的链接 */
.ivu-poptip-body {
  padding: 2px 2px;
}
.ivu-poptip-body-content {
  overflow: auto;
  background-color: cadetblue;
}
</style>
<style>
a:hover {
  color: #ff00ff;
}
.content {
  width: 158px;
  cursor: auto;
  padding: 0px;
  line-height: 50px;
  margin: 0px;
  font-size: 14px;
}
</style>