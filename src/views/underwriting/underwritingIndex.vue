
<template>
  <div class="underwriting-container">
    <div class="main ">
      <div class="postInfo-container">
        <el-form
          ref="form"
          :model="secForm"
          label-width="110px"
          :inline="true"
        >
          <el-form-item label="投保单位：">
            <el-input v-model="secForm.holderName" style="width:260px" />
          </el-form-item>

          <el-form-item label="保单号： ">
            <el-input v-model="secForm.policyNo" style="width:260px" />
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
            align="center"
            prop="orderNo"
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
          />
          <el-table-column
            label="保费"
            align="center"
            prop="policyFee"
            width="140"
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
            label="核保状态"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.underwritingState == 1">核保通过</span>
              <span v-if="scope.row.underwritingState == 2">核保未通过</span>
              <span v-if="scope.row.underwritingState == 0 || scope.row.underwritingState == null">未核保</span>
              <!-- {{  == 1 ? "已核保" : "未核保" }} -->
            </template>
          </el-table-column>
          <el-table-column
            width="80"
            label="操作"
            align="left"
            fixed="right"
          >
            <template slot-scope="{row,$index}">
              <!-- <el-button
                size="mini"
                type="text"
                @click="checkBX(row,$index)"
              >
                核保
              </el-button> -->
              <el-button
                size="mini"
                type="text"
                @click="getDetail(row,$index)"
              >
                <!-- {{row.underwritingState}} -->
                {{ row.underwritingState == 1 ? "查看详情" : "核保" }}

              </el-button>

              <!-- <el-button size="mini" type="success"  v-if="row.payState == 0" @click="toPay(row,$index)">
                确认支付
              </el-button> -->

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
    </div>
    <!--弹框-->
    <div>
      <el-dialog
        :width="dioWidth"
        :visible.sync="dialogTableVisible"
        :title="dialogTitle"
        top="50px"
        :modal-append-to-body="true"
      >
        <div
          v-if="dioType == 1"
          class="dioHei"
        >
          <!---->
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="保单信息"
              name="1"
            >
              <policyInfo
                v-if="activeName == '1' "
                ref="policyInfo"
                :policy-id="goodsId"
              />
            </el-tab-pane>
            <el-tab-pane
              label="查勘详情"
              name="2"
            >
              <surveyDetails
                v-if=" activeName == '2'"
                ref="surveyDetails"
                :data-id="goodsId"
              />

            </el-tab-pane>

            <el-tab-pane
              label="设备信息"
              name="3"
            >
              <equipmentTable
                v-if=" activeName == '3'"
                ref="equipmentTable"
                @checkjq="checkjqData"
                @checktd="checktdData"
              />
            </el-tab-pane>
            <el-tab-pane
              label="企业信用"
              name="4"
            >
              <div v-if="activeName =='4'">
                <div
                  v-for="(item, index) in companyRiskList "
                  :key="index"
                >
                  <el-collapse
                    v-model="activeNames"
                    @change="handleChange"
                  >
                    <el-collapse-item
                      v-for="(i,j) in item.children"
                      :key="j"
                      :title="item.riskTypeDesc"
                      :name="index"
                    >
                      <p class="riskline">{{ i.riskTitle }} </p>
                    </el-collapse-item>
                  </el-collapse>
                  <h1 />

                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div
            v-if="dioType == 1 || dioType == 2 "
            style="height:80px;"
          />
          <div
            v-if="dioType == 1 && activeName == '1' "
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
          <div
            v-if="dioType == 1 && activeName == '2' "
            class="footerBox"
          >
            <el-button
              type="primary"
              @click="riskBtn"
            >提示风险</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 弹框2-->
    <div>
      <el-dialog
        :width="diowidth2"
        top="50px"
        :visible.sync="dialogTableVisible2"
        :title="title2"
        :modal-append-to-body="true"
        @dragDialog="dialogTableVisible2 = fasle"
      >
        <!--确认保单信息-->
        <div v-if="dioType2 ==1">
          <el-form
            ref="dataForm"
            :model="listQuery"
            label-position="left"
            label-width="100px"
          >
            <el-form-item
              label="核保"
              prop="underwritingState"
            >
              <el-radio-group v-model="listQuery.underwritingState">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="2">不通过</el-radio>
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
            <div class="app-btn-box">
              <el-button
                type="primary"
                @click="saveunderwriting"
              >保存</el-button>
            </div>
          </el-form>
        </div>
        <!--关联风险查勘-->
        <div v-if="dioType2 ==2">
          <associated
            ref="associated"
            :policy-id="goodsId"
            @getDetailsId="getDetailsIds"
          />
        </div>
        <!--关联风险查勘-->
        <div v-if="dioType2 ==3">
          <el-form
            ref="dataForm"
            :model="riskParams"
            label-position="left"
            label-width="100px"
          >
            <el-form-item
              label="风险提示"
              prop="type"
            >
              <el-input
                v-model="riskParams.riskOpinion"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5}"
                placeholder="请输入内容"
                style="width: 450px"
              />
            </el-form-item>
            <div class="app-btn-box">
              <el-button
                type="primary"
                @click="subRiskInfo"
              >保存</el-button>
            </div>
          </el-form>
        </div>
        <div v-if="dioType2 ==4">
          <alarmTable
            ref="alarmTable"
            :device-id="deviceIds"
          />
        </div>
        <div v-if="dioType2 ==5">
          <channelTable
            ref="channelTable"
            :device-id="deviceIds"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPolicyList, underwriting, getCompanyRiskList } from '@/api/policy'
