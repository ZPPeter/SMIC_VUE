<template>
  <div>
    <Card dis-hover :shadow="shadow" :padding="padding">
      <Row slot="title" style="display: flex;align-items: center;">
        <Col span="12"><Icon size="21" type="md-apps"></Icon>近期送检单位： </Col>
        <Col span="12" style="text-align: right;">
        <Input @on-search="search" search v-model="q" placeholder="委托单号/委托单位" style="width:210px;" />
        </Col>
      </Row>
      <Table :columns="columns" :data="lists"></Table>
    </Card>
  </div>
</template>
<script>
export default {
  name: "RecentClients",
  props: {
    padding: {
      type: Number,
      default: 0
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      q:'',
      columns: [
        {
          title: "委托单号",
          key: "sjdid",
          maxWidth: 100
        },
        {
          title: "委托单位",
          key: "dwmc",
          minWidth: 200
        },
        {
          title: "件数",
          key: "yqjs",
          maxWidth: 80
        },        
        {
          title: "送检日期",
          key: "sjrq",
          width: 180,
          render: (h, params) => {
            return h("span", new Date(params.row.sjrq).toLocaleString());
          }
        }
      ],
      datas: new Array()
    };
  },
  methods: {
    async getpage() {
      await this.$store.dispatch({
        type: "wtd/getRecentWTD"
      });
    },
    async search(){
      //this.q = this.q.trim();
      //if(this.q.length==0)
      //  return;
      //else{      
      await this.$store.dispatch({
        type: "wtd/getRecentWTDBy",
        data:this.q
      });        
      //}
    }    
  },
  computed: {
    lists() {
      return this.$store.state.wtd.list;
    }
  },
  mounted() {
    //alert("3");
  },
  async created() {
    //alert("1");
    this.getpage();
    //console.log(this.$store.state.wtd.list);
  }
};
</script>