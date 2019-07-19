<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="4">                        
                            <FormItem label="委托单号" style="width:100%">
                                <Input v-model="pagerequest.WTDH" clearable placeholder="委托单号"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="委托单位" style="width:100%">
                                <Input v-model="pagerequest.WTDW" placeholder="委托单位名称" icon="ios-people" clearable></Input>
                            </FormItem>
                        </Col>                        
                        <Col span="6">
                            <FormItem label="送检日期:" style="width:100%">
                                <DatePicker  v-model="sendDateTime" type="datetimerange" placeholder="开始日期 - 结束日期" split-panels format="yyyy-MM-dd" style="width:100%" placement="bottom-end"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Button icon="ios-search" type="primary" size="large" @click="getpage2" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table stripe :loading="loading" @on-sort-change='changeSort' :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page show-total show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    //import '@babel/polyfill'
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    class  PageVw_sjmxRequest extends PageRequest{
        WTDH:string;
        WTDW:string;
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
        changeSort(key){
            //if(this.sort === 'DESC')
            //this.sort = 'ASC'
            //else this.sort = 'DESC'
            //alert(JSON.stringify(key))
            //alert(this.pagerequest.sorting);
            this.pagerequest.sorting=key.key;
            this.pagerequest.order=key.order;
            this.getpage2();
        }        
        async getpage2(){
            this.pageChange(1);
            this.getpage();
        }
        async getpage(){          
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            //alert(this.pagerequest.sorting);
            
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
        columns=[
        {
            title: "ID", 
            key: "id",
            width: 110
        },{  
            title:'送检单号',
            key:'送检单号',
            sortable: true
        },{
            title:'单位名称',
            key:'单位名称',
            sortable: true
        },{
            title:'送检日期',
            key:'送检日期',
            render:(h:any,params:any)=>{
               return h('span',new Date(params.row.送检日期).toLocaleDateString())
            },
            sortable: true,             
            /*
            竟然出现：2009/10/7 > 2018/12/29
            sortMethod: function (a,b,type) {
                let at = new Date(a);
                let bt = new Date(b);
                if(type === 'desc')
                    return at>bt?1:-1;
                else 
                    return at>bt?-1:1;
            }*/
        },{
            title:'证书编号',
            key:'证书编号',
            sortable: true,             
            sortMethod: (a, b, type) => {  //sortMethod方法可以不写，在这里写上是为了避免调用单页面的sortMethod方法，进行排序造成排序逻辑的混乱（当数据较少时不知进行了单页面排序还是后端排序）
            }            
        }]
        async created(){
            this.getpage();
        }        
    }
</script>