<template>
  <footer class="footer_guide">
    <router-link v-for="item in menu" :key="item.path" :to="item.path" replace class="guide_item" active-class="on">
      <span class="item_icon">
        <i class="iconfont" :class="item.icon"></i>
      </span>
      <span>{{item.text}}</span>
    </router-link>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          icon: "icon-waimai",
          text: "首页",
          path: "/index",
        },
        {
          icon: "icon-search",
          text: "搜索",
          path: "/search",
        },
        {
          icon: "icon-dingdan",
          text: "订单",
          path: "/order",
        },
        {
          icon: "icon-geren",
          text: "我的",
          path: "/my",
        },
      ],
    };
  },
  methods: {
    handleClick(path) {
      if (this.$route.path === path) return;
      this.$router.replace(path);
    },
  },
};
</script>
<style lang="less" >
.footer_guide {
  border-top: 0.01rem solid #e4e4e4;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: calc(100%);
  height: 0.9rem;
  display: flex;
  .guide_item {
    cursor: pointer;
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999999;
    &.on {
      color: #02a774;
    }
    span {
      font-size: 0.24rem;
      margin-top: 0.02rem;
      margin-bottom: 0.02rem;
      .iconfont {
        font-size: 0.24rem;
      }
    }
  }
}
</style>