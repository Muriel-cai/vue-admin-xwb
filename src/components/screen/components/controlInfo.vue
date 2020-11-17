
<template>
  <div class="aleftboxttop">

    <h2 class="tith2">消防信息</h2>

    <div class="lefttoday_number">
      <div class="widget-inline-box">
        <h4 class="text-muted pt6">
          <img
            :src="require('@/assets/screenPic/icon_zshj.png')"
            height="56"
          >
        </h4>
        <h3 class="cFF3C3C ">0</h3>
        <p>火警</p>
      </div>
      <div class="widget-inline-box">
        <h4 class="text-muted pt6">
          <img
            :src="require('@/assets/screenPic/icon_hj.png')"
            height="56"
          ></h4>
        <h3 class="cFFBF7C">20</h3>
        <p>误报</p>
      </div>
      <div class="widget-inline-box text-center fl noMarginR">
        <h4 class="text-muted pt6">
          <img
            :src="require('@/assets/screenPic/icon_guzhang.png')"
            height="56"
          ></h4>
        <h3 class="c52D5C8">13</h3>
        <p>故障</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  watch: {},

  methods: {}
}
</script>
<style scoped lang="scss">
.aleftboxttop {
  background: url('../../../assets/screenPic/leftb1.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 99%;
  height:100%;
  margin-bottom: 1%
}
h3{
  font-size: 24px;
  font-weight: normal;
}
.aleftboxttop .lefttoday_number {
  background: none;
}

.aleftboxttop .widget-inline-box {
  width: 33.3%;
  /* background: rgba(1, 202, 217, .2); */
  padding: 8% 0;
  height: 100%;
  font-size: 10px;
  text-align: center;
  float: left;
  p{
    font-size: 16px;;
  }
}
.noMarginR {
  margin-right: 0px;
}
.text-muted img {
  vertical-align: middle;
  margin: 0 0px;
  width:50px;
  height: 50px;
}
</style>
