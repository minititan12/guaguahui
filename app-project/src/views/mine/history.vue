<template>
  <div class="history-wrapper">
    <van-nav-bar
      title="足迹"
      left-arrow
      @click-left="handleBack"
    >
      <div slot="right">
        <van-icon name="setting-o"/>
        <span class='right-text'>管理</span>
      </div>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "History",
  data(){
    return {
    }
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .history-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .history-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .history-wrapper >>> .van-nav-bar__text
    color: #444

  .history-wrapper >>> .van-icon-setting-o
    color: #666
    font-size: 5vw

  .history-wrapper >>> .right-text
    color: #666
    margin-left: 1vw
    font-size: 3.5vw
</style>