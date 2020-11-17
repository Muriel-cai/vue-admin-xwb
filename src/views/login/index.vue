<template>
  <div class="login-container">
    <div class="loginBox">
      <div class="loginPic" :style="loginPic" />
      <div class="loginFrom">
        <div class="leftTitle">
          <h1>小微企业财产安全风控保险服务平台</h1>
          <p>Safety Liability Insurance Service Platform</p>
        </div>
        <div class="rightBox">

          <div class="rightPic">
            <h1>登陆</h1>
          </div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class=" setInput" auto-complete="on" label-position="left">

            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
            <el-button :loading="loading" type="warning" style="width:100%;height:50px;margin-bottom:30px;background:#F2864E" @click.native.prevent="handleLogin">登陆</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名称' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      loginPic: {
        backgroundImage: 'url(' + require('../../assets/img/loginBg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundPosition: 'bottom center'
      },
      rightPic: require('../../assets/img/icon_toubao.png')
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#666;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {

  .el-input {
    display: inline-block;

    height: 36px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 36px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(220,220,220,1);
    border-radius: 5px;
    color: #454545;
    font-size: 16px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
.loginBox {
  position: relative;
  height: 400px;
  margin: 0 auto;
  margin-top: 200px;
}
.loginPic {
  position: absolute;
  z-index: 1;
  background: #f2864e;
  width: 100%;
  height: 300px;
  top: 50px;
  left: 0;
  right: 0;
}
.loginFrom {
  position: relative;
  z-index: 5;
  width: 990px;
  height: 400px;
  // background: rgba(255, 255, 255, 1);
  margin: 0 auto;;

}
.leftTitle{
  width:590px;
  height: 400px;
  padding: 150px 0;
  float: left;
  h1{
    height:45px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:800;
    line-height:45px;
    color:rgba(255,255,255,1);
  }
  p{
    height:33px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:800;
    line-height:33px;
    color:rgba(255,255,255,1);
  }
}
.rightBox{
  width: 400px;
  height: 400px;
  float:right;
  background: #fff;;
   box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.16);
}
.rightPic {
  width: 400px;
  height: 100px;
  background: url("../../assets/img/icon_toubao.png") no-repeat top right;
  padding-top: 50px;

}
.rightPic h1 {
  height: 50px;
  text-align: left;
  font-size: 24px;
  color: #333;
  padding-left: 80px;
  background: url("../../assets/img/img_login_bj.png") no-repeat left 40px center;
  line-height: 50px;
}
.setInput {
  width: 400px;
  height: auto;
  padding: 20px 40px;
}
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
