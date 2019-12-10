<template>
  <div class="limitBuy-content" >
    <div class="content-times" ref="contentTimes">
      <div ref="timeItems">
        <div class="time-item" v-for="item of timeList">
          <span class="time">{{item + ':00'}}</span>
          <span class="text">即将开抢</span>
        </div>
      </div>
    </div>

    <div class="goods-wrapper" ref="goods">
      <div>
        <div class="good-item" v-for="item of seckillGoodsList">
          <van-image class="item-img" width="25vw" height="25vw" :src="item.cover_img" fit="contain"/>
          <div class="item-right">
            <div class="item-name">{{item.goods_name}}</div>

            <van-progress class="item-progress" :percentage="66" color="#FFD57F" stroke-width="4vw"/>

            <div class="item-bottom">
              <div class="bottom-left">
                <span class="item-text">秒杀价</span>
                <div class="item-price">
                  <span class="price">￥{{item.seckill_price}}</span>
                  <span class="origin">原价:{{item.price}}</span>
                </div>
              </div>
              <div class="item-btn">
                <span>立即抢</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <div class="warn-wrapper" v-if="showWarn">
      <span class="iconfont">&#xe605;</span>
      <span class="warn-text">抱歉,没有处于抢购中的商品</span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import axios from 'axios'
export default {
  name: "LimitBuyContent",
  data(){
    return {
      showWarn: false,
      timeList: [],
      page: 1,
      seckillGoodsList:[]
    }
  },
  methods: {
    //获取时间列的长度
    getTimeItemsWidth(){
      let t = new Date()
      let hour = t.getHours()

      for(hour; hour < 24; hour++){
        if(hour < 10){
          let result = '0' + hour
          this.timeList.push(result)
        }else{
          this.timeList.push('' + hour)
        }
      }

      let width = this.timeList.length * 20
      this.$refs.timeItems.style.width = width + 'vw'
    },

    //初始化时间列的滚动
    initTimeScroll(){
      this.timeScroll = new BScroll(this.$refs.contentTimes,{
        startX:0,
        click:true,
        scrollX:true,
        scrollY:false,
        eventPassthrough:'vertical'
      })
    },
    getSeckillGoodsData(){
      let postData = {
        page: this.page,
        times: '17',
        seckill_id: this.$route.query.seckill_id
      }

      axios.post('api/method/getSeckillGoods',postData)
        .then((res)=>{
          console.log('getSeckillGoods',res.data)
          if(res.data.code == 1){
            this.seckillGoodsList = res.data.data.list
          }
        })
        .catch((err)=>{
          console.log('getSeckillGoods err',err)
        })
    }
  },
  created(){
    this.getSeckillGoodsData()
  },
  mounted(){
    this.getTimeItemsWidth()
    this.initTimeScroll()
  }
}
</script>

<style lang="stylus" scoped>
    .limitBuy-content >>> .van-progress__pivot
      line-height: 4vw
      // font-size: 3.5vw

    .limitBuy-content
      position: absolute 
      top: 46px
      bottom: 0
      left: 0
      right: 0
      background-color: #F6F7FB
      .content-times
        height: 12vw
        width: 100%
        background: linear-gradient(to bottom,#F02E2F,#FF7A35)
        overflow: hidden
        .time-item
          display: inline-flex
          height: 12vw
          width: 20vw
          text-align: center
          flex-direction: column
          justify-content: center
          .time
            font-family: hgzt
            font-size: 4.5vw
            margin-bottom: 1vw
            color: #FDE1D6
          .text
            font-family: PFM
            font-size: 3vw
            color: #FEB896

      .goods-wrapper
        position: absolute
        top: 12vw
        bottom: 0
        left: 0
        right: 0
        // background-color: red
        .good-item
          background-color: #fff
          width: 94vw
          margin: 3vw auto
          display: flex
          flex-direction: row
          justify-content: space-between
          padding: 2vw
          box-sizing: border-box
          font-family: PFH
          border-radius: 2vw
          // .item-img
          //   flex-shrink: 0
          .item-right
            width: 70%
            .item-name
              width: 100%
              height: 10vw
              font-size: 4vw
              letter-spacing: .2vw
              line-height: 5vw
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 2
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              overflow: hidden
            
            .item-progress
              border-radius: 4vw
              margin-top: 1vw

            .item-bottom
              display: flex
              flex-direction: row
              align-items: center
              justify-content: space-between
              margin-top: 3vw
              font-family: PFB
              .item-text
                display: block
                color: #999
                margin-bottom: 1vw
              .price
                color: #FF5756
                font-family: hgzt 
                font-size: 4.5vw
                margin-right: 2vw
              .origin
                color: #999
                font-size: 3vw
              .item-btn
                background-color: #FF5756
                padding: 2vw 3vw
                color: #fff
                border-radius: 4vw
                font-family: PFM


      .warn-wrapper
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        padding-top: 1rem
        .iconfont
          color: #666
          font-size: .8rem
          margin-bottom: .3rem
        .warn-text
          font-size: .35rem
</style>