<template>
  <div class="tab-container">
    <div class="">
      <el-form ref="dynamicForm" :model="formData" label-width="120px" :rules="rules">
        <el-form-item label="产品名称" prop="goodName">
          <el-input v-model.trim="formData.goodName" style="width:420px" />
        </el-form-item>
        <el-form-item label="产品编码" prop="goodCode">
          <el-input v-model.trim="formData.goodCode" style="width:420px" />
        </el-form-item>
        <el-form-item label="保险公司名称" prop="companyId">
          <el-select
            v-model="formData.companyId"
            placeholder="请选择承保公司"
            filterable
            clearable
            class="filter-item"
            :disabled="disabled"
            style="width:420px"
          >
            <el-option
              v-for="item in industryOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="保险期限">
          <el-input v-model.trim="formData.insurancePeriod" style="width:420px" />
        </el-form-item>
        <el-form-item label="保险费用">
          <el-input v-model.trim="formData.policyFee" style="width:420px" />
        </el-form-item>
        <el-form-item label="设备费用">
          <el-input v-model.trim="formData.deviceFee" style="width:420px" />
        </el-form-item>
        <el-form-item label="是否上线" prop="enabled">
          <el-switch
            v-model="formData.enabled"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item label="是否有子计划" prop="isPlan">
          <el-switch
            v-model="formData.isPlan"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item label="产品">
          <el-input v-model.trim="formData.goodDetail" style="width:420px" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model.trim="formData.remark" style="width:420px" />
        </el-form-item>
        <el-form-item label="产品logo">
          <el-upload
            class="avatar-uploader"
            accept="'image/*'"
            action
            :http-request="uploadImg"
            :show-file-list="false"
          >
            <img
              v-if="formData.backgroundImg"
              :src="formData.backgroundImg"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
            <!-- <span>添加</span> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        class="bomBtn"
        style="text-aline:right;"
      >
        <el-button
          type="primary"
          @click="saveData"
        >保存</el-button>
      <!-- <el-button type="primary" @click="clearData">测试清除</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getInsuranceCompany } from '@/api/insuranceT'
export default {
  name: 'ProductPlan',
  props: {
    goodId: {
      type: String,
      default: '-1'
    },
    type: {
      type: Number,
      default: -1
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    uploadImgs: {
      type: Function,
      default: function() {}
    },
    saveDatas: {
      type: Function,
      default: function() {}
    }
  },
  inject: ['fatherClose'],
  data() {
    return {
      disabled: false,
      industryOptions: [],
      rules: {
        goodName: [{ required: true, message: '请输入产品名称' }],
        goodCode: [{ required: true, message: '请输入产品编码' }],
        companyId: [{ required: true, message: '请选择保险公司' }],
        enabled: [{ required: true, message: '请选择是否上架' }],
        isPlan: [{ required: true, message: '请选择是否有子计划' }]
      }
    }
  },
  watch: {
  },
  created(option) {
    this.getComList()
    // init the default selected tab
  },
  methods: {
    // 获取行业信息
    getList() {
      if (this.type === 1) {
        this.$refs['dynamicForm'].clearValidate()
      }
    },
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
    uploadImg(options) {
      const file = options.file
      // console.log(options, file, 'cekgkfjkfjg')
      this.$emit('uploadImgs', file)
    },
    // 保存数据
    saveData() {
      this.$refs['dynamicForm'].validate(valid => {
        if (valid) {
          this.$emit('saveDatas')
          // if (this.data.isPlan === true) {
          //   this.formData.isPlan = 1
          // } else if (this.data.isPlan === false) {
          //   this.formData.isPlan = 0
          // }
          // if (this.data.enabled === true) {
          //   this.formData.enabled = 1
          // } else if (this.data.enabled === false) {
          //   this.formData.enabled = 0
          // }
          // if (this.stutic === 1) {
          //   addGoodList(this.formData).then(res => {
          //     this.dialogTableVisible = false
          //     this.$message({
          //       type: 'info',
          //       message: res.resMsg
          //     })
          //     this.fatherClose()
          //   })
          // } else if (this.stutic === 2) {
          //   modifyGoodList(this.formData).then(res => {
          //     this.dialogTableVisible = false
          //     this.$message({
          //       type: 'info',
          //       message: res.resMsg
          //     })
          //     this.fatherClose()
          //   })
          // }
        }
      })
    }

  }
}
</script>

<style scoped lang="scss">
.tab-container {
  .bomBtn {
    text-align: right;
    padding: 10px 40px;
  }
}
</style>
