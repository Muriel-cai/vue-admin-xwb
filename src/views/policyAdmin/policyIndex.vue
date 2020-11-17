
<template>
  <div class="equipment-container">
    <div class="equipmentTable">
      <div class="postInfo-container">
        <el-form
          ref="form"
          :model="secForm"
          label-width="110px"
          :inline="true"
        >
          <el-form-item label="投保单位：">
            <el-input v-model="secForm.holderName" style="widt:260px" />
          </el-form-item>

          <el-form-item label="保单号： ">
            <el-input v-model="secForm.policyNo" style="widt:260px" />
          </el-form-item>

          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
        </el-form>
      </div>
      <div class="insurBox">
        <el-table
          v-loading="listLoading"
          :data="insuranceData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            label="订单号"
            prop="orderNo"
            align="center"
            width="180"
          />
          <el-table-column
            label="投保人"
            prop="holderName"
            align="center"
          />
          <el-table-column
            label="保单号"
            prop="policyNo"
            align="center"
            width="180"
          />
          <el-table-column
            label="保费"
            prop="policyFee"
            align="center"
            width="100"
          />
          <el-table-column
            label="保障期限"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.startDate }} 至 {{ scope.row.endDate }}
            </template>
          </el-table-column>

          <el-table-column
            label="支付状态"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.payState == 1 "
                class="color-gre"
              >已支付</span>
              <span
                v-if="scope.row.payState == 0"
                class="color-9"
              >未支付</span>
            </template>
          </el-table-column>
          <el-table-column
            label="保单状态"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.policyState ==1 || scope.row.policyState == 2"
                class="color-or"
              > {{ policyStateOptions[scope.row.policyState].label }} </span>
              <span
                v-else
                class="color-9"
              > {{ policyStateOptions[scope.row.policyState].label }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="核保状态"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.underwritingState == 1 "
                class="color-gre"
              >已核保</span>
              <span
                v-if="scope.row.underwritingState == 0"
                class="color-9"
              >未核保</span>
            </template>
          </el-table-column>
          <el-table-column
            width="240"
            label="操作"
            align="left"
            fixed="right"
          >
            <template slot-scope="{row,$index}">
              <!-- <el-button
                size="mini"
                type="text"
                v-if="row.underwritingState != 1"
                @click="checkBX(row,$index)"
              >
                核保
              </el-button> -->
              <el-button
                size="mini"
                type="text"
                @click="getDetail(row,$index)"
              >
                查看详情
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="setPlace(row,$index)"
              >
                设置场所
              </el-button>
              <el-button
                v-if="row.payState == 1"
                size="mini"
                type="text"
                @click="entryPolicy(row,$index)"
              >
                保单信息录入
              </el-button>
              <el-button
                v-if="row.payState == 0"
                size="mini"
                type="text"
                @click="payment(row,$index)"
              >
                确认支付
              </el-button>
              <!-- <el-button size="mini" type="success"  v-if="row.payState == 0" @click="toPay(row,$index)">
                确认支付
              </el-button> -->

            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="secForm.page"
            :page-size="secForm.limit"
            layout="total,prev, pager, next, jumper"
            :total="totalnum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!-- 弹框1-->
    <div>
      <el-dialog
        :width="diowidth"
        top="80px"
        :visible.sync="dialogTableVisible"
        :title="title1"
        @dragDialog="dialogTableVisible = fasle"
      >
        <div class="dioHei">

          <!--查看详情-->
          <div v-if="dioType == 1">
            <policyInfo
              ref="policyInfo"
              :policy-id="buildingIds"
            />
          </div>
          <!--查看场所-->
          <div v-if="dioType == 2">
            <placeTable
              ref="placeTable"
              :policy-id="buildingIds"
            />
          </div>
          <!--支付-->
          <div v-if="dioType ==3">
            <el-form
              ref="dataForm"
              :rules="payrules"
              :model="payParams"
              label-position="left"
              label-width="120px"
            >
              <el-form-item
                label="付款时间："
                prop="name"
              >
                <el-date-picker
                  v-model="payParams.payTime"
                  type="datetime"
                  format="yyyy-MM-dd hh:mm:ss"
                  value-format="yyyy-MM-dd hh:mm:ss "
                  placeholder="选择日期时间"
                  style="width: 400px"
                />

              </el-form-item>
              <el-form-item
                label="付款账户名称："
                prop="type"
              >
                <el-input
                  v-model="payParams.payAccountName"
                  placeholder="`请输入付款账户名称"
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="付款账户号：">
                <el-input
                  v-model="payParams.payAccountNo"
                  placeholder="`请输入付款账户号"
                  style="width: 400px"
                />
              </el-form-item>

              <div class="app-btn-box">
                <el-button
                  type="primary"
                  @click="savepay"
                >保存</el-button>
              </div>
            </el-form>
          </div>
          <!--确认保单信息-->
          <div v-if="dioType ==4">
            <el-form
              ref="dataForm"
              :rules="porrules"
              :model="porParams"
              label-position="left"
              label-width="100px"
            >
              <el-form-item
                label="起保时间"
                prop="name"
              >
                <el-date-picker
                  v-model="porParams.startDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  format="yyyy-MM-dd 00:00:00"
                  value-format="yyyy-MM-dd 00:00:00"
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item
                label="保单号："
                prop="type"
              >
                <el-input
                  v-model="porParams.policyNo"
                  placeholder="`请输入保单号"
                  style="width: 400px"
                />
              </el-form-item>

            </el-form>
            <div class="app-btn-box">
              <el-button
                type="primary"
                @click="savepor"
              >保存</el-button>
            </div>
          </div>
          <div
            v-if="dioType == 1"
            style="height:80px;"
          />
          <div
            v-if="dioType == 1"
            class="footerBox"
          >
            <el-button
              v-if="underwritingState !=1 "
              type="primary"
              @click="underwritingEdit"
            >核保</el-button>
            <el-button
              type="primary"
              @click="associated"
            >关联风险查勘</el-button>
          </div>
        </div>

      </el-dialog>
    </div>
    <!-- 弹框2-->
    <div>
      <el-dialog
        :width="diowidth2"
        top="100px"
        :visible.sync="dialogTableVisible2"
        :title="title2"
        @dragDialog="dialogTableVisible2 = fasle"
      >
        <!--确认保单信息-->
        <div v-if="dioType2 ==1">
          <el-form
            ref="dataForm"
            :rules="porrules"
            :model="porParams"
            label-position="left"
            label-width="100px"
          >
            <el-form-item
              label="核保"
              prop="underwritingState"
            >
              <el-radio-group v-model="listQuery.underwritingState">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="0">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="核保意见"
              prop="type"
            >
              <el-input
                v-model="listQuery.underwritingOpinion"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5}"
                placeholder="请输入内容"
                style="width: 450px"
              />
            </el-form-item>
            <div class="app-btn-box ">
              <el-button
                type="primary"
                @click="saveunderwriting"
              >保存</el-button>
            </div>
          </el-form>
        </div>
        <!--关联风险查勘-->
        <div v-if="dioType2 =2">
          <associated
            ref="associated"
            :policy-id="buildingIds"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getPolicyList,
  submitConfirmPayInfo,
  submitConfirmPolicyInfo,
  underwriting
} from '@/api/policy'