import pagination from '@/components/Pagination'
import { submitRiskInfo } from '@/api/underwriting'
import surveyDetails from './components/surveyDetails'
import equipmentTable from '../part/equipmentTable'
import policyInfo from '../part/policyInfo'
import associated from '../part/associated'
import alarmTable from '../part/alarmTable'
import channelTable from '../part/channelTable'
export default {
  name: 'Underwriting',
  components: {
    pagination,
    surveyDetails,
    policyInfo,
    equipmentTable,
    associated,
    alarmTable,
    channelTable
  },
  provide() {
    return {
      fatherClose: this.fatherMethod,
      fatherClose2: this.fatherMethod2
    }
  },
  data() {
    return {
      mes: '查勘记录页面',
      listLoading: false,
      secForm: {
        holderName: '',
        policyNo: '',
        page: 1,
        limit: 20
      },
      totalnum: 0,
      insuranceData: [],
      dioType: '1', // 1-查看警情 ，2-查看模拟量 ，3-查看通道
      statusOption: [
        {
          id: 0,
          label: '进行中'
        },
        {
          id: 1,
          label: '完成'
        }
      ],
      dialogTableVisible: false,
      underwritingState: '',
      dialogTitle: '',
      dioWidth: '',
      dialogTableVisible2: false,
      title2: '核保',
      dioType2: '',
      diowidth2: '',
      goodsId: '',
      deviceIds: '',
      activeName: '1',
      assignPatrolId: '',
      riskParams: {},
      listQuery: {
        policyId: '',
        underwritingState: '',
        underwritingOpinion: ''
      },
      companyRiskList: {},
      activeNames: ['1'],
      riskOpinion: ''
    }
  },
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
    // 查看详情
    getDetail(row) {
      console.log(row, '查看详情')
      this.dialogTableVisible = true
      this.dialogTitle = '查看详情'
      this.dioWidth = '90%'
      this.dioType = 1 // 1为查看详情
      this.goodsId = row.id
      this.listQuery.policyId = row.id
      this.assignPatrolId = row.assignPatrolId
      this.underwritingState = row.underwritingState
      // this.handleClick('policyInfo')
      this.activeName = '1'
      setTimeout(() => {
        this.$refs['policyInfo'].getList(this.goodsId)
      })
    },
    handleClick(tab, event) {
      console.log('切换Tab', tab.name)
      if (tab.name) {
        switch (tab.name) {
          case '1':
            setTimeout(() => {
              this.$refs['policyInfo'].getList(this.goodsId)
            })
            break
          case '2':
            console.log(this.assignPatrolId, ',是否有assignPatrolId')
            // this.dioType = 2 //
            if (this.assignPatrolId != null) {
              setTimeout(() => {
                this.$refs['surveyDetails'].getGroup(this.assignPatrolId)
                //
              })
            } else {
              this.associated()
            }

            break
          case '3':
            setTimeout(() => {
              this.$refs['equipmentTable'].getList(this.goodsId, 2)
            })
            break
          case '4':
            setTimeout(() => {
              getCompanyRiskList({ policyId: this.goodsId }).then(res => {
                // console.log(res, 'getCompanyRiskList')
                this.activeNames = ['1']
                this.companyRiskList = res.data
                if (res.data.length > 0) {
                  for (var i = 0; i < this.companyRiskList.length; i++) {
                    this.activeNames.push(i.toString())
                  }
                }
              })
            })
            break
          default:
        }
      }
      // this.$refs["'" + activeName + "'"].getList(this.goodsId)
    },
    //
    handleChange(val) {
      console.log(val)
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
      underwriting(this.listQuery).then(res => {
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
        this.$refs['associated'].getList(this.goodsId)
      })
    },
    getDetailsIds(id) {
      setTimeout(() => {
        console.log(id, '查勘ID')
        this.$refs['surveyDetails'].getGroup(id)
        this.assignPatrolId = id
      }, 2000)
    },
    // 提交查勘风险信息
    riskBtn() {
      this.dioType2 = 3
      // this.buildingIds = option
      this.dialogTableVisible2 = true
      this.title2 = '提示查勘风险信息'
      this.diowidth2 = '600px'
    },
    subRiskInfo() {
      this.riskParams.id = this.assignPatrolId
      submitRiskInfo(this.riskParams).then(res => {
        this.$message({
          type: 'info',
          message: '操作成功'
        })
        this.dialogTableVisible2 = false
      })
    },
    // 查看警情
    checkjqData(option) {
      console.log(option, '查看警情')
      this.dioType2 = 4
      this.deviceIds = option
      this.dialogTableVisible2 = true
      this.title2 = '查看警情'
      setTimeout(() => {
        this.$refs['alarmTable'].getList(option)
      })
    },
    checktdData(option) {
      this.dioType2 = 5
      this.deviceIds = option
      this.dialogTableVisible2 = true
      this.title2 = '查看通道'
      setTimeout(() => {
        this.$refs['channelTable'].getList(option)
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
<style scoped lang = 'scss'>
.underwriting {
  &-container {
    margin: 5px;
    position: relative;
    height: auto;
    background: #fff;
    min-height: 600px;
    .main {
      padding: 10px;
    }
    .dioHei {
      max-height: 700px;
      min-width: 900px;
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
    .riskline {
      line-height: 24px;
      box-shadow: 0px -1px 1px 1px rgba(0, 0, 0, 0.14);
    }
  }
}
</style>
