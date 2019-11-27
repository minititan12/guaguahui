<template>
  <div class="CutPrice-wrapper">
    <van-nav-bar
      title="疯狂砍价"
      left-arrow
      @click-left="handleBack"
    />
  </div>
</template>

<script>
export default {
  name: "CutPrice",
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .CutPrice-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .CutPrice-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
</style>