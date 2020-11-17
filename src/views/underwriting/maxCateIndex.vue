<template>
  <div class="maxCate-container">
    <div class="main">
      <div class="postInfo-container">
        <el-form ref="form" :model="param" :inline="true" label-width="110px">
          <el-form-item label="所属行业">
            <el-input v-model="param.industryName" style="width: 280px;" />
          </el-form-item>
          <el-form-item label="大类名称" prop="status">
            <el-input v-model="param.cateName" style="width: 280px;" />
          </el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="addEdit({status:0})">新增</el-button>

        </el-form>
      </div>
      <div class="tabList">
        <el-table
          v-loading="listLoading"
          :data="patrolData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="图标" align="center">
            <template slot-scope="scope">
              <el-image style="width: 30px; height: 30px" :src="scope.row.iconUrl" fit />
            </template>
          </el-table-column>
          <el-table-column label="所属行业" prop="industryName" align="center" />
          <el-table-column label="大类名称" prop="cateName" align="center" width="200" />
          <el-table-column label="排序" prop="priority" align="center" />
          <el-table-column label="更新时间" prop="lastTime" align="center" />
          <el-table-column width="160" label="操作" align="center" fixed="right">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="text" @click="modifyList(row,$index)">修改</el-button>
              <el-button size="mini" type="text" @click="copyList(row,$index)">复制</el-button>
              <el-button size="mini" type="text" style="color: #f55555" @click="delrow(row,$index)">删除 </el-button>
            </template>
          </el-table-column>
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
    <!--弹框-->
    <div class="">
      <el-dialog
        width="550px"
        top="60px"
        :visible.sync="dialogTableVisible"
        :title="dialogTitle"
        :close-on-click-modal="false"
        @dragDialog="dialogTableVisible = fasle "
      >
        <div
          v-if="dioType ==1 "
          class="dynamicForm"
        >
          <el-form ref="dynamicForm" :model="data" label-width="120px" :rules="rules">
            <el-form-item label="所属行业" prop="industryId">
              <el-select
                v-model="data.industryId"
                placeholder="请选择状态"
                clearable
                class="filter-item"
                style="width: 350px;"
              >
                <el-option
                  v-for="item in industryOptions"
                  :key="item.id"
                  :label="item.industryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称" prop="cateName">
              <el-input v-model.trim="data.cateName" style="width: 350px;" />
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model.number="data.priority" style="width: 350px;" />
            </el-form-item>
            <el-form-item label="图标" class="operations">
              <el-upload
                class="avatar-uploader"
                accept="'image/*'"
                action
                :http-request="uploadImg"
                :show-file-list="false"
              >
                <img
                  v-if="data.iconUrl"
                  :src="data.iconUrl"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </el-form-item>
          </el-form>
          <div class="app-btn-box ">
            <el-button
              type="primary"
              @click="saveData"
            >保存</el-button>
          </div>

        </div>
        <div
          v-if="dioType ==2 "
          class="dynamicForm"
        >
          <div class="demo-input-suffix">
            <span class="leftLable"> 请选择行业 </span>
            <el-select
              v-model="industryId"
              placeholder="请选择状态"
              clearable
              class="filter-item"
              style="width: 350px;"
            >
              <el-option
                v-for="item in industryOptions"
                :key="item.id"
                :label="item.industryName"
                :value="item.id"
              />
            </el-select>
          </div>
          <div
            class="bomBtn"
            style="text-aline:right;"
          >
            <el-button
              type="primary"
              @click="savecopy"
            >保存</el-button>

          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import {
  maxCateList,
  maxCateAdd,
  maxCateModify,
  maxCateDel,
  maxCateCopy
} from '@/api/underwriting'
import { getAllindustry } from '@/api/insuranceT'
import { uploadImg } from '@/api/publicApi'
// import { validatenull, isRealNum } from '@/utils/validate'
import { uploadImgToBase64 } from '@/utils/upload'
// import topNav from './nav/topNav'
export default {
  name: 'MaxCate',
  components: {
    pagination
  },
  data() {
    return {
      listLoading: false,
      param: {
        industryName: '', // 企业名称
        limit: 20, // 每页记录数
        page: 1, // 查询页数
        cateName: ''
      },
      patrolData: [],
      fit: 'fit',
      dialogTableVisible: false,
      dialogTitle: '',
      id: '',
      data: {},
      dioType: '1', // 1位新增修改 2、复制
      industryId: '',
      maxId: '',
      industryOptions: [],
      totalnum: 0,
      rules: {
        industryId: [{ required: true, message: '请选择所属行业' }],
        cateName: [{ required: true, message: '请输入分类名称' }]
      }
    }
  },
  created() {
    this.getList()
    this.getComList()
  },
  methods: {
    // 获取查询记录
    getList() {
      maxCateList(this.param).then(res => {
        this.patrolData = res.data
        this.totalnum = res.total
      })
    },
    // 获取行业信息
    getComList() {
      getAllindustry().then(res => {
        this.industryOptions = res.data
      })
    },
    // 查询
    onSearch() {
      this.getList()
    },
    // 新增
    addEdit(row) {
      this.data = { ...row }
      this.data.iconUrl = ''
      this.$nextTick(() => {
        this.$refs['dynamicForm'].clearValidate()
      })
      this.dialogTableVisible = true
      this.dialogTitle = '新增大类'
      this.stutic = 1
      this.dioType = 1
    },
    // 修改
    modifyList(row) {
      this.data = { ...row }
      this.dialogTableVisible = true
      this.dialogTitle = '修改大类'
      this.stutic = 2
      this.dioType = 1
    },
    // 复制
    copyList(row) {
      this.dialogTableVisible = true
      this.dialogTitle = '复制大类'
      this.dioType = 2
      this.maxId = row.id
    },
    // 删除
    delrow(row, index) {
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
          maxCateDel(data).then(res => {
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.patrolData.splice(index, 1)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    uploadImg(options) {
      const file = options.file
      // const filename = options.filename
      if (file) {
        uploadImgToBase64(file).then(res => {
          const data = {
            data: res.result
          }
          uploadImg(data).then(res => {
            this.data.iconUrl = res.url
          })
        })
      }
      this.data = { ...this.data }
    },
    // 保存数据
    saveData() {
      this.$refs['dynamicForm'].validate(valid => {
        if (valid) {
          if (this.stutic === 1) {
            maxCateAdd(this.data).then(res => {
              this.dialogTableVisible = false
              this.$message({
                type: 'info',
                message: res.resMsg
              })
              this.getList({ page: this.page })
            })
          } else if (this.stutic === 2) {
            maxCateModify(this.data).then(res => {
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
    },
    //
    savecopy(row) {
      console.log(this.maxId, this.industryId, 'savecopy')
      const data = {
        industryId: this.industryId, // 行业id
        id: this.maxId // 大分类id
      }
      maxCateCopy(data).then(res => {
        this.dialogTableVisible = false
        this.$message({
          type: 'info',
          message: res.resMsg
        })
        this.getList({ page: this.page })
      })
    }

  }
}
</script>
<style lang="scss" >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = 'scss'>
.maxCate {
  &-container {
    margin: 5px;
    position: relative;
    height: auto;
    background: #fff;
    min-height: 600px;
    .main {
      padding: 10px;
    }
    .demo-input-suffix {
      height: 50px;
      line-height: 50px;
      .leftLable {
        display: inline-block;
        width: 110px;
        text-align: right;
        padding: 0 10px;
      }
    }
    .color-red {
      color: #ff2121;
    }
    .app-btn-box {
      text-align: right;
    }
    .bomBtn {
      text-align: right;
      padding: 10px 40px;
    }
  }
}
</style>
