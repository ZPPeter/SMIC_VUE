<template>
  <div>
    <Row>
      <info-alert></info-alert>
    </Row>
    <Row :gutter="20">
      <i-col
        :xs="12"
        :md="8"
        :lg="4"
        v-for="(infor, i) in inforCardData"
        :key="`infor-${i}`"
        style="height: 120px;padding-bottom: 10px;"
      >
        <div v-on:click="showChart(i)" style="height: 120px;">
          <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
            <count-to :end="data_tj[i*2]" count-class="count-style" />
            <p class="total-style">T:{{ data_tj[i*2+1] }}</p>
            <p>{{ infor.title }}</p>
          </infor-card>
        </div>
      </i-col>
    </Row>
    <Row>
      <chart :type="type" style="height: 310px;width:100%;margin-top:10px;" />
    </Row>
    <Row>
      <div style="height:5px;"></div>
    </Row>
    <Row :gutter="16">
      <i-col span="12">        
        <recent-Clients></recent-Clients>
      </i-col>
      <i-col span="12">        
        <recent-Ins></recent-Ins>
      </i-col>
    </Row> 
  </div>
</template>

<script>
import InforCard from "@/components/info-card";
import CountTo from "@/components/count-to";
import InfoAlert from "@/components/info-alert";
import Chart from "./chart.vue";

import RecentClients from "./recentclients.vue";
import RecentIns from "./recentins.vue";

export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    Chart,
    InfoAlert,
    RecentIns,
    RecentClients
  },
  data() {
    return {
      type: "qzy",
      inforCardData: [
        {
          title: "全站仪",
          icon: "md-locate",
          count: 879,
          color: "#2d8cf0"
        },
        {
          title: "GPS接收机",
          icon: "_yiqixinxisvg",
          count: 232,
          color: "#19be6b"
        },
        {
          title: "经纬仪",
          icon: "_theodolite",
          count: 142,
          color: "#ff9900"
        },
        { title: "水准仪", icon: "ios-swap", count: 657, color: "#ed3f14" },
        {
          title: "手持测距仪",
          icon: "_distance",
          count: 12,
          color: "#E46CBB"
        },
        {
          title: "其它仪器",
          icon: "ios-apps-outline",
          count: 14,
          color: "#9A66E4"
        }
      ]
    };
  },
  methods: {
    async getpage() {
      //alert('2')
      await this.$store.dispatch({
        type: "sjmx/getStatistics"
      });     
      //alert('6') 
    },    
    onClick: function() {
      console.log("clicked");
    },
    showChart(it) {
      switch (it) {
        case 0:
          this.type = "qzy";
          break;
        case 1:
          this.type = "gps";
          break;
        default:
          this.type = "qty";
          break;
      }
    }
  },
  computed: {
    data_tj() { 
      //alert('4')      
      console.log(this.$store.state.sjmx.datas);
      return this.$store.state.sjmx.datas;      
    }
  },
  mounted () {    
    //alert('5')
  },
  async created() {    
    //alert('1')
    this.getpage();
    //alert('3')
  }    
};
</script>

<style lang="less">
.count-style {
  font-size: 42px;
}
.total-style {
  font-size: 18px;
  font-weight: 200;
  color: red;
}
#main {
  width: 98%;
  height: 300px;
  border: 0px solid #c3c3c3;
  display: -webkit-flex; /* Safari */
  -webkit-flex-direction: row; /* Safari 6.1+ */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#main div {
  flex: 1;
  margin-right: 5px;
}
.ivu-table-overflowX {
  overflow-x: hidden;
}
</style>