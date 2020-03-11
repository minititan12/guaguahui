<template>
  <div class="limitShopping-wrapper" v-show="showSeckill">
    <div class="limit-title">

      <div class="title-left">
        <div class="left-top">
          <van-image width="5vw" src="/public/static/seckill/seckill.png"/>
          <span class="title-big">限时秒杀</span>
        </div>
        <div class="left-bottom">
          <span class="title-small">限时好货 手慢无</span>
        </div>
      </div>

      <van-count-down :time="time" @finish="timeFinish">
        <template v-slot="timeData">
          <span class="item">{{ getTwoNumber(timeData.hours) }}</span>
          <span class="item-middle">:</span>
          <span class="item">{{ getTwoNumber(timeData.minutes) }}</span>
          <span class="item-middle">:</span>
          <span class="item">{{ getTwoNumber(timeData.seconds) }}</span>
        </template>
      </van-count-down>

      <div class="title-right" @click="handleTomore">
        <span>更多秒杀</span>
        <span class="iconfont">&#xe619;</span>
      </div>

    </div>

    <div class="limit-content">
      <div class="content-item" v-if="contentList" v-for="item of contentList" @click="handleToProduct(item)">
        <van-image class="item-img" width="100%" height="30vw" fit="contain" :src="item.cover_img"/>
        <span class="item-name">{{item.goods_name}}</span>
        <div class="item-bottom">
          <span class="item-price">￥{{item.seckill_price}}</span>
          <span class="item-origin">原价{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex';
export default {
  name: 'LimitShopping',
  props: {
    seckillData: Object
  },
  data(){
    return {
      time: 5000
    }
  },
  computed: {
    contentList(){
      if(this.seckillData){
        if(this.seckillData.hasOwnProperty('list')){
          return this.seckillData.list.val
        }else{
          return null
        }
      }else{
        return null
      }
    },
    showSeckill(){
      if(this.seckillData){
        if(this.seckillData.hasOwnProperty('list')){
          return true
        }else{
          return false
        }
      }else{
        return false
      }
    }
  },
  methods: {
    //获取倒计时时间
    getTime(){
      let t = new Date()
      let minutes = t.getMinutes()
      let result = (60 - minutes)*60*1000

      this.time = result
    },
    //获取两位数的时间表示
    getTwoNumber(num){
      if(num < 10){
        return '0' + num
      }else{ 
        return num
      }
    },
    //跳转到产品页面
    handleToProduct(data){
      this.$router.push({
        path: "/product",
        query: {
          id: data.goods_id,
          seckill_id: data.seckill_id
        }
      })
    },
    //跳转到更多秒杀
    handleTomore(){
      this.$router.push({
        path: '/limitBuy',
        query: {
          seckill_id: this.seckillData.seckill_id
        }
      })
    },
    //计时结束
    timeFinish(){
      console.log('timeOver')
      // this.$emit('timeFinish')
      this.getTime()
    }
  },

  created(){
    this.getTime()
  }
}
</script>

<style lang='stylus' scoped>
  .limitShopping-wrapper
    width: 93vw
    min-height: 50vw
    margin: 0 auto 
    padding: 2vw 1vw
    box-sizing: border-box
    background-color: #fff
    border-radius: 3vw
    margin-bottom: 3vw
    .limit-title
      width: 100%
      // height: 12vw
      display: flex
      align-items: center
      justify-content: space-between
      .title-left
        padding-left: 2vw
        .left-top
          display: flex
          align-items: center
          margin-bottom: 1vw
          .title-big
            font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
            font-weight: bold
            font-size: 5vw
            margin-left: 2vw
            letter-spacing: .2vw
        .left-bottom
          .title-small
            font-size: 3vw
            font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
            margin-left: 7vw
            color: #999
      .van-count-down
        .item
          display: inline-block
          width: 6vw
          height: 6vw
          line-height: 6vw
          background-color: #ff5756
          text-align: center
          color: #fff
          border-radius: 1vw
        .item-middle
          margin: 0 1vw
          font-size: 5vw
          color: #ff5756
      .title-right
        font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
        display: flex
        align-items: center
        font-size: 4vw
        color: #aaa
        .iconfont
          margin-left: 1vw
      
    .limit-content
      width: 100%
      display: flex
      justify-content: space-around
      margin-top: 2vw
      .content-item
        width: 30%
        display: flex
        flex-direction: column
        .item-img
          border: 1px solid #eee
          border-radius: 3vw
          overflow: hidden
        .item-name
          margin: 1vw 0
          font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
          font-weight: bold
          width: 100%
          height: 5vw
          font-size: 4vw
          line-height: 5vw
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 1
          /*! autoprefixer: off */
          -webkit-box-orient: vertical
          overflow: hidden
        .item-bottom
          width: 100%
          display: flex
          justify-content: space-between
          align-items: center
          margin: 1vw 0
          line-height: 4vw
          .item-price
            color: #ff5756
            font-size: 3.6vw
            font-family: hgzt
          .item-origin
            font-size: 2.8vw
            color: #999
</style>


