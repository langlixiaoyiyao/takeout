<template>
  <div class="page-index page-common">
    <header-top title="首页">
      <template v-slot:search>
        <router-link class="header_search" to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </template>
      <template v-slot:login>
        <router-link class="header_login" :to="userInfo.data._id ? '/my' : '/login'">
          <span class="header_login_text" v-if="userInfo.type === 'unLogin'"
            >登录|注册</span
          >
          <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
          </span>
        </router-link>
      </template>
    </header-top>
    <!--首页导航-->
    <div class="msite_nav">
      <div class="container page-index-swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(sortItem, index) in sort"
            :key="index"
          >
            <a href="javascript:;" class="link_to_food">
              <div class="food_container">
                <img :src="imgBaseUrl + sortItem.image_url" />
              </div>
              <span>{{ sortItem.title }}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--首页附近商家-->
    <div class="msite_shop_list middle-container">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <!-- <ShopList /> -->
      <shop-list :data="business" />
    </div>
    <load-more ref="loadMoreRef" :onLoadMore="onLoadMore" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Swiper from "swiper";
import { Grid, Pagination } from "swiper/modules";
import HeaderTop from "@/components/HeaderTop.vue";
import LoadMore from '@/components/LoadMore.vue';
import ShopList from './components/ShopList.vue';
import Api from "@/common/api";
import Utils from "@/common/utils";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
export default {
  data() {
    return {
      sort: [],
      business: [],
      imgBaseUrl: "https://fuss10.elemecdn.com/",
      page: 1,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.login.userInfo,
    }),
  },
  components: {
    HeaderTop,
    ShopList,
    LoadMore,
  },
  methods: {
    async getShops() {
      const res = await Api.shops.get({
        latitude: this.$store.state.latitude,
        longitude: this.$store.state.longitude,
        page: this.page,
      });
      this.page++;
      return res;
    },
    async getData() {
      const results = await Utils.initSync([
        async (callback) => {
          const res = await Api.category.get();
          callback(res?.data || []);
        },
        async (callback) => {
          const res = await this.getShops();
          callback(res?.data || []);
        },
      ]);
      this.sort = results[0];
      this.business = results[1];
      this.$store.dispatch("delayUpdatePageState", true);
    },
    async onLoadMore() {
      const res = await this.getShops();
      if (res?.data?.length > 0) {
        const newArr = [...this.business, ...res.data];
        this.business = newArr;
      } else {
        this?.$refs?.loadMoreRef && this.$refs.loadMoreRef.loadEnd();
      }
    }
  },
  mounted() {
    new Swiper(".page-index-swiper", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      grid: {
        fill: "row",
        rows: 2,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      spaceBetween: 10,
      modules: [Grid, Pagination],
    });
    this.getData();
  },
};
</script>
<style lang="less" scoped>
.page-index {
  .msite_nav {
    padding: 0.4rem 0;
    border-bottom: 0.01rem solid #e4e4e4;
    background-color: #fff;
    width: 100%;
    position: relative;
    .page-index-swiper {
      overflow: hidden;
      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        .link_to_food {
          text-align: center;
          .food_container {
            img {
              max-width: 35%;
            }
          }
        }
      }
    }
    .swiper-pagination {
      bottom: 0.1rem;
      top: unset;
      > span.swiper-pagination-bullet-active {
        background: #02a774;
      }
    }
  }
  .msite_shop_list {
    border-top: 0.01rem solid #e4e4e4;
    margin-top: 0.3rem;
    background-color: #fff;
    .shop_header {
      padding: 0.1rem 0 0.1rem 0;
      .shop_icon {
        margin-left: 0.05rem;
        color: #999;
      }
      .shop_header_title {
        color: #999;
        font-size: 0.24rem;
      }
    }
  }
}
</style>