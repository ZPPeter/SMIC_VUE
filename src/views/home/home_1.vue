<template>
  <div>
    <Card dis-hover>
      Hello
      <Icon custom="iconfont icon-earth2" size="18" />&nbsp;&nbsp;
      <br />
      <br />
      <br />
      <div>
        <Icon type="md-planet" size="48" style="color:#0080FF" />
        <span
          style="color:#0080FF;font-size:28px;vertical-align:middle;font-family:cambria;font-weight:800;"
        >SMIC</span>
      </div>

  <div id="main">  
  <div>
      <chart :options="ying" ref="echarts1" theme='macarons' :auto-resize='true' style="width:100%"></chart>
  </div>
  <div>
      <chart :options="ying" ref="echarts2" theme='macarons' :auto-resize='true' style="width:100%"></chart>
  </div>
  <div>
      <chart :options="ying" ref="echarts2" theme='macarons' :auto-resize='true' style="width:100%"></chart>
  </div>  
  </div>


    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default class Home extends Vue {
  name: "";

}
</script>
<style>
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
    flex:1;
    margin-right: 5px;
}
</style>