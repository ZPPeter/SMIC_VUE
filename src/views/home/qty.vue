
<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "qzyStats",
  data() {
    return {
      dom: null,
      yearNow: new Date().getFullYear()
    };
  },
  computed: {
  },  
  methods: {
    async getStatsData() {
      await this.$store.dispatch({
        type: "sjmx/getQtyStatsData"
      });  
      //alert(this.$store.state.sjmx.datas_0);
    const option = {
      title: {
        text: "近两年其它各类仪器送检情况",
        textStyle: {
          fontSize: 14
        },
        subtext: "仅供参考"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: [(this.yearNow-1) + "年", this.yearNow + "年", "GR"],
        top: "18"
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
      backgroundColor: "#FFFFFF",
      grid: {
        left: "3%",
        right: "5%",
        bottom: "3%",
        containLabel: true,
        show: true // 网格边框是否显示，上和右边框
      },
      xAxis: {
        type: "category",
        boundaryGap: true, // 坐标轴两边留白
        splitLine: {
          // 网格线 x轴对应的是否显示
          show: false
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      },
      yAxis: [
        // 双y坐标轴
        {
          name: "台次",
          type: "value",
          splitLine: {
            // 网格线 y轴对应的是否显示
            show: false
          },
          axisLabel: {
            formatter: "{value}"
          }
        },
        {
          name: "GR(%)",
          //nameLocation: 'start',
          splitLine: {
            // 网格线 y轴对应的是否显示
            show: false
          },
          min: 0,
          max: 300, // growing rate upper limit
          type: "value",
          //top:10,
          inverse: false,
          axisLine: {
            lineStyle: {
              color: "#2f4554"
            }
          }
        }
      ],
      series: [
        {
          name: (this.yearNow-1) + "年",
          type: "bar",
          color: "#33CCFF",
          //stack: '总量',
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          },
          //data: [174, 277, 174, 143, 163, 147, 177, 192, 260, 33, 364, 249]
          data:this.$store.state.sjmx.datas_0
        },
        {
          name: this.yearNow + "年",
          type: "bar",
          color: "#33CC99",
          //stack: '总量',
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          },
          //data: [260, 116, 294, 87, 211, 50, 391, 91.1, 76, 138, 401, 144]
          data:this.$store.state.sjmx.datas_1
        },
        {
          name: "GR",
          type: "line",
          yAxisIndex: 1, // yAxisIndex 1 表示第二个y轴，默认为0
          color: "red",
          //stack: '总量',
          markPoint: {
            data: [
              { type: "max", name: "最大值" }
              //{type : 'min', name : '最小值'}
            ]
          },
          data:this.$store.state.sjmx.datas_2
        }
      ]
    };
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    });      
    },    
    resize() {
      this.dom.resize();
    }
  },
  mounted() {    
  },
  async created() {    
    this.getStatsData();    
    //alert(this.$store.state.sjmx.datas_2)
  },  
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>