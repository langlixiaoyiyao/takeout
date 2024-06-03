<template>
  <div class="shop_container">
    <div class="shop_list">
      <a
        class="shop_li"
        href="javascript:;"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="shop_left">
          <img class="shop_img" :src="item.image_path" />
        </div>
        <div class="shop_right">
          <div class="shop_detail_header">
            <h4 class="shop_title ellipsis">{{ item.name }}</h4>
            <ul
              class="shop_detail_ul"
            >
              <li class="supports" 
              v-for="surpport in item.supports"
              :key="surpport.name">{{ surpport.icon_name }}</li>
            </ul>
          </div>
          <div class="shop_rating_order">
            <div class="shop_rating_order_left">
              <div class="rating_section">{{ item.rating }}</div>
              <div class="order_section">月售{{ item.recent_order_num }}单</div>
              <star-icon :score="item.rating" :size="24" />
            </div>
            <div class="shop_rating_order_right">
              <span class="delivery_style delivery_right">{{
                item.delivery_mode.text
              }}</span>
            </div>
          </div>
          <div class="shop_distance">
            <p class="shop_delivery_msg">
              <span>¥{{ item.float_minimum_order_amount }}起送</span>
              <span class="segmentation"
                >/</span
              >
              <span>{{ item.piecewise_agent_fee.tips }}</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import StarIcon from '@/components/starIcon/StarIcon';
export default {
  props: ["data"],
  components: {
    StarIcon,
  }
};
</script>
<style lang="less">
.shop_container {
  .shop_list {
    .shop_li {
      border-bottom: 0.01rem solid #f1f1f1;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0.15rem 0;
      width: 100%;
      .shop_left {
        box-sizing: border-box;
        width: 2.4rem;
        height: 1.3rem;
        padding-right: 0.1rem;
        .shop_img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .shop_right {
        width: calc(100% - 2.4rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .shop_detail_header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .shop_title {
            color: #333;
            font-weight: 700;
            &::before {
              content: "品牌";
              display: inline-block;
              font-size: 0.24rem;
              color: #333;
              background-color: #ffd930;
              padding: 0.02rem 0.02rem;
              border-radius: 0.02rem;
              margin-right: 0.05rem;
            }
          }
          .shop_detail_ul {
            margin-top: 0.03rem;
            display: flex;
            align-items: center;
            .supports {
              font-size: 0.2rem;
              color: #999;
              border: 0.01rem solid #f1f1f1;
              padding: 0 0.02rem;
              border-radius: 0.02rem;
            }
          }
        }
        .shop_rating_order {
          width: 100%;
          margin-top: 0.18rem;
          margin-bottom: 0.08rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .shop_rating_order_left {
            color: #ff9a0d;
            display: flex;
            align-items: center;
            > .star {
              vertical-align: text-top;
            }
            .rating_section {
              font-size: 0.22rem;
              color: #ff6000;
              margin-left: 0.04rem;
            }
            .order_section {
              font-size: 0.22rem;
              color: #666;
              transform: scale(0.8);
            }
          }
          .shop_rating_order_right {
            float: right;
            font-size: 0;
            .delivery_style {
              transform-origin: 0.35rem 0;
              transform: scale(0.7);
              display: inline-block;
              font-size: 0.12rem;
              padding: 0.01rem;
              border-radius: 0.02rem;
            }
            .delivery_left {
              color: #fff;
              margin-right: -0.1rem;
              background-color: #02a774;
              border: 0.01rem solid #02a774;
            }
            .delivery_right {
              font-size: 0.22rem;
              color: #02a774;
              border: 0.01rem solid #02a774;
            }
          }
        }
        .shop_distance {
          width: 100%;
          font-size: 0.24rem;
          .shop_delivery_msg {
            display: flex;
            align-items: center;
            transform-origin: 0;
            transform: scale(0.9);
            color: #666;
          }
          .segmentation {
            color: #ccc;
          }
        }
      }
    }
  }
}
</style>