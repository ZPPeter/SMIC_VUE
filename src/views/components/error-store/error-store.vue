<template>
  <div class="notice-avatar-dropdown">
    <Tooltip content="查看错误信息" placement="bottom">
    <Badge dot :count="countComputed">
      <!-- Button type="text" @click="openErrorLoggerPage" -->
        <Icon :size="20" type="ios-bug" @click="openErrorLoggerPage"/>
      <!-- /Button -->
    </Badge>            
  </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'ErrorStore',
  props: {
    count: {
      type: Number,
      default: 0
    },
    hasRead: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    countComputed () {
      //alert(this.hasRead + " - " + this.count);
      return this.hasRead ? 0 : this.count
    }
  },
  methods: {
    openErrorLoggerPage () {
      this.$router.push({
        name: 'error_logger_page'
      })
    }
  }
}
</script>

<style lang="less">
.notice{
    &-avatar-dropdown{
      cursor: pointer;
      display: inline-block;
      // height: 64px;
      vertical-align: middle;
      // line-height: 64px;
      .ivu-badge-dot{
        top: 16px;
      }
    }
  }
.error-store{
  cursor: pointer;
  display: inline-block;  
  margin-right: 12px;
  .ivu-badge-dot{
    top: 20px;
  }
  .ivu-btn.ivu-btn-text{
    padding: 5px 1px 6px;
  }
}
</style>
