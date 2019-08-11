<template>
  <div>
    <Card dis-hover :shadow="shadow" :padding="padding">
      <p slot="title">
        <Icon type="ios-card" size="21"></Icon>近期送检单位：
      </p>
      <Table :columns="columns" :data="lists"></Table>
    </Card>
  </div>
</template>
<script>
export default {
  name: "RecentClients",
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
      /*[
        {
          name: "John1 Brown",
          age: 18,
          address: "New Yo1rk No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No.1 1 Lake Park",
          date: "2016-10-01"
        }
      ]*/
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