<template>
  <div class="amiddboxtbott1 fl">
    <h2 class="tith2 pt1">视频监控</h2>
    <div class="amiddboxtbott1content">
      <div class="monitoringPic"><img :src="require('@/assets/screenPic/00.png') " class=""></div>
      <div class="monitoringPic"><img :src="require('@/assets/screenPic/video10.png')" class=""></div>
      <div class="monitoringPic"><img :src="require('@/assets/screenPic/00.png')" class=""></div>
      <div class="monitoringPic"><span>暂无监控</span></div>

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
<style lang="scss" scoped>
.amiddboxtbott1 {
  /*../img/amiddboxtbott1.png*/
  background: url('../../../assets/screenPic/leftb1.png' ) no-repeat top center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 98%;
  height: 98%;
  margin-left: .5%;
  margin-right: 1%
}

.amiddboxtbott1content {
  width: 91%;
  height: 86.5%;
  margin-left: 4.8%;
  margin-top: 1.6%;
}

.amiddboxtbott1content2 {
  width: 91%;
  height: 80%;
  margin-left: 4.8%;
  margin-top: .6%;
}
.monitoringPic {
  position: relative;
  width: 49.5%;
  height: 49.5%;
  float: left;
  object-fit: fill;
  margin-right: 0.5%;
  background: #666;
  cursor: pointer;
}

.monitoringPic span {
  position: absolute;
  z-index: 2;
  height: 20px;
  color: #fff;
  width: 80px;
  text-align: center;
  left: 50%;
  margin-left: -40px;
  top: 50%;
  margin-top: -10px;
  font-size: 14px;
}

.monitoringPic:nth-child(2n) {
  margin-right: 0;
}

.monitoringPic img {
  position: relative;
  z-index: 5;
  display: block;
  width: 98%;
  height: 96%;

}

.bigVideo {
  width: 900px;
}
</style>
