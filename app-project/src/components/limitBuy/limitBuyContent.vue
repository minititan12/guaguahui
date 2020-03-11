<template>
  <div class="limitBuy-content" >
    <div class="content-times" ref="contentTimes">
      <div ref="timeItems">
        <div class="time-item" v-for="item of timeList" @click="changeActive(item)">
          <span class="time">{{item + ':00'}}</span>
          <span :class="item == active ? 'active-text' : 'text'">{{item == timeList[0] ? '抢购中':'即将开抢'}}</span>
        </div>
      </div>
    </div>

    <div class="goods-wrapper" ref="goods">
      <div>
        
        <div class="blank"></div>

        <div class="good-item" v-for="item of seckillGoodsList" @click="handleToProduct(item)">
          <van-image class="item-img" width="25vw" height="25vw" :src="item.cover_img" fit="contain"/>

          <div class="item-right">
            <div class="item-name">{{item.goods_name}}</div>

            <van-progress class="item-progress" :percentage="getPercent(item)" color="#FFD57F" stroke-width="4vw"/>

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

        <div class="goodsList-loading" v-if="showLoading">
          <van-loading color="#FF5756" size="24px">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span class="loading-text">加载中...</span>
          </van-loading>
        </div>
        <div class="no-more" v-show="showNoMore">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span class="loading-text">没有更多了</span>
        </div>

      </div>
    </div>

    <div class="warn-wrapper" v-if="showWarn">
      <span class="iconfont">&#xe605;</span>
      <span class="warn-text">抱歉,当前时间没有可抢购的商品</span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import { getSeckillGoods } from '../../utils/axios/request'
export default {
  name: "LimitBuyContent",
  data(){
    return {
      timeList: [],
      page: 1,
      seckillGoodsList:[],
      active: '00',
      showLoading: false,
      showNoMore: false,
      showWarn: false,
    }
  },
  methods: {
    //获取百分比
    getPercent(data){
      let all_stock = parseInt(data.all_stock)
      let remaine_stock = parseInt(data.remaine_stock)
      let p = remaine_stock/all_stock*100
      let result = parseInt(p)

      return result
    },
    
    //获取时间列的长度
    getTimeItemsWidth(){
      let t = new Date()
      let hour = t.getHours()
      let timeList = []

      for(hour; hour < 24; hour++){
        if(hour < 10){
          let result = '0' + hour
          timeList.push(result)
        }else{
          timeList.push('' + hour)
        }
      }

      this.timeList = timeList
      this.active = timeList[0]

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

    //初始化商品列的滚动
    initGoodsScroll(){
      this.goodsScroll = new BScroll(this.$refs.goods,{
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        bounce: {
          top: false
        },
        click:true,
        eventPassthrough:'horizontal'
      })

      this.goodsScroll.on('pullingUp',()=>{
        console.log(this.goodsScroll)
        console.log('pulling up get')
        this.getSeckillGoodsData()
      })

      this.goodsScroll.on('beforeScrollStart',()=>{
        this.goodsScroll.refresh()
      })
    },

    //获取秒杀商品列表数据
    getSeckillGoodsData(type){
      let postData = {
        page: this.page,
        times: this.active,
        seckill_id: this.$route.query.seckill_id
      }

      getSeckillGoods(postData)
        .then((res)=>{
          console.log('getSeckillGoods',res.data)
          if(res.data.code == 1){
            if(res.data.data.list.length > 0){//请求到的列表不为空
              if(type == 'init'){
                this.seckillGoodsList = [...res.data.data.list]
              }else{
                this.seckillGoodsList = [...this.seckillGoodsList,...res.data.data.list]
              }

              this.$nextTick(()=>{
                if(this.goodsScroll){
                  this.goodsScroll.finishPullUp()
                  this.goodsScroll.refresh()
                }

                if(this.seckillGoodsList.length > 9){//秒杀商品列表数量大于9
                  this.page = this.page + 1
                  this.showLoading = true
                  this.showNoMore = false
                }else{//秒杀商品列表数量小于9
                  this.showLoading = false
                  this.showNoMore = true
                  if(this.goodsScroll){
                    this.goodsScroll.closePullUp()
                  }
                }
              })
            }else{//请求到的列表为空
              if(type == 'init'){
                this.showWarn = true
              }else{
                if(this.goodsScroll){
                  this.goodsScroll.closePullUp()
                }
                this.showLoading = false
                this.showNoMore = true
              }
            }
          }else{
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        })
        .catch((err)=>{
          console.log('getSeckillGoods err',err)
        })
    },

    //跳转到产品详情页
    handleToProduct(data){
      this.$router.push({
        path: '/product',
        query: {
          id: data.goods_id,
          seckill_id: data.seckill_id
        }
      })
    },

    //点击改变active
    changeActive(time){
      if(this.active != time){
        this.active = time
        this.page = 1
        this.showLoading = false
        this.showNoMore = false
        this.showWarn = false
        this.goodsScroll.closePullUp()
        this.seckillGoodsList = []
        console.log('active change get')
        this.getSeckillGoodsData('init')
      }
    }
  },
  mounted(){
    this.getTimeItemsWidth()
    this.getSeckillGoodsData('init')
    this.initTimeScroll()
    this.initGoodsScroll()
    // console.log(this.goodsScroll)
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
          flex-direction: column
          justify-content: center
          align-items: center
          text-align: center
          .time
            font-family: hgzt
            font-size: 4.5vw
            margin-bottom: 1vw
            color: #FDE1D6
          .text
            display: block
            width: 75%
            font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
            font-size: 3vw
            line-height: 4vw
            color: #FEB896
          .active-text
            display: block
            width: 75%
            font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
            font-size: 3vw
            line-height: 4vw
            color: red
            background-color: #fff
            border-radius: 2vw

      .goods-wrapper
        position: absolute
        top: 12vw
        bottom: 0
        left: 0
        right: 0
        overflow: hidden
        // background-color: red
        .blank
          width: 100%
          height: 3vw
        .goodsList-loading
          width: 100%
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          padding: 3vw 0
          font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
          font-weight: bold
          .loading-img
            width: 6vw
            margin-right: 2vw
        .no-more
          width: 100%
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          padding: 3vw 0
          font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
          font-weight: bold
          .loading-img
            width: 6vw
            margin-right: 2vw
            

        .good-item
          background-color: #fff
          width: 94vw
          margin: 3vw auto
          display: flex
          flex-direction: row
          justify-content: space-between
          padding: 2vw
          box-sizing: border-box
          font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
          font-weight: bold
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
              font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
              font-weight: bold
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
                font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif


      .warn-wrapper
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        padding-top: 15vw
        color: #999
        .iconfont
          font-size: 10vw
          margin-bottom: 5vw
        .warn-text
          font-size: 4vw
          font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
          font-weight: bold
</style>