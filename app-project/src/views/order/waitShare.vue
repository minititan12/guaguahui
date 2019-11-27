<template>
  <div class="waitShare-wrapper">
    <van-nav-bar title="待分享" left-arrow @click-left="handleBack"/>
  </div>
</template>

<script>
export default {
  name: "WaitShare",
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .waitShare-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .waitShare-wrapper >>> .van-nav-bar__title
    font-size: 4vw
    font-family: PFH
    color: #000
</style>