<template>
  <div class="user-avatar-dropdown">
    <div class="notice-avatar-dropdown">
      <Poptip trigger="hover" placement="top-start" v-model="visible">
        <Avatar :src="userAvatar" />
        <Icon :size="18" type="md-arrow-dropdown"></Icon>
        <div slot="content">
          这是我的自定义内容
          <hr />
          <Button type="parimary" @click="handleClick('changePassword')">修改密码</Button>
          <br />
          <Button @click="handleClick('logout')">退出登录</Button>
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script>
import "./user.less";
import util from "../../../lib/util";
// import { mapActions } from 'vuex'
export default {
  name: "User",
  props: {
    userAvatar: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false
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
    }
  }
};
</script>

<style scoped>
.ivu-poptip {
  display: inline-block;
}
.ivu-poptip-rel {
  display: inline-block;
  position: relative;
}
.ivu-poptip-title {
  margin: 0;
  padding: 8px 16px;
  position: relative;
}
.ivu-poptip-title:after {
  content: "";
  display: block;
  height: 1px;
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 0;
  background-color:red !important;
}
.ivu-poptip-title-inner {
  color: #17233d;
  font-size: 14px;
}
.ivu-poptip-body {
  padding: 8px 16px;
  background-color:red !important;
}
.ivu-poptip-body-content {
  overflow: auto;
  background-color:red !important;
}
.ivu-poptip-body-content-word-wrap {
  white-space: pre-wrap;
  text-align: justify;
}
.ivu-poptip-body-content-inner {
  color: #515a6e;
}
.ivu-poptip-inner {
  width: 100%;
  background-color:red !important;
  background-clip: padding-box;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}
.ivu-poptip-popper {
  min-width: 150px;
  display: block;
  visibility: visible;
  font-size: 12px;
  line-height: 1.5;
  position: absolute;
  z-index: 1060;
  background-color:red !important;
}
.ivu-poptip-popper[x-placement^="top"] {
  padding: 7px 0 10px 0;
}
.ivu-poptip-popper[x-placement^="right"] {
  padding: 0 7px 0 10px;
}
.ivu-poptip-popper[x-placement^="bottom"] {
  padding: 10px 0 7px 0;
}
.ivu-poptip-popper[x-placement^="left"] {
  padding: 0 10px 0 7px;
}
.ivu-poptip-popper[x-placement^="top"] .ivu-poptip-arrow {
  bottom: 3px;
  border-width: 7px 7px 0;
  border-top-color: rgba(217, 217, 217, 0.5);
}
.ivu-poptip-popper[x-placement="top"] .ivu-poptip-arrow {
  left: 50%;
  margin-left: -7px;
}
.ivu-poptip-popper[x-placement="top-start"] .ivu-poptip-arrow {
  left: 16px;
  background-color:red !important;
}
.ivu-poptip-popper[x-placement="top-end"] .ivu-poptip-arrow {
  right: 16px;
}
.ivu-poptip-popper[x-placement^="right"] .ivu-poptip-arrow {
  left: 3px;
  border-width: 7px 7px 7px 0;
  border-right-color: rgba(217, 217, 217, 0.5);
}
.ivu-poptip-popper[x-placement="right"] .ivu-poptip-arrow {
  top: 50%;
  margin-top: -7px;
}
.ivu-poptip-popper[x-placement="right-start"] .ivu-poptip-arrow {
  top: 8px;
}
.ivu-poptip-popper[x-placement="right-end"] .ivu-poptip-arrow {
  bottom: 8px;
}
.ivu-poptip-popper[x-placement^="left"] .ivu-poptip-arrow {
  right: 3px;
  border-width: 7px 0 7px 7px;
  border-left-color: rgba(217, 217, 217, 0.5);
}
.ivu-poptip-popper[x-placement="left"] .ivu-poptip-arrow {
  top: 50%;
  margin-top: -7px;
}
.ivu-poptip-popper[x-placement="left-start"] .ivu-poptip-arrow {
  top: 8px;
}
.ivu-poptip-popper[x-placement="left-end"] .ivu-poptip-arrow {
  bottom: 8px;
}
.ivu-poptip-popper[x-placement^="bottom"] .ivu-poptip-arrow {
  top: 3px;
  border-width: 0 7px 7px;
  border-bottom-color: rgba(217, 217, 217, 0.5);
}
.ivu-poptip-popper[x-placement="bottom"] .ivu-poptip-arrow {
  left: 50%;
  margin-left: -7px;
}
.ivu-poptip-popper[x-placement="bottom-start"] .ivu-poptip-arrow {
  left: 16px;
}
.ivu-poptip-popper[x-placement="bottom-end"] .ivu-poptip-arrow {
  right: 16px;
  background-color:red !important;
}
.ivu-poptip-popper[x-placement^="top"] .ivu-poptip-arrow:after {
  content: " ";
  bottom: 1px;
  margin-left: -7px;
  border-bottom-width: 0;
  border-top-width: 7px;
  border-top-color: #fff;
}
.ivu-poptip-popper[x-placement^="right"] .ivu-poptip-arrow:after {
  content: " ";
  left: 1px;
  bottom: -7px;
  border-left-width: 0;
  border-right-width: 7px;
  border-right-color: #fff;
}
.ivu-poptip-popper[x-placement^="bottom"] .ivu-poptip-arrow:after {
  content: " ";
  top: 1px;
  margin-left: -7px;
  border-top-width: 0;
  border-bottom-width: 7px;
  border-bottom-color: #fff;
}
.ivu-poptip-popper[x-placement^="left"] .ivu-poptip-arrow:after {
  content: " ";
  right: 1px;
  border-right-width: 0;
  border-left-width: 7px;
  border-left-color: #fff;
  bottom: -7px;
}
.ivu-poptip-arrow,
.ivu-poptip-arrow:after {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-color: transparent;
  border-style: solid;
}
.ivu-poptip-arrow {
  border-width: 8px;
}
.ivu-poptip-arrow:after {
  content: "";
  border-width: 7px;
}

</style>
