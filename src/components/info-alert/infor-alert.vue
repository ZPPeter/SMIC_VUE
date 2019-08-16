<template>
  <div>
  <Alert :type="type" show-icon style=" position:relative;">
    <Icon
      v-if="isAdminUser"
      title="修改内容"
      type="ios-open-outline"
      size="24"
      class="update"
      v-on:click="edit"
    />
    {{info.title}}：
    <template slot="desc">
      <p v-html="info.description" style="margin-top:6px;"></p>
    </template>
  </Alert>
  <edit-info v-model="editModalShow"  @save-success="getInfo"></edit-info>
  </div>
</template>

<script>
import EditInfo from './edit-info.vue'
import Info from '@/store/entities/info';
export default {
  name: "InforAlert",
  components: {
    EditInfo
  },
  data() {
    return {
      type:'info',//warning
      //info:new Info(),
      editModalShow:false
    };
  },
  methods: {
    async getInfo() {
      await this.$store.dispatch({
        type: "info/getInfoData"
      });
    },
    edit(){
        this.$store.commit('info/edit');
        this.editModalShow=true;
        //this.$Message.success("OK！");    
    }    
  },
  computed: {
    isAdminUser() {      
      return this.userName === "admin";
    },
    userName() {
      return this.$store.state.session.user
        ? this.$store.state.session.user.userName
        : "";
    },
    info(){
      //alert(this.$store.state.info.infoDetail.title);
      return this.$store.state.info.infoDetail;
    }
  },
  mounted() {
    //alert(this.$store.state.info.infoDetail);    
  },
  async created() {
    this.getInfo();
  }
};
</script>
<style scoped>
.update {
  width: 24px;
  height: 24px;
  border-radius: 60%;
  position: absolute;
  top: 1px;
  right: 2px;
  cursor: pointer;
}
</style>