
<template>
  <div class="minCate-container">
    <div class="main">
      <div class="postInfo-container">
        <el-form
          ref="form"
          :model="param"
          :inline="true"
          label-width="110px"
        >
          <el-form-item label="所属行业">
            <el-select
              v-model="param.industryId"
              placeholder="请选择状态"
              clearable
              class="filter-item"
              style="width: 180px;"
              @change="handleindustry"
            >
              <el-option
                v-for="item in industryOptions"
                :key="item.id"
                :label="item.industryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择大类">
            <el-select
              v-model="param.cateName"
              placeholder="请选择状态"
              clearable
              class="filter-item"
              style="width: 180px;"
              @focus="handleFilter"
            >
              <el-option
                v-for="item in cateOptions"
                :key="item.id"
                :label="item.cateName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
          <el-button
            type="primary"
            @click="addEdit({status:0})"
          >新增</el-button>
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

          <el-table-column
            label="所属大类"
            prop="maxCateName"
            align="center"
          />
          <el-table-column
            label="分类名称"
            prop="cateName"
            align="center"
          />

          <el-table-column
            label="组编号"
            align="center"
            prop="groupCode"
            width="200"
          />
          <el-table-column
            label="组标题"
            prop="groupTitle"
            align="center"
          />

          <el-table-column
            label="问题标题"
            prop="problemTitle"
            align="center"
          />

          <el-table-column
            label="排序"
            prop="priority"
            align="center"
            width="200"
          />
          <el-table-column
            label="更新时间"
            prop="lastTime"
            align="center"
            width="200"
          />
          <el-table-column
            width="120"
            label="操作"
            align="center"
            fixed="right"
          >
            <template slot-scope="{row,$index}">
              <el-button
                size="mini"
                type="text"
                @click="modifyList(row,$index)"
              >修改</el-button>
              <el-button
                v-if="false"
                size="mini"
                type="text"
                @click="copyList(row,$index)"
              >复制</el-button>
              <el-button
                size="mini"
                type="text"
                style="color: #f55555"
                @click="delrow(row,$index)"
              >删除 </el-button>
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
        width="680px"
        top="60px"
        :visible.sync="dialogTableVisible"
        :title="dialogTitle"
        :close-on-click-modal="false"
        @dragDialog="dialogTableVisible = fasle "
      >
        <div class="dynamicForm">
          <addminCate
            ref="addminCate"
            :data-id="dataId"
            :type="stutic"
          />

        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  minCateList,
  minCateAdd,
  minCateModify,
  minCateDel,
  getMaxCateByIndustryId
} from '@/api/underwriting'
import { getAllindustry } from '@/api/insuranceT'
import addminCate from './components/addminCate'
import pagination from '@/components/Pagination'
export default {
  name: 'MinCate',
  components: {
    addminCate,
    pagination
  },
  provide() {
    return {
      fatherClose: this.fatherMethod
    }
  },
  data() {
    return {
      listLoading: false,
      param: {
        industryId: '', // 企业名称
        limit: 20, // 每页记录数
        page: 1, // 查询页数
        maxCateId: ''
      },
      totalnum: 0,
      patrolData: [],
      dialogTableVisible: false,
      dialogTitle: '',
      id: '',
      dataId: '',
      stutic: '',
      industryOptions: [],
      cateOptions: []
    }
  },
  created() {
    this.getList()
    this.getComList()
  },
  methods: {
    // 获取查询记录
    getList() {
      minCateList(this.param).then(res => {
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
    fatherMethod(option) {
      this.dialogTableVisible = false
    },
    // 查询
    onSearch() {
      this.getList()
    },
    // 新增
    addEdit(row) {
      this.dialogTableVisible = true
      this.dialogTitle = '新增小类'
      this.stutic = 1
      this.dataId = '-1'
      setTimeout(() => {
        this.$refs['addminCate'].getList(this.dataId)
      })
    },
    //
    handleindustry(value) {
      // console.log(value)
      const data = {
        industryId: value
      }
      getMaxCateByIndustryId(data).then(res => {
        // console.log(res)
        this.cateOptions = res.data
      })
    },
    //
    handleFilter(value) {
      if (this.param.industryId === '' || this.param.industryId === null) {
        this.$message({
          type: 'warning',
          message: '请先选择行业'
        })
      }
    },
    // 修改
    modifyList(row) {
      // console.log(row)
      this.dialogTableVisible = true
      this.dialogTitle = '修改小类'
      this.stutic = 2
      this.dataId = row.minCateId
      setTimeout(() => {
        this.$refs['addminCate'].getList(this.dataId)
      })
    },
    // 复制
    copyList(row) {},
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
          minCateDel(data).then(res => {
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
    // 保存数据
    saveData() {
      if (this.imageUrl) {
        this.data.iconUrl = this.imageUrl
      }
      this.$refs['dynamicForm'].validate(valid => {
        if (valid) {
          if (this.stutic === 1) {
            minCateAdd(this.data).then(res => {
              this.dialogTableVisible = false
              this.$message({
                type: 'info',
                message: res.resMsg
              })
              this.getList()
            })
          } else if (this.stutic === 2) {
            minCateModify(this.data).then(res => {
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
.minCate {
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
