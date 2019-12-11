<template>
  <div>
    <div @click="goSysMsgDetails(item)" class="msg" :key="item.id" v-for="item in messageList">
      <div class="head"><div class="time">{{item.add_time}}</div></div>
      <div class="content">
        <div class="title">{{item.title}}</div>
        <div class="desc">{{item.subtitle}}</div>
      </div>
    </div>    
  </div>
</template>
<script>
import {readMsg} from '@/utils/axios/request'
export default {
  props:{
    messageList:Array
  },
  methods:{
    goSysMsgDetails(item){
      readMsg({
        message_id:item.id
      }).then(res=>{

      }).catch(res=>{

      });
      this.$router.push({
        name: "sysMsgDetails",
        params:item
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .msg
    .head
      display flex
      margin 4vw 0
      justify-content center
      .time
        text-align center
        background-color #ccc
        color white
        line-height 6vw
        font-size 3vw
        padding 0 4vw
        border-radius 3vw
    .content
      background-color white
      margin 0 3vw
      padding 0 2vw
      border-radius 2vw
      .title
        font-size 4.2vw
        font-family PFH
        line-height 10vw
        border-bottom 1px solid #eee
      .desc
        padding 3vw 0
        font-size 3.4vw
        color #999
        line-height 4.2vw
        font-family PFM
</style>