<template>
    <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">外卖</h2>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div class="on">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" placeholder="密码" v-model="pwd" v-if="!showPassword">
                <input type="text" placeholder="密码" v-model="pwd" v-else>

                <div class="switch_button" :class="showPassword ? 'on' : 'off'"
                     @click="changePassWordType">
                  <div class="switch_circle" :class="{right: showPassword}"></div>
                  <span class="switch_text">{{showPassword?'abc':''}}</span>
                </div>

              </section>
            </section>
          </div>
          <input type="submit" value="登录" class="login_submit" />
        </form>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>
<script>
import Utils from '@/common/utils';
import Api from '@/common/api';
export default {
  data() {
    return {
      name: '',
      pwd: '',
      showPassword: false,
    }
  },
  methods: {
    login: Utils.debounce(async function() {
      const res = await Api.pwdLogin.post({
        name: this.name,
        pwd: this.pwd,
        captcha: '123',
      });
      if(res.code === 0) {
        this.$store.commit('updateUserInfo', {
          type: 'login',
          data: res.data || {}
        });
        if(this.$route.query.redirectUrl) {
          this.$router.replace(this.$route.query.redirectUrl);
        } else {
          this.$router.replace("/index");
        }
      }
    }, 300),
    changePassWordType() {
      this.showPassword = !this.showPassword;
    }
  },
  mounted() {
    this.$store.dispatch('delayUpdatePageState');
  }
};
</script>
<style lang="less" scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
  .loginInner {
    padding-top: 0.6rem;
    width: 80%;
    margin: 0 auto;
    .login_header {
      .login_logo {
        font-size: 0.4rem;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }
    }
    .login_content {
      > form {
        > div {
          display: none;
          &.on {
            display: block;
          }
          input {
            width: 100%;
            height: 100%;
            padding-left: 0.1rem;
            box-sizing: border-box;
            border: 0.01rem solid #ddd;
            border-radius: 0.04rem;
            outline: 0;
            font: 400 0.24rem Arial;
            &:focus {
              border: 0.01rem solid #02a774;
            }
          }
          .login_message {
            position: relative;
            margin-top: 0.16rem;
            height: 0.48rem;
            font-size: 0.24rem;
            background: #fff;
            .get_verification {
              position: absolute;
              top: 50%;
              right: 0.1rem;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 0.24rem;
              background: transparent;
              &.right_phone_number {
                color: #000;
              }
            }
          }
          .login_verification {
            position: relative;
            margin-top: 0.16rem;
            height: 0.48rem;
            font-size: 0.24rem;
            background: #fff;
            .switch_button {
              font-size: 0.22rem;
              border: 0.01rem solid #ddd;
              border-radius: 0.08rem;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 0.06rem;
              width: 0.3rem;
              height: 0.16rem;
              line-height: 0.16rem;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 0.1rem;
              transform: translateY(-50%);
              &.off {
                background: #fff;
                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }
              &.on {
                background: #02a774;
              }
              > .switch_circle {
                position: absolute;
                top: -0.01rem;
                left: -0.01rem;
                width: 0.16rem;
                height: 0.16rem;
                border: 0.01rem solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
                &.right {
                  transform: translateX(0.27rem);
                }
              }
            }
          }
          .login_hint {
            margin-top: 0.12rem;
            color: #999;
            font-size: 0.24rem;
            line-height: 0.2rem;
            > a {
              color: #02a774;
            }
          }
        }
        .login_submit {
          display: block;
          width: 100%;
          height: 0.42rem;
          margin-top: 0.3rem;
          border-radius: 0.04rem;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 0.26rem;
          line-height: 0.42rem;
          border: 0;
        }
      }
      .about_us {
        display: block;
        font-size: 0.22rem;
        margin-top: 0.2rem;
        text-align: center;
        color: #999;
      }
    }
    .go_back {
      position: absolute;
      top: 0.05rem;
      left: 0.05rem;
      width: 0.3rem;
      height: 0.3rem;
      > .iconfont {
        font-size: 0.24rem;
        color: #999;
      }
    }
  }
}
</style>