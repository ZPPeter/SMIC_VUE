<style lang="less">
@import "./main.less";
@import "../assets/fonts/iconfont.css";
</style>
<template>
  <Layout style="height: 100%" class="main">
    <Sider
      hide-trigger
      collapsible
      :width="210"
      :collapsed-width="80"
      v-model="shrink"
      class="left-sider"
      :style="{overflow: 'hidden'}"
    >
      <shrinkable-menu
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :before-push="beforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
      >
        <!-- 
        <div slot="top" class="logo-con">
          <img v-show="!shrink" :src="maxLogo" key="max-logo">
          <img v-show="shrink" :src="minLogo" key="min-logo">
        </div>
        -->
      </shrinkable-menu>
      <div class="copyright" :class="shrink?'copyright_a':'copyright_b'">{{copyRight}}</div>
    </Sider>
    <!-- 
                <Menu  width="auto" :class="menuitemClasses" accordion theme="light">
                    <Submenu name="1" >
                        <template slot="title">
                            <Icon type="ios-paper" />
                            <span>内容管理</span>
                        </template>
                        <MenuItem name="1-1" >
                            <span>文章管理</span>
                            <Icon type="ios-arrow-forward" />    
                        </MenuItem>
                        <MenuItem name="1-2">
                            <span>评论管理</span>
                            <Icon type="ios-arrow-forward" />                           
                        </MenuItem>
                        <MenuItem name="1-3">
                            <span>举报管理</span>
                            <Icon type="ios-arrow-forward" />              
                        </MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-people" />
                            用户管理
                        </template>
                        <MenuItem name="2-1">新增用户</MenuItem>
                        <MenuItem name="2-2">活跃用户</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-stats" />
                            统计分析
                        </template>
                        <MenuGroup title="使用">
                            <MenuItem name="3-1">新增和启动</MenuItem>
                            <MenuItem name="3-2">活跃分析</MenuItem>
                            <MenuItem name="3-3">时段分析</MenuItem>
                        </MenuGroup>
                        <MenuGroup title="留存">
                            <MenuItem name="3-4">用户留存</MenuItem>
                            <MenuItem name="3-5">流失用户</MenuItem>
                        </MenuGroup>
                    </Submenu> 
                </Menu>
    -->
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="shrink" @on-coll-change="toggleClick">
          <lock-screen v-if="$config.showLock"></lock-screen>
          <user
            :user-avatar="avatarPath"
            :user-surename="userSurename"
            :user-roles="userRoles"
            style="margin-right: 5px;margin-top: -8px;"
          />
          <language-list v-if="$config.useI18n" style="margin-right: 10px;" :lang="local"></language-list>
          <!-- v-if="isAdminUser" -->
          <error-store
            v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader && !$config.plugin['error-store'].developmentOff"
            :has-read="hasReadErrorPage"
            :count="errorCount"
            style="margin-right: 15px;"
          ></error-store>
          <full-screen
            v-model="isFullScreen"
            @on-change="fullscreenChange"
            style="margin-right: 15px;"
          ></full-screen>
          <notice :unread-count="unreadNoticeCount()" v-if="$config.showNotice" style="margin-right: 20px;"></notice>
        </header-bar>
      </Header>

      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <!-- tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened -->
            <tags-nav :value="$route" @input="handleClick" :list="pageTagsList" @on-close="handleCloseTag"/>
          </div>
          <div class="single-page-con" :style="{left: shrink?'80px':'210px'}">
            <Content class="content-wrapper">
              <keep-alive :include="cachePage">
                <router-view></router-view>
              </keep-alive>
            </Content>
            <div class="version">{{version}}</div>
          </div>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import shrinkableMenu from "../components/shrinkable-menu/shrinkable-menu.vue";

//import tagsPageOpened from "../components/tags-nav/tags-page-opened.vue";
import tagsNav from "../components/tags-nav/tags-nav.vue";

