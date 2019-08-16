<template>
  <div>
    <Row :gutter="16" type="flex">
      <i-col span="19">        
      <info-alert></info-alert>
      </i-col>
      <i-col span="5" style="text-align:right;">
      <clock></clock>
      </i-col>      
    </Row>
    <Row :gutter="20">
      <stats @showChart="showChart"></stats>
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
import Clock from "@/components/clock";
import Stats from "./stats.vue";
import RecentClients from "./recentclients.vue";
import RecentIns from "./recentins.vue";

export default {
  name: "home",
  components: {
    Chart,
    InfoAlert,
    RecentIns,
    RecentClients,
    Stats,
    Clock    
  },
  data() {
    return {
      type: "qzy",
    };
  },
  methods: {
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
      //alert('4')      
  },
  mounted () {    
    //alert('5')
  },
  async created() {    
    //alert('1')
    //this.getpage();
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