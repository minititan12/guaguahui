<template>
  <div class="goodActivity-wrapper">
    <van-nav-bar title="活动精选" left-arrow @click-left="handleBackClick"/>
  </div>
</template>

<script>
export default {
  name:"GoodActivity",
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .goodActivity-wrapper >>> .van-icon
    color: #E31436
    font-size: 20px
  .goodActivity-wrapper
    width: 100vw
    min-height: 100vh
    background-color: #eee
</style>