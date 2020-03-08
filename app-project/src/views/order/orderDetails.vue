<template>
  <div class="order-details-wrapper">
    <div :class="statusClass" class="order-status">
      <van-icon @click="handleBack"  color="#fff" name="arrow-left" />
      <div class="status">{{statusText}}</div>
    </div>

    <!-- 物流信息 -->
    <div @click="gooLogistics" v-if="showLogistics" class="logisticsInfo">
      <van-image width="6vw" height="6vw" fit="contain" src="/public/static/order/icon_car@2x.png" />
      <div class="content">
        <div class="detials">{{logisticsInfo.context}}</div>
        <div class="time">{{logisticsInfo.time}}</div>
      </div>
      <van-icon name="arrow" />
    </div>

    <!-- 地址信息 -->
    <div v-if="order.address" class="address-info">
      <van-image width="6vw" height="6vw" fit="contain" src="/public/static/order/icon_site@2x.png" />
      <div class="content">
        <div class="info">
          <div class="name">收货人：{{order.address.buyer_name}}</div>
          <div class="phone">{{order.address.buyer_phone}}</div>
        </div>
        <div class="address">收货地址：{{order.address.buyer_address}}</div>
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="goods-info">
      <div @click="goDetails(item)" class="goods" :key="index" v-for="(item,index) in order.goods_info">
        <van-image
          width="20vw"
          height="20vw"
          fit="contain"
          :src="item.cover_img"
        />
        <div class="content">
          <div class="top">
            <div class="name">{{item.goods_name}}</div>
            <div v-if="order.order_status == 0" class="goods-status">{{getGoodsStatus(item.status)}}</div>
          </div>
          <div class="desc">{{getDesc(item)}}</div>
          <div class="details">
            <div>x{{item.number}}</div>
            <div>￥{{item.price}}</div>
          </div>

          <div class="btns">
            <div v-if="showWaitReceive(item.status)" @click.stop="confirmOrder" class="btn">确认收货</div>
            <div v-if="showWaitReceive(item.status)" @click.stop="gooLogistics" class="btn">物流信息</div>
            <div v-if="item.status == 2 || item.status == 3" @click.stop="refundOrder(item.goods_attr_id)" class="btn">申请退款</div>
          </div>
        </div>
      </div>

      <div v-if="order.discount > 0" class="part">
        <div>优惠</div>
        <div>￥{{order.discount}}</div>
      </div>
      <div class="part">
        <div>合计</div>
        <div class="price">￥{{order.money}}</div>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="order-info">
      <div class="item">
        <div class="label">订单编号</div>
        <div class="value">{{order.order_number}}</div>
      </div>
      <div v-if="order.discount > 0" class="item">
        <div class="label">优惠金额</div>
        <div class="value">￥{{order.discount}}</div>
      </div>
      <div class="item">
        <div class="label">下单时间</div>
        <div class="value">{{order.add_time}}</div>
      </div>
      <div v-if="order.pay_time" class="item">
        <div class="label">付款时间</div>
        <div class="value">{{order.pay_time}}</div>
      </div>
    </div>

    <!-- 待付款 -->
    <div v-if="showFooterButton('waitPay')" class="order-footer">
      <div @click="cancelOrder" class="cancel double">取消订单</div>
      <div @click="payOrder" class="pay double">付款</div>
    </div>
    <!-- 订单已取消 -->
    <div v-if="showFooterButton('delete')" class="order-footer">
      <div @click="delOrder" class="delete single">删除订单</div>
    </div>
    <!-- 待收货 -->
    <div v-if="showFooterButton('confirm')" class="order-footer">
      <div @click="confirmOrder" class="confirm single">确认收货</div>
    </div>
    <!-- 待评价 -->
    <div v-if="showFooterButton('evaluation')" class="order-footer">
      <div @click="evaluationOrder" class="evaluation single">评价</div>
    </div>
  </div>
