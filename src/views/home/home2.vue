<template>
  <div>

    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>

    <Card dis-hover>
      <div id="main">
        <div>
          <chart
            :options="ying"
            ref="echarts"
            theme="macarons"
            :auto-resize="true"
            style="width:100%"
          ></chart>
        </div>
      </div>
    </Card>

    <Alert show-icon>
        信息：
        <template slot="desc">欢迎使用本系统，在使用过程中有什么问题请联系管理员。 </template>
    </Alert>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/legend.js";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/theme/macarons";

//export default Vue.extend{
//export default class Home extends AbpBase {
@Component({
  components: {
    chart: ECharts
  }
})
export default class Home extends Vue {
  name: "";
  get ying() {
    return {
      title: {
        text: "近两年全站仪送检情况",
        textStyle:{
            fontSize:14
        },        
        subtext: "仅供参考"
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ["2018年", "2019年",'GR'],
        top:'18'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
    backgroundColor:'#FFFFFF',   
    grid: {
        left: '3%',
        right: '5%',
        bottom: '3%',
        containLabel: true,
        show: false                 // 网格边框是否显示，上和右边框 
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,          // 坐标轴两边留白
        splitLine: {                // 网格线 x轴对应的是否显示
            show: false
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    
    yAxis: [                            // 双y坐标轴
        {
        name: '台次',
        type: 'value',
        splitLine: {                // 网格线 y轴对应的是否显示
            show: false
        },
        axisLabel: {
            formatter: '{value}'
        }
    },
        {
            name: 'GR(%)',
            //nameLocation: 'start',
            splitLine: {                // 网格线 y轴对应的是否显示
                show: false
            },
            min:0,
            max: 200,                       // growing rate upper limit
            type: 'value',
            //top:10,
            inverse: false,
            axisLine: {
                lineStyle: {
                    color: '#2f4554'
                }
        }
    }],
    
    series: [
        {
            name:'2018年',
            type:'bar',
            color:'#33CCFF',
            //stack: '总量',
            markPoint : {
                data : [
                    {type : 'max', name : '最大值'},
                     {type : 'min', name : '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            },
            data:[174, 277, 174, 143, 163, 147, 177, 192, 260, 33, 364, 249]
        },
        {
            name:'2019年',
            type:'bar',
            color: '#33CC99',
            //stack: '总量',
            markPoint : {
                data : [
                    {type : 'max', name : '最大值'},
                     {type : 'min', name : '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            },
            data:[260, 116, 294, 87, 211, 50, 391, 91.1, 76, 138, 401, 144]
        },
        {
            name:'GR',
            type:'line',
            yAxisIndex: 1,              // yAxisIndex 1 表示第二个y轴，默认为0
            color: 'red',
            //stack: '总量',
            markPoint : {
                data : [
                    {type : 'max', name : '最大值'},
                    //{type : 'min', name : '最小值'}
                ]
            },
            data:[49.8, 19, 68.9, 61.6, 12.6, 50.1, 31.1, 92.1, 77.7, 38.1, 75.5, 99.7]
        }
    ]
}
}
}
</script>
<style>
#main {
  width: 98%;
  height: 400px;
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
</style>