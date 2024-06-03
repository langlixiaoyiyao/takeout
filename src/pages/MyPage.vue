<template>
  <div class="page-my page-common">
    <header-top title="我的" />
    <div class="profile-number">
      <router-link
        :to="userInfo.data._id ? '/userInfo' : {path: '/login', query: {redirectUrl: $route.fullPath,}}"
        class="profile-link"
      >
        <div class="profile_image">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top">
            {{ userInfo.data.name || "登录/注册" }}
          </p>
          <p v-if="userInfo == 'login'">
            <span class="user-icon">
              <i class="iconfont icon-shouji icon-mobile"></i>
            </span>
            <span class="icon-mobile-number">{{
              userInfo.phone || "暂无绑定手机号"
            }}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </div>
    <div class="profile_info_data">
      <div class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </div>
    </div>
    <div class="profile_my_order">
      <!-- 我的订单 -->
      <router-link to="/order" class="my_order">
        <span>
          <i class="iconfont icon-order-s"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </router-link>
    </div>
    <div class="profile_my_order border-1px" v-if="userInfo.type === 'login'">
      <button class="logout" @click="logout">退出登陆</button>
    </div>
  </div>
</template>
<script>
import HeaderTop from "@/components/HeaderTop.vue";
import Api from "@/common/api";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.login.userInfo,
    }),
  },
  components: {
    HeaderTop,
  },
  methods: {
    async init() {
      if (!(this.$store.state.login.userInfo.data?._id)) {
        await this.$store.dispatch("getUserInfo", {
          pass: true,
        });
      }
      this.$store.dispatch("delayUpdatePageState");
    },
    async logout() {
      const res = await Api.logout.get();
      if (res.code !== 1) {
        this.$store.commit("updateUserInfo", {
          type: "unLogin",
          data: {},
        });
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.page-my {
  //我的
  width: 100%;
  overflow: hidden;
  .profile-number {
    margin-top: 0.01rem;
    .profile-link {
      display: flex;
      position: relative;
      align-items: center;
      background: #02a774;
      padding: 0.2rem 0.3rem;
      .profile_image {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: top;
        .icon-person {
          background: #e4e4e4;
          font-size: 0.62rem;
        }
      }
      .user-info {
        margin-top: 0.08rem;
        margin-left: 0.15rem;
        p {
          font-weight: 700;
          font-size: 0.28rem;
          color: #fff;
          &.user-info-top {
            padding-bottom: 0.08rem;
          }
          .user-icon {
            display: inline-block;
            margin-left: -0.15rem;
            margin-right: 0.05rem;
            width: 0.2rem;
            height: 0.2rem;
            .icon-mobile {
              font-size: 0.3rem;
              vertical-align: text-top;
            }
          }
          .icon-mobile-number {
            font-size: 0.24rem;
            color: #fff;
          }
        }
      }
      .arrow {
        width: 0.12rem;
        height: 0.12rem;
        position: absolute;
        right: 0.15rem;
        top: 40%;
        .icon-jiantou1 {
          color: #fff;
          font-size: 0.05rem;
        }
      }
    }
  }
  .profile_info_data {
    border-bottom: 0.01rem solid #e4e4e4;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .info_data_list {
      display: flex;
      .info_data_link {
        float: left;
        width: 33%;
        text-align: center;
        border-right: 0.01rem solid #f1f1f1;
        .info_data_top {
          display: block;
          width: 100%;
          font-size: 0.24rem;
          color: #333;
          padding: 0.15rem 0.05rem 0.1rem;
          span {
            display: inline-block;
            font-size: 0.3rem;
            color: #f90;
            font-weight: 700;
            line-height: 0.3rem;
          }
        }
        .info_data_bottom {
          display: inline-block;
          font-size: 0.24rem;
          color: #666;
          font-weight: 400;
          padding-bottom: 0.1rem;
        }
      }
      .info_data_link:nth-of-type(2) {
        .info_data_top {
          span {
            color: #ff5f3e;
          }
        }
      }
      .info_data_link:nth-of-type(3) {
        border: 0;
        .info_data_top {
          span {
            color: #6ac20b;
          }
        }
      }
    }
  }
  .profile_my_order {
    border-top: 0.01rem solid #e4e4e4;
    margin-top: 0.1rem;
    background: #fff;
    .my_order {
      display: flex;
      align-items: center;
      padding-left: 0.15rem;
      > span {
        display: flex;
        align-items: center;
        width: 0.3rem;
        height: 0.3rem;
        > .iconfont {
          margin-left: -0.1rem;
          font-size: 0.3rem;
          .icon-order-s {
            color: #02a774;
          }
          .icon-jifen {
            color: #ff5f3e;
          }
          .icon-vip {
            color: #f90;
          }
          .icon-fuwu {
            color: #02a774;
          }
        }
      }
      .my_order_div {
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: 0.18rem 0.1rem 0.18rem 0;
        font-size: 0.26rem;
        color: #333;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
        }
        .my_order_icon {
          float: right;
          width: 0.2rem;
          height: 0.2rem;
          .icon-jiantou1 {
            color: #bbb;
            font-size: 0.2rem;
          }
        }
      }
    }
    .logout {
      width: 100%;
      padding: 0.1rem 0.3rem;
      background-color: red;
      color: #fff;
      border: none;
    }
  }
}
</style>