<template>
  <div class="user-avatar-dropdown">
    <div class="notice-avatar-dropdown">
      <Poptip trigger="hover" placement="top-start" v-model="visible" style="cursor:auto;">
        <Avatar :src="userAvatar" />
        <Icon :size="18" type="md-arrow-dropdown"></Icon>
        <div slot="content" class="content">
          <Avatar :src="userAvatar" id="avatar" />
          {{userSurename}}
          <hr />          
          <Button @click="changePwdModel=true">修改密码</Button>
          <!-- <Button type="primary" @click="handleClick('changePassword')">修改密码</Button> -->
          <br />
          <Button @click="handleClick('logout')">退出登录</Button>
        </div>
      </Poptip>
    </div>
    <Modal
      title="修改登录密码"
      v-model="changePwdModel"
      :mask-closable="false"
      @on-ok="save"
    >
      <Card dis-hover>
        <div class="page-body">
          <Form ref="pwdForm" :label-width="120" label-position="left" inline :rules="rules">
            <Row>
              <FormItem label="原密码:" style="width:320px;" prop="oldPwd">
                <Input placeholder="原密码" :maxlength="12" :minlength="5"></Input>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="新密码:" style="width:320px" prop="newPwd1">
                <Input placeholder="新密码" :maxlength="12" :minlength="5"></Input>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="确认新密码:" style="width:320px" prop="newPwd2">
                <Input placeholder="确认新密码" :maxlength="12" :minlength="5"></Input>
              </FormItem>
            </Row>            
          </Form>
        </div>
      </Card>
    </Modal>
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
    },
    userSurename: {
      type: String,
      default: ""
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data() {
    return {
      visible: false,
      changePwdModel: false,
      loading: true
    };
  },
  methods: {
    save() {
      (this.$refs.pwdForm).validate(async (valid) => {
        if (valid) {
          //await this.$store.dispatch({
          //    type:'role/create',
          //    data:this.role
          //});
          (this.$refs.pwdForm).resetFields();
          this.$emit("save-success");
          this.$emit("input", false);

          this.changePwdModel = false;
          this.$Message.info("密码修改完毕！");
        }
      });
    },
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
  },
  computed: {
    rules () {
      return {
        oldPwd: this.passwordRules,
        newPwd1: this.passwordRules,
        newPwd2: this.passwordRules,
      }
    }
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
  cursor: auto;
  padding: 5px;
  line-height: 50px;
  margin: 0px;
}
</style>