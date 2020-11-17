<template>
  <div class="insuranceTo-container">
    <div class="main">
      <div class="postInfo-container">
        <el-form
          ref="form"
          :model="secForm"
          label-width="110px"
          :inline="true"
        >
          <el-form-item label="共保业务名称：">
            <el-input v-model.trim="secForm.commonName" style="width:260px;" />
          </el-form-item>

          <el-form-item label="主保险公司： ">
            <el-input v-model.trim="secForm.mainInsuranceCompany" style="width:260px;" />
          </el-form-item>

          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
        </el-form>
      </div>
      <div class="insurBox">
        <el-row :gutter="15">
          <el-col class="card-panel-col">
            <el-card :body-style="{ padding: '5px',height:'200px'}">
              <div
                class="addInsur"
                @click="addInsur({staus:1})"
              >
                <p>添加共保业务</p>
              </div>
            </el-card>
          </el-col>
          <el-col
            v-for="(item,index) in insuranceData"
            :key="item.id"
            class="card-panel-col"
          >
            <el-card :body-style="{ padding: '5px',height:'200px'}">
              <div class="cardTitle">
                <h1>{{ item.commonName }}</h1>
                <div class="rightBox">
                  <span
                    class="color_red"
                    @click="delInsur(item.id,index)"
                  >删除</span>
                  <span
                    class="color_blue"
                    @click="handInsur(index,item.id)"
                  >编辑</span>
                </div>

              </div>
              <div class="infoBox">
                <span class="leftTitle">主承保公司</span>
                <p>
                  {{ item.mainInsuranceCompany }}
                  <span>{{ item.mainInsuranceCompanyRate }}%</span>
                </p>
              </div>
              <div class="infoBox">
                <span class="leftTitle">承保公司</span>
                <div
                  v-for="(i , p) in item.other"
                  :key="p"
                >
                  <p>
                    {{ i.name }}
                    <span>{{ i.rate }}%</span>
                  </p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--弹框-->
    <el-dialog
      width="600px"
      :visible.sync="dialogTableVisible"
      :title="dialogTitle"
      @dragDialog="dialogTableVisible = fasle"
    >
      <el-form
        ref="insureListBox"
        :model="insureList"
        label-width="120px"
      >
        <el-form-item
          label="共保业务名称"
          prop="commonId"
        >
          <el-input
            v-model.trim="insureList.commonName"
            placeholder="请输入共保业务名称"
          />

        </el-form-item>
        <el-form-item
          label="主承保公司"
          prop="main"
        >
          <el-row class="marB10">
            <el-col :span="11">
              <el-select
                v-model="insureList.mainInsuranceCompanyId"
                placeholder="请选择承保公司"
                filterable
                clearable
                class="filter-item"
                :disabled="disabled"
              >
                <el-option
                  v-for="item in industryOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col
              class="line"
              :span="2"
            >-</el-col>
            <el-col :span="11">
              <el-input
                v-model.trim="insureList.mainInsuranceCompanyRate"
                placeholder="请输入占比"
                :disabled="disabled"
              />
              <span class="rateBox">%</span>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          label="承保公司"
          prop="other"
        >
          <el-row
            v-for="(item,index) in insureList.other"
            :key="index"
            class="marB10"
          >
            <el-col :span="11">
              <el-select
                v-model="item.companyId"
                filterable
                placeholder="请选择承保公司"
                clearable
                class="filter-item"
                :disabled="disabled"
              >
                <el-option
                  v-for="n in industryOptions"
                  :key="n.id"
                  :label="n.label"
                  :value="n.id"
                />
              </el-select>
              <!-- <el-input v-model="item.name" /> -->
            </el-col>
            <el-col
              class="line"
              :span="2"
            >-</el-col>
            <el-col :span="11">
              <el-input
                v-model.trim="item.rate"
                placeholder="请输入占比"
                :disabled="disabled"
              />
              <span class="rateBox">%</span>
            </el-col>
          </el-row>
          <div
            class="color-9 cus"
            @click="addOther"
          >新增其他承保公司</div>
        </el-form-item>
        <div class="app-btn-box ">
          <el-button
            type="primary"
            @click="saveData"
          >保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getInsuranceT,
  addInsuranceT,
  changInsuranceT,
  delInsuranceT
} from '@/api/insuranceT'
import { getInsuranceCompany } from '@/api/insuranceT'
//
export default {
  name: 'InsuranceTo',
  data() {
    return {
      listLoading: true,
      secForm: {
        page: 1,
        limit: 20,
        mainInsuranceCompany: '',
        commonName: ''
      },
      status: 1, // 默认1是新增 2是修改
      insuranceData: [],
      dialogTableVisible: false,
      dialogTitle: '添加行业',
      insureList: {
        commonName: '',
        mainInsuranceCompanyRate: '0',
        mainInsuranceCompany: '',
        commonId: '',
        other: [
          {
            rate: '',
            companyId: '0'
          }
        ]
      },
      industryOptions: [],
      disabled: false
    }
  },

  created() {
    this.fetchData()
    this.getComList()
  },
  methods: {
    fetchData() {
      // console.log(data)
      this.listLoading = true
      getInsuranceT(this.secForm).then(response => {
        this.insuranceData = response.data
        this.listLoading = false
      })
    },
    // 获取行业信息
    getComList() {
      getInsuranceCompany().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item, index) => {
            const a = {}
            a.label = item.companyName
            a.id = item.companyId
            this.industryOptions.push(a)
          })
        }
      })
    },
    // 添加
    addInsur(options) {
      this.insureList = {
        commonName: '',
        mainInsuranceCompanyRate: '',
        mainInsuranceCompany: '',
        other: [
          {
            rate: '',
            companyId: ''
          }
        ]
      }
      this.dialogTableVisible = true
      this.dialogTitle = '添加共保方案'
      this.status = 1
      this.disabled = false
    },
    // 查询
    onSearch() {
      this.fetchData()
    },
    // 删除
    delInsur(id, index) {
      const data = {
        commonId: id
      }
      this.$confirm('确定要删除么, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delInsuranceT(data).then(res => {
            // console.log(res)
            if (res.code === 200) {
              this.$notify({
                title: 'Success',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.insuranceData.splice(index, 1)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑
    handInsur(index, id) {
      this.dialogTableVisible = true
      this.status = 2
      this.dialogTitle = '修改共保方案'
      this.disabled = true
      this.insureList = this.insuranceData[index]
    },
    // 保存修改 新增或者修改的数据
    saveData() {
      let totalRate = 0
      totalRate += Number(this.insureList.mainInsuranceCompanyRate)
      if (this.insureList.other) {
        for (let i = 0; i < this.insureList.other.length; i++) {
          // console.log(this.insureList.other[i].rate)
          const rate = this.insureList.other[i].rate
          totalRate += Number(rate)
        }
      }
      // console.log(totalRate, 'totalRate')
      if (totalRate === 100) {
        if (this.status === 1) {
          addInsuranceT(this.insureList).then(res => {
            this.dialogTableVisible = false
            this.fetchData()
          })
        } else if (this.status === 2) {
          changInsuranceT(this.insureList).then(res => {
            this.dialogTableVisible = false
            this.fetchData()
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '保险公司占比需为100'
        })
      }
    },
    // 新增其他共保公司
    addOther() {
      if (this.disabled !== true) {
        this.insureList.other.push({
          rate: '',
          name: ''
        })
      } else {
        this.$message({
          type: 'warning',
          message: '不可修改'
        })
      }
    }
  }
}
</script>
<style >

</style>
<style lang="scss" scoped>
.insuranceTo-container {
  position: relative;
  padding: 15px;
  .postInfo-container {
    position: relative;
    clear: both;
    margin-bottom: 10px;
    background: #fff;
    padding: 10px 20px 1px;
    .postInfo-container-item {
      float: left;
    }
  }
  .insurBox {
    position: relative;
    background: #fff;
    padding-bottom: 20px;
  }
  .card-panel-col {
    position: relative;
    margin-bottom: 15px;
    background: #fff;
    width: 380px;
    height: 240px;
    padding: 10px;
    .cardTitle {
      height: 36px;
      font-size: 16px;
      line-height: 36px;
      padding:0 5px;
      h1 {
        font-size: 18px;
        width: 250px;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rightBox {
        width: 80px;
        float: right;
        span {
          font-size: 14px;
          font-style: normal;
          font-weight: normal;
        }
      }
      i {
        color: #999;
      }
      span {
        display: inline-block;
        padding: 0 5px;
        cursor: pointer;
      }
    }
    .infoBox {
      position: relative;
      width: 100%;
      height: auto;
      text-align: left;
      padding: 3px 0;
      padding-left: 100px;
      line-height: 26px;
      .leftTitle {
        position: absolute;
        left: 10px;
        top: 3px;
        display: inline-block;
        width: 90px;
        color: #666;
        font-size: 16px;
      }
      p {
        line-height: 26px;
        .rateBox {
          display: inline;
          padding: 0 6px;
        }
      }
    }
  }
  .addInsur {
    width: 150px;
    height: 150px;
    padding-top: 100px;
    margin: 25px auto;
    background: url('../../assets/pic/icon_addyw.png') no-repeat top center;
    cursor: pointer;
    p {
      height: 50px;
      font-size: 16px;
      color: #999;
      text-align: center;
      line-height: 50px;
    }
  }
  .addcommon {
    display: inline-block;
    width: 18px;
    height: 18px;
  }
}
</style>

