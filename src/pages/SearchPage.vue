<template>
  <div class="page-common page-search">
    <header-top title="搜索" />
    <form class="search_form" @submit.prevent="search($event)">
      <input
        type="search"
        placeholder="请输入商家名称"
        class="search_input"
        v-model="keyword"
      />
      <input type="submit" class="search_submit" />
    </form>
    <div class="middle-container">
      <div class="list">
        <div class="list_container" v-if="goods.length > 0">
          <router-link to="/shop" class="list_li" v-for="(good, index) in goods" :key="index">
            <div class="item_left">
              <img :src="imgBaseUrl + good.image_path" alt="" class="restaurant_img">
            </div>
            <div class="item_right">
              <div class="item_right_text">
                <p>
                  <span>{{good.name}}</span>
                </p>
                <p>月售 {{good.month_sales||good.recent_order_num}} 单</p>
                <p>{{good.delivery_fee||good.float_minimum_order_amount}} 元起送 / 距离{{good.distance}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderTop from "@/components/HeaderTop.vue";
import Api from '@/common/api';
import Utils from '@/common/utils';
export default {
  data() {
    return {
      keyword: "",
      goods: [],
      imgBaseUrl: 'http://cangdu.org:8001/img/'
    };
  },
  components: {
    HeaderTop,
  },
  methods: {
    search: Utils.debounce(async function() {
      console.log("this", this);
      const res = await Api.searchGoods.get({
        geohash: `${this.$store.state.latitude},${this.$store.state.longitude}`,
        keyword: this.keyword,
      });
      this.goods = res.data || [];
    }, 300),
  },
  mounted() {
    this.$store.dispatch("delayUpdatePageState");
  },
};
</script>
<style lang="less" scoped>
.page-search {
  .search_form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.3rem;
    background-color: #fff;

    input {
      height: 0.6rem;
      padding: 0 0.3rem;
      border-radius: 2px;
      outline: none;
    }
    .search_input {
      width: calc(100% - 1.6rem - 0.3rem);
      border: 0.04rem solid #f2f2f2;
      font-size: 0.24rem;
      color: #333;
      background-color: #f2f2f2;
    }

    .search_submit {
      width: 1.6rem;
      text-align: center;
      line-height: 0.6rem;
      border: 0.04rem solid #02a774;
      font-size: 0.24rem;
      color: #fff;
      background-color: #02a774;
    }
  }
  .list {
    .list_container {
      background-color: #fff;
      .list_li {
        display: flex;
        justify-content: center;
        padding: 0.2rem;
        border-bottom: 0.01rem solid #ececec;
        .item_left {
          margin-right: 0.3rem;
          .restaurant_img {
            width: 0.8rem;
            height: 0.8rem;
            display: block;
          }
        }
        .item_right {
          font-size: 0.24rem;
          flex: 1;
          .item_right_text {
            p {
              margin-bottom: 0.2rem;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>