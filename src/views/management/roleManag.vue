<template>
  <div class="roleManag-container">
    <div>
      <el-button
        type="primary"
        @click="addrole"
      >新增</el-button>
    </div>
    <div class="roleManag-mainBox">
      <el-table
        v-loading="listLoading"
        :data="roleList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >

        <el-table-column
          label="	角色名称"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column
          width="200"
          label="操作"
          align="center"
        >
          <template slot-scope="{row,$index}">
            <el-button
              size="mini"
              type="text"
              @click="modifyRole(row,$index)"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="selectRole(row,$index)"
            >选择资源</el-button>
            <el-button
              size="mini"
              type="text"
              style="color: #f55555"
              @click="deleteRole(row,$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹框-->
    <el-dialog
      width="480px"
      :visible.sync="dialogTableVisible"
      :title="dialogTitle"
      @dragDialog="handleDrag"
    >
      <div v-if="saveType != 3">
        <el-form
          ref="userManagItem"
          :model="userManagItem"
          label-width="120px"
        >
          <el-form-item
            label="角色名称"
            prop="roleName"
          >
            <el-input v-model="userManagItem.roleName" />
          </el-form-item>

          <el-form-item>
            <div class="app-btn-box ">
              <el-button
                type="primary"
                @click="addData()"
              >保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="saveType == 3">
        <el-tree
          ref="rootTree"
          :data="zyData"
          :props="defaultProps"
          node-key="id"
          show-checkbox
          highlight-current
          default-expand-all
          :default-checked-keys="checkedArr"
        />
        <div class="app-btn-box ">
          <el-button
            type="primary"
            @click="saveNode"
          >保存</el-button>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getroleList,
  delRole,
  modifyRole,
  addRole,
  menuForole,
  addMenuForole
} from '@/api/management'
export default {
  name: 'RoleManag',
  data() {
    return {
      title: '角色管理',
      roleList: [],
      listLoading: true,
      dialogTableVisible: false,
      dialogTitle: '新增用户',
      saveType: '1',
      roleId: '',
      zyData: [],
      defaultKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      userManagItem: {},
      checkedArr: [],
      page: 1
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取角色列表信息
    getList() {
      const data = {
        page: this.page
      }
      this.listLoading = true
      getroleList(data).then(response => {
        this.roleList = response.data
        this.listLoading = false
      })
    },
    // 新增角色
    addrole() {
      this.saveType = '1'
      this.userManagItem = {}
      this.$nextTick(() => {
        this.$refs['userManagItem'].clearValidate()
      })
      this.dialogTableVisible = true
      this.dialogTitle = '新增角色'
    },

    // 删除角色
    deleteRole(row, index) {
      const data = {
        roleId: row.roleId
      }
      this.$confirm('确定要删除么, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delRole(data).then(res => {
            this.$notify({
              title: 'Success',
              message: '成功删除角色',
              type: 'success',
              duration: 2000
            })
            this.roleList.splice(index, 1)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改角色
    modifyRole(row, index) {
      this.saveType = '2'
      this.dialogTableVisible = true
      this.dialogTitle = '修改角色'
      this.userManagItem = row
    },
    // 选择角色
    selectRole(row, index) {
      const self = this
      this.roleId = row.roleId
      const data = {
        roleId: row.roleId
      }
      this.saveType = '3'
      this.dialogTableVisible = true
      this.dialogTitle = '选择资源'
      this.checkedArr = []
      menuForole(data).then(res => {
        this.zyData = res.data
        setTimeout(function() {
          res.data.forEach((n, m) => {
            n.children.forEach((z, y) => {
              if (z.checked === true) {
                self.checkedArr.push(z.id)
              }
            })
          })
          self.$refs.rootTree.setCheckedKeys(self.checkedArr)
        }, 500)
      })
    },
    // 保存用户信息
    addData(formName) {
      this.$refs.userManagItem.validate(valid => {
        if (valid) {
          if (this.saveType === '1') {
            addRole(this.userManagItem).then(res => {
              this.dialogTableVisible = false
              this.getList()
              // console.log('addRole')
            })
          } else if (this.saveType === '2') {
            modifyRole(this.userManagItem).then(res => {
              this.dialogTableVisible = false
              this.getList()
            })
          }
        }
      })
    },
    handleDrag() {
      this.$refs.select.blur()
    },
    saveNode() {
      this.menuIds = [...this.$refs.rootTree.getCheckedKeys(), ...this.$refs.rootTree.getHalfCheckedKeys()].join(',')
      const data = {
        roleId: this.roleId, // 角色ID
        menuIds: this.menuIds
      }
      addMenuForole(data).then(res => {
        this.dialogTableVisible = false
        this.getList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.roleManag {
  &-container {
    margin: 5px;
    background: #fff;
    padding: 10px;
  }
  &-mainBox {
    margin-top: 15px;
  }
}
</style>
