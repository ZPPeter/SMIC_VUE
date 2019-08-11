<template>
      <Alert show-icon>
        信息：
        <template slot="desc"><p style="margin-top:6px;font-size:14px;color:green;">欢迎使用本系统，在使用过程中有什么问题请联系管理员。</p></template>
      </Alert>
</template>

<script>
export default {
  name: 'InforAlert',
  mounted () {
    //alert('I came from info alert')
  }  
}
</script>