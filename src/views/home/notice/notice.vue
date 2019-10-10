<template>
  <div>
    <Card dis-hover>
      <div class="page-body">
        <Form ref="queryForm" :label-width="90" label-position="left" inline>
          <Row :gutter="16">
            <Col span="8">
              <FormItem :label="L('Keyword')+':'" style="width:100%">
                <Input v-model="pagerequest.FilterText" placeholder="标题，内容"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <Button
                icon="ios-search"
                type="primary"
                size="large"
                @click="getpage"
                class="toolbar-btn"
              >{{L('Find')}}</Button>
            </Col>
          </Row>
          <Row v-if="isAdmin">
            <Button @click="create" icon="ios-add" type="primary" size="large">{{L('Add')}}</Button>
          </Row>
        </Form>
        <div class="margin-top-10">
          <Table
            :loading="loading"
            :columns="columns"
            :no-data-text="L('NoDatas')"
            border
            :data="list"
          ></Table>          
          <Page
            show-total
            show-sizer
            class-name="fengpage"
            :total="totalCount"
            class="margin-top-10"
            @on-change="pageChange"
            @on-page-size-change="pagesizeChange"
            :page-size="pageSize"
            :current="currentPage"
          ></Page>          
        </div>
        <div style="text-align: right;margin-right:10px;">
        最近查看时间：{{(new Date(this.lastReadTime)).Format('yyyy年MM月dd日 hh:mm:ss')}}    
        </div>
      </div>
    </Card>
    <create-notice v-model="createModalShow" @save-success="getpage"></create-notice>    
    <edit-notice v-model="editModalShow" @save-success="getpage"></edit-notice>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import PageRequest from "@/store/entities/page-request";

import CreateNotice from "./create-notice.vue";
import EditNotice from "./edit-notice.vue";

class PageNoticeRequest extends PageRequest {
  FilterText: string = "";
}

@Component({
  components: { CreateNotice, EditNotice }
})
export default class notices extends AbpBase {
  edit() {
    this.editModalShow = true;
  }
  isAdmin: boolean = false;
  pagerequest: PageNoticeRequest = new PageNoticeRequest();
  createModalShow: boolean = false;
  editModalShow: boolean = false;
  get lastReadTime(){
    return this.$store.state.session.user.readLastNoticeTime;
  }
  get list() {
    //console.log(this.$store.state.notice.list);
    return this.$store.state.notice.list;
  }
  get loading() {
    return this.$store.state.notice.loading;
  }
  create() {
    this.createModalShow = true;
  }
  pageChange(page: number) {
    this.$store.commit("notice/setCurrentPage", page);
    this.getpage();
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit("notice/setPageSize", pagesize);
    this.getpage();
  }
  async getpage() {    
    //console.log(this.pagerequest);
    this.pagerequest.maxResultCount = this.pageSize;
    this.pagerequest.skipCount = (this.currentPage - 1) * this.pageSize;
    
    await this.$store.dispatch({
      type: "notice/getAll",
      data: this.pagerequest
    });

    //console.log(this.$store.state.notice.list.length + ' - ' + this.$store.state.notice.currentPage);
    if (
      this.$store.state.notice.list.length == 0 &&
      this.$store.state.notice.currentPage > 1
    ) {
      this.pageChange(this.$store.state.notice.currentPage - 1);
    }
  }
  get pageSize() {
    return this.$store.state.notice.pageSize;
  }
  get totalCount() {
    return this.$store.state.notice.totalCount;
  }
  get currentPage() {
    return this.$store.state.notice.currentPage;
  }
  columns = [
    {
      title: "标题",
      key: "title",
      render: (h: any, params: any) => {
        return h('span',new Date(params.row.creationTime)>new Date(this.lastReadTime)?
        {style: {color:'red'}}:{style: {color:'#515A6E'}},
        params.row.title       
        );
      }
    },
    {
      title: "内容",
      key: "description",
      render: (h: any, params: any) => {
        return h('span',new Date(params.row.creationTime)>new Date(this.lastReadTime)?
        {style: {color:'red'}}:{style: {color:'#515A6E'}},
        params.row.description
        );
      }      
    },
    {
      title: "创建时间",
      key: "creationTime",
      render: (h: any, params: any) => {
        return h('span',new Date(params.row.creationTime)>new Date(this.lastReadTime)?
        {style: {color:'red'}}:{style: {color:'#515A6E'}},
          new Date(params.row.creationTime).toLocaleString()
        );
      }
    },
    {
      title: this.L("Actions"),
      key: "Actions",
      width: 150,
      render: (h: any, params: any) => {
        return h("div", [
          h(
            "Button",
            {
              props: {
                type: "primary",
                size: "small"
              },
              style: {
                marginRight: "5px"
              },
              on: {
                click: async () => {
                  this.$store.commit("notice/edit", params.row);
                  this.edit();
                }
              }
            },
            this.L("Edit")
          ),
          h(
            "Button",
            {
              props: {
                type: "error",
                size: "small"
              },
              on: {
                click: async () => {
                  this.$Modal.confirm({
                    title: this.L("Tips"),
                    content: "确认删除该条信息?",
                    okText: this.L("Yes"),
                    cancelText: this.L("No"),
                    onOk: async () => {
                      await this.$store.dispatch({
                        type: "notice/delete",
                        data: params.row
                      });
                      await this.getpage();
                    }
                  });
                }
              }
            },
            this.L("Delete")
          )
        ]);
      }
    }
  ];
  async created() {
    await this.$store.dispatch("ur_notice/setReadLastNoticeTime");
    this.getpage();
    this.isAdmin = this.$store.state.session.user.roles.includes('ADMIN');
    if(!this.isAdmin)
      this.columns.splice(this.columns.length-1,1);
  }
  activated() {
  }  
}
</script>