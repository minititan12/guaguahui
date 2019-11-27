<template>
  <div class="icons-wrapper">
    <div class="icon-item" @click="handleToGoodActivity">
      <span class="iconfont icon1">&#xe633;</span>
      <span class="icon-text">活动精选</span>
    </div>

    <div class="icon-item" @click="handleToDealMessage">
      <span class="iconfont icon2">&#xe883;</span>
      <span class="icon-text">交易消息</span>
    </div>

    <div class="icon-item" @click="handleToSystemMessage">
      <span class="iconfont icon3">&#xe77c;</span>
      <span class="icon-text">系统消息</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageIcons",
  methods: {
    handleToGoodActivity(){
      this.$router.push({
        path: "/goodActivity"
      })
    },
    handleToDealMessage(){
      this.$router.push({
        path: "/dealMessage"
      })
    },
    handleToSystemMessage(){
      this.$router.push({
        path: "/systemMessage"
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .icons-wrapper
    width: 100%
    height: 12vw
    background-color: #fff
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    padding: .3rem 0
    .icon-item
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .iconfont
        color: #ff5756
      .icon1
        font-size: .7rem
        padding-bottom: .15rem
      .icon2
        font-size: .8rem
      .icon3
        font-size: .6rem
        padding-bottom: .14rem
        padding-top: .08rem
      .icon-text
        font-weight: bold
</style>