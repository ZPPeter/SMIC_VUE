<template>
  <div>
    <Card dis-hover>
      <div class="page-body">
        <Form ref="queryForm" :label-width="80" label-position="left" inline>
          <Row :gutter="16">
            <Col span="6">
              <FormItem :label="L('Keyword')+':'" style="width:100%">
                <Input v-model="pagerequest.keyword" :placeholder="L('UserName')"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="L('IsActive')+':'" style="width:100%">
                <!--Select should not set :value="'All'" it may not trigger on-change when first select 'NoActive'(or 'Actived') then select 'All'-->
                <Select :placeholder="L('Select')" @on-change="isActiveChange">
                  <Option value="All">{{L('All')}}</Option>
                  <Option value="Actived">{{L('Actived')}}</Option>
                  <Option value="NoActive">{{L('NoActive')}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="L('CreationTime')+':'" style="width:100%">
                <DatePicker
                  v-model="creationTime"
                  type="datetimerange"
                  format="yyyy-MM-dd"
                  style="width:100%"
                  placement="bottom-end"
                  :placeholder="L('SelectDate')"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Button @click="create" icon="ios-add" type="primary" size="large">{{L('Add')}}</Button>
            <Button
              icon="ios-search"
              type="primary"
              size="large"
              @click="getpage"
              class="toolbar-btn"
            >{{L('Find')}}</Button>
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
      </div>
    </Card>
    <create-user v-model="createModalShow" @save-success="getpage"></create-user>
    <edit-user v-model="editModalShow" @save-success="getpage"></edit-user>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import PageRequest from "@/store/entities/page-request";
import CreateUser from "./create-user.vue";
import EditUser from "./edit-user.vue";
class PageUserRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null; //nullable
  from: Date;
  to: Date;
}
class ResetPasswordDto{
    adminPassword:string
    userId:number
    newPassword:string='123qwe'
}
@Component({
  components: { CreateUser, EditUser }
})
export default class Users extends AbpBase {
  edit() {
    this.editModalShow = true;
  }
  //filters
  pagerequest: PageUserRequest = new PageUserRequest();
  creationTime: Date[] = [];
  createModalShow: boolean = false;
  editModalShow: boolean = false;
  adminPassword: string = "";
  resetPasswordDto:ResetPasswordDto = new ResetPasswordDto();
  get list() {
    //alert('2:'+this.$store.state.user.list)
    //alert("Here:"+JSON.stringify(this.$store.state.user.list[2].lastLoginTime));
    return this.$store.state.user.list;
  }
  get loading() {
    return this.$store.state.user.loading;
  }
  create() {
    this.createModalShow = true;
  }
  isActiveChange(val: string) {
    //console.log(val);
    if (val === "Actived") {
      this.pagerequest.isActive = true;
    } else if (val === "NoActive") {
      this.pagerequest.isActive = false;
    } else {
      this.pagerequest.isActive = null;
    }
  }
  pageChange(page: number) {
    this.$store.commit("user/setCurrentPage", page);
    this.getpage();
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit("user/setPageSize", pagesize);
    this.getpage();
  }
  async getpage() {
    this.pagerequest.maxResultCount = this.pageSize;
    this.pagerequest.skipCount = (this.currentPage - 1) * this.pageSize;
    //filters

    if (this.creationTime.length > 0) {
      this.pagerequest.from = this.creationTime[0];
    }
    if (this.creationTime.length > 1) {
      this.pagerequest.to = this.creationTime[1];
    }
    await this.$store.dispatch({
      // update -> this.$store.state.user.list
      type: "user/getAll",
      data: this.pagerequest
    });
  }
  get pageSize() {
    return this.$store.state.user.pageSize;
  }
  get totalCount() {
    return this.$store.state.user.totalCount;
  }
  get currentPage() {
    return this.$store.state.user.currentPage;
  }
  columns = [
    {
      title: "ID",
      key: "id",
      width: 80
    },
    {
      title: this.L("UserName"),
      key: "userName"
    },
    {
      title: this.L("Surname"),
      key: "surname"
    },
    {
      title: this.L("IsActive"),
      render: (h: any, params: any) => {
        return h("span", params.row.isActive ? this.L("Yes") : this.L("No"));
      }
    },
    {
      title: this.L("CreationTime"),
      key: "creationTime",
      render: (h: any, params: any) => {
        return h(
          "span",
          new Date(params.row.creationTime).toLocaleDateString()
        );
      }
    },
    {
      title: this.L("LastLoginTime"),
      render: (h: any, params: any) => {
        if (params.row.lastLoginTime)
          return h("span", new Date(params.row.lastLoginTime).toLocaleString());
        else return h("span", "");
      }
    },
    {
      title: this.L("Actions"),
      key: "Actions",
      width: 210,
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
                click: () => {
                  //alert(JSON.stringify(params.row) );
                  this.$store.commit("user/edit", params.row); // id,store->state.editUser = user;
                  this.edit(); // show edit module page
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
              style: {
                marginRight: "5px"
              },
              on: {
                click: async () => {
                  this.$Modal.confirm({
                    title: "密码重置",
                    //content: "密码重置",
                    //okText: this.L("Yes"),
                    //cancelText: this.L("No"),
                    render: h => {
                      return [
                        h("hr"),
                        h("br"),
                        h("div", "确认要重置用户【"+params.row.surname+"】的登录密码为默认密码吗？"),                        
                        h("br"),
                        h("Input", {
                          props: {
                            type: "password",
                            value: this.adminPassword,
                            autofocus: true,
                            placeholder: "请输入管理员密码"
                          },                          
                          on: {
                            input: val => {
                              this.adminPassword = val;
                            }
                            //'on-blur': (event) => {
                            //alert(params.index + '-' + event.target.value);
                            //}
                          }                        
                        }                        
                        ),
                        h("br"),                        
                        h("div", "注意：请输入管理员密码进行确认，非用户新密码。"),
                      ];
                    },
                    onOk: async () => {
                        //alert(params.row.id + ":" + this.adminPassword);
                        this.resetPasswordDto.adminPassword = this.adminPassword;
                        this.resetPasswordDto.userId = params.row.id
                        if (this.adminPassword.length == 0) {
                            this.$Message.error('管理员密码不能为空,操作失败！');
                            return false;
                        }
                        //alert(JSON.stringify(this.resetPasswordDto))
                        await this.$store.dispatch({
                            type: "user/resetpassword",
                            data: this.resetPasswordDto
                        });
                    }
                  });
                }
              }
            },
            "密码重置"
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
                    content: this.L("DeleteUserConfirm"),
                    okText: this.L("Yes"),
                    cancelText: this.L("No"),
                    onOk: async () => {
                      await this.$store.dispatch({
                        type: "user/delete",
                        data: params.row
                      });
                      await this.getpage();
                    }
                  });
                }
              }
            },
            "删除"
          )
        ]);
      }
    }
  ];
  async created() {
    //alert('1:created.')
    this.getpage();
    await this.$store.dispatch({
      type: "user/getRoles"
    });
  }  
  activated(){
    //alert('actived.');
  }
}
</script>