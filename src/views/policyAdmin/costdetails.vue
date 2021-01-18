
<template>
  <div class="structureBuild-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content">
          <p>应收款 <i></i></p>
          <h1>￥ {{ price.receivableAccounts }} </h1>
        </div>
        </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>实收款 <i></i></p>
          <h1>￥ {{ price.realAccounts }} </h1>
        </div>
        </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>应付款 <i></i></p>
          <h1>￥ {{ price.accountsPayable }} </h1>
        </div>
        </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p>实付款 <i></i></p>
          <h1>￥ {{ price.realPayable }} </h1>
        </div>
      </el-col>
    </el-row>
    <div class="conBox">
      <div class="marB10">
        <h1>收款管理 <span>收款进行中</span> </h1>
        <el-button type="primary" @click="addBuilds({status:1})" style="float:right;"  size="small">添加收款</el-button>
      </div>
      <div class="roleManag-mainBox">
        <el-table
          v-loading="listLoading"
          :data="projectList"
          element-loading-text="Loading"
          fit
          highlight-current-row
        >

          <el-table-column
            label="收款项目"
            prop="itemName"
            align="center"
          />
          <el-table-column
            label="收款对象"
            prop="itemCode"
            align="center"
          />
          <el-table-column
            label="收款金额"
            prop="priority"
            align="center"
          />
          <el-table-column
            label="收款时间"
            prop="remark"
            align="center"
          />
          <el-table-column
            label="备注"
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
      </div>
    </div>
    <div class="conBox">
      <div class="marB10">
        <h1>付款管理 <span>已付款完成</span> </h1>
        <el-button type="warning" @click="addBuilds({status:1})" style="float:right;"  size="small" >添加付款</el-button>
      </div>
      <div class="roleManag-mainBox">
        <el-table
          v-loading="listLoading"
          :data="projectList"
          element-loading-text="Loading"
          fit
          highlight-current-row
        >

          <el-table-column
            label="收款项目"
            prop="itemName"
            align="center"
          />
          <el-table-column
            label="收款对象"
            prop="itemCode"
            align="center"
          />
          <el-table-column
            label="收款金额"
            prop="priority"
            align="center"
          />
          <el-table-column
            label="收款时间"
            prop="remark"
            align="center"
          />
          <el-table-column
            label="备注"
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
      </div>
    </div>
    <!-- 弹框-->
    <div>
      <el-dialog
        width="500px"
        :visible.sync="dialogTableVisible"
        title="修改信息"
        @dragDialog="dialogTableVisible = fasle "
      >
        <el-form ref="dynamicForm" :model="param" label-width="120px" :rules="rules">
          <el-form-item label="标的名称" prop="itemName">
            <el-input v-model.trim="param.itemName" />
          </el-form-item>
          <el-form-item label="标的代码" prop="itemCode">
            <el-input v-model.trim="param.itemCode" />
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
  </div>
</template>

<script>
import {
  getmainItem,
  changmainItem,
  delmainItem,
  addmainItem
} from '@/api/insuranceT'
import pagination from '@/components/Pagination'
export default {
  name: 'StructureBuild',
  components: {
    pagination
  },
  data() {
    return {
      projectList: [],
      listLoading: false,
      dialogTableVisible: false,
      price: {
        receivableAccounts: 300.00,
        realAccounts: 300.00 ,
        accountsPayable: 450.00,
        realPayable: 150.00
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      param: {},
      stutic: 1, // 1 为新增 2为修改,
      page: 1,
      totalnum: 0,
      rules: {
        itemName: [{ required: true, message: '请输入标的名称' }],
        itemCode: [{ required: true, message: '请输入标的代码' }]
      }
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
      getmainItem(this.listQuery).then(res => {
        // console.log(res, '查询')
        this.projectList = res.data
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
          delmainItem(data).then(res => {
            // console.log(res)
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.projectList.splice(index, 1)
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
            addmainItem(this.param).then(res => {
              this.dialogTableVisible = false
              this.$message({
                type: 'info',
                message: res.resMsg
              })
              this.getList()
            })
          } else if (this.stutic === 2) {
            changmainItem(this.param).then(res => {
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
  background: #f8f8f8;
  .marB10 {
    margin-bottom: 20px;
  }
}
.grid-content{
  background: #fff;
  padding:30px 20px;
  margin-bottom: 10px;
  p{
    font-size: 16px;
    color: #666;
    line-height: 18px;
  }
  h1{
    font-size: 24px;
    color: #000;
    line-height: 50px;
  }
  
}
.conBox{
    background:#fff ;
    margin-bottom: 10px;
    position: relative;
    padding: 20px 10px 10px;
    h1{
      display: inline-block;
      font-size: 18px;
      line-height: 32px;
      font-weight: bold;
      span{
        display: inline-block;
        margin: 0 10px;
        font-size: 14px;
        color:#666;
      }
    }
  }
</style>
