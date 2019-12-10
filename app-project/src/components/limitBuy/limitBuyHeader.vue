<template>
  <div class="limitBuy-header">
    <van-nav-bar title="限时抢购" left-arrow @click-left="handleBack"/>
  </div>
</template>

<script>
export default {
  name: "LimitBuyHeader",
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .limitBuy-header >>> .van-icon
    color: #FF5756
    font-size: 6vw
  .limitBuy-header >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
</style>