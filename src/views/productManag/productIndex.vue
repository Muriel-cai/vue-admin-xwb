<template>
  <div class="structureBuild-container">
    <div class="postInfo-container">
      <el-form
        ref="form"
        :model="secForm"
        label-width="110px"
        :inline="true"
      >
        <el-form-item label="产品名称：">
          <el-input v-model="secForm.goodName" style="width:260px" />
        </el-form-item>
        <el-form-item label="保险公司名称: ">
          <el-input v-model="secForm.companyName" style="width:260px" />
        </el-form-item>
        <el-button
          type="primary"
          @click="getList"
        >查询</el-button>
        <el-button
          type="primary"
          @click="addBuilds({status :1 }) "
        >新增产品</el-button>
      </el-form>
    </div>
    <!-- <div class="marB10">

    </div>-->
    <div class="roleManag-mainBox">
      <el-table
        v-loading="listLoading"
        :data="buildList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          label="产品名称"
          prop="goodName"
          align="center"
        />
        <el-table-column
          label="保险公司名称"
          prop="companyName"
          align="center"
        />

        <el-table-column
          label="保险期限"
          prop="insurancePeriod"
          align="center"
        />
        <el-table-column
          label="保费"
          prop="policyFee"
          align="center"
        />
        <el-table-column
          label="设备费"
          prop="deviceFee"
          align="center"
        />

        <el-table-column
          label="更新时间"
          prop="lastTime"
          align="center"
        />

        <el-table-column
          label="是否上架"
          align="center"
          width="80"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.enabled == 1"
              class="color-or"
            >上架</span>
            <span
              v-if="scope.row.enabled == 0"
              class="color-9"
            >下架</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark"
          align="center"
        />
        <el-table-column
          label="状态"
          align="center"
          width="60"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.status == 1"
              class="color-gre"
            >可用</span>
            <span
              v-if="scope.row.status == 0"
              class="color-9"
            >不可用</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="操作"
          align="center"
          fixed="right"
        >
          <template slot-scope="{row,$index}">
            <el-button
              size="mini"
              type="text"
              @click="changBuilds(row,$index)"
            >修改</el-button>
            <el-button
              v-if="row.isPlan == 1"
              size="mini"
              type="text"
              @click="getProList(row,$index)"
            >查看产品计划</el-button>
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
          :page.sync="secForm.page"
          :limit.sync="secForm.limit"
          @pagination="getList"
        />
      </div>
    </div>

    <!-- 弹框-->
    <div>
      <el-dialog
        :width="diowidth"
        top="60px"
        :visible.sync="dialogTableVisible"
        :title="dioTitle"
        :close-on-click-modal="false"
        @dragDialog="dialogTableVisible = fasle "
      >
        <div
          v-if="dioType == 1"
        >
          <productPlan
            ref="productPlan"
            :good-id="goodIds"
            :type="stutic"
            :form-data="data"
            @uploadImgs="uploadImg($event)"
            @saveDatas="saveData"
          />
          <!-- <dynamic-form
            ref="dynamic-form"
            v-model="data"
            :descriptors="descriptors"
            :lang="lang"
          />
          <div class="operations">
            <label
              for="imageUrl"
              class="el-form-item__label"
              style="width:114px;"
            >产品logo</label>
            <el-upload
              class="avatar-uploader"
              accept="'image/*'"
              action
              :http-request="uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </div>
          <div
            class="bomBtn"
            style="text-aline:right;"
          >
            <el-button
              type="primary"
              @click="saveData"
            >保存</el-button>

          </div> -->
        </div>
        <div
          v-if="dioType == 2"
          class="getProList"
        >
          <productPlanIndex
            ref="productPlanIndex"
            :good-id="goodIds"
            :type="stutic"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getGoodList,
  modifyGoodList,
  delGoodList,
  addGoodList
} from '@/api/productManag'
import { uploadImg } from '@/api/publicApi'
import { uploadImgToBase64 } from '@/utils/upload'
import productPlanIndex from './components/productPlanIndex'
import productPlan from './components/productPlan'
// import { getInsuranceCompany } from '@/api/insuranceT'
import pagination from '@/components/Pagination'
export default {
  name: 'StructureBuild',
  components: {
    productPlanIndex,
    productPlan,
    pagination
  },
  provide() {
    return {
      fatherClose: this.fatherMethod
    }
  },
  data() {
    return {
      buildList: [],
      listLoading: false,
      dialogTableVisible: false,
      stutic: 1, // 1 为新增 2为修改,
      listQuery: {

      },
      totalnum: 0,
      comOptions: [],

      data: {},
      secForm: {
        goodName: '',
        companyName: '',
        page: 1,
        limit: 20
      },
      dioType: '1',
      diowidth: '680px',
      goodIds: '',
      dioTitle: ''
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    getList(option) {
      this.listLoading = true
      getGoodList(this.secForm).then(res => {
        this.buildList = res.data
        this.totalnum = res.total
        this.listLoading = false
      })
    },
    // 删除
    delBuilds(row, index) {
      const data = {
        goodId: row.goodId
      }
      this.$confirm('确定要删除么, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delGoodList(data).then(res => {
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.buildList.splice(index, 1)
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
    addBuilds(options) {
      this.data = {}
      this.dialogTableVisible = true
      this.stutic = 1
      this.dioType = 1
      this.diowidth = '680px'
      this.dioTitle = '新增产品'
      setTimeout(() => {
        this.$refs['productPlan'].getList()
      })
    },
    // 修改
    changBuilds(row, index) {
      this.dialogTableVisible = true
      this.stutic = 2
      this.dioType = 1
      this.diowidth = '680px'
      this.data = row
      this.dioTitle = '修改产品'
      if (this.data.isPlan === 1) {
        this.data.isPlan = true
      } else if (this.data.isPlan === 0) {
        this.data.isPlan = false
      }
      if (this.data.enabled === 1) {
        this.data.enabled = true
      } else if (this.data.enabled === 0) {
        this.data.enabled = false
      }
    },
    // 查看产品计划
    getProList(row, index) {
      this.dioType = 2
      this.dialogTableVisible = true
      this.diowidth = '880px'
      this.goodIds = row.goodId
      this.dioTitle = '查看产品计划'
      setTimeout(() => {
        this.$refs['productPlanIndex'].getList(this.goodIds)
      })
    },
    fatherMethod(option) {
      this.dialogTableVisible = false
    },
    // 保存数据
    saveData() {
      console.log(this.data)
      if (this.data.isPlan === true) {
        this.data.isPlan = 1
      } else if (this.data.isPlan === false) {
        this.data.isPlan = 0
      }
      if (this.data.enabled === true) {
        this.data.enabled = 1
      } else if (this.data.enabled === false) {
        this.data.enabled = 0
      }
      if (this.stutic === 1) {
        addGoodList(this.data).then(res => {
          this.dialogTableVisible = false
          this.$message({
            type: 'info',
            message: res.resMsg
          })
          this.getList()
        })
      } else if (this.stutic === 2) {
        modifyGoodList(this.data).then(res => {
          this.dialogTableVisible = false
          this.$message({
            type: 'info',
            message: res.resMsg
          })
          this.getList()
        })
      }
    },
    uploadImg(options) {
      const file = options
      if (file) {
        uploadImgToBase64(file).then(res => {
          const data = {
            data: res.result
          }
          uploadImg(data).then(res => {
            this.data.backgroundImg = res.url
          })
        })
      }
      this.data = { ...this.data }
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.structureBuild-container {
  position: relative;
  padding: 15px;
  background: #fff;
  margin: 5px;
  .marB10 {
    margin-bottom: 10px;
  }
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
  .bomBtn {
    text-align: right;
    padding: 10px 40px;
  }
}
</style>
