<template>
  <div>
    <div @click="goInteractiveMsg" class="msg">
      <van-image  
        src="/public/static/message/icon_chat.png" />
      <div class="content">
        <div class="title">互动消息</div>
        <div v-if='unReadServiceCount <= 0' class="message">暂无消息提醒</div>
      </div>
      <div class="unread">
        <div class="num" v-if='unReadServiceCount > 0' >{{unReadServiceCount}}</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div @click="goOrderMsg" class="msg">
      <van-image  
        src="/public/static/message/icon_order.png" />
      <div class="content">
        <div class="title">订单消息</div>
        <div class="message">查看订单消息</div>
      </div>
      <div class="unread">
        <div v-if="showOrderMsgCount" class="num">{{msgInfo[1].un_total}}</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div @click="goSystemMsg" class="msg">
      <van-image  
        src="/public/static/message/icon_system.png" />
      <div class="content">
        <div class="title">系统消息</div>
        <div class="message">赢50元豪礼,疯狂砍价进行中</div>
      </div>
      <div class="unread">
        <div v-if="showSystemMsgCount" class="num">{{msgInfo[0].un_total}}</div>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>
<script>
import {getMsgRedtotal} from '@/utils/axios/request'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'MessageWrapper',
  data(){
    return {
      msgInfo:null,
    }
  },
  computed: {
    ...mapState(['unReadServiceCount']),
    //订单未读消息计数
    showOrderMsgCount(){
      if(this.msgInfo){
        if(this.msgInfo.length > 1){
          if(this.msgInfo[1].un_total > 0){
            return true
          }
        }
      }

      return false
    },
    //系统未读消息计数
    showSystemMsgCount(){
      if(this.msgInfo){
        if(this.msgInfo.length){
          if(this.msgInfo[0].un_total > 0){
            return true
          }
        }
      }

      return false
    }
  },
  methods:{
    ...mapMutations(['updateUnread']),
    //获取消息数量
    getMsgRedtotal(){
      getMsgRedtotal().then(res=>{
        console.log('getMsgRedtotal',res.data)
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        this.msgInfo = res.data.data;
        this.updateUnread(res.data.data);
      }).catch(res=>{});
    },
    // 跳转到互动消息
    goInteractiveMsg(){
      this.$router.push({
        path: "/interactiveMessage"
      })
    },
    // 跳转订单消息列表
    goOrderMsg(){
      this.$router.push({
        path: "/orderMessage"
      })  
    },
    // 跳转系统消息
    goSystemMsg(){
      this.$router.push({
        path: "/systemMessage"
      })      
    }
  },
  created(){
    this.getMsgRedtotal();
  },
  activated(){
    this.getMsgRedtotal();
  },
}
</script>
<style lang="stylus" scoped>
  .msg
    background white
    margin 2.5vw
    border-radius 2vw
    display flex
    justify-content flex-start
    align-items center
    padding 2vw
    .van-image
      width 12vw
      height 12vw
      margin-right 3vw
    .content
      flex 1
      .title
        font-size 4.2vw
        line-height 5vw
        font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight bold
      .message
        font-size 3vw
        line-height 5vw
        color #999
        font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
    .unread
      display flex
      align-items center
      .num
        background #ff5756
        font-family hgzt
        color white
        border-radius 6vw
        line-height 6vw
        font-size 3vw
        padding 0 2vw
</style>