
<template>
  <div class="topBox1-container">
    <el-row :gutter="15" class="el-row">
      <el-col :span="4">
        <div class="cardBox">
          <h1>{{ policyCount }}</h1>
          <p>在保单位总数</p>
          <span class="lineSpan" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="cardBox">
          <h1>{{ deviceCount }}</h1>
          <p>设备总数</p>
          <span class="lineSpan" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="cardBox">
          <h1>{{ alarmCount }}</h1>
          <p>真实报警</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getstatistical } from '@/api/monitoring'
export default {
  name: 'TopBox1',
  props: [],
  data() {
    return {
      policyCount: '', // 在保单位总数
      deviceCount: '', // 设备总数
      alarmCount: ' ' // 真实报警
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getstatistical().then(res => {
        console.log(res, 'getstatistical')
        this.policyCount = res.data.policyCount
        this.deviceCount = res.data.deviceCount
        this.alarmCount = res.data.alarmCount
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss" >
.topBox1-container {
  // box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.08);
  margin-bottom: 15px;
  // border-bottom: 1px solid rgba(238, 238, 238, 0.8);
  .el-row {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      margin-bottom: 15px;
    }
  }
  .cardBox {
    position: relative;
    width: 100%;
    height: 120px;
    text-align: center;
    padding-top: 10px;
    h1 {
      width: 100%;
      height: 66px;
      line-height: 66px;
      color: #f2864e;
      font-size: 50px;
      font-weight: normal;
      margin: 0;
      padding: 0;
    }
    p {
      width: 100%;
      height: 20px;
      line-height: 20px;
      color: #333;
      font-size: 14px;
      font-weight: normal;
    }
    .lineSpan {
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 50px;
      background: #ddd;
      right: 0;
      top: 35px;
    }
  }
}
</style>
