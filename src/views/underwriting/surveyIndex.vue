
<template>
  <div class="surveyIndex-container">
    <div class="main">
      <div class="postInfo-container">
        <el-form
          ref="form"
          :model="param"
          :inline="true"
          label-width="110px"
        >
          <el-form-item label="企业名称">
            <el-input
              v-model="param.companyName"
              style="width: 280px;"
            />
          </el-form-item>

          <el-form-item
            label="状态"
            prop="status"
          >
            <el-select
              v-model="param.status"
              placeholder="请选择状态"
              style="width: 280px;"
            >
              <el-option
                v-for="item in statusOption"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
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
            label="企业名称"
            prop="companyName"
            align="center"
          />
          <el-table-column
            label="巡查时间"
            prop="startTime"
            align="center"
          />

          <el-table-column
            label="状态"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.busiState == 1 ? '已完成' : '进行中' }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="查勘得分"
            prop="grade"
            align="center"
          />

          <el-table-column
            label="风险评价及查勘意见"
            prop="evaluate"
            align="center"
          />

          <el-table-column
            width="260"
            label="操作"
            align="center"
            fixed="right"
          >
            <template slot-scope="{row,$index}">
              <el-button
                size="mini"
                type="text"
                @click="checkInfo(row,$index)"
              >详情</el-button>
              <el-button
                v-if="row.busiState == 1"
                size="mini"
                type="text"
                @click="checkgrade(row,$index)"
              >分数修正</el-button>
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
        :width="dioWidth"
        :visible.sync="dialogTableVisible"
        :title="dialogTitle"
      >
        <div v-if="dioType == 1">
          <surveyDetails
            ref="surveyDetails"
            :data-id="goodsId"
          />
        </div>
        <div v-if="dioType == 2">
          <div class="demo-input-suffix">
            <span class="leftLable">当前分数</span> {{ curScore }}
          </div>
          <div class="demo-input-suffix">
            <span class="leftLable"> 行业调整分数 </span>
            <el-input
              v-model="newScore"
              placeholder="请填写分数"
              style="width:260px;"
            />
          </div>
          <div class="demo-input-suffix ">
            <span class="leftLable">调整后得分</span> <span class="color-red">{{ newScore }}</span>
          </div>
          <div class="app-btn-box">
            <el-button
              type="primary"
              @click="saveData"
            >保存</el-button>

          </div>
        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { patrolRecordList, adjustGrade } from '@/api/underwriting'
import surveyDetails from './components/surveyDetails'
import pagination from '@/components/Pagination'
export default {
  name: 'SurveyIndex',
  components: {
    surveyDetails,
    pagination
  },
  data() {
    return {
      listLoading: false,
      param: {
        companyName: '', // 企业名称
        limit: 20, // 每页记录数
        page: 1, // 查询页数
        status: '' // 状态：0-进行中，1-完成，2-整改中
      },
      totalnum: 0,
      patrolData: [],
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
      dialogTitle: '',
      dioWidth: '',
      dioType: '', // 1为查看详情 2.修改分数
      curScore: '',
      newScore: '',
      id: '',
      goodsId: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取查询记录
    getList() {
      patrolRecordList(this.param).then(res => {
        console.log(res)
        this.patrolData = res.data
        this.totalnum = res.total
      })
    },
    // 查询
    onSearch() {
      this.getList()
    },
    // 详情
    checkInfo(row) {
      console.log(row, '查看详情')
      this.dialogTableVisible = true
      this.dialogTitle = '查看详情'
      this.dioWidth = '90%'
      this.dioType = 1 // 1为查看详情 2.修改分数
      this.goodsId = row.id
      setTimeout(() => {
        this.$refs['surveyDetails'].getGroup(this.goodsId)
      })
    },
    // 修改分数
    checkgrade(row) {
      console.log(row)
      this.dialogTableVisible = true
      this.dialogTitle = '分数修正'
      this.dioWidth = '420px'
      this.dioType = 2 // 1为查看详情 2.修改分数
      this.curScore = row.grade
      this.id = row.id
    },
    // 保存数据
    saveData() {
      const data = {
        grade: this.curScore, // 调整前的分数(当前分数)
        afterGrade: this.newScore, // 调整后的分数
        id: this.id // 记录id
      }

      adjustGrade(data).then(res => {
        console.log(res)
        this.dialogTableVisible = false
        this.$message({
          type: 'info',
          message: '修改成功'
        })
        this.getList()
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = 'scss'>
.surveyIndex {
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
  }
}
</style>
