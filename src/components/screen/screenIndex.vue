<template>
  <div class="dashboard-container">
    <div class="dashboard-topTitle">
      <el-row :gutter="20">
        <el-col :span="8">
          <h1>{{ nowDay }}</h1>
        </el-col>
        <el-col :span="8">
          警情监控中心
        </el-col>
        <el-col :span="8" class="rightTil">
          <span class="minText online">设备在线 {{ onlineNum }}</span>
          <span class="minText offline">设备离线 {{ offlineNum }}</span>
          <span class=" quitBtn" @click="exit">退出</span>
        </el-col>

      </el-row>
    </div>
    <div ref="mainBox" class="dashboard-mainBox" :style="{height: curHeight }">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="mainBlock " :style="{height: hei2 }">
            <controlInfo />
          </div>
          <div class="mainBlock " :style="{height: hei2 }">
            <statisticsEq />
          </div>
          <div class=" mainBlock" :style="{height: hei2 }">
            <alarmEq :height="hei2" />

          </div>
        </el-col>
        <el-col :span="12">
          <div class="mainBlock " :style="{height: hei1 }">
            <mapEq :height="hei1" />
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="mainBlock " :style="{height: hei2 }">
                <monitoringVideo />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="mainBlock " :style="{height: hei2 }">
                <chart7 />
              </div>
            </el-col>
          </el-row>

        </el-col>
        <el-col :span="6">
          <div class="mainBlock" :style="{height: hei1 }">
            <profileSite :height="hei1" />
          </div>
          <div class="mainBlock" :style="{height: hei2 }">
            <rankingEq />
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
import alarmEq from './components/alarmEq'
import chart7 from './components/chart7'
import controlInfo from './components/controlInfo'
import mapEq from './components/mapEq'
import monitoringVideo from './components/monitoringVideo'
import profileSite from './components/profileSite'
import rankingEq from './components/rankingEq'
import statisticsEq from './components/statisticsEq'

export default {
  name: 'ScreenInedex',
  components: {
    alarmEq,
    chart7,
    controlInfo,
    mapEq,
    monitoringVideo,
    profileSite,
    rankingEq,
    statisticsEq
  },
  inject: ['fatherClose'],
  data() {
    return {
      nowDay: '',
      onlineNum: '20',
      offlineNum: '15',
      curHeight: '',
      hei1: '',
      hei2: '',
      hei3: ''
    }
  },
  computed: {},
  created() {

  },
  beforeMount() {
    const h = document.documentElement.clientHeight || document.body.clientHeight
    this.curHeight = (h - 100) + 'px' // 减去页面上固定高度height
    this.hei1 = (h - 100) * 0.62 + 'px'
    this.hei2 = (h - 100) * 0.315 + 'px'
    this.hei3 = (h - 100) * 0.30 + 'px'
    console.log(this.curHeight, h, 'hhhhhhhhhhhhhh')
  },
  mounted() {
    const self = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      self.nowDay = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} {a}') // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    getList() {
      console.log('lllll')
    },
    exit() {
      this.fatherClose()
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: #fff;
}
.dashboard {
  &-container {
    width: 100%;
    height: 100%;
    font-family: 微软雅黑, MicrosoftYahei, sans-serif;
    color: #fff;
    background: #00065b url('../../assets/screenPic/bg.jpg');
    background-size: 100% 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
     -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    padding: 10px 2%;
    overflow:hidden;
    .rightTil{
      position: relative;
      .minText{
        display: inline-block;
        font-size:12px;
        padding-left: 40px;
        margin-right: 30px;
      }
      .online {
        background: url('../../assets/screenPic/mf_footer_on.png') no-repeat left center;
        color: #0ED6E7;
      }

      .offline {
        background: url('../../assets/screenPic/mf_footer_off.png') no-repeat left center;
        color: #F55555;
      }
      .quitBtn {
        position: absolute;
        width: 60px;
        height: 34px;
        font-size: 14px;
        border: 1px solid #208FBD;
        text-align: center;
        line-height: 34px;;
        cursor: pointer;
        color: #fff;
        right:20px;
        top:50%;
        margin-top: -17px;
      }
    }

    .hei30 {
      width: 100%;
      height: 30%;
    }
    .hei38 {
      width: 100%;
      height: 38%;
    }
    .mainBlock{
      clear: both;
      margin: 1.5%;
      overflow: hidden;
    }

  }

  &-topTitle {
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
  }
  &-mainBox {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    overflow: hidden;
  }

}
</style>
