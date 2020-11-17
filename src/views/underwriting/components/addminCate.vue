<template>
  <div class="addminCate-container">
    <div class="main">
      <el-form
        ref="addminCate"
        :rules="rules"
        :inline="true"
        :model="listQuery"
        label-width="150px"
      >
        <el-form-item style="margin-bottom: 0px;">
          <el-form-item label="所属行业" prop="industryName">
            <el-select
              v-model="listQuery.industryId"
              placeholder="请选择所属行业"
              clearable
              class="filter-item"
              style="width: 400px;"
              @change="handleindustry"
            >
              <el-option
                v-for="item in industryOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择大类" prop="maxCateId">
            <el-select
              v-model="listQuery.maxCateId"
              placeholder="请选择大类"
              clearable
              class="filter-item"
              style="width: 400px;"
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
          <el-form-item
            label="小分类名称"
            prop="cateName"
          >
            <el-input
              v-model="listQuery.cateName"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item
            label="小分类分数占比"
            prop="rate"
          >
            <el-input
              v-model="listQuery.rate"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item
            label="组编号（使用数字）"
            prop="groupCode"
          >
            <el-input
              v-model="listQuery.groupCode"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item
            label="组标题"
            prop="groupTitle"
          >
            <el-input
              v-model="listQuery.groupTitle"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item
            label="问题标题"
            prop="problemTitle"
          >
            <el-input
              v-model="listQuery.problemTitle"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item
            label="选项设置"
            prop="optionList"
          >
            <el-row
              v-for="(item , index ) in listQuery.optionList "
              :key="index"
              class="marB10"
            >
              <el-col :span="16">
                <el-input
                  v-model="item.optionName"
                  placeholder="请输入问题名称"
                />
              </el-col>
              <el-col
                class="line"
                :span="2"
              >-</el-col>
              <el-col :span="4">
                <el-input
                  v-model="item.score"
                  placeholder="请输入分数"
                />
              </el-col>
              <el-col
                class="delIcon"
                :span="2"
              ><span @click="delOptionList(item,index)" /></el-col>
            </el-row>
            <div
              class="color-9 cus"
              @click="addOther"
            >新增选项</div>
          </el-form-item>
          <el-form-item
            label="是否上传图片"
            prop="isUploadImg"
          >
            <el-switch
              v-model="listQuery.isUploadImg"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="是否上传录音"
            prop="isUploadVoice"
          >

            <el-switch
              v-model="listQuery.isUploadVoice"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="提示内容"
            prop="detailTip"
          >
            <el-input
              v-model="listQuery.detailTip"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item
            label="排序"
            prop="detailTip"
          >
            <el-input
              v-model="listQuery.priority"
              style="width: 400px"
            />
          </el-form-item>
        </el-form-item>
        <div class="rateBox">
          <el-button @click="closeDialog">关闭</el-button>
          <el-button
            type="primary"
            @click="saveData"
          >保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  minCateAdd,
  minCateModify,
  getByMinCateId,
  getMaxCateByIndustryId
} from '@/api/underwriting'
import { getAllindustry } from '@/api/insuranceT'
// import { validatenull, isRealNum } from '@/utils/validate'

