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
          <el-form-item
            label="企业名称："
            style="width:380px"
          >
            <el-input v-model="secForm.holderName" />
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
            label="企业名称"
            prop="companyName"
            align="center"
            width="180"
          />
          <el-table-column
            label="巡查时间"
            prop="startTime"
            align="center"
          />
          <el-table-column
            label="得分"
            prop="grade"
            align="center"
          />
          <el-table-column
            width="100"
            label="操作"
            align="center"
            fixed="right"
          >
            <template slot-scope="{row,$index}">
              <el-button
                size="mini"
                type="text"
                @click="getDetails(row,$index)"
              >关联</el-button>
              <!-- <el-button
                size="mini"
                type="text"
                @click="getUnit(row,$index)"
              >取消关联</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="block">
          <el-pagination
            :current-page.sync="secForm.page"
            :page-size="secForm.limit"
            layout="total,prev, pager, next, jumper"
            :total="totalnum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { bindPatrol, getCanAssignPatrolList } from '@/api/policy'
export default {
  name: 'InsuranceTo',
  props: {
    policyId: {
      type: String,
      default: ''
    },
    getDetailsId: {
      type: String,
      default: ''
    }
  },
  inject: ['fatherClose2'],
  data() {
    return {
      listLoading: true,
      secForm: {
        holderName: '',
        policyNo: '',
        page: 1,
        limit: 20
      },

      //   totalnum: 0,
      insuranceData: []
    }
  },

  created() {
    this.getList()
  },
  methods: {
    // 获取关联企业详情
    getList(id) {
      this.listLoading = true
      getCanAssignPatrolList(this.secForm).then(response => {
        console.log(response.data, '获取关联企业详情')
        this.insuranceData = response.data
        // this.totalnum = response.total
        this.listLoading = false
      })
    },
    // 查询
    onSearch() {
      if (this.secForm.holderName !== '' || this.secForm.policyNo !== '') {
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
      const data = {
        policyId: this.policyId, // 保单id
        patrolId: row.id // 保前查勘记录id
      }
      this.$emit('getDetailsId', row.id)
      bindPatrol(data).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'info',
            message: '关联成功'
          })
          this.fatherClose2()
          return row.id
        }
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
  padding: 15px;
}
</style>

