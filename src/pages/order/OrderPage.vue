<template>
  <div class="order-page page-common">
    <header-top title="订单列表" />
    <div class="middle-container">
      <div class="order_no_login" v-if="userInfo.type === 'unLogin'">
        <img src="./images/person.png" alt="" />
        <h3>登录后查看外卖订单</h3>
        <button @click="toLogin">立即登陆</button>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderTop from "@/components/HeaderTop.vue";
import { mapState } from "vuex";
export default {
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.login.userInfo,
    }),
  },
  methods: {
    init() {
      this.$store.dispatch("delayUpdatePageState");
    },
    toLogin() {
        this.$router.replace({
            path: '/login',
            query: {
                redirectUrl: this.$route.fullPath,
            }
        });
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.order-page {
  width: 100%;
  height: 100%;
  .order_no_login {
    padding-top: 1.4rem;
    width: calc(100% - 1rem);
    margin: 0 auto;
    text-align: center;
    > img {
      display: block;
      width: 100%;
      height: auto;
    }
    > h3 {
      padding: 0.3rem 0;
      font-size: 0.24rem;
      color: #6a6a6a;
    }
    > button {
      display: inline-block;
      background: #02a774;
      font-size: 0.24rem;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 0.05rem;
      padding: 0.1rem 0.2rem;
    }
  }
}
</style>