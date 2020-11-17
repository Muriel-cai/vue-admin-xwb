<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <span
        class=" right-menu-item hover-effect "
        @click="openScreen"
      ><i class="el-icon-monitor icon" />查看大屏</span>
      <span class=" right-menu-item hover-effect "><i class="el-icon-user icon" />{{ name }}</span>
      <span
        class=" right-menu-item hover-effect "
        @click="logout"
      ><i class="el-icon-switch-button icon" />退出</span>
      <el-dialog
        width="100%"
        top="0px"
        fullscreen
        :visible.sync="dialogVisible"
        :show-close="showClose"
        :modal-append-to-body="true"
        custom-class="screenDio"
      >
        <screenIndex />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import screenIndex from '@/components/screen/screenIndex'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    screenIndex
  },
  provide() {
    return {
      fatherClose: this.fatherMethod
    }
  },
  data() {
    return {
      showClose: false,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    fatherMethod() {
      this.dialogVisible = false
    },
    openScreen() {
      console.log('查看大屏')
      this.dialogVisible = true
    }

  }
}
</script>

<style>
.screenDio .el-dialog__header {
  padding: 0px !important;
}
.screenDio .el-dialog__body {
  padding: 0px !important;
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  margin-bottom: 2px;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;
      .icon {
        display: inline-block;
        font-size: 16px;
        padding: 0 5px;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        cursor: pointer;
        .user-avatar {
          cursor: pointer;
          // width: 40px;
          // height: 40px;
          // border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
