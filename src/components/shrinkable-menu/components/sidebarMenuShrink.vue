<style lang="less">
.all1 {
    padding:10px;text-align:center;
    border-bottom: solid 2px;color: lightgrey;
  -webkit-animation: twinkling 5s infinite ease-in-out;
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
.div1
{
    padding-top: 5px;
    background-color: rgba(102, 146, 191, 0.44);            
    border: solid 1px rgba(102, 146, 191, 0.68);            
    border-radius: 5px;
    -moz-box-shadow:2px 2px 5px #333333; 
    -webkit-box-shadow:2px 2px 5px #333333; 
    box-shadow: 7px 15px 30px #285a63;
}
.div0{
    border-bottom: solid 1px rgba(102, 146, 191, 0.68);
}
</style>

<template>
  <div>
    <div class="all1">
      <Icon type="md-planet" size="36" style="color:yellow;" />
    </div>
    <template v-for="(item, index) in menuList">
      <div style="text-align: center;" :key="index" class="div0">
        <Dropdown
          transfer
          v-if="item.children.length !== 1"
          placement="right-start"
          :key="index"
          @on-click="changeMenu"
        >
          <Button style="width: 80px;margin-right:5px;padding:10px 0;" type="text">
            <!-- <i class="iconfont" v-html="item.icon" style="color:DarkGray"></i> -->
            <Icon :type="item.icon" style="color:DarkGray" size="21"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
              <div class="div1">
            <template v-for="(child, i) in item.children">
              <DropdownItem :name="child.name" :key="i">
                    <Icon :type="child.icon" size="21"></Icon>
                    <span style="padding-left:10px;">{{ itemTitle(child) }}</span>                
              </DropdownItem>
            </template>
            </div>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          transfer
          v-else
          placement="right-start"
          :key="index"
          @on-click="changeMenu"
          style="left:100px"
        >
          <Button
            @click="changeMenu(item.children[0].name)"
            style="width: 80px;margin-right:5px;padding:10px 0;"
            type="text"
          >
            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <DropdownItem :name="item.children[0].name" :key="'d' + index">
              <Icon :type="item.icon" size="21"></Icon>
              <span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Emit } from "vue-property-decorator";
import AbpBase from "../../../lib/abpbase";
@Component
export default class extends AbpBase {
  name: string = "sidebarMenuShrink";
  @Prop({ type: Array }) menuList: Array<any>;
  @Prop({ default: "white" }) iconColor: string;
  @Prop({ default: "dark" }) menuTheme: string; //light
  @Emit("on-change") changeMenu(active: string) {}
  itemTitle(item: any) {
    return this.L(item.meta.title);
  }
}
</script>
