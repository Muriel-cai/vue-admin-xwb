<template>
  <div class="policyData-container">
    <div ref="print" class="main">
      <div>
        <h1>
          保单详情
          <!-- <el-button
            type="primary"
            @click="printBtn"
          >打印</el-button> 测试 -->
        </h1>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content ">
              <p><span> 保单号：</span> {{ policy.orderNo }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              <p><span>收费确认时间：</span>{{ policy.payTime }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              <p><span>保单状态： </span>{{ policy.policyState }}</p>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content">
              <p><span>保障期限 ：</span>{{ policy.startDate }} 至 {{ policy.endDate }}</p>
            </div>
          </el-col>
        </el-row>
        <h1> 投保人信息</h1>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content ">
              <p><span>投保人名称 : </span> {{ policy.holderName }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              <p><span>投保人联系电话 ：</span> {{ holder.contactPhone }} </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              <p><span>保费 ：</span> {{ holder.policyFee }} </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              <p><span>企业类型 :</span> {{ policy.companyTypeName }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              <p><span>所在行业 ：</span> {{ holder.industryName }} </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              <p><span>建筑类型 : </span> {{ policy.buildTypeName }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <h1> 被保险人信息</h1>
        <el-row
          v-for="(itemi , index) in insured"
          :key="'index' + index"
          :gutter="20"
        >
          <el-col :span="12">
            <div class="grid-content ">
              <p><span>被保险人: </span> {{ itemi.insuredName }}</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content ">
              <p><span>组织机构代码/身份 证号码 ：</span>{{ itemi.cardNo }} </p>
            </div>
          </el-col>
        </el-row>
        <h1> 标的项目列表</h1>
        <el-row
          v-for="(n, m ) in item"
          :key="'m'+ m"
          :gutter="20"
        >
          <el-col :span="12">
            <div class="grid-content ">
              <p><span>标的项目 : </span>{{ n.itemName }}</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content ">
              <p><span>保额：</span> {{ n.itemInsuredFee }} </p>
            </div>
          </el-col>
        </el-row>
        <h1> 保险标的地址</h1>
        <el-row
          v-for="(i,j ) in addr"
          :key="'j' + j"
          :gutter="20"
        >
          <el-col :span="24">
            <div class="grid-content ">
              <p><span>标的地址: </span>{{ i.addrName }}</p>
            </div>
          </el-col>
        </el-row>

      </div>
      <div>
        <el-row
          type="flex"
          class="row-bg"
        >
          <el-col :span="6">
            <div class="grid-content bg-purple"> 营业执照</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-image
                style="width: 100px; height: 100px"
                :src="policy.businessLicenseImg"
                :preview-src-list="srcList"
                :z-index="zIndex"
              />
            </div>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          class="row-bg"
        >
          <el-col :span="6">
            <div class="grid-content bg-purple"> 法人身份证</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-image
                style="width: 100px; height: 100px"
                :src="policy.legalPersonImg"
                :preview-src-list="srcList"
                :z-index="zIndex"
              />
            </div>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          class="row-bg"
        >
          <el-col :span="6">
            <div class="grid-content bg-purple"> 保单签名</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-image
                style="width: 100px; height: 100px"
                :src="policy.signatureUrl"
                :preview-src-list="srcList"
                :z-index="zIndex"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
import { getPolicyDetail } from '@/api/policy'
export default {
  name: 'PolicyData',
  props: {
    policyId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listLoading: true,
      addr: {}, // 投保地址
      holder: {}, // 投保人信息
      insured: {}, // 被投保人列表
      item: {}, // 标的项目列表，
      policy: {}, // 保单详情
      srcList: [],
      zIndex: 9999
    }
  },

  created() {
    // this.getList(this.policyId)
  },
  methods: {
    // 获取保单详情
    getList(id) {
      const data = {
        policyId: id
      }
      // console.log(data, '获取保单详情000000000000000000')
      this.listLoading = true
      getPolicyDetail(data).then(res => {
        this.addr = res.data.addr // 投保地址
        this.holder = res.data.holder // 投保人信息
        this.insured = res.data.insured // 被投保人列表
        this.item = res.data.item // 标的项目列表，
        this.policy = res.data.policy
        this.srcList = []
        this.getPicList(res.data.policy.businessLicenseImg)
        this.getPicList(res.data.policy.legalPersonImg)
        this.getPicList(res.data.policy.signatureUrl)
        this.listLoading = false
      })
    },
    getPicList(pic) {
      if (pic) {
        this.srcList.push(pic)
      }
    }
    // 测试打印功能
    // printBtn() {
    //   this.$print(this.$refs.print)
    // }
  }
}
</script>
<style >
.el-form-item {
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>
.policyData-container {
  position: relative;
  h1 {
    font-size: 16px;
    line-height: 25px;
    color: #000;
    font-weight: bold;
    padding: 5px;
    border-bottom: 1px solid rgba(238, 238, 238, 0.5);
    margin: 5px 0;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    position: relative;
    clear: both;
    p {
      color: #666;
      font-size: 14px;
      line-height: 26px;
      padding: 0 5px;
      span {
        display: inline-block;
        color: #000;
        font-size: 14px;
        padding-right: 5px;
      }
    }
  }
}
</style>

