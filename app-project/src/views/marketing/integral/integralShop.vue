<template>
  <div class="intergral-wrapper">
    <van-nav-bar
      title="我的积分"
      right-text="兑换记录"
      left-arrow
      @click-right="goRedemptionRecord"
      @click-left="handleBack"
    />
    <div class="head">
      <div class="label">当前积分</div>
      <div class="integral">505</div>
      <div class="tip">积分当钱花，天天都能省！</div>
      <div class="details" @click="goIntegralDetails">积分明细</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntergralShop",
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    goRedemptionRecord(){
      this.$router.push('/redemptionRecord');
    },
    goIntegralDetails(){
      this.$router.push('/integralDetails');
    }
  }
}
</script>

<style lang="stylus" scoped>
  .intergral-wrapper
    background #f5f7fa
    .van-nav-bar
      .van-icon
        color #FF5756
        font-size 5vw
      .van-nav-bar__title
        color #000
        font-size 4vw
        font-family PFH
      .van-nav-bar__text
        font-size 3vw
        color black
    .head
      height 43vw
      position relative
      background-image url('/public/static/integral/integral_bg.png')
      background-size 100% 100%
      .details
        position absolute
        right 9vw
        top 14vw
        background #f1f1f1
        font-size 3vw 
        color #5b5b5b
        font-family PFM
        height 7vw
        line-height 7vw
        border-radius 3.5vw
        padding 0 3vw
      .label
        font-size 4vw
        color #686868
        position absolute
        left 9vw
        top 9vw
      .integral
        font-size 9vw
        position absolute
        left 9vw
        top 17vw
      .tip
        font-size 3vw
        color #9e9e9e
        position absolute
        left 9vw
        top 28vw
</style>