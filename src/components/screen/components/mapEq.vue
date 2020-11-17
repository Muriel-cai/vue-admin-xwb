
<template>
  <div class="amiddboxttop_map">
    <div class="mapSearch">
      <input type="text" placeholder="搜索场所" :v-model="value" class="placeS">

      <span class="anSpan" />
      <span class="refreshSpan" />

    </div>
    <div class="placeInfo">
      <p>场所数量： <span class="color-E7">200</span></p>
      <p>设备数量： <span class="color-E7">420</span></p>
    </div>
    <!-- <baidu-map
      class="allmap"
      :scroll-wheel-zoom="true"
      :center="center"
      :zoom="zoom"
      :points="points"
      ak="H4Q1j1b6Q0G9nvlGMG2C4SGvvw4hxnbU"
      :style="{height: height }"
      @ready="handler"
    >
      <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler" />
    </baidu-map> -->
    <div id="map_div" class="map_div" :style="{height: height }" />
  </div>

</template>
<script type="text/javascript"  src="http://api.map.baidu.com/api?v=3.0&ak=H4Q1j1b6Q0G9nvlGMG2C4SGvvw4hxnbU&callback"></script>
<script>
// import icon1 from '@/assets/screenPic/icon_csyjhs.png'
// import icon2 from '@/assets/screenPic/icon_csdw.png'
// import icon3 from '@/assets/screenPic/icon_guzhang1.png'
export default {
  props: {
    height: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      center: { lng: 120.15, lat: 30.28 },
      zoom: 15,
      points: [],
      value: ''

    }
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  beforeDestroy() {},
  methods: {
    initMap() {
      var map = new BMap.Map('map_div') // 创建Map实例

      // var mark1 = new BMap.Marker(new BMap.Point(116.41433,39.889031),{icon:icon1});
      map.centerAndZoom(new BMap.Point(120.15, 30.28), 15) // 初始化地图,设置中心点坐标和地图级别
      // 添加地图类型控件
      var size1 = new BMap.Size(10, 30)
      map.addControl(new BMap.MapTypeControl({
        offset: size1,
        mapTypes: [
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP

        ]
      }))
      map.setCurrentCity('杭州') // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      var icon1 = new BMap.Icon(require('@/assets/screenPic/icon_csyjhs.png'), new BMap.Size(18, 21))
      // var icon2 = new BMap.Icon(require('@/assets/screenPic/icon_csdw.png'), new BMap.Size(20, 20))
      // var icon3 = new BMap.Icon(require('@/assets/screenPic/icon_guzhang1.png'), new BMap.Size(20, 20))
      // 编写自定义函数,创建标注
      function addMarker(point) {
        var marker = new BMap.Marker(point, {
          icon: icon1
        })
        map.addOverlay(marker)
      }
      // 随机向地图添加25个标注
      var bounds = map.getBounds()
      var sw = bounds.getSouthWest()
      var ne = bounds.getNorthEast()
      var lngSpan = Math.abs(sw.lng - ne.lng)
      var latSpan = Math.abs(ne.lat - sw.lat)

      for (var i = 0; i < 25; i++) {
        var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 3), ne.lat - latSpan * (Math.random() * 0.7))
        // console.log(point, "----------")
        addMarker(point)
      }

      // 设备地图颜色
      var mapStyle = ({
        style: 'dack'
      })
      map.setMapStyle(mapStyle)
      map.setMapStyleV2({
        styleId: 'e9878bef986d0327577a9dae0c677eef'
      })

      // 加载城市控件
      var size = new BMap.Size(10, 50)
      map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size

      }))
      // map.centerAndZoom(new BMap.Point(120.15, 30.28), 15)
      // // this.createMap() // 创建地图
      // this.setMapEvent()// 设置地图事件
      // this.addMapControl()// 向地图添加控件
      // this.addMarker()// 向地图中添加marker
    }

    // clickHandler(e) {
    //   alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`)
    // },
    // addPoints() {
    //   const points = []
    //   for (var i = 0; i < 1000; i++) {
    //     const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
    //     points.push(position)
    //   }
    //   this.points = points
    // }
  }
}
</script>
<style lang="scss" scoped>
.amiddboxttop_map {
  position: relative;
  width: 98%;
  height: 92%;
  margin: 0 auto;
}
.allmap{
  width: 98%;
  height: 96%;;
}
.mapSearch {
  position: absolute;
  left: 10px;
  top:10px;
  z-index: 10;
  width: 300px;
  height: 30px;
  vertical-align: middle;
}

.placeS {
  width: 200px;
  height: 28px;
  display: block;
  float: left;
  padding-left: 10px;
  border: 1px solid #24B2D6;
  background: none;
  line-height: 28px;
  font-size: 12px;
  outline: none;
  color: #fff;
}

.mapSearch span {
  display: block;
  width: 30px;
  height: 30px;
  float: left;
  margin-left: 6px;
  cursor: pointer;
}

.anSpan {
  background: url('../../../assets/screenPic/icon_quanping.png')no-repeat center center;

}

.refreshSpan {
  background: url('../../../assets/screenPic/icon_shuaxin.png')no-repeat center center;
}

.placeInfo {
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
  width: 110px;
  height: 60px;
  border: 1px solid #24B2D6;
  padding-left: 10px;
  background: rgba(2, 54, 108, 0.6);
  line-height: 30px;
  font-size: 12px;
}
</style>
