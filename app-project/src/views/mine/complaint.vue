<template>
  <div class="complaint-wrapper">
    <van-nav-bar
      title="投诉/举报"
      left-arrow
      @click-left="handleBack"
    />
  </div>
</template>

<script>
export default {
  name: "Complaint",
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .complaint-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .complaint-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
</style>