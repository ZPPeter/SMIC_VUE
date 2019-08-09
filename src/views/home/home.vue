<template>
  <div>
    <Row>
      <alert-info></alert-info>
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
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style" />
          <p class="total-style">T:{{ infor.count * 100 }}</p>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <chart style="height: 310px;" />
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from "@/components/info-card";
import CountTo from "@/components/count-to";
import AlertInfo from "@/components/info-alert";
import Chart from "./chart.vue";
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    Chart,
    AlertInfo
  },
  data() {
    return {
      inforCardData: [
        {
          title: "全站仪",
          icon: "md-person-add",
          count: 803,
          color: "#2d8cf0"
        },
        { title: "GPS接收机", icon: "md-locate", count: 232, color: "#19be6b" },
        {
          title: "经纬仪",
          icon: "md-help-circle",
          count: 142,
          color: "#ff9900"
        },
        { title: "水准仪", icon: "md-share", count: 657, color: "#ed3f14" },
        {
          title: "手持测距仪",
          icon: "md-chatbubbles",
          count: 12,
          color: "#E46CBB"
        },
        { title: "其它仪器", icon: "md-map", count: 14, color: "#9A66E4" }
      ]
    };
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
  color:red;
}
</style>
