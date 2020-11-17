
<template>
  <div class="topBox2-container">
    <el-row :gutter="15" class="el-row">
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
            <div id="cule_conMain" class="cule_conMain" style>{{ grade }}</div>
            <p>安全评分</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="libox">
          <div class="unit_title xfT">
            消防知识
            <span class="g-blue">查看监控></span>
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
            <span class="g-orange" @click="getBdList">查看详情></span>
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
</template>

<script>
import { checkInfo } from '@/api/monitoring'
export default {
  name: 'TopBox1',
  props: {
    getBdLisS: {
      type: Function,
      default: function() {}
    },
    policyId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listLoading: true,
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
      hjImgUrl: require('@/assets/img/icon_zshj.png'),
      wbImgUrl: require('@/assets/img/icon_hj.png'),
      gzImgUrl: require('@/assets/img/icon_guzhang.png')
    }
  },
  created() {
    // console.log(this.policyId, 'created中看')
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.listLoading = true
      checkInfo({ policyId: this.policyId }).then(res => {
        if (res.data.place != null && res.data.place !== '') {
          this.placeInfo = res.data.place
        }
        this.policyData = res.data.policy
        this.fireCount = res.data.fireCount
        this.mistakeCount = res.data.mistakeCount
        this.faultCount = res.data.faultCount
        this.grade = res.data.grade
        this.listLoading = false
      })
    },
    getBdList() {
      this.$emit('getBdLisS', this.policyId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import "global.css"; */
</style>
<style scoped  lang="scss">
//  @import "global.css";
.topBox2-container {
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
      background: url("./../../../assets/img/icon_danwei.png") no-repeat left
        center;
    }
    .xfT {
      background: url("./../../../assets/img/icon_xiaofang.png") no-repeat left
        center;
    }
    .bdT {
      background: url("./../../../assets/img/icon_baodan.png") no-repeat left
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
</style>y

