<template>
  <div class="header-bar">
    <Row :gutter="16" type="flex" justify="space-between">
      <i-col>
        <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
        <custom-bread-crumb show-icon style="margin-left: 15px;" :list="breadCrumbList"></custom-bread-crumb>
      </i-col>
      <i-col>
        <sysname></sysname>
      </i-col>
      <i-col>
        <div class="custom-content-con">
          <slot></slot>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
import sysname from "./sysname.vue";
import siderTrigger from "./sider-trigger/sider-trigger.vue";
import customBreadCrumb from "./custom-bread-crumb/custom-bread-crumb.vue";
import "./header-bar.less";
export default {
  name: "HeaderBar",
  components: {
    sysname,
    siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList() {
      //alert(JSON.stringify(this.$store.state.app.currentPath));
      return this.$store.state.app.currentPath; //breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit("on-coll-change", state);
    }
  }
};
</script>
