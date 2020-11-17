
<template>
  <div class="gradePage-container">
    <div class="main">
      <el-row class="topBox">
        <el-col :span="8">
          <div class="gradeBox">
            <h1>{{ list.complexScore }}</h1>
            <p>安全评分</p>
            <span class="line" />
          </div>
        </el-col>
        <el-col :span="16">
          <div
            id="radarBox"
            class="radarBox"
            fer="radarBox"
          />
        </el-col>
      </el-row>
      <div class="midText">
        <h1 class="v_title2">安全评分由以下8个维度风控分数组成，分别为：<span
          class="deploy titleBtn"
          data-static="1"
        >收起</span></h1>
        <div>
          <p>1、行业分类：被保险人/单位所在行业风险及安全等级；</p>
          <p>2、建筑类型：被保险人/单位投保标、建筑类型情况；</p>
          <p>3、设备可用性：被保险人/单位物联网设备的数量、类型和覆盖情况；</p>
          <p>4、物联网数据：智慧消防设备的日常数据；</p>
          <p>5、警情处理：设备报警后的处理和即时反应情况；</p>
          <p>6、行业指数：被保险人/单位所在的行业整体指数；</p>
          <p>7、企业征信：国家企业信用信息公示系统所公示的行政处罚、经营异常、失信企业黑名单、司法风险等综合数据；</p>
          <p>8、特别约定：触发智慧消防特别约定条款，如下:</p>
          <p class="hasType"><span>1</span> 如被保险人存在隐患，保险人下发整改通知后未进行整改引起的火灾事故，保险人在原免赔基础上增加10%免赔率。</p>
          <p class="hasType"><span>2</span> 如火灾事故发生时监控设备失效，经核实存在故意破坏情况的保险人在原免赔基础上增加10%免赔率，直至拒赔。</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { placeScoreRecord } from '@/api/policy'
export default {
  name: 'GradePage',
  props: [],
  data() {
    return {
      list: {
        bodyName: '',
        cardNo: '',
        industryCateScore: '', // 行业分类得分
        buildTypeScore: '', // 建筑类型得分
        industryIdxScore: '', // 行业指数得分
        deviceNumScore: '', // 设备可用性得分
        deviceDataScore: '', // 物联网数据得分
        deviceAlarmScore: '', // 警情处理得分
        dwCreditScore: '', // 单位征信得分
        triggerAppointScore: '', // 特别约定得分
        complexScore: '' // 综合评分
      }
    }
  },
  created() {
    // this.getList()
  },
  mounted() {
    // this.getList()
  },
  methods: {
    getList(id) {
      placeScoreRecord({ policyId: id }).then(res => {
        this.list = res.data
        this.setEchart(this.list)
      })
    },
    setEchart(list) {
      const echarts = require('echarts')
      const plotChart = echarts.init(document.getElementById('radarBox'))
      const listdata = [
        [
          list.industryCateScore,
          list.buildTypeScore,
          list.industryIdxScore,
          list.deviceNumScore,
          list.deviceDataScore,
          list.deviceAlarmScore,
          list.dwCreditScore,
          list.triggerAppointScore
        ]
      ]
      var lineStyle = {
        normal: {
          width: 1,
          opacity: 0.5
        }
      }
      const option = {
        title: {
          text: '评分明细',
          left: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal'
          }
        },
        // tooltip: { trigger: 'item' },
        legend: {
          bottom: 5,
          right: 10,
          data: ['数据名称'],
          itemGap: 20,

          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        radar: {
          indicator: [
            { name: '行业分类', max: 100 },
            { name: '建筑类型', max: 100 },
            { name: '行业指数 ', max: 100 },
            { name: '设备可用性 ', max: 100 },
            { name: '物联网数据 ', max: 100 },
            { name: '警情处理', max: 100 },
            { name: '单位征信', max: 100 },
            { name: '特别约定', max: 100 }
          ],
          shape: '', // s设置设置雷达图设置雷达图雷达
          splitNumber: 4,
          name: {
            textStyle: {
              color: '#2D5D94'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#2D5D94'].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#2D5D94' // 雷达图颜色
            }
          }
        },
        series: [
          {
            name: '',
            type: 'radar',
            lineStyle: lineStyle,
            data: listdata,
            symbol: 'round',
            itemStyle: {
              color: '#49DAA7'
            },
            areaStyle: {
              opacity: 0.1
            }
          }
        ]
      }
      plotChart.setOption(option)
    }
    // setEchart(option) {

    //   var lineStyle = {
    //     normal: {
    //       width: 1,
    //       opacity: 0.5
    //     }
    //   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss" >
.gradePage-container {
  padding: 10px;
  .main {
    min-height: 500px;
    .topBox {
      position: relative;
      width: 100%;
      height: 260px;
      background: #050d19;
      .gradeBox {
        position: relative;
        padding: 50px;
        .line {
          position: absolute;
          width: 1px;
          height: 80px;
          right: 0;
          top: 50%;
          margin-top: -40px;

          background: #fff;
        }
        h1 {
          line-height: 140px;
          font-size: 70px;
          color: #44cba0;
          text-align: center;
        }
        p {
          font-size: 18px;
          color: #fff;
          text-align: center;
          line-height: 30px;
        }
      }
      .radarBox {
        position: relative;
        width: 500px;
        height: 240px;
        padding: 10px;
      }
    }

    .midText {
      position: relative;
      padding: 0px 20px;
      .v_title2 {
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        font-weight: bold;
        text-align: left;
        color: #333;
        border-bottom: 1px solid #dddddd;
        margin-bottom: 10px;
        .titleBtn {
          display: inline-block;
          font-size: 14px;
          font-weight: normal;
          padding-right: 20px;
          cursor: pointer;
        }
      }
      p {
        line-height: 22px;
        font-size-adjust: 14px;
        color: #666;
      }

      .hasType {
        padding-left: 18px;
        line-height: 22px;
        span {
          display: inline-block;
          text-align: center;
          width: 15px;
          height: 15px;
          border: 1px solid #999;
          border-radius: 50%;
          font-size: 12px;
          line-height: 15px;
        }
      }
    }
  }
}
</style>
