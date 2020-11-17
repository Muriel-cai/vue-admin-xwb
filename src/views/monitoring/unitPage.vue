
<template>
  <div class="unitBox-container">
    <div>
      <div
        ref="unitInfo"
        class="unitInfo"
      >
        <el-row
          :gutter="15"
          class="el-row"
        >
          <el-col :span="8">
            <div class="libox">
              <div class="unit_title dwT">场所信息</div>
              <div class="unitInfo_left">
                <p class="unit_p">
                  <span>场所名称：</span>
                  {{ placeInfo.buildingName }}
                </p>
                <p class="unit_p">
                  <span>地址：</span>
                  {{ placeInfo.address }}
                </p>
              </div>
              <div class="unitInfo_right">
                <div
                  id="cule_conMain"
                  class="cule_conMain"
                  @click="toGradePage"
                >
                  {{ grade }}</div>
                <p>安全评分</p>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="libox">
              <div class="unit_title xfT">
                消防知识
                <span
                  class="g-blue"
                  @click="tiJk "
                >查看监控></span>
              </div>
              <div class="ml_block g-align-center fireBox">
                <div class="fireDiv">
                  <img :src="hjImgUrl">
                  <p class="g-red1">{{ fireCount }}</p>
                  <p class="g-gray">火警</p>
                </div>
                <div class="fireDiv">
                  <img :src="wbImgUrl">
                  <p class="g-orange1">{{ mistakeCount }}</p>
                  <p class="g-gray">误报</p>
                </div>
                <div class="fireDiv">
                  <img :src="gzImgUrl">
                  <p class="g-green1">{{ faultCount }}</p>
                  <p class="g-gray">故障</p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="libox">
              <div class="unit_title bdT">
                保单信息
                <!-- <span
                  v-if='isPage == 1'
                  class="g-orange"
                  @click="getBdLis"
                >查看详情> {{ispage}}</span> -->
              </div>
              <div class="ml_block">
                <p class="unit_p">
                  <span>保单号：</span>
                  {{ policyData.policyNo }}
                </p>
                <p class="unit_p">
                  <span>投保人：</span>
                  {{ policyData.holderName }}
                </p>
                <p class="unit_p">
                  <span>被保险人：</span>
                  {{ policyData.insureName }}
                </p>
                <p class="unit_p">
                  <span>主承保公司：</span>
                </p>
                <p class="unit_p">
                  <span>保险期限：</span>
                  {{ policyData.startDate }} 至{{ policyData.endDate }}
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <topbox2 ref="topbox2" :policy-id="uitId" @getBdLisS="getBdLis" /> -->
    </div>
    <div class="mainBox">
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick()"
      >
        <el-tab-pane
          label="隐患管理"
          name="first"
        >
          <troubleTable
            ref="troubleTable"
            :policy-id="policyId"
          />
        </el-tab-pane>
        <el-tab-pane
          label="设备列表"
          name="second"
        >
          <euipmentList
            ref="euipmentList"
            :policy-id="policyId"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tableBox" />
    <!-- 弹框-->
    <div>
      <el-dialog
        width="95%"
        top="80px"
        :visible.sync="dialogTableVisible"
        :title="diaTitle"
        @dragDialog="dialogTableVisible = fasle"
      >
        <policyInfo
          ref="policyInfo"
          :policy-id="buildingIds"
        />

      </el-dialog>
    </div>
  </div>
</template>

<script>
// import topbox2 from './components/top2'

