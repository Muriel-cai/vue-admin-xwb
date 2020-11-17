<template>
  <div class="monitoring-container">
    <div class="monitoringBox">
      <h1 class="titleF">系统概况</h1>
      <div>
        <topBox />

      </div>
    </div>

    <div class="monitoringBox">
      <h1 class="titleF">单位列表</h1>
      <div>
        <unitListTable
          @getUnits="getUnit"
          @getDetailInfo="getDetailInfos"
        />
      </div>
    </div>
    <!-- 弹框-->
    <div>
      <el-dialog
        width="95%"
        top="80px"
        :visible.sync="dialogTableVisible"
        :title="diaTitle"
        @dragDialog="dialogTableVisible = fasle"
      >
        <div v-if="dioType ==1">
          <unitPage
            ref="unitPage"
            :policy-id="uitIds"
            :is-page="2"
            @toGradePages="toGradePage"
          />
        </div>

        <div v-if="dioType ==2">
          <policyInfo
            ref="policyInfo"
            :policy-id="buildingIds"
          />
        </div>
        <div v-if="dioType ==3">
          <gradePage ref="gradePage" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import topBox from './components/top1'
import unitListTable from './components/unitListTable'
import unitPage from './unitPage'
import policyInfo from '../part/policyInfo'
import gradePage from './components/gradePage'
export default {
  name: 'Hello',
  components: {
    topBox,
    unitListTable,
    unitPage,
    policyInfo,
    gradePage
  },
  data() {
    return {
      uitIds: '', // 634473158820233217 (模拟参数)
      dialogTableVisible: false,
      diaTitle: '单位详情',
      dioType: '1',
      buildingIds: ''
    }
  },
  watch: {},
  methods: {
    getUnit(option) {
      this.dialogTableVisible = true
      this.diaTitle = '查看单位'
      this.uitIds = option
      this.dioType = '1'
      setTimeout(() => {
        this.$refs['unitPage'].getList(this.uitIds)
      })
    },
    getDetailInfos(option) {
      this.dialogTableVisible = true
      this.buildingIds = option
      this.diaTitle = '查看详情'
      this.dioType = '2'
      setTimeout(() => {
        this.$refs['policyInfo'].getList(this.buildingIds)
      })
    },
    //
    toGradePage(option) {
      this.dialogTableVisible = true
      // this.buildingIds = option
      this.diaTitle = '安全评分'
      this.dioType = '3'
      setTimeout(() => {
        this.$refs['gradePage'].getList(this.uitIds)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.monitoring-container {
  position: relative;
  padding: 15px;
  .marB10 {
    margin-bottom: 10px;
  }
  .monitoringBox {
    background: #fff;

  }
  .titleF {
    position: relative;
    width: 100%;
    height: 48px;
    margin: 0;
    text-indent: 20px;
    line-height: 48px;
    background: #fff;
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    border-bottom: 1px solid rgba(238, 238, 238, 0.8);
  }
}
</style>
