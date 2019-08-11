<template>
  <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"/>
</template>

<script>
/* 
:is="iconType" 动态组件，根据 type 变化 
icon-font icon-earth2 -> type =_earth
前缀 icon-font icon- 自动加上
*/
import Icons from '@/components/icons/icons.vue'
export default {
  name: 'CommonIcon',
  components: { Icons },
  props: {
    type: {
      type: String,
      required: true
    },
    color: String,
    size: Number
  },
  computed: {
    iconType () {
      return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon'
    },
    iconName () {      
      return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
    },
    iconSize () {
      return this.size || (this.iconType === 'Icons' ? 12 : undefined)
    },
    iconColor () {
      return this.color || ''
    }
  },
  methods: {
    getCustomIconName (iconName) {
      return iconName.slice(1) //自定义icon去掉前面那个 _
    }
  }
}
</script>

<style>

</style>
