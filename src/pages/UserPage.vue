<template>
  <div class="page-common page-user">
    <header-top title="用户信息页面" />
    <div class="middle-container">
      <form @submit.prevent="submit">
        <div class="form-item">昵称: <input type="text" v-model="name" /></div>
        <button type="submit" class="submit-btn">提交</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import HeaderTop from "@/components/HeaderTop.vue";
import Utils from "@/common/utils";
import Api from "@/common/api";

export default {
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.login.userInfo,
    }),
  },
  components: {
    HeaderTop,
  },
  methods: {
    submit: Utils.debounce(async function () {
      const res = await Api.updateUser.post({
        name: this.name,
      });
      if (res.code === 0) {
        this.updateUserInfo({
          data: { ...this.userInfo.data, name: this.name },
        });
        this.$router.back();
      }
    }, 300),
    ...mapMutations(["updateUserInfo"]),
  },
  created() {
    this.name = this.userInfo.data.name;
  },
  mounted() {
    this.$store.dispatch("delayUpdatePageState");
  },
};
</script>
<style lang="less" scoped>
.page-user {
  .form-item {
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: calc(100% - 1.56rem);
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0 0.15rem;
      flex-grow: 0;
    }
  }
  .submit-btn {
    width: 100%;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    border: none;
    margin-top: 0.3rem;
    background-color: green;
    color: #fff;
  }
}
</style>