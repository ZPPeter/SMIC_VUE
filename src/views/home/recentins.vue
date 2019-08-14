<template>
  <div>
    <Card dis-hover :shadow="shadow" :padding="padding">
      <Row slot="title" style="display: flex;align-items: center;">
        <Col span="12" style="align:center;"><Icon size="21" type="md-apps"></Icon>近期送检仪器：</Col>
        <Col span="12" style="text-align: right;">
        <Input @on-search="search" search v-model="q" placeholder="委托单号/出厂编号" style="width:210px;" />
        </Col>
      </Row>
    <Table :columns="columns" :data="lists"></Table>
    </Card>
  </div>
</template>
<script>
export default {
  name: "RecentIns",
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
          key: "sjdid"
        },
        {
          title: "器具名称",
          key: "qjmc"
        },
        {
          title: "型号规格",
          key: "xhggmc"
        },
        {
          title: "出厂编号",
          key: "ccbh"
        },
        {
          title: "检定状态",
          key: "jdzt"
        },
        {
          title: "送检日期",
          key: "djrq",
          width: 180,
          render: (h, params) => {
            return h("span", new Date(params.row.djrq).toLocaleString());
          }
        }
      ],
      datas: new Array()
    };
  },
  methods: {
    async getpage() {
      await this.$store.dispatch({
        type: "sjmx/getRecentSJMX"
      });
    },
    async search(){
      //this.q = this.q.trim();
      //if(this.q.length==0)
      //  return;
      //else{
      await this.$store.dispatch({
        type: "sjmx/getRecentSJMXBy",
        data:this.q
      });        
      //}
    }
  },
  computed: {
    lists() {
      return this.$store.state.sjmx.list;
    }
  },
  mounted() {
    //alert("3");
  },
  async created() {
    //alert("1");
    this.getpage();
  }
};
</script>