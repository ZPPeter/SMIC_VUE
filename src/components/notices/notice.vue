<template>
  <div class="notice-avatar-dropdown">
    <Poptip placement="bottom-end" v-model="visible" @on-popper-show="getNotices">
      <Tooltip content="通知消息" placement="bottom">
        <Badge dot :count="unreadCount">
          <Icon type="ios-chatbubbles" size="24" />          
        </Badge>
      </Tooltip>
      <div slot="content" class="content">
        <Row>
          <Col span="14">
          <a href="javascript:;" @click="handleClick('details')">
          {{noticeLabel}}
          </a>
          </Col>
          <Col span="10">
            <Button
              v-if="totalCount"
              type="info"
              icon="ios-book-outline"
              @click="handleClick('hasread')"
            >标记所有为已读</Button>
          </Col>
        </Row>
        <hr />
        <div class="noFound" v-if="!totalCount">
          <Icon type="ios-chatbubbles-outline" size="36" />
          <div class="noTitle">没有新消息</div>
        </div>
        <div v-if="totalCount">
          <div class="list">
            <Spin size="large" fix v-if="noticeSpinShow"></Spin>
            <div class="list-item" v-for="(notice,index) in list" :key="index">
              <div class="list-item-meta">
                <div class="list-item-meta-content">
                  <h4 class="list-item-meta-title">
                    <div class="title">{{notice.title}}</div>
                  </h4>
                  <div class="list-item-meta-description">
                    <div class="description">{{Desc(notice.description)}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="page">
            <Page
              class-name="fengpage"
              :total="totalCount"
              class="margin-top-10"
              @on-change="pageChange"
              :page-size="pageSize"
              :current="currentPage"
              simple
            ></Page>
            </div>
          </div>
        </div>
      </div>
    </Poptip>
  </div>
</template>
<script lang="ts">
import "./notice.less";
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import AbpBase from "../../lib/abpbase";
import utils from "../../lib/util.js";
import PageRequest from "@/store/entities/page-request";
class PageNoticeRequest extends PageRequest {
  LastDate: null;
}
@Component({
  props: {
    unreadCount: {
      type: Number,
      default: 0
    }
  }
})
//@Component
export default class Notice extends AbpBase {  
  visible: boolean = false;
  noticeSpinShow: boolean = true;
  //unreadCount:Number = 9;
  pagerequest: PageNoticeRequest = new PageNoticeRequest();
  // get noticeList(): Array<any> {
  get list() {
    //console.log(this.$store.state.notice.list);
    return this.$store.state.ur_notice.list;
  }
  pageChange(page: number) {
    this.$store.commit("ur_notice/setCurrentPage", page);
    this.getpage();
  }
  async getpage() {
    this.pagerequest.maxResultCount = this.pageSize;
    this.pagerequest.skipCount = (this.currentPage - 1) * this.pageSize;
    this.pagerequest.LastDate = this.$store.state.session.user.readLastNoticeTime;
    //alert(JSON.stringify(this.pagerequest));
    await this.$store.dispatch({
      type: "ur_notice/getAll", //未读消息列表
      data: this.pagerequest
    });
  }
  Desc(str){
    if(str.length>25)
      return str.substring(0,25) + ' ...';
    else
      return str;
  }
  get pageSize() {
    return this.$store.state.ur_notice.pageSize;
  }
  get totalCount() {    
    return this.$store.state.ur_notice.totalCount;
  }
  get currentPage() {
    return this.$store.state.ur_notice.currentPage;
  }
  get noticeLabel() {
    let name = "通知消息";
    if (this.totalCount > 0) {
      return `${name}【${this.totalCount}】`;
    } else {
      return name;
    }
  }
  async getNotices() {
    this.getpage();
    setTimeout(() => {
      this.noticeSpinShow = false;
    }, 1000);
    //  this.noticeSpinShow = this.$store.state.ur_notice.loading;    
    // await this.$store.dispatch("ur_notice/setReadLastNoticeTime");
  }
  close() {
    this.visible = false;
  }
  async handleClick(name) {
    this.close();
    switch (name) {
      case "details":
        //this.$store.state.session.user.readLastNoticeTime = new Date();
        this.$router.push({
          name: "notices"
        });
        break;
      case "hasread":
        this.$store.dispatch("ur_notice/setReadLastNoticeTime");
        this.$store.state.ur_notice.unreadCount = 0;
        break;
    }
  }
}
</script>
<style scoped>
.page{
    text-align: center;
}
.content {
  padding: -8px -16px;
  width: 360px;
}
.noFound {
  text-align: center;
  padding: 73px 0 88px;
  color: rgba(0, 0, 0, 0.45);
}
.noFound .iconfont {
  font-size: 40px;
  margin-bottom: 15px;
}
.noTitle {
  font-size: 14px;
}
.list {
  max-height: 400px;
  overflow: auto;
  font-family: "Monospaced Number", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}
.list * {
  outline: none;
}
.list-item {
  border-bottom: 1px solid #e8e8e8;
}
.list-item {
  -ms-flex-align: center;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
}
.list-item:hover {
  background: #e6f7ff;
}
.list-item-meta {
  -ms-flex-align: start;
  align-items: flex-start;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1 1 0%;
  flex: 1 1 0%;
  font-size: 0;
  width: 100%;
}
.list-item-meta-avatar {
  margin-right: 16px;
}
.ant-list-item-meta-content {
  -ms-flex: 1 0 0%;
  flex: 1 0 0%;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0%;
}
.list-item-meta-title {
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 22px;
}
.list-item-meta-title .title {
  font-weight: normal;
  margin-bottom: 8px;
  text-align: left;
}
.list-item-meta-title .extra {
  float: right;
  color: rgba(0, 0, 0, 0.45);
  font-weight: normal;
  margin-right: 0;
  margin-top: -1.5px;
}
.list-item-meta-description {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
}
.list-item-meta-description .description {
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;  
}
</style>