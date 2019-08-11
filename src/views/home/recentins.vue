<template>
  <div>
    <Card dis-hover :shadow="shadow" :padding="padding">
    <p slot="title">
      <Icon type="md-apps"></Icon>
      近期送检仪器：</p>
    <Table :columns="columns" :data="lists"></Table>
    </Card>
  </div>
</template>

<script>
export default {
  name: "RecentIns",
  props: {
    padding: {
      type: Number,
      default: 0
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          title: "单位",
          key: "userName"
        },
        {
          title: "显示名称",
          key: "surname"
        },
        {
          title: "详情",
          key: "emailAddress"
        }
      ],
      datas: new Array()
    };
  },
  methods: {
    onClick: function() {},
    async getpage() {
      await this.$store.dispatch({
        // update -> this.$store.state.user.list
        type: "user/getAll",
        data: { keyword: "", maxResultCount: 10, skipCount: 0 }
      });
    }
  },
  computed: {
    lists() {
      //alert("2-5:" + this.$store.state.user.list);
      return this.$store.state.user.list;
    }
  },
  mounted() {
    //alert("3");
  },
  async created() {
    //alert("1");
    this.getpage();
  }
};
</script>