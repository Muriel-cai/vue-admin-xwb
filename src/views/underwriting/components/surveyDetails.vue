<template>
  <div class="surveyDetails-container">
    <h1 class="topTitle">“小微保”企业风险查勘报告</h1>
    <div class="enterpriseInfo">

      <el-row class="bg-purple topInfo">
        <el-col
          :span="12"
          class="borderR"
        >
          企业名称：{{ patrolRecord.companyName }}
        </el-col>
        <el-col
          :span="6"
          class="padL"
        >
          巡查时间：{{ patrolRecord.startTime }}
        </el-col>
        <el-col :span="6">
          查勘人：{{ patrolRecord.username }}
        </el-col>
      </el-row>
      <el-row class="mainInfo">
        <el-col
          :span="12"
          class="borderR"
        >

          <p class=" infop">
            <span>行业：</span>
            {{ patrolRecord.industryName }}
          </p>

          <p class=" infop">
            <span class="">经营范围：</span>
            {{ patrolRecord.businessScope }}
          </p>

          <p class=" infop">
            <span class="">标的地址：</span>
            {{ patrolRecord.address }}
          </p>

          <p class=" infop">
            <span class="">原材料：</span>
            {{ patrolRecord.rawMaterials }}
          </p>

          <p class=" infop">
            <span class="">生产工艺：</span>
            {{ patrolRecord.policyState }}
          </p>

          <p class="infop">
            <span class="">产品：</span>
            {{ patrolRecord.produceTech }}
          </p>
        </el-col>
        <el-col
          :span="12"
          class="padL"
        >
          <p class=" infop">
            <span class="">查勘得分：</span>
            <span class="color_red fBold"> {{ patrolRecord.grade }} </span>
          </p>
          <p class=" infop">
            <span class="">风险评价及查勘意见：</span>
            {{ patrolRecord.evaluate }}
          </p>
        </el-col>
      </el-row>
    </div>
    <!--   -->
    <el-table
      v-loading="listLoading"
      :data="cateList"
      element-loading-text="Loading"
      border
      fit
      :header-cell-style="{background:'#f0f6fc'}"
      highlight-current-row
      :span-method="objectSpanMethod"
    >
      <el-table-column
        label="评估项目"
        prop="cateName"
        align="center"
      />
      <el-table-column
        label="项目分类"
        prop="groupTitle"
        align="center"
      />

      <el-table-column
        label="查勘内容"
        prop="problemTitle"
        align="center"
      />

      <el-table-column
        label="选择项"
        prop="optionName"
        align="center"
      />

      <el-table-column
        label="影像录音"
        align="center"
        width="165"
      >
        <template slot-scope="scope">
          <div v-if=" scope.row.voiceList ">
            <div
              v-for="(u,v) in scope.row.voiceList "
              :key="v"
            >
              <autoAudio :the-url="u.voiceUrl" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="查勘图片"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.imgList">
            <el-card
              v-for="(b,p) in scope.row.imgList "
              :key="p"
              :body-style="{ padding: '0px' }"
              class="imgBox"
            >
              <el-image
                style="width: 30px; height: 30px"
                :src="b.imgUrl"
                :preview-src-list="setPic(b.imgUrl)"
                :z-index="zIndex"
              />
            </el-card>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="得分"
        prop="groupScore"
        align="center"
        width="80"
      />
    </el-table>
  </div>
</template>

<script>
import {
  atrolRecordById,
  getRiskReportData
} from '@/api/underwriting'
import autoAudio from '../../part/autoAudio'
export default {
  name: 'Hello',

  components: {
    autoAudio
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? '暂停' : '播放'
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      // return realFormatSecond(second)
    }
  },
  props: {
    dataId: {
      type: String,
      default: '-1'
    }
  },
  data() {
    return {
      listLoading: false,
      patrolRecord: [],
      cateList: [], // 小分类集合
      fit: 'fill',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0
      },
      zIndex: 9999,
      srcList: [],
      pos: 0,
      spanArr: []
    }
  },
  created() {
    // this.warehouseNamesetdates(this.minCateList)
  },
  methods: {
    getGroup(option) {
      this.listLoading = true
      console.log('获取左边导航TREE')
      const data = {
        id: option
      }
      atrolRecordById(data)
        .then(res => {
          console.log(res, 'getCateList 基本信息')
          this.patrolRecord = res.data
          // console.log(this.patrolRecord.child, 'patrolRecord')
        })
        .then(
          getRiskReportData(data).then(res => {
            console.log(res, '  atrolRecordById 问题信息')
            this.cateList = res.data
            this.getSpanArr(res.data)
            this.listLoading = false
          })
        )
    },
    // 合并小分类
    getSpanArr(data) {
      this.pos = 0
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].groupCode === data[i - 1].groupCode) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
        // console.log( this.spanArr,' this.spanArr')
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 6) {
        // console.log('column: ', column)
        // console.log('columnIndex ', this.spanArr);
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row, // 合并的行数
          colspan: _col // 合并的列数, 设为０则直接不显示
        }
      }
    },

    // goAssignBlock(data) {
    //   console.log(data, '侧边方法')
    //   // 获取点击的按钮对应页面的id
    //   var PageId = document.querySelector('#page' + key)
    //   // 使用平滑属性，滑动到上方获取的距离
    //   // 下方我只设置了top，当然 你也可以加上 left 让他横向滑动
    //   // widow 根据浏览器滚动条，如果你是要在某个盒子里面产生滑动，记得修改
    //   window.scrollTo({
    //     top: PageId.offsetTop,
    //     behavior: 'smooth'
    //   })
    // },
    setPic(b) {
      const picArr = []
      picArr.push(b)
      return picArr
    },
    // 控制音频的播放与暂停
    startPlayOrPause(mp3) {
      console.log(mp3)
      this.audio = new Audio()
      this.audio.src = mp3
      let playPromise = ''
      let second = 0
      playPromise = this.audio.play()
      if (playPromise) {
        playPromise
          .then(() => {
            // 音频加载成功
            // 音频的播放需要耗时
            this.tiemr = setInterval(() => {
              second--
              if (second <= 0) {
                this.audio.pause()
                clearInterval(this.tiemr)
              }
            }, 1000)
          })
          .catch(e => {
            // 音频加载失败
            console.error(e)
          })
      }
      // return this.audio.playing ? this.pause() : this.play()
    },

    // 播放音频
    play() {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      console.log('timeupdate')
      console.log(res)
      this.audio.currentTime = res.target.currentTime
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log('loadedmetadata')
      console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.surveyDetails {
  &-container {
    padding: 10px;
    .topTitle {
      height: 60px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 60px;
      color: rgba(51, 51, 51, 1);
      text-align: center;
    }
    .enterpriseInfo {
      height: auto;
      border: 1px solid #d7dde4;
      margin-bottom: 20px;
      .topInfo {
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        color: #2c3e50;
        padding: 0 20px 20px 20px;
        border-bottom: 1px solid #d7dde4;
      }
      .mainInfo {
        padding: 0px 20px;
        .infop {
          font-size: 14px;
          line-height: 36px;
          color: #2c3e50;
        }
      }
    }
    .borderR {
      border-right: 1px solid #d7dde4;
    }
    .padL {
      padding-left: 20px;
    }
    h1,
    h2 {
      font-size: 16px;
      line-height: 32px;
      font-weight: bold;
    }
    h1 {
      color: #333;
    }
    .bg-purple {
      background: #f0f6fc;
    }
    .imgBox {
      display: inline-block;
      margin: 0px 3px;
      width: 30px;
      height: 30px;
      border-radius: 0px;
    }
  }
}
</style>
