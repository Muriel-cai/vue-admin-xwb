<template>
  <div class="amiddboxtbott2">
    <h2 class="tith2 pt1">近7日警情统计趋势图</h2>
    <div id="chart7" :style="{height:height,width:width}" />
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
      this.chart = echarts.init(document.getElementById('chart7'), 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(chartData) {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: ['12-7', '12-8', '12-9', '12-10', '12-11', '12-12', '12-13'],
          splitLine: {
            show: false
          },
          grid: {
            x: 20,
            y: 10,
            x2: 22,
            y2: 32,
            borderWidth: 0
          },
          axisLine: {
            lineStyle: {
              color: '#1E4D7B',
              width: 1
            }
          },
          axisLabel: {
            show: true,
            rotate: 30,
            textStyle: {
              color: '#fff',
              fontSize: 12 // 让字体变大
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#1E4D7B',
              width: 1
            }
          },
          axisLine: {
            lineStyle: {
              color: '#1E4D7B',
              width: 1
            }
          }
        },
        series: [
          {
            data: [82, 72, 90, 94, 59, 78, 60],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FDFA34'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.amiddboxtbott2 {
  background: url('../../../assets/screenPic/leftb1.png') no-repeat top center ;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  float: right;
  width: 98%;
  height: 98%;

}
</style>
