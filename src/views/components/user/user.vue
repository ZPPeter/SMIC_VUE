<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>      
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="ownSpace">ownSpace</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import util from "../../../lib/util";
// import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 5
    }
  },
  methods: {
    logout () {
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
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    ownSpace() {
      util.openNewPage(this, "ownspace_index", null, null);
      this.$router.push({
        name: "ownspace_index"
      });
    },
    handleClick (name) {
      switch (name) {    
        case 'ownSpace':this.ownSpace()
          break;
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
