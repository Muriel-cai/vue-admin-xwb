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
          <el-table-column label="通道名称" prop="channelName" align="center" />
          <el-table-column label="	安装时间" prop="installDate" align="center" />
          <el-table-column label="	操作" align="center" width="240">
            <template slot-scope="{row,$index}">
              <el-button
                v-if="row.deviceType == 1"
                size="mini"
                type="text"
                @click="checkVideo(row,$index)"
              >查看监控</el-button>
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
  </div>
</template>

<script>
import { getChannelList, getFlashVideo } from '@/api/equipment'
import pagination from '@/components/Pagination'
export default {
  name: 'InsuranceTo',
  components: {
    pagination
  },
  props: {
    deviceId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listLoading: true,
      param: {
        page: 1,
        limit: 20
      },
      totalnum: 0,
      insuranceData: []
    }
  },

  created() {
  },
  methods: {
    // 获取警情详情
    getList() {
      this.param.deviceId = this.deviceId
      this.listLoading = true
      getChannelList(this.param).then(response => {
        console.log(response, '获取通道详情')
        this.insuranceData = response.data
        this.totalnum = response.total
        this.listLoading = false
      })
    },
    // 查看视屏
    checkVideo(row, index) {
      getFlashVideo(row).then(res => {
        if (res.data.playUrl) {
          window.open(res.data.playUrl)
        } else {
          this.$message({
            type: 'info',
            message: '暂无视屏'
          })
        }
        //  window.location.href = res.data.playUrl
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