import associated from '../part/associated'
import placeTable from './components/placeTable'
import policyInfo from '../part/policyInfo'
export default {
  name: 'Hello',
  components: {
    placeTable,
    policyInfo,
    associated
  },
  provide() {
    return {
      fatherClose: this.fatherMethod,
      fatherClose2: this.fatherMethod2
    }
  },
  data() {
    return {
      buildingIds: '', // 634473158820233217 (模拟参数)
      dialogTableVisible: false,
      diowidth: '95%',
      title1: '查看详情',
      dioType: '1',
      dialogTableVisible2: false,
      title2: '核保',
      dioType2: '',
      diowidth2: '',
      underwritingState: '',
      listLoading: true,
      secForm: {
        holderName: '',
        policyNo: '',
        page: 1,
        limit: 20
      },
      totalnum: 0,
      insuranceData: [],
      dioType: '1', // 1-查看警情 ，2-查看模拟量 ，3-查看通道
      deviceIds: '',
      payParams: {},
      porParams: {},
      listQuery: {
        policyId: '',
        underwritingState: '',
        underwritingOpinion: ''
      },
      policyStateOptions: [
        { label: '未生效', id: 0 },
        { label: '已生效', id: 1 },
        { label: '即将过期', id: 2 },
        { label: '已过期', id: 3 }
      ],
      payrules: {
        payTime: [{ required: true, message: '请选择时间' }],
        payAccountName: [{ required: true, message: '请输入付款账户名称' }],
        payAccountNo: [{ required: true, message: '请输入付款账户号' }]
      },
      porrules: {
        startDate: [{ required: true, message: '请选择时间' }],
        policyNo: [{ required: true, message: '请输入保单号' }]
      }
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    // 获取保单详情
    getList() {
      this.listLoading = true
      getPolicyList(this.secForm).then(response => {
        console.log(response.data, '获取保单详情')
        this.insuranceData = response.data
        this.totalnum = response.total
        this.listLoading = false
      })
    },
    // 搜索
    onSearch() {
      this.getList()
    },
    fatherMethod(option) {
      this.dialogTableVisible = false
    },
    fatherMethod2() {
      this.dialogTableVisible2 = false
    },
    // 设置场所
    setPlace(option) {
      console.log(option, '设置场所')
      this.dialogTableVisible = true
      this.buildingIds = option.id
      this.dioType = 2
      this.title1 = '设置场所'
      this.diowidth = '95%'
      setTimeout(() => {
        this.$refs['placeTable'].getList(this.buildingIds)
      })
    },
    // 核保
    checkBX() {
      console.log('核保')
    },
    // 查看详情
    getDetail(option) {
      console.log('查看详情', option)
      this.dioType = 1
      this.buildingIds = option.id
      this.dialogTableVisible = true
      this.title1 = '查看详情'
      this.diowidth = '95%'
      this.listQuery.policyId = option.id
      this.underwritingState = option.underwritingState
      setTimeout(() => {
        this.$refs['policyInfo'].getList(this.buildingIds)
      })
    },
    // 确认保单信息
    entryPolicy(option) {
      this.dioType = 4
      this.buildingIds = option.orderNo
      this.dialogTableVisible = true
      this.title1 = '确认保单信息'
      this.diowidth = '600px'
    },
    // 确认付款信息
    payment(option) {
      this.dioType = 3
      this.buildingIds = option.orderNo
      this.dialogTableVisible = true
      this.title1 = '确认付款信息'
      this.diowidth = '600px'
    },
    savepay() {
      this.payParams.orderNo = this.buildingIds
      submitConfirmPayInfo(this.payParams).then(res => {
        console.log(res)
        this.dialogTableVisible = false
        // this.$refs['policyTable'].fetchData()
        this.getList()
      })
    },
    savepor() {
      this.porParams.orderNo = this.buildingIds
      submitConfirmPolicyInfo(this.porParams).then(res => {
        this.$message({
          type: 'info',
          message: '操作成功'
        })
        this.dialogTableVisible = false
        // this.$refs['policyTable'].fetchData()
        this.getList()
      })
    },
    //
    underwritingEdit(option) {
      // console.log(option, 'underwritingEdit+++++++++++++++')
      this.dioType2 = 1
      // this.buildingIds = option
      this.dialogTableVisible2 = true
      this.title2 = '核保'
      this.diowidth2 = '600px'
    },
    //
    saveunderwriting() {
      //  console.log(this.index.parseTime,"++++++++++++++++++++")
      underwriting(this.listQuery).then(res => {
        console.log(res)
        this.$message({
          type: 'info',
          message: '操作成功'
        })
        this.dialogTableVisible2 = false
      })
    },
    //
    associated(option) {
      this.dioType2 = 2
      // this.buildingIds = option
      this.dialogTableVisible2 = true
      this.title2 = '关联企业信息风险'
      this.diowidth2 = '80%'
      setTimeout(() => {
        this.$refs['associated'].getList(this.buildingIds)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page = val

      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页000: ${val}`)
      this.page = val

      this.getList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.equipment-container {
  position: relative;
  padding: 10px;
  background: #fff;
  position: relative;
  margin: 2px;
  .marB10 {
    margin-bottom: 10px;
  }
  .dioHei {
    max-height: 700px;
    overflow-y: auto;
    overflow-x: hidden;
    .footerBox {
      position: absolute;
      z-index: 10;
      height: 80px;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      line-height: 80px;
      box-shadow: 5px 0px 5px 2px rgba(221, 221, 221, 0.1);
    }
  }
}
</style>
