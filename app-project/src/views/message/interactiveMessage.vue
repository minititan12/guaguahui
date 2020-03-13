<template>
  <div class="page">
    <van-nav-bar
      title="互动消息"
      left-arrow
      @click-left="handleBack"
    />
    <MessageItems></MessageItems>
  </div>
</template>
<script>
import MessageItems from '@/components/home/message/content/messageItems'
export default {
  name: 'InteractiveMessage',
  components:{
    MessageItems
  },
  methods:{
    // 返回上一页
    handleBack(){
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="stylus" scoped>
  .page >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .page >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
  .van-nav-bar
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index 2!important
  .page
    width 100%
    height 100%
    padding-top 46px
    background-color #eee
    box-sizing border-box
</style>