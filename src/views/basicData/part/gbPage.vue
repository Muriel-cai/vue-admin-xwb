<template>
  <div class="insuranceTo-container">
    <div class="main">
      <div class="postInfo-container">
        <el-form ref="form" :model="secForm" label-width="110px">
          <el-form-item label-width="0">
            <el-row :gutter="15">
              <el-col :span="6">
                <el-form-item label="共保业务名称：">
                  <el-input v-model="secForm.commonName" />
                </el-form-item>
              </el-col>
              <el-col class="line" :span="6">
                <el-form-item label="主保险公司： ">
                  <el-input v-model="secForm.mainInsuranceCompany" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="onSearch">查询</el-button>
              </el-col>
            </el-row>
          </el-form-item>

        </el-form>
      </div>
      <div class="insurBox">
        <el-table v-loading="listLoading" :data="insuranceData" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column label="地板行业共保业务" prop="commonName" align="center" />
          <el-table-column label="主保险公司名称" prop="mainInsuranceCompany" align="center" />
          <el-table-column label="主保险公司比例" prop="mainInsuranceCompanyRate" align="center" />
          <el-table-column label="更新时间" prop="lastTime" align="center" />
          <el-table-column width="100" label="操作" align="center">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="text" @click="getThis(row,$index)"> 选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <pagination
            v-show="totalnum>0"
            :total="totalnum"
            :page.sync="secForm.page"
            :limit.sync="secForm.limit"
            @pagination="fetchData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInsuranceT } from '@/api/insuranceT'
import pagination from '@/components/Pagination'
export default {
  name: 'InsuranceTo',
  components: { pagination },
  props: {
    getThisT: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      listLoading: true,
      secForm: {
        mainInsuranceCompany: '',
        commonName: '',
        page: 1,
        limit: 20
      },
      totalnum: 0,
      insuranceData: []
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getInsuranceT(this.secForm).then(response => {
        // console.log(response.data, '共保业务的返回结果')
        this.insuranceData = response.data
        this.listLoading = false
      })
    },

    // 查询
    onSearch() {
      if (this.secForm.comName !== '' || this.secForm.ywNmae !== '') {
        this.fetchData()
      }
    },
    //
    getThis(row, index) {
      const id = row.id
      this.$emit('getThisT', id)
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
.color_red{
  color: #FF1010;
}
.color_blue{
  color: #3392FF;
}
.color-9{
  color:#999;
}
.marB10{
  margin-bottom: 10px;;
}
.line{
  text-align: center;
}
.cus{
  cursor: pointer;
}
.rateBox{
  position: absolute;
  right:10px
}
}
</style>

