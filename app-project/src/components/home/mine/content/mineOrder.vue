<template>
  <div class="order-wrapper">
    <div class="order-top">
      <span class="top-text">我的订单</span>
      <div class="order-right" @click="handleToOrderPage(-1)">
        <span class="right-text">全部订单</span>
        <span class="iconfont">&#xe619;</span>
      </div>
    </div>
    <div class="order-bottom">
      <div class="order-item" @click="handleToOrderPage(0)">
        <van-image 
          class="item-image" 
          width="7vw" 
          src="/images/dfk.png"
        />
        <span class="item-text">待付款</span>
        <span class="item-num" v-if="payment > 0">{{payment}}</span>
      </div>

      <div class="order-item" @click="handleToOrderPage(1)">
        <van-image 
          class="item-image" 
          width="7vw" 
          src="/images/dfh.png"
        />
        <span class="item-text">待发货</span>
        <span class="item-num" v-if="shipments > 0">{{shipments}}</span>
      </div>

      <div class="order-item" @click="handleToOrderPage(2)">
        <van-image 
          class="item-image" 
          width="7vw" 
          src="/images/dsh.png"
        />
        <span class="item-text">待收货</span>
        <span class="item-num" v-if="receiving > 0">{{receiving}}</span>
      </div>

      <!-- <div class="order-item" @click="handleToWaitShare">
        <van-image 
          class="item-image" 
          width="7vw" 
          src="/images/dfx.png"
        />
        <span class="item-text">待分享</span>
        <span class="item-num" v-if="false">{{receiving}}</span>
      </div> -->

      <div class="order-item" @click="handleToComment">
        <van-image 
          class="item-image" 
          width="7vw" 
          src="/images/pj.png"
        />
        <span class="item-text">评价</span>
      </div>

      <div class="order-item" @click="handleToRefund">
        <van-image 
          class="item-image" 
          width="7vw" 
          src="/images/sh.png"
        />
        <span class="item-text">退款/售后</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: "MineOrder",
  data(){
    return {
      payment: 0,
      shipments: 0,
      receiving: 0
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    handleToOrderPage(id){
      this.$router.push('/orderPage?orderID='+ id)
    },
    handleToComment(){
      this.$router.push({
        path: '/comment'
      })
    },
    handleToRefund(){
      this.$router.push({
        path: '/refund'
      })
    },
    // handleToWaitShare(){
    //   this.$router.push({
    //     path: '/waitShare'
    //   })
    // },
    initCount(){
      let postData = {
        user_id: this.userData.id
      }
      axios.post('api/method/count',postData)
        .then((res)=>{
          console.log('count',res.data)
          if(res.data.code == 1){
            this.payment = res.data.data.payment
            this.shipments = res.data.data.shipments
            this.receiving = res.data.data.receiving
          }
        })
        .catch((err)=>{
          console.log('count err',err)
        })
    }
  },
  mounted(){
    this.initCount()
  },
  activated(){
    this.initCount()
  }
}
</script>

<style lang="stylus" scoped>
  .order-wrapper
    width: 92vw
    min-height: 20vw
    background-color: #fff
    margin: 3vw auto 0 auto
    border-radius: 3vw
    box-sizing: border-box
    padding: 3vw
    .order-top
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      margin: 2vw 0
      .top-text
        font-family: PFH
        font-size: 4.5vw
      .order-right
        font-size: 3.5vw
        color: #A2A2A2
        display: flex
        align-items: center
        .right-text
          display: inline-block
        .iconfont
          display: inline-block
          color: #ff5756
          font-size: 4vw
          margin-left: 1vw
    .order-bottom
      display: flex
      flex-direction: row
      justify-content: space-around
      align-items: center
      padding: 3vw 0
      font-size: 3.5vw
      .order-item
        width: 16%
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        position: relative
        font-size: 3vw
        font-family: PFB
        .iconfont
          font-size: 7vw
          margin-bottom: 2vw
          color: #FD4140
        .item-image
          margin-bottom: 2vw
        .item-num
          position: absolute 
          right: -.5vw
          top: -.5vw
          background-color: #fff
          display: block
          line-height: 4vw
          width: 4vw
          height: 4vw
          border-radius: 4vw
          border: 1px solid #FD4140
          text-align: center
          font-family: hgzt 
          color: #FD4140
</style>


