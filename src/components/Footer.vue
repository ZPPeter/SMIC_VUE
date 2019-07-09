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
  //copyright ='© 2019 SMIC';  // 不写此句则来自服务器多语言配置 © 2019 SMIC
  //dt = parseInt(new Date(Date.now()).getFullYear().toString());
  dt:number = parseInt(new Date("YYYY").toString())
  dc:string = this.dt>2019?'2019-'+this.dt.toString():'2019';
  copyright ='© '+this.dc+' SMIC';  // 不写此句则来自服务器多语言配置 © 2019 SMIC
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


