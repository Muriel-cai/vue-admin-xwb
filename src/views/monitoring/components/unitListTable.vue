<template>
  <div class="insuranceTo-container">
    <div class="main">
      <div class="postInfo-container">
        <el-form
          ref="form"
          :model="secForm"
          label-width="110px"
        >
          <el-form-item label-width="0">
            <el-row :gutter="15">
              <el-col :span="6">
                <el-form-item label="投保单位：">
                  <el-input v-model="secForm.holderName" />
                </el-form-item>
              </el-col>
              <el-col
                class="line"
                :span="6"
              >
                <el-form-item label="保单号： ">
                  <el-input v-model="secForm.policyNo" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  @click="onSearch"
                >查询</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div class="insurBox">
        <el-table
          v-loading="listLoading"
          :data="insuranceData"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            label="订单号"
            align="center"
            prop="orderNo"
          />

          <el-table-column
            label="投保单位"
            prop="holderName"
            align="center"
          />

          <el-table-column
            label="被保险单位"
            prop="insureName"
            align="center"
          />

          <el-table-column
            label="保单号"
            prop="policyNo"
            align="center"
          />
          <el-table-column
            label="企业类型"
            prop="companyTypeName"
            align="center"
          />

          <el-table-column
            label="行业"
            prop="industryName"
            align="center"
          />

          <el-table-column
            label="保费"
            prop="policyFee"
            align="center"
          />

          <el-table-column
            label="提交时间"
            align="center"
            prop="insertTime"
          />

          <el-table-column
            label="支付状态"
            align="center"
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
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.policyState ==1 || scope.row.policyState == 2"
                class="color-or"
              > {{ policyStateOptions[scope.row.policyState].label }} </span>
              <span
                v-else
                class="color-9"
              > {{ policyStateOptions[scope.row.policyState].label }} </span>
              <!-- <span
                v-if="scope.row.policyState == 1 "
                class="color-or"
              >可用</span>
              <span
                v-if="scope.row.policyState == 0"
                class="color-9"
              >不可用</span> -->
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            fixed="right"
            label="操作"
            align="center"
          >
            <template slot-scope="{row,$index}">
              <el-button
                size="mini"
                type="text"
                @click="getDetails(row,$index)"
              >详情</el-button>
              <el-button
                size="mini"
                type="text"
                @click="getUnit(row,$index)"
              >单位</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="secForm.page"
            :page-size="secForm.limit"
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
import { getPolicyt } from '@/api/monitoring'
export default {
  name: 'InsuranceTo',
  props: {
    getUnits: {
      type: Function,
      default: function() {}
    },
    getDetailInfo: {
      type: Function,
      default: function() {}
    }
  },
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
      insuranceData: [],
      policyStateOptions: [
        { label: '未生效', id: 0 },
        { label: '已生效', id: 1 },
        { label: '即将过期', id: 2 },
        { label: '已过期', id: 3 }
      ]
    }
  },

  created() {
    this.getList()
  },
  methods: {
    // 获取保单详情
    getList() {
      this.listLoading = true
      getPolicyt(this.secForm).then(response => {
        console.log(response.data, '获取保单详情')
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
    getUnit(row, index) {
      const id = row.id
      this.$emit('getUnits', id)
    },
    getDetails(row, index) {
      const id = row.id
      this.$emit('getDetailInfo', id)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.secForm.page = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页000: ${val}`)
      this.secForm.page = val
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

