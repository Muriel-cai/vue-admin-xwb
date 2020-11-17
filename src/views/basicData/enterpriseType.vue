<template>
  <div class="structureBuild-container">
    <div class="marB10">
      <el-button
        type="primary"
        @click="addBuilds({status: 0})"
      >添加企业类型</el-button>
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
          label="企业类型名称"
          prop="modeName"
          align="center"
        />
        <el-table-column
          label="企业类型代码"
          prop="modeCode"
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
        <el-form ref="dynamicForm" :model="param" label-width="120px" :rules="rules">
          <el-form-item label="企业类型名称" prop="modeName">
            <el-input v-model.trim="param.modeName" />
          </el-form-item>
          <el-form-item label="企业类型代码" prop="modeCode">
            <el-input v-model.trim="param.modeCode" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model.number="param.priority" />
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
  getenterpriseType,
  changenterpriseType,
  delenterpriseType,
  addenterpriseType
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
        limit: 10
      },
      param: {},
      rules: {
        modeName: [{ required: true, message: '请输入企业类型名称' }],
        modeCode: [{ required: true, message: '请输入企业类型代码' }]
      },
      stutic: 1, // 1 为新增 2为修改,
      totalnum: 0,
      page: 1,
      lang: 'zh_CN'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getenterpriseType(this.listQuery).then(res => {
        this.enterprise = res.data
        this.totalnum = res.total
        this.listLoading = false
      })
    },
    // 删除
    delBuilds(row, index) {
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
          delenterpriseType(data).then(res => {
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
    },
    // 保存数据
    saveData() {
      this.$refs['dynamicForm'].validate(valid => {
        if (valid) {
          if (this.stutic === 1) {
            addenterpriseType(this.param).then(res => {
              this.dialogTableVisible = false
              this.$message({
                type: 'info',
                message: res.resMsg
              })
              this.getList({ page: this.page })
            })
          } else if (this.stutic === 2) {
            changenterpriseType(this.param).then(res => {
              this.dialogTableVisible = false
              this.$message({
                type: 'info',
                message: res.resMsg
              })
              this.getList({ page: this.page })
            })
          }
        }
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ='scss'>
$sz: 75rem;
html {
  background: #fff;
}
</style>
<style lang="scss" scoped>
.structureBuild-container {
  position: relative;
  background: #fff;
  padding: 15px;
  .marB10 {
    margin-bottom: 10px;
  }
}
</style>
