<template>
  <div class="structureBuild-container">
    <div class="marB10">
      <el-button
        type="primary"
        @click="addBuilds({status : 1})"
      >添加行业</el-button>
    </div>
    <div class="roleManag-mainBox">
      <el-table
        v-loading="listLoading"
        :data="industryList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >

        <el-table-column
          label="行业名称"
          prop="industryName"
          align="center"
        />
        <el-table-column
          label="费率"
          prop="rate"
          align="center"
        />
        <el-table-column
          label="分值"
          prop="score"
          align="center"
        />
        <el-table-column
          label="共保方案"
          prop="commonName"
          align="center"
        />
        <el-table-column
          label="排序"
          prop="priority"
          align="center"
        />
        <el-table-column
          label="备注"
          prop="remark"
          align="center"
        />
        <el-table-column
          label="更新时间"
          prop="lastTime"
          align="center"
        />
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
              @click="choiceindustry(row,$index)"
            >选择共保方案</el-button>
            <el-button
              size="mini"
              type="text"
              style="color: #f55555"
              @click="delData(row,$index)"
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

    <!-- 新增和修改的弹框 -->
    <div>
      <el-dialog
        width="500px"
        :visible.sync="dialogTableVisible"
        title="修改信息"
        @dragDialog="dialogTableVisible = fasle "
      >
        <!-- <changeType ref='changeTypeDom' :rules="typeRules" :typeList ="typeLists" @saveDatas="saveDataTr" @handleInputs="handleInput"> </changeType> -->
        <el-form ref="dynamicForm" :model="param" label-width="130px" :rules="rules">
          <el-form-item label="行业名称" prop="industryName">
            <el-input v-model.trim="param.industryName" />
          </el-form-item>
          <el-form-item label="费率（百分比）" prop="rate">
            <el-input v-model.trim="param.rate" />
          </el-form-item>
          <el-form-item label="分数（百分比）" prop="score">
            <el-input v-model.trim="param.score" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model.trim="param.priority" />
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
    <!--获取共保业务的弹框-->
    <div>
      <el-dialog
        width="1000px"
        :visible.sync="gbDialogTableVisible"
        title="配置共保方案"
        @dragDialog="gbDialogTableVisible = fasle"
      >
        <gbPage @getThisT="choiceData" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getindustry,
  changindustry,
  delindustry,
  addindustry,
  getInsuranceT,
  choiceInsuranceT
} from '@/api/insuranceT'
import gbPage from './part/gbPage'
import Pagination from '@/components/Pagination'
export default {
  name: 'StructureBuild',
  components: {
    Pagination,
    gbPage
  },
  data() {
    return {
      industryList: [],
      listLoading: false,
      dialogTableVisible: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      param: {},
      rules: {
        industryName: [{ required: true, message: '请输入行业名称' }],
        rate: [{ required: true, message: '请输入费率' }],
        score: [{ required: true, message: '请输入分数' }]
      },
      stutic: 1, // 1 为新增 2为修改
      totalnum: 0,
      gbDialogTableVisible: false,
      choiceId: ''
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    // 获取行业列表
    getList() {
      this.listLoading = true
      getindustry(this.listQuery).then(res => {
        // console.log(res, '查询')
        this.industryList = res.data
        this.totalnum = res.total
        this.listLoading = false
      })
    },
    // 获取共保业务列表
    getInsurance(data) {
      this.listLoading = true
      getInsuranceT(data).then(res => {
        // console.log(res, '查询')
        this.industryList = res.data
        this.totalnum = res.total
        this.listLoading = false
      })
    },
    // 选择共保业务
    choiceindustry(row, index) {
      this.gbDialogTableVisible = true
      this.choiceId = row.id
    },
    choiceData(option) {
      // console.log(option, 'choiceData', this.choiceId)
      const data = {
        commonId: option,
        industryId: this.choiceId
      }
      choiceInsuranceT(data).then(res => {
        // console.log(res, '选择共保方案')
        this.$message({
          type: 'info',
          message: '操作成功'
        })
        this.getList()
        this.gbDialogTableVisible = false
      })
    },
    // 删除
    delData(row, index) {
      // console.log(row, index)
      const data = {
        id: row.id
      }
      this.$confirm('确定要删除么, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delindustry(data).then(res => {
            console.log(res)
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.industryList.splice(index, 1)
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
      // console.log(row, index, this.data)
      this.dialogTableVisible = true
      this.stutic = 2
      this.param = row
    },
    // 保存数据
    saveData() {
      this.$refs['dynamicForm'].validate(valid => {
        if (valid) {
          if (this.stutic === 1) {
            addindustry(this.param).then(res => {
              this.dialogTableVisible = false
              this.$message({
                type: 'info',
                message: res.resMsg
              })
              this.getList()
            })
          } else if (this.stutic === 2) {
            changindustry(this.param).then(res => {
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