import HeaderBar from "../components/header-bar.vue";
//import siderTrigger from "../components/sider-trigger/sider-trigger.vue";
//import customBreadCrumb from "../components/custom-bread-crumb/custom-bread-crumb.vue";
//import breadcrumbNav from "../components/breadcrumb-nav.vue";
import fullScreen from "./components/fullscreen/fullscreen.vue";
import lockScreen from "../components/lockscreen/lockscreen.vue";
import User from "./components/user";
import ErrorStore from "./components/error-store";
import notice from "../components/notices/notice.vue";
import util from "../lib/util";
//import copyfooter from "../components/Footer.vue";
import LanguageList from "./components/language";
import AbpBase from "../lib/abpbase";
import config from "@/config";
//import '@/assets/fonts/iconfont.css'; //main.less 引用 ttf 即可
@Component({
  props: {
    //copyright:String
  },
  components: {
    shrinkableMenu,
    //siderTrigger,
    //customBreadCrumb,
    ErrorStore,
    User,
    HeaderBar,
    //tagsPageOpened,
    tagsNav,
    //breadcrumbNav,
    fullScreen,
    lockScreen,
    notice,
    //copyfooter,
    LanguageList
  }
})
export default class Main extends AbpBase {
  shrink: boolean = false;
  isFullScreen: boolean = false;
  messageCount: string = "0";
  //unreadCount:Number = this.$store.state.session.unreadNoticeCount;
  //errorCount: Number = 0;
  //collapsed: boolean = false;
  //minLogo: any = require("../assets/images/logo-min.png");
  //maxLogo: any = require("../assets/images/logo.png");  
  get userSurename() {
    return this.$store.state.session.user
      ? this.$store.state.session.user.surname
      : "";
  }
  get userRoles() {
    //alert(JSON.stringify(this.$store.state.session.user))
    //return this.$store.state.session.user
    //  ? '角色：'+this.$store.state.session.user.roles
    //  : "角色：未定义";
    let ret = "角色：访客"
    if(this.$store.state.session.user){
      if(this.$store.state.session.user.roles.length>0)
        ret = '角色：'+this.$store.state.session.user.roles;
    }
    return ret;
  }  
  get isAdminUser() {
    //return this.userName === "admin";
    return this.$store.state.session.user.roles.includes('ADMIN');
  }
  get userName() {
    return this.$store.state.session.user
      ? this.$store.state.session.user.userName
      : "";
  }
  get openedSubmenuArr() {
    return this.$store.state.app.openedSubmenuArr;
  }
  get copyRight() {
    var dt = new Date().getFullYear();    
    var dc = dt > 2019 ? "2019-" + dt.toString() : "2019";
    return "© " + dc + " SMIC"; // 不写此句则来自服务器多语言配置 © 2019 SMIC
  }
  get menuList() {
    return this.$store.state.app.menuList;
  }
  get pageTagsList() {
    return this.$store.state.app.pageOpenedList as Array<any>;
  }
  get currentPath() {
    return this.$store.state.app.currentPath;
  }
  get lang() {
    return this.$store.state.app.lang;
  }
  get version() {
    //alert(this.$store.state.app.version);
    return this.$store.state.app.version;
  }
  get avatarPath() {
    //alert(this.$store.state.app.avatarImgPath + this.$store.state.session.user.id + '.png'); //Error id is null
    //return localStorage.avatarImgPath;
    //picStr = "http://localhost:21021/images/logo.png?t="+(+new Date());
    var picStr = "";
    if (this.$store.state.session.user) {
      picStr =
        this.$store.state.app.avatarImgPath +
        this.$store.state.session.user.id +
        ".png?t="+(+new Date());      
    }
    return picStr;
  }
  get cachePage() {    
    return this.$store.state.app.cachePage;
  }
  get menuTheme() {
    return this.$store.state.app.menuTheme;
  }
  get mesCount() {
    return this.$store.state.app.messageCount;
  }
  get rotateIcon() {
    return ["menu-item", this.shrink ? "rotate-icon" : ""];
  }
  get menuitemClasses() {
    return ["menu-item", this.shrink ? "collapsed-menu" : ""];
  }
  get hasReadErrorPage() {
    return this.$store.state.app.hasReadErrorPage;
  }
  get errorCount() {
    return this.$store.state.app.errorCount;
  }
  //get unreadCount() {
  //  return this.$store.state.user.unreadCount;
  //}
  get local() {
    return this.$store.state.app.local;
  }
  // methods
  unreadNoticeCount()
  {
    return this.$store.state.ur_notice.unreadCount;
  }
  async init() {
    let pathArr = util.setCurrentPath(this, this.$route.name as string);
    this.$store.commit("app/updateMenulist");
    if (pathArr.length >= 2) {
      this.$store.commit("app/addOpenSubmenu", pathArr[1].name);
    }
    let messageCount = 0;
    this.messageCount = messageCount.toString();  
    
    await this.$store.dispatch('ur_notice/getUnreadCount'); //未读消息列表
    
    //this.unreadCount = this.$store.state.ur_notice.unreadCount;
    
    this.checkTag(this.$route.name);
  }
  toggleClick() {
    this.shrink = !this.shrink;
  }
  checkTag(name?: string) {
    let openpageHasTag = this.pageTagsList.some((item: any) => {
      if (item.name === name) {
        return true;
      } else {
        return false;
      }
    });
    if (!openpageHasTag) {
      util.openNewPage(
        this,
        name as string,
        this.$route.params || {},
        this.$route.query || {}
      );
    }
  }
  handleSubmenuChange(val: string) {
    // console.log(val)
  }
  beforePush(name: string) {
    if (name === "accesstest_index") {
      return false;
    } else {
      return true;
    }
  }
  fullscreenChange(isFullScreen: boolean) {
    // console.log(isFullScreen);
  }
  turnToPage(route) {
    var name;
    var params;
    var query;
    if (typeof route === "string") name = route;
    else {
      name = route.name;
      params = route.params;
      query = route.query;
    }
    if (name.indexOf("isTurnByHref_") > -1) {
      window.open(name.split("_")[1]);
      return;
    }
    this.$router.push({
      name,
      params,
      query
    });
  }
  linkTo(item: any) {
    let routerObj: any = {};
    routerObj.name = item.name;
    if (item.argu) {
      routerObj.params = item.argu;
    }
    if (item.query) {
      routerObj.query = item.query;
    }
    if (this.beforePush(item)) {
      this.$router.push(routerObj);
    }
  }
  handleCollapsedChange(state) {
    this.shrink = state;
  }  
  handleCloseTag(res, type, route) {    
      /*
      tags-nav.vue
      handleTagsOption (type) {
      this.$emit('on-close', res, 'all')
      */
alert(type)
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(config.homeName)
        } else {
          //if (routeEqual(this.$route, route)) {
          //  this.closeTag(route)
          //}
        }
      }
      //this.setTagNavList(res)      
  }
  handleClick(item) {
    this.turnToPage(item);
  }
  @Watch("$route")
  routeChange(to: any) {
    this.$store.commit("app/setCurrentPageName", to.name);
    let pathArr = util.setCurrentPath(this, to.name);
    if (pathArr.length > 2) {
      this.$store.commit("app/addOpenSubmenu", pathArr[1].name);
    }
    this.checkTag(to.name);
    localStorage.currentPageName = to.name;
  }
  @Watch("lang")
  langChange() {
    util.setCurrentPath(this, this.$route.name as string);
  }
  mounted() {
    this.init();
  }
  created() {
    this.$store.commit("app/setOpenedList");
  }
}
</script>
<style lang="less" scoped>
.main {
  .logo-con {
    height: 64px;
    padding: 10px;
    img {
      height: 44px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }
  .header-con {
    background: #fff;
    padding: 0 20px;
    width: 100%;
  }
  .main-layout-con {
    height: 100%;
    overflow: hidden;
  }
  .main-content-con {
    height: ~"calc(100% - 60px)";
    overflow: hidden;
  }
  .tag-nav-wrapper {
    padding: 0;
    height: 42px !important;
    background: #f0f0f0;
  }
  .content-wrapper {
    padding: 18px;
    height: ~"calc(100% - 80px)";
    overflow: auto;
  }
  .left-sider {
    .ivu-layout-sider-children {
      overflow-y: scroll;
      margin-right: -18px;
    }
  }
}
.ivu-menu-item > i {
  margin-right: 12px !important;
}
.ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
  margin-right: 8px !important;
}
.collased-menu-dropdown {
  width: 100%;
  margin: 0;
  line-height: normal;
  padding: 7px 0 6px 16px;
  clear: both;
  font-size: 12px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: rgba(100, 100, 100, 0.1);
  }
  & * {
    color: #515a6e;
  }
  .ivu-menu-item > i {
    margin-right: 12px !important;
  }
  .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
    margin-right: 8px !important;
  }
}

.ivu-select-dropdown.ivu-dropdown-transfer {
  max-height: 400px;
}

/*
.header-bar{
  width: 100%;
  height: 100%;
  position: relative;
  .custom-content-con{
    float: right;
    height: auto;
    padding-right: 20px;
    line-height: 64px;
    & > *{
      float: right;
    }
  }
}
*/

//------------------

.layout-con {
  height: 100%;
  width: 100%;
}
.layout-header-bar {
  background: #2b85e4;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.2);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.rotate-icon {
  transform: translate(-10px, 0px) rotate(-180deg);
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(0px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.bg {
  background: #dcdee2;
}
.copyright {
  height: 32px;
  position: fixed;
  text-align: center;
  left: 0;
  right: 0;
  bottom: 0;
  color: silver;
  /*background: #7a7979;
  z-index: 6666;
  */
  font-size: 12px;
  line-height: 32px;
}
.copyright_b {
  width: 210px;
}
.copyright_a {
  width: 80px;
}
.version {
  padding: 0 2px;
  margin: 12px 0 6px;
  text-align: right;
  color: rgba(0, 0, 0, 0.45);
  font-size: 10px;
}
</style>
