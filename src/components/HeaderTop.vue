<template>
  <header class="header">
    <slot name="search"></slot>
    <div class="header_title">
      <span class="header_title_text ellipsis">{{ title }}</span>
    </div>
    <slot name="login"></slot>
  </header>
</template>

<script>
export default {
  props: ["title"],
}
</script>

<style lang="less">
.header {
  background-color: #02a774;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 0.8rem;
  .header_search {
    position: absolute;
    left: 0.15rem;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    .icon-sousuo {
        margin-top: 0.1rem;
      font-size: 0.25rem;
      color: #fff;
    }
  }
  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #fff;
    text-align: center;
    .header_title_text {
      font-size: 0.24rem;
      color: #fff;
      display: block;
    }
  }
  .header_login {
    font-size: 0.24rem;
    color: #fff;
    position: absolute;
    right: 0.15rem;
    top: 50%;
    transform: translateY(-50%);
    .header_login_text {
      color: #fff;
    }
  }
}
</style>