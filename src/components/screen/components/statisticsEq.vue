<template>
  <div class="aleftboxtmidd">
    <h2 class="tith2">设备数量统计</h2>
    <div id="statisticsEq" :style="{height:height,width:width}" />
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
  watch: {},
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
      this.chart = echarts.init(document.getElementById('statisticsEq'), 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(chartData) {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: [
          {
            text: '总设备数量：6',
            x: '28%',
            bottom: 10,
            textStyle: {
              color: '#fff',
              textAlign: 'center',
              fontSize: 14
            }
          }
        ],
        grid: {
          x: -20,
          y: 5,
          x2: 0,
          y2: 0
        },
        series: [
          {
            name: '总设备数量：6',
            type: 'pie',
            radius: ['30%', '45%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            color: [
              '#6495ED',
              '#C487EE',
              '#CDB232',
              '#DA70D4',
              '#87CDF9',
              '#FE7E50'
            ],
            label: {
              normal: {
                show: true,
                position: 'left'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              textStyle: {
                color: '#fff', // x轴data 的颜色
                fontSize: 12 // 让字体变大
              }
            },
            data: [
              {
                value: 335,
                name: '视频监控'
              },
              {
                value: 310,
                name: 'NB设备'
              },
              {
                value: 234,
                name: '电气火灾'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.aleftboxtmidd{
    background: url('../../../assets/screenPic/leftb1.png') ;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  float: right;
  width: 98%;
  height: 98%;
}
</style>
