<template>
  <div class="oderItem" v-if="data">
    <div class="oderItem-shop">
      <!-- <span class="shop-text">店铺: </span> -->
      <van-icon color="#B9B9B9" name="shop-o" />
      <span class="shop-name" @click="handleShopClick">{{data.shop}}</span>
      <span class="shop-status">{{statusText}}</span>
    </div>

    <div class="oderItem-content">
      <div class="oderItem-img" @click= "handleImgClick">
        <van-image
          width="25vw"
          height="25vw"
          fit="contain"
          :src="data.imgUrl"
          style="-webkit-touch-callout: none"
        />
      </div>

      <div class="content-middle">
        <span class="oderItem-title" @click= "handleTitleClick">{{data.title}}</span>
        <span class="oderItem-desc">{{getDesc(data)}}</span>
      </div>

      <div class="content-right">
        <div>
          <span class="right-icon">￥</span>
          <span class="right-price">{{data.price}}</span>
        </div>
        <span class="right-number">x{{data.number}}</span>
      </div>
    </div>

    <div :class="noShow ? 'oderItem-bottom-end':'oderItem-bottom-be'">

      <!-- 底下按钮 -->
      <div class="bottom-btns">
        <van-button plain  class="bottom-del" type="danger" size="small" @click="handleDel" v-if="showDel">删除订单</van-button>

        <van-button plain  class="bottom-comment" type="warning" size="small" @click="handleComment" v-if="showComment">评价</van-button>

        <van-button plain v-if="showCancel"  class="bottom-cancel" type="warning" size="small" @click="handleCancel">取消订单</van-button>

        <van-button plain v-if="showConfirm"  class="bottom-confirm" type="primary" size="small" @click="handleConfirm">确认收货</van-button>

        <van-button plain v-if="showPay"  class="bottom-pay" type="primary" size="small" @click="handlePay">付款</van-button>

        <van-button plain v-if="showRefund"  class="bottom-refund" type="warning" size="small" @click="handleRefund">申请退款</van-button>

        <van-button plain v-if="showLogistics"  class="bottom-logistics" type="primary" size="small" @click="handleToLogistics">物流信息</van-button>
      </div>

      <!-- 底下价格数量描述 -->
      <div class="bottom-desc">
        <span class="bottom-number">共 {{data.number}} 件</span>
        <span class="bottom-text">小计:</span>
        <span class="bottom-icon">￥</span>
        <span class="bottom-price">{{data.totalPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayItem",
  props: {
    data: Object,
    showDel: Boolean,
    showComment: Boolean,
    showPay: Boolean,
    showCancel: Boolean,
    showConfirm: Boolean,
    noShow: Boolean,
    statusText: String,
    showRefund: Boolean,
    showLogistics: Boolean
  },
  methods: {
    //点击删除按钮
    handleDel(){
      this.$emit('del')
    },
    //点击取消按钮
    handleCancel(){
      this.$emit('cancel')
    },
    //点击评价按钮
    handleComment(){
      this.$emit('comment')
    },
    //点击支付按钮
    handlePay(){
      this.$emit('pay')
    },
    //点击退款按钮
    handleRefund(){
      this.$emit('refund')
    },
    //点击确认收货按钮
    handleConfirm(){
      this.$emit('confirm')
    },
    //点击物流信息按钮
    handleToLogistics(){
      this.$emit('logistics')
    },
    handleImgClick(){
      this.$emit('imgClick')
    },
    handleTitleClick(){
      this.$emit('titleClick')
    },
    handleShopClick(){
      this.$emit('shopClick')
    },
    //获取描述
    getDesc(data){
      let attr1Desc = ''
      let attr2Desc = ''
      let attr3Desc = ''
      if(data.hasOwnProperty('attr1_name') && data.attr1_value.length > 0 ){
        attr1Desc = data.attr1_name + ':' + data.attr1_value + " "
      }

      if(data.hasOwnProperty('attr2_name') && data.attr2_value.length > 0 ){
        attr2Desc = data.attr2_name + ':' + data.attr2_value + " "
      }

      if(data.hasOwnProperty('attr3_name') && data.attr3_value.length > 0 ){
        attr3Desc = data.attr3_name + ':' + data.attr3_value + " "
      }
      
      let desc = attr1Desc + attr2Desc + attr3Desc
      return desc
    }
  }
}
</script>

<style lang="stylus" scoped>
  .oderItem
    width: 94%
    font-family: PFB
    margin: .2rem auto
    color: #000
    background-color: #fff
    border-radius: .2rem
    padding: 0 .3rem
    box-sizing: border-box
    .oderItem-shop
      width: 100%
      line-height: 10vw
      display: flex
      align-items: center
      .van-icon-shop-o
        font-size: 5vw
        margin-right: 1vw
      .shop-name
        font-size: 4vw
      .shop-status
        float: right
        color: #E41436


    .oderItem-content
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-around
      .oderItem-img
        width: 25vw
        height: 25vw
        border-radius: 3vw
        overflow: hidden
        box-shadow: 0 0 2vw 1vw #eee
      .content-middle
        width: 50%
        font-size: 3.3vw
        display: flex
        margin-left: 2vw
        flex-direction: column
        align-items: flex-start
        .oderItem-title
          margin: 1vw 0
          color: #444
        .oderItem-desc
          font-family: PFM
          color: #B9B9B9
          margin-top: 3vw
      .content-right
        display: flex
        flex-direction: column
        align-items: flex-end
        // margin-top: 2vw
        .right-icon
          font-size: 3vw
        .right-price
          font-size: 3.5vw
          font-family: hgzt
        .right-number
          color: #B9B9B9
          font-family: PFM


    .oderItem-bottom-end
      line-height: 12vw
      display: flex
      flex-direction: row
      justify-content: flex-end
      align-items: center
      .bottom-btns
        height: 100%
        .bottom-del
          margin-right: 1vw
        .bottom-cancel
          margin-right: 1vw
        .bottom-comment
          margin-right: 1vw
        .bottom-confirm
          margin-right: 1vw
        .bottom-refund
          margin-right: 1vw
        .bottom-logistics
          margin-right: 1vw
      .bottom-desc
        .bottom-number
          font-size: 3vw
          margin-right: 2vw
        .bottom-icon
          font-size: 3vw
          padding-top: 1vw
          margin-left: 1vw
          color: #FE5655
        .bottom-price
          font-size: 4vw
          font-family: hgzt
          color: #FE5655


    .oderItem-bottom-be
      line-height: 14vw
      display: flex
      flex-direction: row
      justify-content: space-between
      padding-left: 1vw
      align-items: center
      .bottom-btns
        height: 100%
        .bottom-del
          margin-right: 1vw
        .bottom-cancel
          margin-right: 1vw
        .bottom-comment
          margin-right: 1vw
        .bottom-confirm
          margin-right: 1vw
        .bottom-refund
          margin-right: 1vw
        .bottom-logistics
          margin-right: 1vw
      .bottom-desc
        .bottom-number
          font-size: 3vw
          margin-right: 2vw
        .bottom-icon
          font-size: 2.5vw
          padding-top: 2vw
          margin-left: 2vw
          color: #FE5655
        .bottom-price
          font-size: 4vw
          font-family: hgzt
          color: #FE5655
</style>