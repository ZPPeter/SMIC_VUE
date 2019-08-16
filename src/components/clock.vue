<template>
  <div class="box">
    <ul>
      <li>
        <span ref="hour"></span>
        <span>时</span>
      </li>
      <li>
        <span ref="minute"></span>
        <span>分</span>
      </li>
      <li>
        <span ref="second"></span>
        <span>秒</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Clock",
  mounted() {
    //alert('I came from info alert')
    this.showTime();
    setInterval(this.showTime, 1000);
  },
  methods: {
    showTime() {
      var oDate = new Date();
      var iHours = oDate.getHours();
      var iMinute = oDate.getMinutes();
      var iSecond = oDate.getSeconds();
      try {
        this.$refs.hour.innerHTML = this.AddZero(iHours);
        this.$refs.minute.innerHTML = this.AddZero(iMinute);
        this.$refs.second.innerHTML = this.AddZero(iSecond);
      } catch (error) {}
    },
    AddZero(n) {
      if (n < 10) {
        return "0" + n;
      }
      return "" + n;
    }
  },
  created() {}
};
</script>
<style scoped>
body,
ul,
li {
  padding: 0;
  margin: 0;
}
a {
  color: rgb(1, 124, 185);
  text-decoration: none;
}
body {
  font-size: 16px;
  color: #5a5d63;
  background: #d6d7d9;
  background: -webkit-radial-gradient(#eeefef, #d6d7d9);
  background: -moz-radial-gradient(#eeefef, #d6d7d9);
  background: -o-radial-gradient(#eeefef, #d6d7d9);
  background: -ms-radial-gradient(#eeefef, #d6d7d9);
  background: radial-gradient(#eeefef, #d6d7d9);
  padding: 5px;
}
.box {
  height: 100px;
  margin: 0px auto;
}
.box li {
  position: relative;
  text-align: center;
  list-style-type: none;
  display: inline-block;
  width: 75px;
  height: 80px;
  text-shadow: 0 2px 1px #f4f4f4;
  border: 1px solid #9fa2ad;
  border-radius: 5px;
  margin-right: 5px;
  background: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    color-stop(0.2, rgba(248, 248, 248, 0.3)),
    color-stop(0.5, rgba(168, 173, 190, 0.5)),
    color-stop(0.51, rgba(168, 173, 190, 0.3)),
    color-stop(0.9, rgba(248, 248, 248, 0.2))
  );
  background: -webkit-linear-gradient(
    to top,
    rgba(248, 248, 248, 0.3) 20%,
    rgba(168, 173, 190, 0.5) 50%,
    rgba(168, 173, 190, 0.3) 51%,
    rgba(248, 248, 248, 0.2) 90%
  );
  background: -moz-linear-gradient(
    to top,
    rgba(248, 248, 248, 0.3) 20%,
    rgba(168, 173, 190, 0.5) 50%,
    rgba(168, 173, 190, 0.3) 51%,
    rgba(248, 248, 248, 0.2) 90%
  );
  background: -o-linear-gradient(
    to top,
    rgba(248, 248, 248, 0.3) 20%,
    rgba(168, 173, 190, 0.5) 50%,
    rgba(168, 173, 190, 0.3) 51%,
    rgba(248, 248, 248, 0.2) 90%
  );
  background: -ms-linear-gradient(
    to top,
    rgba(248, 248, 248, 0.3) 20%,
    rgba(168, 173, 190, 0.5) 50%,
    rgba(168, 173, 190, 0.3) 51%,
    rgba(248, 248, 248, 0.2) 90%
  );
  background: linear-gradient(
    to top,
    rgba(248, 248, 248, 0.3) 20%,
    rgba(168, 173, 190, 0.5) 50%,
    rgba(168, 173, 190, 0.3) 51%,
    rgba(248, 248, 248, 0.2) 90%
  );
  box-shadow: inset 0 -2px 0 #f1f1f1, 0 1px 0 #f1f1f1, 0 2px 0 #9fa2ad,
    0 3px 0 #f1f1f1, 0 4px 0 #9fa2ad;
}
.box li:before,
.box li:after {
  display: block;
  content: "";
  position: absolute;
  width: 75px;
}
.box li:before {
  top: 50%;
  height: 1px;
  box-shadow: 0 1px 0 #868995, 0 2px 1px #fff;
}

.box li span:first-child {
  font: 60px "BitstreamVeraSansMonoBold";
  color: #52555a;
  display: block;
  height: 65px;
  line-height: 75px;
}
</style>