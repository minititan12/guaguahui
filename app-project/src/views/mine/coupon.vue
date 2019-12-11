<template>
  <div class="coupon-wrapper">
    <van-nav-bar
      title="优惠劵"
      left-arrow
      @click-left="handleBack"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>

    <van-sticky>
      <van-tabs v-model="active" title-active-color="#FF5756">
        <van-tab title="全部"></van-tab>
        <van-tab title="未使用"></van-tab>
        <van-tab title="已使用"></van-tab>
        <van-tab title="已过期"></van-tab>
      </van-tabs>
    </van-sticky>

    <div class="coupon-items" ref="couponItems">
      <div>
        <div class="couponItem">
          <div class="item-img">
            <van-image width="100%" height="25vw" :src="getCouponImg(100)"/>
            <div class="img-content">
              <div class="price">
                <span class="icon">￥</span>
                <span class="text">100</span>
              </div>
              <div class="condition">满129元可用</div>
            </div>
          </div>

          <div class="item-right">
            <span class="right-title">仅可购买babycare旗舰店部分实体店商品</span>
            <span class="right-time">2019.11.08-2019.12.30</span>
            <van-divider :dashed="true"/>
            <span class="desc">请购买该商店商品后使用</span>
          </div>
        </div>

        <div class="couponItem">
          <div class="item-img">
            <van-image width="100%" height="25vw" :src="getCouponImg(200)"/>
            <div class="img-content">
              <div class="price">
                <span class="icon">￥</span>
                <span class="text">100</span>
              </div>
              <div class="condition">满129元可用</div>
            </div>
          </div>

          <div class="item-right">
            <span class="right-title">仅可购买babycare旗舰店部分实体店商品</span>
            <span class="right-time">2019.11.08-2019.12.30</span>
            <van-divider :dashed="true"/>
            <span class="desc">请购买该商店商品后使用</span>
          </div>
        </div>

        <div class="couponItem">
          <div class="item-img">
            <van-image width="100%" height="25vw" :src="getCouponImg(300)"/>
            <div class="img-content">
              <div class="price">
                <span class="icon">￥</span>
                <span class="text">100</span>
              </div>
              <div class="condition">满129元可用</div>
            </div>
          </div>

          <div class="item-right">
            <span class="right-title">仅可购买babycare旗舰店部分实体店商品</span>
            <span class="right-time">2019.11.08-2019.12.30</span>
            <van-divider :dashed="true"/>
            <span class="desc">请购买该商店商品后使用</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Coupon",
  data(){
    return {
      active: 0
    }
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    //初始化优惠券列表滚动
    initCouponScroll(){
      this.couponScroll = new BScroll(this.$refs.couponItems,{
        bounce: {
          top: false
        },
        click:true,
        eventPassthrough:'horizontal'
      })

      this.couponScroll.on('beforeScrollStart',()=>{
        this.couponScroll.refresh()
      })
    },
    getCouponImg(num){
      if(num <= 100){
        return "/public/static/coupon/icon_red.png"
      }

      if(num > 100 && num <=200 ){
        return "/public/static/coupon/icon_green.png"
      }

      if(num > 200){
        return "/public/static/coupon/icon_blue.png"
      }
    }
  },
  mounted(){
    this.initCouponScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .coupon-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .coupon-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
  
  .coupon-wrapper >>> .van-icon-search
    font-size: 4.5vw
    color: #999

  .coupon-wrapper >>> .van-tabs__line
    background-color: #FF5756 

  .coupon-wrapper >>> .van-tab
    font-size: 3.5vw
    color: #000
    font-family: PFB
  
  .coupon-wrapper
    width: 100%
    .coupon-items
      position: absolute 
      top: 90px
      bottom: 0
      left: 0
      right: 0
      background-color: #F6F7FB
      overflow: hidden
      .couponItem
        width: 94%
        margin: 2vw auto 
        background-color: #fff
        padding: 2vw
        box-sizing: border-box
        border-radius: 2vw
        display: flex
        flex-direction: row

        .item-img
          width: 25vw
          position: relative
          .img-content
            position: absolute 
            top: 0
            left: 0
            right: 0
            bottom: 0
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            color: #fff
            .price
              font-size: 5vw
              font-family: hgzt
              margin-bottom: 2vw
              letter-spacing: 0
              .text
                font-size: 9vw
            .condition
              font-family: PFM
              font-size: 3.2vw

        .item-right
          width: calc(100% - 25vw)
          height: 25vw
          // background-color: green
          box-sizing: border-box
          border-top: 1px solid #eee
          border-right: 1px solid #eee
          border-bottom: 1px solid #eee
          padding: 2vw 3vw
          box-sizing: border-box
          display: flex
          flex-direction: column
          color: #000
          font-family: PFM
          .right-title
            font-size: 3.8vw
            letter-spacing: .2vw
            line-height: 4.5vw
            font-family: PFH
            margin-bottom: 1vw
          .right-time
            font-size: 3.2vw
          .van-divider
            margin: 2vw 0
          .desc
            color: #999
</style>