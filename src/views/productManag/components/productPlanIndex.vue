<template>
  <div class="tab-container">
    <el-tabs
      v-model="activeName"
      style="margin-top:15px;"
      type="border-card"
      closable
      @tab-remove="removeTab(activeName)"
    >
      <!-- '计划' + (Number(index) +1)-->
      <el-tab-pane
        v-for="(item ,index) in list "
        :key="index"
        :label="item.planName "
        :name="String(index)"
      >
        <keep-alive>
          <div class="dynamicForm">
            <el-form ref="dynamicForm" :model="item" label-width="120px" :rules="rules">
              <el-form-item label="计划名称" prop="planName">
                <el-input v-model.trim="item.planName" />
              </el-form-item>
              <el-form-item label="保险期限" prop="insurancePeriod">
                <el-input v-model.trim="item.insurancePeriod" />
              </el-form-item>
              <el-form-item label="保费" prop="policyFee">
                <el-input v-model.trim="item.policyFee" />
              </el-form-item>
              <el-form-item label="设备费">
                <el-input v-model.trim="item.deviceFee" />
              </el-form-item>
              <el-form-item label="计划编码">
                <el-input v-model.trim="item.planCode" />
              </el-form-item>
              <el-form-item label="页面模型">
                <el-input v-model.trim="item.pageModel" />
              </el-form-item>
              <el-form-item label="是否可用">
                <el-switch
                  v-model="item.status"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model.trim="item.remark" />
              </el-form-item>
            </el-form>
            <!-- <dynamic-form
              ref="dynamic-form"
              :value="item "
              :descriptors="descriptors"
              :lang="lang"
              :readonly="isread"
            /> -->
            <div
              class="bomBtn"
              style="text-aline:right;"
            >
              <el-button
                type="primary"
                @click="addTab(activeName)"
              >新增计划</el-button>
              <el-button
                type="primary"
                @click="saveData"
              >保存修改</el-button>
              <!-- <el-button type="primary" @click="clearData">测试清除</el-button> -->
            </div>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getgoodPlan,
  addgoodPlan,
  delgoodPlan,
  modifygoodPlan
} from '@/api/productManag'
export default {
  name: 'Tab',
  props: {
    goodId: {
      type: String,
      default: '-1'
    },
    type: {
      type: Number,
      default: -1
    }
  },
  inject: ['fatherClose'],
  data() {
    return {
      list: null,
      listQuery: {
        goodId: '1'
      },
      activeName: '0',
      tabIndex: 0,
      isread: true,
      loading: false,
      data: {},
      addOPtion: {
        planId: '',
        planName: '新增产品',
        insurancePeriod: '',
        policyFee: '',
        deviceFee: '',
        planCode: '',
        pageModel: '',
        status: false,
        remark: ''
      },
      rules: {
        planName: [{ required: true, message: '请输入计划名称' }],
        insurancePeriod: [{ required: true, message: '请输入保险期限' }],
        policyFee: [{ required: true, message: '请输入保费' }],
        status: [{ required: true, message: '请选择是否可用' }]

      }
    }
  },
  watch: {
    type(val) {
      console.log(val, '这是子页面返回的数据')
    }
  },
  created(option) {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    // console.log(tab, 'created+++++++++++++++', this.goodId)
    //

    // this.getList()
  },
  activated: {},
  methods: {
    getList(data) {
      this.loading = true
      this.listQuery.goodId = this.goodId
      getgoodPlan(this.listQuery).then(response => {
        console.log(response.data, response.data[0])
        if (response.data && response.data.length > 0) {
          response.data.forEach((item, index) => {
            console.log(item.status, index)
            if (item.status === 1) {
              item.status = true
            } else if (item.status === 0) {
              item.status = false
            }
          })
          this.list = response.data
          this.data = response.data[0]
          this.tabIndex = response.data.length
        } else {
          console.log(this.data, this.addOPtion)
          this.list = []
          this.list.push(this.addOPtion)
          this.data = this.list[0]
          this.tabIndex = 1
        }

        this.loading = false
      })
    },

    removeTab(targetName) {
      // 删除角色FFFF
      console.log(this.activeName, this.list[this.activeName])
      this.$confirm('确定要删除么, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const planId = this.list[this.activeName].planId
          console.log(planId)
          if (planId) {
            const data = {
              planId: planId
            }
            delgoodPlan(data).then(res => {
              this.$notify({
                title: 'Success',
                message: '成功删除计划',
                type: 'success',
                duration: 2000
              })
              this.list.splice(index, 1)
              this.activeName = 0
              this.getList()
            })
          } else {
            console.log('ces ', this.activeName)
            this.list.splice(this.activeName, 1)
            this.activeName = 0
            this.$message({
              type: 'info',
              message: '已删除'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleClick(tab, event) {
      console.log(tab, 'handleClick', event)
    },
    // 新增计划
    addTab() {
      this.list.push(this.addOPtion)
      // const newTabName = this.list.length + ''
    },
    // 保存计划
    saveData(tab) {
      // this.$parent.fatherMethod(true);
      this.list[this.activeName].goodId = this.goodId
      if (this.list[this.activeName].status === true) {
        this.list[this.activeName].status = 1
      } else {
        this.list[this.activeName].status = 0
      }
      if (this.list[this.activeName].planId) {
        modifygoodPlan(this.list[this.activeName])
          .then(res => {
            console.log(res, '修改', this.$parent.fatherMethod)
            this.$message({
              type: 'info',
              message: '计划修改成功'
            })
            this.fatherClose()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        addgoodPlan(this.list[this.activeName])
          .then(res => {
            this.$message({
              type: 'info',
              message: '计划新增成功'
            })
            this.fatherClose()
            // this.$parent.fatherMethod(true);
          })
          .catch(err => {
            console.log(err)
          })
      }
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
