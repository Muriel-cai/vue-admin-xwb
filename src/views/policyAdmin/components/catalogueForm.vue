<template>
  <div class="catalogue-container">
    <div class="main">
      <el-form
        ref="dataForm"
        v-loading="loading"
        :rules="rules"
        :model="params"
        :inline="true"
        label-position="left"
        label-width="85px"
        size="mini"
      >
        <el-form-item>
          <div style="margin-bottom:20px;">
            <div >保单信息</div>
          </div>
          <el-form-item
            label="保单分类"
            prop=""
          >
            <el-select
              v-model="params.a"
              placeholder="请选择"
              :remote-method="remoteMethod"
              style="width: 260px"
              :disabled="disabled "
              @change="handleSelect"
            >
              <el-option
                v-for="item in insuranceOptions"
                :key="item.insuranceId"
                :label="item.insuranceName"
                :value="item.insuranceId"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="方案名称"
            prop=""
          >
            <el-select
              v-model="params.b"
              placeholder="请选择"
              :remote-method="remoteMethod"
              style="width: 260px"
              :disabled="disabled "
              @change="handleSelect"
            >
              <el-option
                v-for="item in insuranceOptions"
                :key="item.insuranceId"
                :label="item.insuranceName"
                :value="item.insuranceId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="保单号" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
          <el-form-item label="保险期限" prop="" >
            <el-date-picker
              v-model="params.date"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              style="width: 260px"
            />
          </el-form-item>
          <el-form-item label="总保费" prop="" >
            <el-input v-model="params.d" style="width: 260px"  />
          </el-form-item>
          <el-form-item label="支付状态" prop="" >
            <el-radio-group v-model="params.f">
              <el-radio v-for="(item, index) in payMap" :key="index" :label="index">{{ item }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form-item>

        <el-form-item>
          <div style="margin-bottom:20px;">
            <div >投保信息</div>
          </div>
          <el-form-item label="投保人名称" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
          <el-form-item
            label="证件类型"
            prop=""
          >
            <el-select
              v-model="params.a"
              placeholder="请选择"
              :remote-method="remoteMethod"
              style="width: 260px"
              :disabled="disabled "
              @change="handleSelect"
            >
              <el-option
                v-for="item in insuranceOptions"
                :key="item.insuranceId"
                :label="item.insuranceName"
                :value="item.insuranceId"
              />
            </el-select>
          </el-form-item>
           <el-form-item label="证件号码" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
           <el-form-item label="联系电话" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
           <el-form-item label="被保险人地址" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
        </el-form-item>

        <el-form-item>
          <div style="margin-bottom:20px;">
            <div >被保险人信息</div>
          </div>
          <el-form-item label="被保险人名称" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
          <el-form-item
            label="证件类型"
            prop=""
          >
            <el-select
              v-model="params.a"
              placeholder="请选择"
              :remote-method="remoteMethod"
              style="width: 260px"
              :disabled="disabled "
              @change="handleSelect"
            >
              <el-option
                v-for="item in insuranceOptions"
                :key="item.insuranceId"
                :label="item.insuranceName"
                :value="item.insuranceId"
              />
            </el-select>
          </el-form-item>
           <el-form-item label="证件号码" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
           <el-form-item label="联系电话" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
           <el-form-item label="被保险人地址" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <div style="margin-bottom:20px;">
            <div >标的信息</div>
          </div>
          <el-form-item label="标的地址" prop="" >
            <el-input v-model="params.c" style="width: 260px"  />
          </el-form-item>
          <el-form-item  prop="underlying">
            <el-table
              style="width: 740px"
              :data="params.underlying"
              border
              fit
              highlight-current-row
              size="mini"
            >
              <el-table-column
                label="标的项目"
                align="center"
                prop=""
              >
                <template slot-scope="scope">
                  <input
                    v-model.trim="scope.row.washCount"
                    :min="0"
                    type="text"
                    style="width: 200px"
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="保险金额"
                align="center"
              >
               <template slot-scope="scope">
                  <input
                    v-model.trim="scope.row.washCount"
                    :min="0"
                    type="text"
                    style="width: 100px"
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="费率"
                align="center"
                prop=""
              >
               <template slot-scope="scope">
                  <input
                    v-model.trim="scope.row.washCount"
                    :min="0"
                    type="text"
                    style="width: 100px"
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="保费"
                align="center"
                prop=""
              >
               <template slot-scope="scope">
                  <input
                    v-model.trim="scope.row.washCount"
                    type="text"
                    style="width: 100px"                   
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="del(scope.$index)"
                  >删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <div><span></span> 添加标的项目</div>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <div style="margin-bottom:20px;">
            <div >承保方案</div>
          </div>
          <el-form-item label="承保模式" prop="" >
            <el-radio-group v-model="params.o">
              <el-radio v-for="(item, index) in guarantee" :key="index" :label="index">{{ item }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="选择共保方案/保险公司"
            prop=""
          >
            <el-select
              v-model="params.a"
              placeholder="请选择"
              :remote-method="remoteMethod"
              style="width: 260px"
              :disabled="disabled "
              @change="handleSelect"
            >
              <el-option
                v-for="item in bxcaseOptions"
                :key="item.bxcaseId"
                :label="item.bxcaseName"
                :value="item.bxcaseId"
              />
            </el-select>
        </el-form-item>
        <div>
          <p>中国太平洋财产保险股份有限公司杭州中心支公司 <span>60%</span></p>
          <p>太平科技保险股份有限公司浙江分公司 <span>40%</span></p>
        </div>
        </el-form-item>
        <div><el-button  type="primary" @click="catalogueOk"  size="small" >完成录单</el-button></div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'catalogue',
  components: {
  },
  props: {
    checkBuild: {
      type: String,
      default: '-1'
    },
    policyId: {
      type: String,
      default: '-1'
    }
  },
  data() {
    return {
      loading: false,
      disabled: false,
      params:{},
      insuranceOptions: [// 保单分类
        {insuranceId:'1',insuranceName:'测试'}
      ],
      payMap: ['已支付', '未支付'],
      guarantee: ['共保', '非共保'],
      bxcaseOptions: [],
      rules: {}
    }
  },

  created() {
  },
  methods: {
    catalogueOk() {

    },
    remoteMethod() {},
    handleSelect() {}
  }
}
</script>

<style lang="scss" scoped>
</style>

