<template>
  <div class="insuranceTo-container">
    <div class="main">
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
            label="设备名称"
            prop="deviceName"
            align="center"
            width="200"
          />
          <el-table-column
            label="设备类型"
            prop="deviceTypeName"
            align="center"
          />
          <el-table-column
            label="设备型号"
            prop="deviceModel"
            align="center"
            width="120"
          />
          <el-table-column
            label="设备序列号"
            prop="devSerialNo"
            align="center"
            width="180"
          />
          <el-table-column
            label="安装日期"
            prop="installDate"
            align="center"
            width="180"
          />
          <el-table-column
            label="设备状态"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.deviceStatus == 1"
                class="color-gre"
              >在线</span>
              <span
                v-if="scope.row.deviceStatus == 0"
                class="color-9"
              >离线</span>
              <span
                v-if="scope.row.deviceStatus == -1"
                class="color-9"
              >未知</span>
            </template>
          </el-table-column>
          <el-table-column
            label="设备生产公司或品牌"
            prop="deviceManufactory"
            align="center"
            width="180"
          />

          <el-table-column
            width="180"
            label="操作"
            fixed="right"
            align="center"
          >
            <template slot-scope="{row,$index}">
              <el-button
                size="mini"
                type="text"
                @click="checkjqs(row,$index)"
              >查看警情</el-button>
              <el-button
                v-if="false"
                size="mini"
                type="text"
                @click="checkmnls(row,$index)"
              >查看模拟量</el-button>
              <el-button
                size="mini"
                type="text"
                @click="checktds(row,$index)"
              >查看通道</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <pagination
            v-show="totalnum>0"
            :total="totalnum"
            :page.sync="param.page"
            :limit.sync="param.limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEquipment } from '@/api/equipment'
import { getDeviceList } from '@/api/policy'
import pagination from '@/components/Pagination'
export default {
  name: 'InsuranceTo',
  components: {
    pagination
  },
  props: {
    checkBuild: {
      type: Function,
      default: function() {}
    },
    buildingId: {
      type: String,
      default: ''
    },
    deviceId: {
      type: String,
      default: ''
    },
    checkjq: {
      type: Function,
      default: function() {}
    },
    checkmnl: {
      type: Function,
      default: function() {}
    },
    checktd: {
      type: Function,
      default: function() {}
    }

  },
  data() {
    return {
      listLoading: true,
      param: {
        page: 1,
        limit: 20
      },

      totalnum: 0,
      insuranceData: []
    }
  },
  created() {
    // this.getList(this.buildingId)
  },
  methods: {
    // 获取场所详情
    getList(option) {
      this.param.buildingId = this.buildingId
      this.listLoading = true
      if (option === 1) {
        getEquipment(this.param).then(response => {
          this.insuranceData = response.data
          this.totalnum = response.total
          this.listLoading = false
        })
      } else if (option === 2) {
        getDeviceList({ policyId: this.buildingId }).then(response => {
          console.log(response, '获取设备详情')
          this.insuranceData = response.data
          this.totalnum = response.total
          this.listLoading = false
        })
      }
    },
    checkBuilds(row, index) {
      const id = row.buildingId
      this.$emit('checkBuild', id)
    },
    // 查看警情
    checkjqs(row, index) {
      this.$emit('checkjq', row.deviceId)
      // console.log(row,index,'查看警情')
    },
    // 查看模拟量
    checkmnls(row, index) {
      this.$emit('checkmnl', row.deviceId)
    },
    // 查看通道
    checktds(row, index) {
      this.$emit('checktd', row.deviceId)
    }
  }
}
</script>
<style >
.el-form-item {
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>
.insuranceTo-container {
  position: relative;
  .color_red {
    color: #ff1010;
  }
  .color_blue {
    color: #3392ff;
  }
  .color-9 {
    color: #999;
  }
  .color-gre {
    color: #52d5c8;
  }
  .color_or {
    color: #ffbf7c;
  }
  .marB10 {
    margin-bottom: 10px;
  }
  .line {
    text-align: center;
  }
  .cus {
    cursor: pointer;
  }
  .rateBox {
    position: absolute;
    right: 10px;
  }
}
</style>

