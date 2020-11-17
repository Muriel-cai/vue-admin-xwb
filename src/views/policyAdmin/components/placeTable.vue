<template>
  <div class="insuranceTo-container">
    <div class="main">
      <div class="insurBox">
        <el-table
          v-loading="listLoading"
          :data="insuranceData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="场所名称" prop="buildingName" align="center" width="200" />
          <el-table-column label="地址" prop="address" align="center" />
          <el-table-column label="区域编码" prop="regionCode" align="center" width="120" />
          <el-table-column label="添加时间" prop="insertTime" align="center" width="180" />
          <el-table-column label="更新时间" prop="lastTime" align="center" width="180" />
          <el-table-column width="80" label="操作" align="center" fixed="right">
            <template slot-scope="{row,$index}">
              <el-button
                v-if="row.bs == 1"
                size="mini"
                type="danger"
                @click="unBindPolicy(row,$index)"
              >解绑</el-button>
              <el-button v-else size="mini" type="success" @click="bindPolicy(row,$index)">绑定</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <pagination
            v-show="totalnum>0"
            :total="totalnum"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPlaceList } from '@/api/equipment'
import { bindPolicy, unBindPolicy } from '@/api/policy'
import pagination from '@/components/Pagination'
export default {
  name: 'InsuranceTo',
  components: {
    pagination
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
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      totalnum: 0,
      insuranceData: []
    }
  },

  created() {
    this.getList()
  },
  methods: {
    // 获取场所详情
    getList(option) {
      this.listQuery.policyId = option || this.policyId
      this.listLoading = true
      getPlaceList(this.listQuery).then(response => {
        console.log(response, '获取场所详情')
        this.insuranceData = response.data
        this.totalnum = response.total
        this.listLoading = false
      })
    },
    // checkBuilds(row, index) {
    //   const id = row.buildingId;
    //   console.log(id, "组件里的ID", row);
    //   this.$emit("checkBuild", id);
    // },
    // 绑定
    bindPolicy(row, index) {
      console.log(row.id, index, '解绑详情参数')
      const data = {
        policyId: this.policyId,
        placeId: row.id
      }
      bindPolicy(data).then(response => {
        console.log(response.code, '绑定详情')
        if (response.code === 200) {
          this.insuranceData[index].bs = true
        }
      })
    },
    // 解绑
    unBindPolicy(row, index) {
      const data = {
        policyId: this.policyId,
        placeId: row.id
      }
      unBindPolicy(data).then(response => {
        console.log(response, '解绑详情')
        if (response.code === 200) {
          this.insuranceData[index].bs = false
        }
      })
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
  .color_or {
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
  .rateBox {
    position: absolute;
    right: 10px;
  }
}
</style>

