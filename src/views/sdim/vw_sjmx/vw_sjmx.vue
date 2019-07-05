<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.Filter" placeholder="送检单号/单位名称"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="送检日期:" style="width:100%">
                                <DatePicker  v-model="sendDateTime" type="datetimerange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    class  PageVw_sjmxRequest extends PageRequest{
        Filter:string;
        From:Date;
        To:Date;        
    }

    @Component({
        components:{}
    })
    export default class Vw_sjmxs extends AbpBase{
        //filters
        pagerequest:PageVw_sjmxRequest=new PageVw_sjmxRequest();
        sendDateTime:Date[]=[]; // 送检日期
        get list(){
            return this.$store.state.vw_sjmx.list;
        };
        get loading(){
            return this.$store.state.vw_sjmx.loading;
        }
        pageChange(page:number){
            this.$store.commit('vw_sjmx/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('vw_sjmx/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
          
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            //filters
            
            if (this.sendDateTime.length>0) {
                this.pagerequest.From=this.sendDateTime[0];
            }
            if (this.sendDateTime.length>1) {
                this.pagerequest.To=this.sendDateTime[1];
            }

            await this.$store.dispatch({
                type:'vw_sjmx/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.vw_sjmx.pageSize;
        }
        get totalCount(){
            return this.$store.state.vw_sjmx.totalCount;
        }
        get currentPage(){
            return this.$store.state.vw_sjmx.currentPage;
        }
        columns=[{
            title:'送检单号',
            key:'送检单号'
        },{
            title:'单位名称',
            key:'单位名称'
        },{
            title:'送检日期',
            render:(h:any,params:any)=>{
               return h('span',new Date(params.row.送检日期).toLocaleDateString())
            }        
        },{
            title:'证书编号',
            key:'证书编号'
        }]
        async created(){
            this.getpage();
        }        
    }
</script>