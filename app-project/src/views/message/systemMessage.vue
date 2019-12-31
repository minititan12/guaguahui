<template>
  <div class="systemMessage-wrapper">
    <van-nav-bar title="系统消息列表" left-arrow @click-left="handleBackClick"/>
    <div class="systemMessage" ref="systemMessage">
      <div>
        <sysMessageList :messageList="messageList"></sysMessageList>
        <div class="pullUpLoading">
          <van-loading color="#FF5756" size="24px" v-show="showLoading  && messageList.length > 10">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
          <div class="no-more" v-show="!showLoading  && messageList.length > 10">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>没有更多了</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getMsgList} from '@/utils/axios/request'
import Bscroll from 'better-scroll'
import sysMessageList from '@/components/message/sysMessageList'
export default {
  name:"SystemMessage",
  data(){
    return {
      page: 1,
      showLoading: true,
      messageList:[],
    }
  },
  components:{
    sysMessageList
  },
  created(){
    this.getMessageList();
  },
  mounted(){
    this.initGroupScroll();
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    // 获取消息列表
    getMessageList(){
      getMsgList({
        flag:2,
        page:this.page
      }).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        if(res.data.data.length == 0){
          this.showLoading = false;
          this.systemMessage.closePullUp();
          return;
        }
        this.page++;
        this.messageList = [...this.messageList,...res.data.data,];
      }).catch(res=>{
      });
    },
    //初始化疯狂砍价滚动条
    initGroupScroll(){
      let el = this.$refs.systemMessage;
      this.systemMessage = new Bscroll(el,{
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

      this.systemMessage.on('beforeScrollStart',()=>{
        this.systemMessage.refresh()
      })

      this.systemMessage.on('pullingUp',()=>{
        this.getMessageList()
      })
    },
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

  .systemMessage
    position absolute
    top 46px
    left 0
    right 0
    bottom 0
    overflow hidden
    background #f6f7fb

  .pullUpLoading
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    .loading-img
      width: 6vw
      height: 5vw
      margin-right: 2vw
    .no-more
      height: 15vw
      line-height: 15vw
      font-family: PFH
      font-size: 4vw
</style>