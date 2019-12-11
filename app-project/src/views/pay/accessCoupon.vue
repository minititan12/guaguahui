<template>
  <div class="accessCoupon-wrapper">
    <van-nav-bar class="accessCoupon-header" title="可用优惠劵" left-arrow @click-left="handleBackClick"/>
  </div>
</template>

<script>
export default {
  name: "AccessCoupon",
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .accessCoupon-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .accessCoupon-wrapper >>> .van-nav-bar__title
    font-size: 4vw
    font-family: PFH
    color: #000
</style>