import troubleTable from './components/troubleTable'
import euipmentList from './components/euipmentList'
import policyInfo from '../part/policyInfo'
import { checkInfo } from '@/api/monitoring'
export default {
  name: 'Hello',
  components: {
    // topbox2,
    troubleTable,
    euipmentList,
    policyInfo
  },
  props: {
    'policyId': {
      type: String,
      default: '-1'
    },
    'isPage': {
      type: Number,
      default: -1
    },
    'toGradePages': {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      activeName: 'first',
      dialogTableVisible: false,
      diaTitle: '查看详情',
      buildingIds: '',
      grade: '',
      fireCount: 10,
      mistakeCount: 10,
      faultCount: 10,
      mes: '测试',
      placeInfo: {
        buildingName: '',
        address: ''
      },
      policyData: {},
      monitorUrl: '',
      hjImgUrl: require('@/assets/img/icon_zshj.png'),
      wbImgUrl: require('@/assets/img/icon_hj.png'),
      gzImgUrl: require('@/assets/img/icon_guzhang.png')
    }
  },
  watch: {
    policyId(val, old) {
      this.policyId = val
      console.log(val, 'ces ++++++++++++', 'old')
      this.$refs['troubleTable'].getList(val)
      this.$refs['euipmentList'].getList(val)
      // this.value = this.demo
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // this.drawLine()
  },
  methods: {
    // Tab 切换
    handleClick(tab, event) {
      console.log(tab, event, 'tab++++++++++++++++++')
    },
    getList(id) {
      console.log(this.policyId, 'policyId')
      const data = {
        policyId: id || this.policyId
      }
      this.listLoading = true
      // console.log(data, 'getInfo+++++++++++TOP2')
      checkInfo(data).then(res => {
        // console.log(res.data.place, 'getstatistical')
        if (res.data.place != null && res.data.place !== '') {
          this.placeInfo = res.data.place
        }
        this.policyData = res.data.policy
        this.fireCount = res.data.fireCount
        this.mistakeCount = res.data.mistakeCount
        this.faultCount = res.data.faultCount
        this.grade = res.data.grade
        this.monitorUrl = res.data.monitorUrl
        this.listLoading = false
        this.drawLine()
      })
    },
    getBdLis(option) {
      this.dialogTableVisible = true
      this.diaTitle = '查看详情'
      // 测试：
      if (option) {
        this.buildingIds = option
      } else {
        this.buildingIds = '722441428440973313'
      }
    },
    tiJk() {
      window.open(this.monitorUrl)
    },
    toGradePage() {
      console.log('toGradePafe++++++')
      this.$emit('toGradePages', this.policyId)
    },
    drawLine() {
      var echarts = require('echarts')
      var plotChart = echarts.init(document.getElementById('cule_conMain'))
      console.log(this.grade, 'this.grade')
      const option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '安全评分',
            type: 'gauge',
            radius: '80%',
            startAngle: 180, // 开始角度 左侧角度
            endAngle: 0, // 结束角度 右侧
            detail: {
              formatter: this.grade,
              offsetCenter: [0, '50%'],
              textStyle: {
                color: '#f00',
                fontSize: 32
              }
            }, // 仪表盘显示数据
            axisLine: {
              // 仪表盘轴线样式
              lineStyle: {
                color: [
                  // 仪表盘背景颜色渐变
                  [0.33, '#FF8060'],
                  [0.67, '#FFBF7C'],
                  [1, '#2BA179']
                ],
                width: 10 // 轴线宽度
              }
            },
            pointer: { // 指针样式
              length: '60%',
              height: 20
            },
            splitLine: {
              // 分割线样式
              length: 0
            },
            axisTick: {
              // 刻度线
              show: false
            },
            axisLabel: {
              // 刻度标签
              show: false
            },
            data: [{ value: this.grade }],
            markPoint: {
              symbol: 'circle',
              symbolSize: 3,
              data: [
                // 跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                { x: 'center', y: 'center', itemStyle: { color: '#FFF' }}
              ]
            }
          }
        ]
      }
      plotChart.setOption(option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.unitBox-container {
  position: relative;
  background: #f6f6f6;
  padding: 10px;
  .mainBox {
    background: #fff;
  }
  .unitInfo {
    margin-bottom: 1px;
    .el-row {
      margin-bottom: 1px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-col {
        margin-bottom: 15px;
      }
    }
    .libox {
      position: relative;
      width: 100%;
      height: 220px;
      text-align: left;
      padding: 10px;
      background: #fff;
      overflow: hidden;
      .unit_title {
        height: 32px;
        line-height: 32px;
        text-align: left;
        padding-left: 25px;
        font-size: 16px;
        font-weight: bold;
      }
      .dwT {
        background: url('./../../assets/img/icon_danwei.png') no-repeat left
          center;
      }
      .xfT {
        background: url('./../../assets/img/icon_xiaofang.png') no-repeat left
          center;
      }
      .bdT {
        background: url('./../../assets/img/icon_baodan.png') no-repeat left
          center;
      }
      .unit_title span {
        display: inline-block;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
      }

      .unitInfo_left {
        position: relative;
        width: calc(100% - 150px);
        height: 160px;
        float: left;
      }

      .unitInfo_right {
        position: relative;
        width: 140px;
        height: 160px;
        float: right;
        text-align: center;
      }
      .cule_conMain {
        width: 140px;
        height: 140px;
        line-height: 140px;
        font-size: 36px;
        color: #ff8060;
        font-weight: bold;
        text-align: center;
      }
      .unit_p {
        position: relative;
        font-size: 14px;
        color: #666;
        min-height: 24px;
        padding: 3px 0 3px 100px;
        text-align: left;
      }

      .unit_p span {
        position: absolute;
        display: inline-block;
        width: 100px;
        top: 0;
        left: 0;
        line-height: 24px;
        min-height: 24px;
        padding: 3px 0;
        font-size: 14px;
        text-align: right;
        color: #000;
      }
      .fireBox {
        margin-top: 30px;
      }

      .fireDiv {
        display: inline-block;
        width: 30%;
        height: 120px;
      }

      .fireDiv p {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
      }

      .nuittabUl {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #fff;
        border-bottom: 1px solid #eeeeee;
      }
    }
  }
}
</style>
