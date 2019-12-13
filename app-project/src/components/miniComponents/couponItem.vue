<template>
  <div class="couponItem" v-if="data" @click="handleCouponClick">
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
        <span class="item-status" v-show="showStatus">{{getStatus()}}</span>
      </div>
      
      <van-divider :dashed="true"/>

      <div class="item-bottom">
        <span class="desc">{{data.dsecs}}</span>
        <span @click="handleBtnClick" class="btn" v-show="showBtn">领取</span>
        <span class="use-time" v-show="showUseTime">{{data.use_time}}使用</span>
      </div>

      <div class="selected-icon" v-show="select">
        <van-icon name="success" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponItem',
  props: {
    data: Object,
    showStatus: Boolean,
    showBtn: Boolean,
    selected: Boolean
  },
  data(){
    return {
      select: false
    }
  },
  computed:{
    showUseTime(){
      if(this.data.hasOwnProperty('use_time')){
        if(this.data.status == 1 && this.data.use_time.length > 0){
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
    },
    //优惠券点击选取
    handleCouponClick(){
      if(this.selected){
        this.select = true
        this.$emit('select')
      }
    },
    //领取按钮点击
    handleBtnClick(){
      this.$emit('get')
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
      position: relative
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

      .item-bottom
        display: flex
        justify-content: space-between
        align-items: center
        .desc
          color: #999
        .btn
          flex-shrink: 0
          padding: 1vw 3vw
          font-size: 3vw
          background-color: #FF5756
          color: #fff
          border-radius: 3vw
        .use-time
          color: #FF5756
          font-size: 3vw
          text-align: right
      .selected-icon
        width: 7vw
        height: 6vw
        position: absolute 
        z-index: 2
        right: 0
        top: 0
        background-color: #FF5756
        font-size: 5vw
        display: flex
        align-items: center
        justify-content: center
        border-bottom-left-radius: 3vw 
        .van-icon-success
          color: #fff
</style>