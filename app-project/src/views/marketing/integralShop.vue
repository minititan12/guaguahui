<template>
  <div class="intergral-wrapper">
    <van-nav-bar
      title="积分商城"
      left-arrow
      @click-left="handleBack"
    />
  </div>
</template>

<script>
export default {
  name: "IntergralShop",
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .intergral-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .intergral-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
</style>