<template>
  <div class="coupon-wrapper">
    <van-nav-bar
      title="优惠劵"
      left-arrow
      @click-left="handleBack"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>

    <van-sticky>
      <van-tabs v-model="active" title-active-color="#FF5756">
        <van-tab title="全部"></van-tab>
        <van-tab title="未使用"></van-tab>
        <van-tab title="已使用"></van-tab>
        <van-tab title="已过期"></van-tab>
      </van-tabs>
    </van-sticky>
  </div>
</template>

<script>
export default {
  name: "Coupon",
  data(){
    return {
      active: 0
    }
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .coupon-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .coupon-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
  
  .coupon-wrapper >>> .van-icon-search
    font-size: 4.5vw
    color: #999

  .coupon-wrapper >>> .van-tabs__line
    background-color: #FF5756 

  .coupon-wrapper >>> .van-tab
    font-size: 3.5vw
    color: #000
    font-family: PFB
</style>