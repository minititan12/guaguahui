<template>
  <div class="redemption-record-wrapper">
    <van-nav-bar
      title="兑换记录"
      left-arrow
      @click-left="handleBack"
    />
    <div class="list">
      <div @click="goRedemptionDetails" class="record">
        <div class="time">2019-11-20 13:20:13</div>
        <div class="content">
          <van-image
            width="20vw"
            height="20vw"
            fit="contain"
            src="https://gd3.alicdn.com/imgextra/i2/2012428513/O1CN01LXOQPf2Cl0GmofLEo_!!2012428513.png_400x400.jpg"
          />
          <div class="info">
            <div class="name">2019秋装新款纯棉复古浅色布落肩袖宽松牛仔外套女</div>
            <div class="attr">颜色：黑色    尺码：M</div>
            <div class="num">X1</div>
          </div>
          <div>
            <div class="deduction">-10积分</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RedemptionRecord",
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    goRedemptionDetails(){
      this.$router.push('/redemptionDetails');
    }
  }
}
</script>

<style lang="stylus" scoped>
  .redemption-record-wrapper
    background #f5f7fa
    .van-nav-bar
      .van-icon
        color #FF5756
        font-size 5vw
      .van-nav-bar__title
        color #000
        font-size 4vw
        font-family PFH
    .list
      .record
        background white
        margin 3vw
        border-radius 3vw
        padding 0 2vw
        .time
          font-size 3vw
          color #393939 
          font-family PFH
          height 9vw
          line-height 9vw
        .content
          display flex
          justify-content flex-start
          padding-bottom 3vw
          .van-image
            margin-right 2vw
          .info
            flex 1
            .name
              font-size 3.8vw
              font-family PFH
              line-height 4.6vw
              height 10vw
            .attr
              padding-bottom 1vw
              font-size 3vw
              color #999
              line-height 4.5vw
            .num
              font-size 3vw
              color #999
              line-height 4.5vw  
          .deduction
            color #ff5756
            font-family PFH
            width 18vw
            text-align center
            padding-top 4vw
</style>