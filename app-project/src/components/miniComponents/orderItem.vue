<template>
  <div @click="goOrderDetails" class="oderItem" v-if="data">
    <div class="oderItem-shop">
      <div class="shop-left">
        <van-icon color="#B9B9B9" name="shop-o" />
        <span class="shop-name" @click.stop="handleToShop(data.goodsList[0].user_id_to)">{{data.goodsList[0].shop}}</span>
      </div>
    </div>

    <div :key="index" class="oderItem-content" v-for="(item,index) of data.goodsList">
      <div class="oderItem-img">
        <van-image
          width="25vw"
          height="25vw"
          fit="contain"
          :src="item.photo"
          style="-webkit-touch-callout: none"
        />
      </div>

      <div class="content-middle">
        <span class="oderItem-title">{{item.goods_name}}</span>
        <span class="oderItem-desc">{{getDesc(item)}}</span>
      </div>

      <div class="content-right">
        <span class="right-status">{{getStatusText(item.status)}}</span>
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
    // statusText: String,
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
    //获取对应商品的订单状态
    getStatusText(status){
      switch(status){
        case 0:
          return '待付款'
        case 1:
          return '待评价'
        case 2:
          return '待发货'
        case 3:
          return '待收货'
        case 5:
          return '待退款'
        case 6:
          return '待退货'
        case 8:
          return '交易关闭'
        case 9:
          return '已退款'
        case 10:
          return '订单完成'
        case 11:
          return '退款成功'
        default:
          return ''
      }
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
    margin: 3vw auto
    color: #000
    background-color: #fff
    border-radius: 3vw
    padding: 0 3vw
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
        .right-status
          font-family: PFH
          font-size: 3.5vw
          color: #FF5655
          margin-bottom: 1vw
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
      padding-bottom: 3vw
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