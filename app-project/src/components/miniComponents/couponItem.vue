<template>
  <div class="couponItem" v-if="data">
    <div class="item-img">
      <van-image width="100%" height="25vw" :src="getCouponImg()"/>
      <div class="img-content">
        <div class="price">
          <span class="icon">￥</span>
          <span class="text">{{data.value}}</span>
        </div>
        <div class="condition">满{{data.full}}元可用</div>
      </div>
    </div>

    <div class="item-right">
      <div class="right-top">
        <div class="top-left">
          <span class="item-title">{{data.title}}</span>
          <span class="item-time">{{getTime()}}</span>
        </div>
        <span class="item-status">{{getStatus()}}</span>
      </div>
      
      <van-divider :dashed="true"/>

      <span class="desc">{{data.dsecs}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponItem',
  props: {
    data: Object
  },
  methods: {
    //获取状态描述
    getStatus(){
      if(this.data.status == 0){
        return '未使用'
      }
      if(this.data.status == 1){
        return '已使用'
      }
      if(this.data.status == 2){
        return '已过期'
      }
    },
    //获取时间的yyyy-mm-dd格式
    getTimeOperate(time){
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      if(month < 10){
        month = '0' + month
      }
      let date = time.getDate()
      if(date < 10){
        date = '0' + date
      }

      let result = year + '.' + month + '.' + date

      return result
    },
    //获取优惠券时间
    getTime(){
      let start = new Date(this.data.start_time)
      let end = new Date(this.data.end_time)

      let startString = this.getTimeOperate(start)
      let endString = this.getTimeOperate(end)

      return startString + '-' + endString
    },
    //根据价格获取优惠劵的图片
    getCouponImg(){
      if(this.data.color == '1'){
        return "/public/static/coupon/icon_red.png"
      }

      if(this.data.color == '2'){
        return "/public/static/coupon/icon_green.png"
      }

      if(this.data.color == '3'){
        return "/public/static/coupon/icon_blue.png"
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .couponItem
    width: 94%
    margin: 3vw auto 
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
      justify-content: space-around
      color: #000
      font-family: PFM
      .right-top
        width: 100%
        display: flex
        flex-direction: row
        justify-content: space-between
        .top-left
          display: flex
          flex-direction: column
          .item-title
            font-size: 3.8vw
            letter-spacing: .2vw
            line-height: 4.5vw
            font-family: PFH
            margin-bottom: 2vw
          .item-time
            font-size: 3.2vw
        .item-status
          color: #FF5756
          font-family: PFB
          flex-shrink: 0
          margin-left: 2vw
      .van-divider
        margin: 2vw 0
      .desc
        color: #999
</style>