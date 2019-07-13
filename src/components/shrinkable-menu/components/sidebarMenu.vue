<style lang="less">
    @import '../styles/menu.less';
.all {
  -webkit-animation: twinkling 2s infinite ease-in-out;
}

@-webkit-keyframes twinkling {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes twinkling {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.div3
{
    width: 100%;
    background-color: rgba(42, 104, 165, 0.432);     
}
.div4{    
    background-color: rgba(72, 122, 177, 0.281);     
}
.div4:hover{    
    background-color: rgba(116, 135, 155, 0.281);
    border-right: 2px solid yellowgreen;
}
li.div4.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
    border-right: 2px solid red!important;
    color: #fff;
    background: #416286 !important;    
}
</style>
<template>
<div>
    <div style="text-align:center;padding:10px;border-bottom: solid 2px;border-bottom-color: lightgrey;">
        <Icon type="md-planet" size="48" style="color:#0080FF;" class="all"/>
        <span style="color:#0080FF;font-size:28px;vertical-align:middle;font-family:cambria;font-weight:800;">SMIC&nbsp;&nbsp;&nbsp;</span>
    </div>
    <Menu ref="sideMenu" accordion :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=0" :name="item.children[0].name" :key="item.name">
                <Icon :type="item.icon" :size="iconSize"></Icon>
                <!-- span class="iconfont">{{item.icon}}</span -->                
                <span>{{ itemTitle(item) }}</span>
            </MenuItem>
            <Submenu v-if="item.children.length > 0" :name="item.name" :key="item.name">                
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span >{{ itemTitle(item) }}</span>
                </template>
                <div class="div3">
                <template v-for="child in item.children">                    
                    <MenuItem :name="child.name" :key="child.name" class="div4"> 
                        <!-- i class="iconfont" v-html="child.icon"></i -->
                        <Icon :type="child.icon" size="18"></Icon>
                        <span>{{ L(child.meta.title) }}</span>                        
                    </MenuItem>                    
                </template>
                </div>                
            </Submenu>
        </template>
    </Menu>    
    </div>
</template>

<script lang="ts">
import { Component, Vue,Inject,Prop,Emit } from 'vue-property-decorator';
import AbpBase from '../../../lib/abpbase'
@Component({})
export default class SidebarMenu extends AbpBase {
    name:string='sidebarMenu';
    @Prop({type:Array}) menuList:Array<any>;
    @Prop({type:Number,default:20}) iconSize:number;
    @Prop({type:String,default:'dark'}) menuTheme:string; //light
    @Prop({type:Array}) openNames:Array<string>;
    itemTitle(item:any):string{
        return this.L(item.meta.title);
    }
    @Emit('on-change')
    changeMenu(active:string){
    }
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                (this.$refs.sideMenu as any).updateActiveName();
            }
        });
    }

}
</script>