export default {
  name: 'AddminCate',
  props: {
    dataId: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: -1
    }
  },
  inject: ['fatherClose'],
  data() {
    return {
      listLoading: true,
      listQuery: {
        industryId: '',
        maxCateId: '',
        cateName: '',
        rate: '',
        groupCode: '',
        groupTitle: '',
        problemTitle: '',
        optionList: [
          // 选项列表
          {
            score: 0, // 选项分数
            optionName: '' // 选项名称
          }
        ],
        isUploadImg: 0, // //是否上传照片 1-是，0-否
        isUploadVoice: 0 // 是否上传语音，1-是，0-否
      },
      industryOptions: [],
      cateOptions: [],
      totalnum: 0,
      rules: {
        industryName: [{ required: true, message: '请选择所属行业' }],
        maxCateId: [{ required: true, message: '请选择大类' }],
        cateName: [{ required: true, message: '请填写小分类名称' }],
        rate: [{ type: 'Number', trigger: 'blur', required: true, message: '请填写小分类占比' }],
        groupCode: [{ type: 'Number', trigger: 'blur', required: true, message: '请填写组编号（使用数字）' }],
        groupTitle: [{ required: true, message: '请填写组标题' }],
        problemTitle: [{ required: true, message: '请填写问题标题' }],
        'optionList.score': [{ type: 'Number', trigger: 'blur', required: true, message: '请填写选项分数' }],
        'optionList.optionName': [{ required: true, message: '请填写选项名称' }]
      }
    }
  },
  created() {
    //   this.getList(this.dataId)
    this.getComList()
  },
  methods: {
    // 获取布草详情
    getList(dataId) {
      const data = {
        minCateId: dataId
      }
      this.listLoading = true
      if (dataId === '-1') {
        this.listQuery = {
          industryId: '',
          maxCateId: '',
          cateName: '',
          rate: '',
          groupCode: '',
          groupTitle: '',
          problemTitle: '',
          optionList: [
            // 选项列表
            {
              score: 0, // 选项分数
              optionName: '是' // 选项名称
            },
            {
              score: 0, // 选项分数
              optionName: '否' // 选项名称
            }
          ],
          isUploadImg: 0, // //是否上传照片 1-是，0-否
          isUploadVoice: 0 // 是否上传语音，1-是，0-否
        }
        this.$nextTick(() => {
          this.$refs['addminCate'].clearValidate()
        })
      } else {
        getByMinCateId(data).then(res => {
          // console.log(res.body, '通过ID 获取布草详情')
          this.listQuery = res.data
          this.listLoading = false
          this.handleindustry(res.data.industryId)
        })
      }
    },
    // 获取行业信息
    getComList() {
      getAllindustry().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item, index) => {
            const a = {}
            a.label = item.industryName
            a.id = item.id
            this.industryOptions.push(a)
          })
          console.log(this.industryOptions)
          // this.comOptions = res.data;
        }
      })
    },
    saveData() {
      // console.log(this.listQuery, 'this.listQuery', this.type)
      this.$refs['addminCate'].validate(valid => {
        if (valid) {
          if (this.type === 1) {
            minCateAdd(this.listQuery).then(res => {
              // this.showDialog = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.fatherClose()
            })
          } else if (this.type === 2) {
            minCateModify(this.listQuery).then(res => {
              this.showDialog = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.fatherClose()
            })
          }
        }
      })
    },
    handleindustry(value) {
      console.log(value)
      const data = {
        industryId: value
      }
      getMaxCateByIndustryId(data).then(res => {
        console.log(res, 'getMaxCateByIndustryId')
        this.cateOptions = res.data
        this.cateOptions.maxCateId = ''
      })
    },
    //
    handleFilter(value) {
      if (this.listQuery.industryId === '' || this.listQuery.industryId == null) {
        this.$message({
          type: 'warning',
          message: '请先选择行业'
        })
      }
    },
    // 关闭弹框
    closeDialog() {
      this.fatherClose()
    },
    // 新增选项
    addOther() {
      this.listQuery.optionList.push({
        score: 0, // 选项分数
        optionName: '' // 选项名称
      })
    },
    // 删除选项
    delOptionList(item, index) {
      console.log(item, 'delOptionList', index)
      this.listQuery.optionList.splice(index, 1)
    }
  }
}
</script>
<style  lang="scss">
.el-form-item .el-form-item {
  margin-bottom: 15px;
}
.el-dialog__body {
  padding: 10px 20px 30px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
</style >
<style lang="scss" scoped>
.addminCate-container {
  position: relative;
  padding: 15px;
  .fTitle {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: #666;
    margin: 0;
  }
  .hasSz {
    width: 300px;
  }
  .noHasSz {
    width: 200px;
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
  .line {
    text-align: center;
  }
  .cus {
    cursor: pointer;
  }
  .delIcon {
    width: 30px;
    height: 40px;
    span {
      display: inline-block;
      width: 30px;
      height: 40px;
      background: url('../../../assets/img/icon_del.png') no-repeat center;
      background-size: 20px 20px;
    }
  }
  .rateBox {
    position: absolute;
    right: 10px;
  }
}
</style>
