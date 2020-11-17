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
            width="180"
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
          />
          <el-table-column
            label="安装时间"
            prop="installDate"
            align="center"
            width="180"
          />
          <el-table-column
            label="当前状态"

            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.status ==0 "
                class="color-gre"
              >在线</span>
              <span
                v-if="scope.row.status ==1 "
                class="color-9"
              >离线</span>
              <span
                v-if="scope.row.status ==2 "
                class="color_or"
              >未知</span>
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
</template>

<script>
import { getEquipmentList } from '@/api/monitoring'
import pagination from '@/components/Pagination'
export default {
  name: 'InsuranceTo',
  components: {
    pagination
  },
  props: {
    getThisT: {
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
      listQuery: {
        page: 1,
        limit: 20
      },
      totalnum: 0,
      insuranceData: []
    }
  },

  created() {
    this.getList()
  },
  methods: {
    // 获取保单详情
    getList(id) {
      this.listQuery.policyId = id || this.policyId
      this.listLoading = true
      getEquipmentList(this.listQuery).then(response => {
        this.insuranceData = response.data
        this.totalnum = response.total
        this.listLoading = false
      })
    },
    getThis(row, index) {
      const id = row.id
      this.$emit('getThisT', id)
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
  padding: 15px;
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

