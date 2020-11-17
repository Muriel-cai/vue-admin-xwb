<template>
  <div class="insuranceTo-container">
    <div class="main">
      <div class="postInfo-container">
        <el-form
          ref="form"
          :model="secForm"
          :inline="true"
          label-width="110px"
        >
          <el-form-item label="投保单位：">
            <el-input v-model="secForm.holderName" style="width:260px" />
          </el-form-item>
          <el-form-item label="保单号： ">
            <el-input v-model="secForm.policyNo" style="width:260px" />
          </el-form-item>
          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
        </el-form>
      </div>
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
            label="订单号"
            align="center"
            prop="orderNo"
            width="180"
          />
          <el-table-column
            label="投保人"
            prop="holderName"
            align="center"
          />
          <el-table-column
            label="保单号"
            align="center"
            prop="policyNo"
            width="180"
          />
          <el-table-column
            label="保费"
            prop="policyFee"
            align="center"
            width="100"
          />
          <el-table-column
            label="保障期限"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.startDate }} 至 {{ scope.row.endDate }}
            </template>
          </el-table-column>

          <el-table-column
            label="支付状态"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.payState == 1 "
                class="color-gre"
              >已支付</span>
              <span
                v-if="scope.row.payState == 0"
                class="color-9"
              >未支付</span>
            </template>
          </el-table-column>
          <el-table-column
            label="保单状态"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.status == 1 "
                class="color-or"
              >可用</span>
              <span
                v-if="scope.row.status == 0"
                class="color-9"
              >不可用</span>
            </template>
          </el-table-column>
          <el-table-column
            width="240"
            label="操作"
            align="left"
            fixed="right"
          >
            <template slot-scope="{row,$index}">
              <el-button
                size="mini"
                type="text"
                @click="getDetails(row,$index)"
              >
                查看详情
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="setPlace(row,$index)"
              >
                设置场所
              </el-button>
              <el-button
                v-if="row.payState == 1"
                size="mini"
                type="text"
                @click="entryPolicy(row,$index)"
              >
                保单信息录入
              </el-button>
              <el-button
                v-if="row.payState == 0"
                size="mini"
                type="text"
                @click="payment(row,$index)"
              >
                确认支付
              </el-button>
              <!-- <el-button size="mini" type="success"  v-if="row.payState == 0" @click="toPay(row,$index)">
                确认支付
              </el-button> -->

            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="page"
            :page-size="20"
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
import { getPolicyList, submitConfirmPolicyInfo } from '@/api/policy'
export default {
  name: 'InsuranceTo',
  props: ['setPlaceT', 'toPayT', 'getDetailsT', 'entryPolicys'],

  data() {
    return {
      listLoading: true,
      secForm: {
        holderName: '',
        policyNo: '',
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
    getList() {
      this.listLoading = true
      getPolicyList(this.secForm).then(response => {
        console.log(response.data, '获取保单详情')
        this.insuranceData = response.data
        this.totalnum = response.total
        this.listLoading = false
      })
    },

    // 查询
    onSearch() {
      if (this.secForm.holderName != '' || this.secForm.policyNo != '') {
        this.getList()
      } else {
        this.$message({
          type: 'info',
          message: '请填写有效的查询信息'
        })
      }
    },
    //
    getDetails(row, index) {
      const id = row.id
      this.$emit('getDetailsT', id)
    },
    setPlace(row, index) {
      const id = row.id
      this.$emit('setPlaceT', id)
    },
    // 保单信息录入
    entryPolicy(row, index) {
      const id = row.orderNo
      this.$emit('entryPolicys', id)
    },
    // 确认支付

    payment(row, index) {
      const id = row.orderNo
      this.$emit('toPayT', id)
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
  .color-gre {
    color: #52d5c8;
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

