
<template>
  <div class="equipment-container">
    <div class="equipmentTable">
      <div>
        <div class="insurBox">
          <el-table
            v-loading="listLoading"
            :data="insuranceData"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column
              label="场所名称"
              prop="buildingName"
              align="center"
              width="200"
            />
            <el-table-column
              label="地址"
              prop="address"
              align="center"
            />
            <el-table-column
              label="	区域编码"
              prop="regionCode"
              align="center"
              width="120"
            />
            <el-table-column
              label="添加时间"
              prop="insertTime"
              align="center"
              width="180"
            />
            <el-table-column
              label="更新时间"
              prop="lastTime"
              align="center"
              width="180"
            />
            <el-table-column
              width="120"
              fixed="right"
              label="操作"
              align="center"
            >
              <template slot-scope="{row,$index}">
                <el-button
                  size="mini"
                  type="text"
                  @click="getkBuild(row,$index)"
                >查看设备</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <pagination
              v-show="totalnum>0"
              :total="totalnum"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="getList"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框1-->
    <div>
      <el-dialog
        width="95%"
        top="80px"
        :visible.sync="dialogTableVisible"
        title="查看设备"
        @dragDialog="dialogTableVisible = fasle"
      >
        <equipmentTable
          ref="equipmentTable"
          :building-id="buildingIds"
          @checkjq="checkjqData"
          @checkmnl="checkmnlData"
          @checktd="checktdData"
        />
      </el-dialog>
    </div>
    <!-- 弹框2-->
    <div>
      <el-dialog
        width="90%"
        top="100px"
        :visible.sync="dialogTableVisible2"
        :title="title2"
        @dragDialog="dialogTableVisible2 = fasle"
      >
        <div v-if="dioType ==1">
          <alarmTable
            ref="alarmTable"
            :device-id="deviceIds"
          />
        </div>
        <div v-if="dioType ==2">
          <analogTable
            ref="analogTable"
            :device-id="deviceIds"
          />
        </div>
        <div v-if="dioType ==3">
          <channelTable
            ref="channelTable"
            :device-id="deviceIds"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPlaceList } from '@/api/equipment'
import equipmentTable from '../part/equipmentTable'
import alarmTable from '../part/alarmTable'
import analogTable from '../part/analogTable'
import channelTable from '../part/channelTable'
import pagination from '@/components/Pagination'
export default {
  name: 'Hello',
  components: {
    pagination,
    equipmentTable,
    alarmTable,
    analogTable,
    channelTable
  },
  data() {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      totalnum: 0,
      insuranceData: [],
      buildingIds: '', // 634473158820233217 (模拟参数)
      dialogTableVisible: false,
      dialogTableVisible2: false,
      title2: '查看详情',
      dioType: '1', // 1-查看警情 ，2-查看模拟量 ，3-查看通道
      deviceIds: ''
    }
  },
  watch: {},

  created() {
    this.getList()
  },
  methods: {
    // 获取场所详情
    getList() {
      this.listLoading = true
      getPlaceList(this.listQuery).then(response => {
        this.insuranceData = response.data
        this.totalnum = response.total
        this.listLoading = false
      })
    },
    getkBuild(option) {
      this.dialogTableVisible = true
      this.buildingIds = option.buildingId
      setTimeout(() => {
        this.$refs['equipmentTable'].getList(1)
      })
    },
    // 查看警情
    checkjqData(option) {
      this.dioType = 1
      this.deviceIds = option
      this.dialogTableVisible2 = true
      this.title2 = '查看警情'
      setTimeout(() => {
        this.$refs['alarmTable'].getList()
      })
    },
    // 查看模拟量
    checkmnlData(option) {
      this.dioType = 2
      this.deviceIds = option
      this.dialogTableVisible2 = true
      this.title2 = '查看模拟量'
      setTimeout(() => {
        this.$refs['analogTable'].getList()
      })
    },
    checktdData(option) {
      this.dioType = 3
      this.deviceIds = option
      this.dialogTableVisible2 = true
      this.title2 = '查看通道'
      setTimeout(() => {
        this.$refs['channelTable'].getList(this.deviceIds)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.equipment-container {
  position: relative;
  padding: 10px;
  background: #fff;
  position: relative;
  margin: 2px;
  .marB10 {
    margin-bottom: 10px;
  }
}
</style>
