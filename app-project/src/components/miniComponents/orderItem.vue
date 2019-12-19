<template>
  <div @click="goOrderDetails" class="oderItem" v-if="data">
    <div class="oderItem-shop">
      <div class="shop-left">
        <van-icon color="#B9B9B9" name="shop-o" />
        <span class="shop-name" @click="handleToShop(data.goodsList[0].user_id_to)">{{data.goodsList[0].shop}}</span>
      </div>
      <span class="shop-status">{{statusText}}</span>
    </div>

    <div :key="index" class="oderItem-content" v-for="(item,index) of data.goodsList">
      <div class="oderItem-img" @click.stop="handleToProduct(item.goods_id)">
        <van-image
          width="25vw"
          height="25vw"
          fit="contain"
          :src="item.photo"
          style="-webkit-touch-callout: none"
        />
      </div>

      <div class="content-middle">
        <span class="oderItem-title" @click.stop="handleToProduct(item.goods_id)">{{item.goods_name}}</span>
        <span class="oderItem-desc">{{getDesc(item)}}</span>
      </div>

      <div class="content-right">
        <div>
          <span class="right-icon">￥</span>
          <span class="right-price">{{item.amount}}</span>
        </div>
        <span class="right-number">x{{item.number}}</span>
      </div>
    </div>

    <div class='oderItem-bottom'>
      <!-- 底下价格数量描述 -->
      <div class="bottom-desc">
        <span class="bottom-number">共 {{getAllNumber()}} 件</span>
        <span class="bottom-text">小计:</span>
        <span class="bottom-icon">￥</span>
        <span class="bottom-price">{{getAllAmount()}}</span>
      </div>
    </div>

    <!-- 底下按钮 -->
    <div class="bottom-btns">
      <van-button class="bottom-del" type="danger" size="small" @click.stop="handleDel" v-if="showDel">删除订单</van-button>

      <van-button class="bottom-comment" type="warning" size="small" @click.stop="handleComment" v-if="showComment">评价</van-button>

      <van-button v-if="showCancel"  class="bottom-cancel" type="warning" size="small" @click.stop="handleCancel">取消订单</van-button>

      <van-button v-if="showConfirm"  class="bottom-confirm" type="primary" size="small" @click.stop="handleConfirm">确认收货</van-button>

      <van-button v-if="showPay"  class="bottom-pay" type="primary" size="small" @click.stop="handlePay">付款</van-button>

      <van-button v-if="showLogistics"  class="bottom-logistics" type="primary" size="small" @click.stop="handleToLogistics">物流信息</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderItem",
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
    // 跳转到订单详情
    goOrderDetails(){
      console.log(this.data);
      this.$router.push({
        path: "/orderDetails",
        query:{
          order_number:this.data.orderNumber
        }
      })  
    },
    //获取该订单总数量
    getAllNumber(){
      let result = 0
      if(this.data){
        for(let item of this.data.goodsList){
          result = result + parseInt(item.number)
        }
      }

      return result
    },
    //获取该订单总价格
    getAllAmount(){
      let result = 0

      if(this.data){
        for(let item of this.data.goodsList){
          result = result + parseInt(item.number)*parseFloat(item.amount)
        }
      }

      return result.toFixed(2)
    },
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
    //处理跳转到商店详情页面
    handleToShop(shopID){
      this.$router.push({
        path: '/shop',
        query: {
          shopID: shopID
        }
      })
    },
    //处理跳转到产品详情页面
    handleToProduct(id){
      this.$router.push({
        path: '/product',
        query: {
          id: id
        }
      })
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
      justify-content: space-between
      .shop-left
        display: flex
        flex-direction: row
        align-items: center
        .van-icon-shop-o
          font-size: 5vw
          margin-right: 1vw
        .shop-name
          font-size: 4vw
      .shop-status
        font-size: 3.8vw
        color: #FF5655


    .oderItem-content
      width: 100%
      margin-bottom: 2vw
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
        font-size: 3.5vw
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
        .right-icon
          font-size: 3vw
        .right-price
          font-size: 3.5vw
          font-family: hgzt
        .right-number
          color: #B9B9B9
          font-family: PFM

    .oderItem-bottom
      display: flex
      flex-direction: row
      justify-content: flex-end
      align-items: center
      .bottom-desc
        .bottom-number
          font-size: 3vw
          margin-right: 2vw
        .bottom-icon
          font-size: 2.5vw
          padding-top: 2vw
          margin-left: 2vw
          color: #FF5655
        .bottom-price
          font-size: 4vw
          font-family: hgzt
          color: #FF5655

    .bottom-btns
      height: 100%
      padding: 3vw 0
      display: flex
      justify-content: flex-end
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
</style>