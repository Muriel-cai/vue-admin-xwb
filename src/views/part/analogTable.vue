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
            label="数据类型"
            prop="valueType"
            align="center"
          />
          <el-table-column
            label="数据值"
            prop="content"
            align="center"
          />
          <el-table-column
            label="单位"
            prop="unit"
            align="center"
            width="240"
          />
          <el-table-column
            label="	添加时间"
            prop="insertTime"
            align="center"
            width="240"
          />
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
import { getAnalogList } from '@/api/equipment'
import pagination from '@/components/Pagination'
export default {
  name: 'InsuranceTo',
  components: {
    pagination
  },
  props: {
    deviceId: {
      type: String,
      default: ''
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
  },
  methods: {
    // 获取警情详情
    getList(id) {
      this.param.deviceId = this.deviceId
      this.listLoading = true
      getAnalogList(this.param).then(response => {
        this.insuranceData = response.data
        this.totalnum = response.total
        this.listLoading = false
      })
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

