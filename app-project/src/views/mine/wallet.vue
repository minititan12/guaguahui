<template>
  <div class="wallet-wrapper">
    <van-nav-bar
      title="我的钱包"
      left-arrow
      @click-left="handleBack"
    />
  </div>
</template>

<script>
export default {
  name: "Wallet",
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wallet-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .wallet-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
</style>