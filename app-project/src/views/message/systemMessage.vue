<template>
  <div class="systemMessage-wrapper">
    <van-nav-bar title="系统消息" left-arrow @click-left="handleBackClick"/>
  </div>
</template>

<script>
export default {
  name:"SystemMessage",
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .systemMessage-wrapper >>> .van-icon
    color: #E31436
    font-size: 20px

  .systemMessage-wrapper
    width: 100vw
    min-height: 100vh
    background-color: #eee
</style>