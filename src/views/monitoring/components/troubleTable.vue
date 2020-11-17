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
            label="报警类型"
            prop="alarmTypeName"
            align="center"
            width="180"
          />
          <el-table-column
            label="警情时间"
            prop="alarmDate"
            align="center"
          />
          <el-table-column
            label="警情描述"
            prop="alarmDesc"
            align="center"
          />
          <el-table-column
            label="处理结果"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.alarmResult ==0 "
                class="color_red"
              >未处理</span>
              <span
                v-if="scope.row.alarmResult ==1 "
                class="color_or"
              >火警</span>
              <span
                v-if="scope.row.alarmResult ==2 "
                class="color_or"
              >故障</span>
              <span
                v-if="scope.row.alarmResult ==3 "
                class="color_or"
              >误报</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="page"
            :page-size="limit"
            layout="total,prev, pager, next, jumper"
            :total="totalnum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { alarmGl } from '@/api/monitoring'
export default {
  name: 'InsuranceTo',
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
      page: 1,
      limit: 20,
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
      const data = {
        page: this.page,
        limit: this.limit,
        policyId: id || this.policyId
      }
      console.log(data, '获取隐患管理详情')
      this.listLoading = true
      alarmGl(data).then(response => {
        this.insuranceData = response.data
        this.totalnum = response.total
        this.listLoading = false
      })
    },

    // 查询
    onSearch() {
      this.getList()
    },
    //
    getThis(row, index) {
      const id = row.id
      this.$emit('getThisT', id)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page = val

      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页000: ${val}`)
      this.page = val

      this.getList()
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
  .color-or {
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

