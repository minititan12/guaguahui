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
    <div class="main" v-if="orderData">
      <div class="goods">
        <van-image
          width="20vw"
          height="20vw"
          fit="contain"
          :src="orderData.sku_img"
        />
        <div class="content">
          <div class="name">{{orderData.goods_name}}</div>
          <div class="attr">{{getAttrDesc(orderData.sku)}}</div>
          <div class="num">x{{orderData.number}}</div>
        </div>
      </div>

      <div class="part">
        <div class="label">会员积分</div>
        <div class="result">{{orderData.order_money}}</div>
      </div>
      <div class="part">
        <div class="label">兑换时间</div>
        <div class="result">{{orderData.create_at}}</div>
      </div>
      <div class="part">
        <div class="label">兑换订单号</div>
        <div class="result">{{orderData.order_number}}</div>
      </div>
    </div>      
  </div>
</template>

<script>
export default {
  name: "RedemptionDetails",
  computed: {
    orderData(){
      if(this.$route.params){
        let data = JSON.parse(this.$route.params.data)
        return data
      }else{
        return null
      }
    },
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    goIntegralDetails(){
      this.$router.push('/integralDetails');
    },
    //获取属性描述
    getAttrDesc(obj){
      let strAry = []
      for(let key in obj){
        let str = key + ':' + obj[key]
        strAry.push(str)
      }

      return strAry.join()
    }
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
        font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight bold
    .head
      background #ff5756
      height 18vw
      padding-bottom 6vw
      display flex
      justify-content center
      align-items center
      color white
      font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
      font-weight bold
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
            font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
            font-weight bold
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