</template>
<script>
import {orderDetail,cancelOrder,delOrder,receipt,logisticsDetails} from '@/utils/axios/request'
import { mapMutations } from 'vuex'
export default {
  name: 'OrderDetails',
  data(){
    return {
      // 订单号
      order_number:"",
      // 订单详情
      order:{},
      // 物流消息
      logisticsInfo:null
    }
  },
  computed: {
    statusText(){
      if(this.order.order_status == 1){
        switch(this.order.goods_info[0].status){
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
      }else{
        return ''
      }
    },
    statusClass(){
      if(this.order.order_status == 1){
        switch(this.order.goods_info[0].status){
          case 0:
            return 'unpaid'
          case 1:
            return '待评价'
          case 2:
            return 'wait-ship'
          case 3:
            return 'wait-receipt'
          case 5:
            return '待退款'
          case 8:
            return 'close'
          case 9:
            return '已退款'
          case 10:
            return 'complete'
          default:
            return 'wait-ship'
        }
      }else{
        return 'wait-ship'
      }
    },
    showLogistics(){
      if(this.logisticsInfo){
        if(this.order.order_status == 1){
          return true
        }
      }
      return false
    }
  },
  methods:{
    ...mapMutations(['updatePayOrderData']),
    handleBack(){
      this.$router.go(-1)
    },
    //是否显示待收货的商品按钮
    showWaitReceive(status){
      if(this.order.order_status == 0){
        if(status == 3){
          return true
        }
      }

      return false
    },
    //当一个订单存在不同状态商品时判断商品状态
    getGoodsStatus(status){
      if(this.order.order_status == 0){
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
      }
    },
    //判断显示什么底部按钮
    showFooterButton(type){
      if(this.order.order_status === 1){
        let status = this.order.goods_info[0].status
        //待付款按钮
        if(type == 'waitPay' && status == 0){
          return true
        }
        //订单已取消按钮
        if(type == 'delete' && status == 8){
          return true
        }
        //待收货按钮
        if(type == 'confirm' && status == 3){
          return true
        }
        //待评价按钮
        if(type == 'evaluate' && status == 1){
          return true
        }

        return false
      }else{
        return false
      }
    },
    // 跳转商品详情
    goDetails(info){
      switch(info.flag){
        case 1:
          this.$router.push({
            path: '/product',
            query: {
              id: info.goods_id
            }
          })
          break;
        case 2:
          this.$router.push({
            path: '/product',
            query: {
              id: info.goods_id,
              group_id: info.flag_activity
            }
          })
          break;
        case 3:
          this.$router.push({
            path: '/product',
            query: {
              id: info.goods_id,
              seckill_id: info.flag_activity
            }
          })
          break;
        case 4:
          this.$router.push({
            path: '/bargain',
            query: {
              goods_id: info.goods_id,
            }
          })
          break;
        default:
           break;
      }  
    },
    // 获取订单详情
    getOrderDetail(){
      orderDetail({
        order_number:this.order_number
      }).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        console.log('orderDetail',res.data)
        this.order = res.data.data;
      }).catch(res=>{});
    },
    // 获取物流信息
    getLogistics(){
      logisticsDetails({
        order_number:this.order_number
      }).then(res=>{
        console.log('logisticsDetails:',res.data)
        if(res.data.data.data&&res.data.data.data[0]){
          this.logisticsInfo = res.data.data.data[0];
        }
      }).catch(res=>{});
    },
    // 获取属性值
    getDesc(item){
      let desc = "";
      if(item.attr1_name !== ""){
        desc+= item.attr1_name+ ":" + item.attr1_value;
      }
      if(item.attr2_name !== ""){
        desc+= " " + item.attr2_name+ ":" + item.attr2_value;
      }
      if(item.attr3_name !== ""){
        desc+= " " + item.attr3_name+ ":" + item.attr3_value;
      }
      return desc;
    },
    // 付款
    payOrder(){
      let data = {
        order_no: [{order_no: this.order_number}],
        total_amount: this.order.order_money 
      }
      this.updatePayOrderData(data)
      this.$router.push({
        path: '/payment',
        query: {
          type: 'payFromOrder'
        }
      })
    },
    // 查看物流详情
    gooLogistics(){
      this.$router.push({
        path: '/logistics',
        query: {
          orderNumber: this.order_number,
          imgUrl: this.order.goods_info[0].cover_img
        }
      })
    },
    // 评价订单
    evaluationOrder(){
      this.$router.push({
        path: '/commentContent',
        query: {
          order_number: this.order_number,
        }
      })
    },
    // 确认收货
    confirmOrder(){
      this.$dialog.alert({
        title: '确认收货',
        message: '请确认已收到货物',
        showCancelButton: true   
      }).then(res=>{
        receipt({
          order_number:this.order_number
        }).then(res=>{
          if(res.data.code != 1){
            this.$toast(res.data.message);
            return;
          }
          this.getOrderDetail();
        }).catch(res=>{});
      }).catch(()=>{})
    },
    //申请退款
    refundOrder(goods_attr_id){
      this.$dialog.alert({
        title: '申请退款',
        message: '确定申请退款',
        showCancelButton: true   
      }).then(()=>{
        this.$router.push({
          path: "/requestRefund",
          name: "requestRefund",
          query: {
            goods_attr_id,
            order_number: this.order_number
          }
        })
      }).catch(()=>{})
    }, 
    // 取消订单
    cancelOrder(){
      this.$dialog.alert({
        title: '取消订单',
        message: '确定取消该订单',
        showCancelButton: true   
      }).then(res=>{
        cancelOrder({
          order_number:this.order_number
        }).then(res=>{
          if(res.data.code != 1){
            this.$toast(res.data.message);
            return;
          }
          this.getOrderDetail();
        }).catch(res=>{});
      }).catch(res=>{});      
    },
    // 删除订单
    delOrder(){
      this.$dialog.alert({
        title: '删除订单',
        message: '确定删除该订单',
        showCancelButton: true   
      }).then(res=>{
        delOrder({
          order_number:this.order_number
        }).then(res=>{
          if(res.data.code != 1){
            this.$toast(res.data.message);
            return;
          }
          this.handleBack();
        }).catch(res=>{});
      }).catch(res=>{});       
    } 
  },
  created(){
    this.order_number = this.$route.query.order_number
    this.getOrderDetail()
    this.getLogistics()
  },
}
</script>
<style lang="stylus" scoped>
  .order-details-wrapper
    background #f5f5f5
    padding-bottom 16vw
    box-sizing border-box
    overflow-y auto
  .order-status
    background-image url('/public/static/order/bg@2x.png')
    width 100%
    height 30vw
    position relative
    background-size 100% 100%
    &.unpaid
      background-image url('/public/static/order/wait_for_payment_bg@2x.png')
    &.close
      background-image url('/public/static/order/wait_for_closed_bg@2x.png')
      background-size 100% 120%
    &.wait-ship
      background-image url('/public/static/order/paid_bg@2x.png')
    &.wait-receipt
      background-image url('/public/static/order/shipments_bg@2x.png')
    &.complete
      background-image url('/public/static/order/change_hands_bg@2x.png')
    .status
      font-size 5vw
      color white
      padding 12vw 0 0 12vw
      font-family PFM
    .van-icon
      position absolute
      left 1vw
      top 1vw
      font-size 5vw
      padding 1vw
  .logisticsInfo
    background white
    display flex
    justify-content flex-start
    align-items center
    line-height 4.2vw
    padding 4vw 3vw
    border-bottom 1px solid #eee
    .van-image
      margin-right 2vw
    .van-icon
      font-size 5vw
      margin-left 1vw
    .content
      flex 1
      .detials
        color #359a2b
        font-size 3.8vw
        word-break break-all
      .time
        color #999
        font-size 3.4vw
        padding-top 1vw
  .address-info
    background white
    display flex
    justify-content flex-start
    align-items center
    color #666
    line-height 6vw
    padding 4vw 3vw
    .van-image
      margin-right 4vw
    .content
      flex 1
      .info
        display flex
        justify-content space-between
        align-items center
      .name
        font-size 4vw
        margin-right 8vw
      .phone
        font-size 3.5vw
      .address
        font-size 3.8vw
        padding-top 1vw
  .goods-info
    background white
    .goods
      display flex
      justify-content space-between
      padding 3vw
      border-top 1px solid #eee
      .van-image
        margin-right 3vw
      .content
        flex 1
        min-height: 20vw
        display: flex
        flex-direction: column
        justify-content: space-around
        .top
          display flex
          flex-direction row
          justify-content space-between
          .name
            font-size 3.8vw
            font-family PFH
            line-height 4.6vw
            // height 10vw
          .goods-status
            font-size 3.5vw
            font-family PFH
            line-height 4.6vw
            height 6vw
            min-width: 12vw
            color #FF5655
            padding-left 2vw
        .desc
          flex 1
          min-height 6vw
          padding-bottom 1vw
          font-size 3vw
          line-height 4.5vw
          color #999
        .details
          display flex
          justify-content space-between
          align-items center
          font-family hgzt
        .btns
          margin-top: 3vw
          display: flex
          flex-direction: row
          justify-content: flex-end
          .btn
            font-size 3vw
            line-height 6vw
            height 6vw
            border 1px solid #eee
            color #fff
            background-color #FF5655
            padding 0 4vw
            margin-left: 2vw
            border-radius 3vw
    .part
      display flex
      justify-content space-between
      align-items center
      padding 0 3vw
      border-bottom 1px solid #eee
      height 12vw
      font-size 3.8vw
      font-family PFH
      .price
        font-family hgzt
        font-size 4.2vw
        color #f3284f
  .order-info
    background white
    margin-top 4vw
    .item
      display flex
      justify-content space-between
      align-items center
      padding 0 3vw
      border-bottom 1px solid #eee
      height 12vw
      .label
        font-size 3.8vw
        font-family PFH
      .value
        font-size 3.2vw
        color #999
        font-family PFM
  .order-footer
    position fixed
    left 0
    bottom 0
    right 0
    display flex
    justify-content center
    align-items center
    font-size 4vw
    color white
    height 16vw
    background white
    .double
      width 40vw
      height 10vw
      line-height 10vw
      text-align center
      border-radius 5vw      
      margin 0 2vw
    .single
      width 80vw
      height 10vw
      line-height 10vw
      text-align center
      border-radius 5vw      
      margin 0 2vw
    .cancel,.confirm
      background #faaa10
    .delete,.pay,.evaluation
      background #f3284f
</style>