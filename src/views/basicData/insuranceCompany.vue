
<template>
  <div class="structureBuild-container">
    <div class="marB10">
      <el-button
        type="primary"
        @click="addBuilds({status:1})"
      >添加保险公司</el-button>
    </div>
    <div class="roleManag-mainBox">
      <el-table
        v-loading="listLoading"
        :data="enterprise"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >

        <el-table-column
          label="保险公司名称"
          prop="companyName"
          align="center"
        />
        <el-table-column
          label="保险公司编码"
          prop="companyCode"
          align="center"
        />
        <el-table-column
          label="插入时间"
          prop="insertTime"
          align="center"
        />
        <el-table-column
          label="更新时间"
          prop="lastTime"
          align="center"
        />
        <el-table-column
          label="备注"
          prop="remark"
          align="center"
        />
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <span :class=" scope.row.status == true ? 'color-or ': ' color-9'">
              {{ scope.row.status == true ? '可用' : '不可用' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="操作"
          align="center"
        >
          <template slot-scope="{row,$index}">
            <el-button
              size="mini"
              type="text"
              @click="changBuilds(row,$index)"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              style="color: #f55555"
              @click="delBuilds(row,$index)"
            >删除</el-button>
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
    <!-- 弹框-->
    <div>
      <el-dialog
        width="500px"
        :visible.sync="dialogTableVisible"
        title="修改信息"
        @dragDialog="dialogTableVisible = fasle"
      >
        <!-- <changeType ref='changeTypeDom' :rules="typeRules" :typeList ="typeLists" @saveDatas="saveDataTr" @handleInputs="handleInput"> </changeType> -->
        <el-form ref="dynamicForm" :model="param" label-width="120px" :rules="rules">
          <el-form-item label="企业类型名称" prop="companyCode">
            <el-input v-model.trim="param.companyCode" />
          </el-form-item>
          <el-form-item label="保险公司名称" prop="companyName">
            <el-input v-model.trim="param.companyName" />
          </el-form-item>
          <el-form-item label="保险公司简称">
            <el-input v-model.trim="param.abbreviation" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch
              v-model="param.status"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="param.remark" />
          </el-form-item>
        </el-form>
        <div class="app-btn-box ">
          <el-button
            type="primary"
            @click="saveData"
          >保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getInsuranceCompany,
  changInsuranceCompany,
  delInsuranceCompany,
  addInsuranceCompany
} from '@/api/insuranceT'
import Pagination from '@/components/Pagination'
export default {
  name: 'StructureBuild',
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: false,
      enterprise: [],
      dialogTableVisible: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      param: {},
      rules: {
        companyCode: [{ required: true, message: '保险公司编码' }],
        companyName: [{ required: true, message: '请输入保险公司名称' }],
        status: [{ message: '请选择状态', required: true }]
      },
      stutic: 1, // 1 为新增 2为修改,
      totalnum: 0
    }
  },
  watch: {
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getInsuranceCompany(this.listQuery).then(res => {
        this.enterprise = res.data
        this.enterprise.forEach(function(item, index) {
          if (item.status === 1) {
            item.status = true
          } else {
            item.status = false
          }
        })
        this.totalnum = res.total
        this.listLoading = false
      })
    },
    // 删除
    delBuilds(row, index) {
      // console.log(row, index)
      const data = {
        companyId: row.companyId
      }
      this.$confirm('确定要删除么, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delInsuranceCompany(data).then(res => {
            // console.log(res)
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.enterprise.splice(index, 1)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 增加
    addBuilds(option) {
      this.param = { ...option }
      this.$nextTick(() => {
        this.$refs['dynamicForm'].clearValidate()
      })
      this.dialogTableVisible = true
      this.stutic = 1
    },
    // 修改
    changBuilds(row, index) {
      this.dialogTableVisible = true
      this.stutic = 2
      this.param = row
      // console.log(this.data, '++++++++++++++++++++++')
    },
    // 保存数据
    saveData() {
      // console.log(this.data, 'fkfkfklspsps----------------')
      this.$refs['dynamicForm'].validate(valid => {
        if (valid) {
          if (this.param.status === true) {
            this.param.status = 1
          } else {
            this.param.status = 0
          }
          if (this.stutic === 1) {
            addInsuranceCompany(this.param).then(res => {
              this.dialogTableVisible = false
              this.$message({
                type: 'info',
                message: res.resMsg
              })
              this.getList()
            })
          } else if (this.stutic === 2) {
            changInsuranceCompany(this.param).then(res => {
              this.dialogTableVisible = false
              this.$message({
                type: 'info',
                message: res.resMsg
              })
              this.getList()
            })
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.structureBuild-container {
  position: relative;
  padding: 15px;
  background: #fff;
  .marB10 {
    margin-bottom: 10px;
  }
}
</style>
