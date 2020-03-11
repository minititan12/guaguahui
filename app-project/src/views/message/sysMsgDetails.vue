<template>
  <div class="msg-details-wrapper">
    <van-nav-bar title="消息详情" left-arrow @click-left="handleBackClick"/>
    <div class="details" ref="details">
      <div>
        <div class="title">{{msgDetails.title}}</div>
        <div class="time">{{msgDetails.add_time}}</div>
        <div class="content" v-html="msgDetails.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
export default {
  data(){
    return {
      msgDetails:{}
    }
  },
  created(){
    this.msgDetails = this.$route.params
  },
  mounted(){
    this.initGroupScroll();
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    //初始化疯狂砍价滚动条
    initGroupScroll(){
      let el = this.$refs.details;
      this.details = new Bscroll(el,{
        bounce: {
          top: false
        },
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        click: true,
        // eventPassthrough: 'horizontal'
      })

      this.details.on('beforeScrollStart',()=>{
        this.details.refresh()
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
  .msg-details-wrapper >>> .van-icon
    color: #E31436
    font-size: 20px

  .details
    position absolute
    top 46px
    left 0
    right 0
    bottom 0
    overflow hidden
    padding 0 3vw
    .title
      font-size 5vw
      font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
      font-weight bold
      text-align center
      line-height 12vw
    .time
      text-align center
      font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
      font-size 3.6vw
      color #999
      line-height 10vw
      border-bottom 1px solid #eee
    .content
      padding 3vw 0
</style>