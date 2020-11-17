<template>
  <div class="arightboxbott">
    <h2 class="tith2">报警设备排行</h2>
    <div id="rankingEq" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '90%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('rankingEq'), 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(chartData) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 60,
          y: 10,
          x2: 22,
          y2: 25,
          borderWidth: 0
        },
        xAxis: {
          show: true,
          max: 100,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#416891'
            }
          },
          axisLabel: {
            show: true,
            rotate: 0,
            textStyle: {
              color: '#fff',
              fontSize: 12
            }
          }

        },
        yAxis: [{
          type: 'category',
          data: ['设备类型', '消防电源', '电气火灾', 'NB设备', '网关'],
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            rotate: 35,
            textStyle: {
              color: '#416891',
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: '#416891'
            }
          }
        }],
        series: [{
          name: '设备报警排名',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: false,
              position: 'insideRight'
            }
          },
          barWidth: '10px', // 柱形的宽度=
          barCategoryGap: '10', // 柱形的间距
          data: [76, 60, 55, 38, 30, 25],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                1, 1, 0, 1,
                [
                  { offset: 0, color: '#ADC58A' },
                  { offset: 0.5, color: '#89CC99' },
                  { offset: 1, color: '#67D5A9' }
                ]
              )
            }
          }
        }]
      })
    }
  }
}
</script>
<style scoped>
.arightboxbott {
  background: url('../../../assets/screenPic/leftb1.png') no-repeat top center ;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  float: right;
  width: 98%;
  height: 98%;

}
</style>

