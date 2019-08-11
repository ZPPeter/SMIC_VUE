<template>
  <component :is="chartType" :type="chartName"/>
</template>

<script>
/* 
:is="iconType" 动态组件，根据 type 变化 
icon-font icon-earth2 -> type =_earth
前缀 icon-font icon- 自动加上
*/
import Qzy from './qzy.vue'
import Qty from './qty.vue'
import Gps from './gps.vue'
export default {
  name: 'MyChart',
  components: { Qzy,Qty,Gps },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    chartType () {
      return this.chartName;
    },
    chartName () {      
      return this.type
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
