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
    color: #E31436
    font-size: 20px
</style>