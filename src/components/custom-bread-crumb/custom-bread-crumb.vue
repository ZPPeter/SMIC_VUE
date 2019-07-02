<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
        <BreadcrumbItem 
            v-for="item in list" 
            :to="item" 
            :key="item.name"
        >        
        <common-icon style="margin-right: 4px;" :type="item.icon || 'md-menu'"/>
        {{ itemTitle(item) }}</BreadcrumbItem>
    </Breadcrumb>

  </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop } from 'vue-property-decorator';
import CommonIcon from '@/components/common-icon/common-icon.vue';
import AbpBase from '../../lib/abpbase';
import './custom-bread-crumb.less';
@Component({
      components:{CommonIcon}
})
export default class extends AbpBase {
    name:string= 'breadcrumbNav';
    fontSize:Number=14;
    @Prop({type:Array}) list:Array<any>;    
    @Prop({type:Boolean}) showIcon:Boolean = true;
    itemTitle (item:any) {
        return this.L(item.meta.title);        
    }
    isCustomIcon (iconName) {
      return iconName.indexOf('_') === 0
    }
    getCustomIconName (iconName) {
      return iconName.slice(1)
    }    
}
</script>