<template>
  <div class="star" :class="`star-${size}`">
    <span
      class="star-item"
      v-for="(sc, index) in starClasses"
      :key="index"
      :class="sc"
    ></span>
  </div>
</template>

<script>
export default {
  props: ["size", "score"],
  data() {
    return {
      starClasses: [],
    }
  },
  created() {
    let halfStar = this.score % 1;
    let onStar = this.score / 1;
    let arr = new Array(5);
    arr.fill('on', 0, onStar);
    if (halfStar !== 0) {
      arr.fill('half', onStar, onStar + 1);
      onStar++;
    }
    arr.fill('off', onStar);
    this.starClasses = arr;
  },
};
</script>

<style lang="less">
.star {
  // 2x图 3x图
  display: inline-block;
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 0.2rem;
      height: 0.2rem;
      margin-right: 0.22rem;
      background-size: 0.2rem 0.2rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        background-image: url("./images/star48_on.png");
      }
      &.half {
        background-image: url("./images/star48_half.png");
      }
      &.off {
        background-image: url("./images/star48_off.png");
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 0.15rem;
      height: 0.15rem;
      margin-right: 0.06rem;
      background-size: 0.15rem 0.15rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        background-image: url("./images/star36_on.png");
      }
      &.half {
        background-image: url("./images/star36_half.png");
      }
      &.off {
        background-image: url("./images/star36_off.png");
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 0.2rem;
      height: 0.2rem;
      margin-right: 0.03rem;
      background-size: 0.2rem 0.2rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        background-image: url("./images/star24_on.png");
      }
      &.half {
        background-image: url("./images/star24_half.png");
      }
      &.off {
        background-image: url("./images/star24_off.png");
      }
    }
  }
}
</style>