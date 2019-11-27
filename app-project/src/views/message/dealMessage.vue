<template>
  <div class="dealMessage-wrapper">
    <van-nav-bar title="交易消息" left-arrow @click-left="handleBackClick"/>
  </div>
</template>

<script>
export default {
  name:"DealMessage",
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dealMessage-wrapper >>> .van-icon
    color: #E31436
    font-size: 20px

  .dealMessage-wrapper
    width: 100vw
    min-height: 100vh
    background-color: #eee
</style>