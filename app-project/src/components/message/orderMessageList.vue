<template>
  <div>
    <div @click="goOrderDetails(item)" class="msg" :key="item.id" v-for="item in messageList">
      <div class="head">
        <div class="title">{{item.title}}</div>
        <div class="time">{{item.add_time}}</div>
      </div>
      <div class="content">
        <van-image
          fit="contain"
          :src="item.cover_img"
        />
        <div class="info">
          <div class="name">{{item.goods_name}}</div>
          <div class="number">{{item.order_number}}</div>
        </div>
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
    goOrderDetails(item){
      readMsg({
        message_id:item.id
      }).then(res=>{

      }).catch(res=>{

      });
      this.$router.push({
        path: "/orderDetails",
        query:{
          order_number:item.order_number
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .msg
    margin 3vw
    background-color white
    border-radius 2vw
    padding 3vw 2vw
    .head
      display flex
      justify-content space-between
      align-items center
      height 6vw
      .title
        font-family PFH
        font-size 4.2vw
      .time
        font-family PFM
        font-size 3.2vw
    .content
      display flex
      justify-content flex-start
      padding-top 3vw
      .van-image
        width 20vw
        height 20vw
        margin-right 2vw
      .info
        flex 1
        .name
          font-family PFB
          height 14vw
          line-height 4.8vw
          font-size 3.8vw
        .number
          font-family PFM
          font-size 3.2vw
</style>