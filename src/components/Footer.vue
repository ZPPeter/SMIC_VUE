<template>
  <div class="copyright">
   {{copyright}}
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    props:{
        copyright:String
    }
})
export default class Footer extends Vue{
  copyright ='© 2019 SMIC';  // 来自服务器 © 2019 SMIC
}
</script>
<style scoped>
  .copyright{
    padding: 0 2px;
    margin: 12px 0 6px;
    text-align: center;
    color: rgba(0,0,0,.45);
    font-size: 14px;
  }
</style>


