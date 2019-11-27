<template>
  <div class="activities-wrapper">
    <van-nav-bar
      title="精彩活动"
      left-arrow
      @click-left="handleBack"
    />
  </div>
</template>

<script>
export default {
  name: "Activities",
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .activities-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .activities-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
</style>