<template>
  <div id="app">
    <div v-show="pageState && loginState">
      <router-view></router-view>
      <footer-guide />
    </div>
    <div class="loading_container" v-show="!pageState || !loginState">
      <vant-loading />
      <div class="loading_text">加载中</div>
    </div>
    <vant-popup v-model="errorMsg.show">
      <div class="error_popup">
        <div class="error_popup_text">{{ errorMsg.msg }}</div>
        <div class="confirm_error" @click="errorMsg.show = false">确定</div>
      </div>
    </vant-popup>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import FooterGuide from "@/components/FooterGuide.vue";
import VantLoading from "vant/lib/loading";
import VantPopup from "vant/lib/popup";
import Api from "@/common/api";
import "vant/lib/loading/style";
import "vant/lib/popup/style";
export default {
  name: "App",
  data() {
    return {
      show: false,
      errorMsg: {
        show: false,
        msg: "",
      },
      loginState: false,
    };
  },
  computed: {
    ...mapState(['pageState'])
  },
  components: {
    FooterGuide,
    VantLoading,
    VantPopup,
  },
  methods: {
    async init() {
      await this.$store.dispatch('getUserInfo', {pass: true});
      this.loginState = true;
    }
  },
  created() {
    Api.msgHandler = (msgInfo) => {
      this.errorMsg.msg = msgInfo;
      this.errorMsg.show = true;
    };
    
    this.init();
  },
  mounted() {
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  font-size: 0.26rem;
  .loading_container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .loading_text {
      margin-top: 0.4rem;
      font-size: 0.24rem;
      color: #666;
    }
  }
  .van-popup {
    width: 3.4rem;
    padding: 0.3rem;
    border-radius: 0.1rem;
    .error_popup {
      display: flex;
      flex-direction: column;
      align-items: center;
      .confirm_error {
        margin-top: 0.3rem;
        padding: 0.1rem 0.3rem;
        background-color: green;
        color: #fff;
        border-radius: 0.04rem;
        cursor: pointer;
      }
    }
  }
  .page-common {
    padding-top: 0.8rem;
    padding-bottom: 0.9rem;
  }
  .middle-container {
    padding: 0 0.3rem;
  }
}
</style>
