<template>
  <div class="redemption-details-wrapper">
    <van-nav-bar
      title="订单详情"
      left-arrow
      @click-left="handleBack"
    />
    <div class="head">
      <van-image
        width="6vw"
        fit="contain"
        src="/public/static/integral/integral_submit.png"
      />
      <div>兑换成功</div>
    </div>  
    <div class="main">
      <div class="goods">
        <van-image
          width="20vw"
          height="20vw"
          fit="contain"
          src="public/uploads/goods_img/20191025/cff8de0f3229702082be7cb608ccb347.png"
        />
        <div class="content">
          <div class="name">2019秋装新款纯棉复古浅色纯棉复纯棉布落肩袖宽松牛仔外套女</div>
          <div class="attr">颜色：黑色    尺码：M</div>
          <div class="num">x1</div>
        </div>
      </div>

      <div class="part">
        <div class="label">会员积分</div>
        <div class="result">10</div>
      </div>
      <div class="part">
        <div class="label">兑换时间</div>
        <div class="result">2019-10-23 12:20:30</div>
      </div>
      <div class="part">
        <div class="label">兑换流水</div>
        <div class="result">1259895244552</div>
      </div>
    </div>      
  </div>
</template>

<script>
export default {
  name: "RedemptionDetails",
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    goIntegralDetails(){
      this.$router.push('/integralDetails');
    },
  }
}
</script>

<style lang="stylus" scoped>
  .redemption-details-wrapper
    background #f5f7fa
    .van-nav-bar
      .van-icon
        color #FF5756
        font-size 5vw
      .van-nav-bar__title
        color #000
        font-size 4vw
        font-family PFH
    .head
      background #ff5756
      height 18vw
      padding-bottom 6vw
      display flex
      justify-content center
      align-items center
      color white
      font-family PFH
      font-size 4vw
      .van-image
        margin-right 2vw
    .main
      width 95vw
      background-color white
      border-radius 3vw
      margin -6vw auto 0
      padding 3vw 2vw
      box-sizing border-box
      .goods
        display flex
        justify-content flex-start
        padding-bottom 2vw
        margin-bottom 2vw
        .van-image
          margin-right 2vw
        .content
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
      .part
        background-color white
        display flex
        justify-content space-between
        align-items center
        padding 2vw
        font-size 3.6vw
        .label
          color #767676
</style>