<template>
    <div>
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
            <count-to :end="statsData[i*2]" count-class="count-style" />
            <p class="total-style">T:{{ statsData[i*2+1] }}</p>
            <p>{{ infor.title }}</p>
          </infor-card>
        </div>
      </i-col>
      </div>
</template>
<script>
import InforCard from "@/components/info-card";
import CountTo from "@/components/count-to";
export default {
  name: "Stats",
  components: {
    CountTo,
    InforCard
  },
  data() {
    return {
      inforCardData: [
        {
          title: "全站仪",
          icon: "md-locate",
          count: 803,
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
    showChart(i){
        this.$emit('showChart',i)
    },
    async getStatsData() {
      //await this.$store.dispatch({
      //  type: "sjmx/getStatsData"
      //});
    }
  },
  computed: {
    statsData() {
      //alert("2-5");
      //return this.$store.state.user.list;
      return [1,2,3,4,5,6,7,8,9,10,11,12]
    }
  },
  mounted() {
    //alert("3");
  },
  async created() {
    //alert("1");
    //this.getStatsData();
  }
};
</script>