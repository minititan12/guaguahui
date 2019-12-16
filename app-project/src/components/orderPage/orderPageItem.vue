<template>
  <div class="orderItems-wrapper" ref="orderItems" v-show="showItems">

    <div>
      <div class="blank"></div>
      <!-- 全部商品项 -->
      <div v-if="orderActive == 0 && list.length > 0">
        <OrderItem  
          v-for= "item of list" 
          :data= "item" 
          :statusText= "getStatusText(item.goodsList[0].status)"
          :key= "item.orderNumber" 
          :showDel= "showDel(item.goodsList[0].status)"
          :showCancel= "item.goodsList[0].status == 0 ? true : false"
          :showRefund= "showRefund(item.goodsList[0].status)" 
          :showPay= "item.goodsList[0].status == 0 ? true : false"
          :showConfirm= "item.goodsList[0].status == 3 ? true : false" 
          :showLogistics = "item.goodsList[0].status == 3 ? true : false"
          :showComment = "item.goodsList[0].status == 1 ? true : false"
          @del= "handleDelItem(item.orderNumber)"
          @cancel= "handleCancelOrder(item.orderNumber)"
          @pay= "handlePayOrder(item)"
          @refund= "handleRefund(item.orderNumber)"
          @confirm= "handleConfirm(item.orderNumber)"
          @logistics= "handleToLogistics(item)"
        />
      </div>
      
      <!-- 待付款的商品项 -->
      <div v-if="orderActive == 1 && list.length > 0">
        <OrderItem 
          v-for= "item of list" 
          :data= "item" 
          :key= "item.orderNumber" 
          :statusText= "getStatusText(item.goodsList[0].status)"
          :showPay= "true"
          :showCancel= "true"
          @pay= "handlePayOrder(item)" 
          @cancel= "handleCancelOrder(item.orderNumber)"
        />
      </div>

      <!-- 待发货的商品项 -->
      <div v-if="orderActive == 2 && list.length > 0">
        <OrderItem  
          v-for= "item of list" 
          :data= "item" 
          :statusText= "getStatusText(item.goodsList[0].status)"
          :key= "item.orderNumber" 
          :showRefund= "true"
          @refund= "handleRefund(item.orderNumber)"
        />
      </div>

      <!-- 待收货的商品项 -->
      <div v-if="orderActive == 3 && list.length > 0">
        <OrderItem  
          v-for= "item of list" 
          :data= "item" 
          :key= "item.orderNumber"
          :statusText= "getStatusText(item.goodsList[0].status)"
          :showConfirm = "true" 
          :showLogistics = "true"
          @confirm= "handleConfirm(item.orderNumber)"
          @logistics= "handleToLogistics(item)"
        />
      </div>

      <div class="blank"></div>
    </div>

  </div>

</template>

<script>
import OrderItem from '../miniComponents/orderItem'
import Bscroll from 'better-scroll'
import { mapState,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: "OrderPageItem",
  data(){
    return {
      showItems: true
    }
  },
  components: {
    OrderItem
  },
  computed: {
    ...mapState(['orderData','orderActive','userData']),
    //订单列表
    list(){
      let result = []

      if(this.orderData && Object.keys(this.orderData).length > 0){
        for(let key in this.orderData){
          result.push({
            orderNumber: key,
            goodsList: this.orderData[key]
          })
        }
      }
      return result
    }
  },
  watch: {
    orderActive(newActive,oldActive){
      console.log(newActive,oldActive)
      this.$emit('hideWarn')
      this.updateOrderData(null)
      this.$toast({
        type: "loading",
        duration: 3000
      })
      this.getOrderData()
    }
  },
  methods: {
    ...mapMutations(['updateOrderData','updatePayOrderData']),
    //初始化滚动
    initScroll(){
      let el = this.$refs.orderItems
      this.orderScroll = new Bscroll(el,{
        click: true,
        eventPassthrough: 'horizontal',
        bounce:{
          top: false,
          bottom: true
        }
      })

      let that = this

      this.orderScroll.on('beforeScrollStart',function(){
        console.log('beforeScrollStart')
        that.orderScroll.refresh()
      })
    },

    //获取订单信息
    getOrderData(){
      let status = 0
      switch(this.orderActive){
        case 0:
          status = -1
          break
        case 1:
          status = 0
          break
        case 2:
          status = 2
          break 
        case 3:
          status = 3
          break
        default:
          status = 0
      }
      let postData = {
        user_id: this.userData.id,
        status: status
      }
      console.log(postData)
      axios.post('api/method/getMyOrder',postData)
        .then((res)=>{
          console.log(res.data)
          this.$toast.clear()
          if(res.data.code == 1){
            this.updateOrderData(res.data.data)
          }
          this.$nextTick(()=>{
            this.orderScroll.refresh()
            let result = Object.keys(this.orderData)

            if(result.length > 0){
              this.showItems = true
            }else{
              this.showItems = false
              this.$emit('showWarn')
            }
          })
        })
        .catch((err)=>{
          this.$toast.clear()
          this.showItems = false
          this.$emit('showWarn')
          console.log('post getMyOrder err' + err)
        })
    },

    //获取订单状态
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
        case 8:
          return '交易关闭'
        case 9:
          return '已退款'
        case 10:
          return '订单完成'
        default:
          return ''
      }
    },

    //判断是否显示删除按钮
    showDel(status){
      // if(status == 1){
      //   return true
      // }
      if(status == 8){
        return true
      }
      // if(status == 9){
      //   return true
      // }
      // if(status == 10){
      //   return true
      // }

      return false
    },

    //判断是否显示退款按钮
    showRefund(status){
      if(status == 2){
        return true
      }else{
        return false
      }
    },

    //处理请求
    handleAxios(action,postData){
      let postUrl = ''
      if(action == 'del'){
        postUrl = 'api/method/delOrder'
      }else if(action == 'cancel'){
        postUrl = 'api/method/cancelOrder'
      }else if(action == 'confirm'){
        postUrl = 'api/method/receipt'
      }
      axios.post(postUrl,postData)
        .then((res)=>{
          this.$toast.clear()
          console.log(action,res.data)
          if(res.data.code == 1){
            this.getOrderData()
          }else{
            this.$toast({
              type: "fail",
              message: "失败",
              duration: 1200
            })
          }
        })
        .catch((err)=>{
          this.$toast.clear()
          console.log('post handleOrder err' + err)
        })
    },

    handleDelItem(orderNumber){
      this.$dialog.alert({
        title: '删除订单',
        message: '确定删除该订单',
        showCancelButton: true   
      })
        .then(()=>{
          this.$toast({
            type: "loading",
            message: "删除中...",
            duration: 3000
          })
          let postData = {
            order_number: orderNumber
          }
          console.log(postData)
          this.handleAxios('del',postData)
        })
        .catch(()=>{
        })
    },

    //处理支付订单
    handlePayOrder(shopItem){
      console.log('payorder')

      let allAmount = 0
      for(let item of shopItem.goodsList){
        allAmount = allAmount + parseFloat(item.amount)
      }

      let data = {
        order_no: [{order_no: shopItem.orderNumber}],
        total_amount: allAmount 
      }
      this.updatePayOrderData(data)

      this.$router.push({
        path: '/payment',
        query: {
          type: 'payFromOrder'
        }
      })
    },

    //处理确认订单
    handleConfirm(orderNumber){
      this.$dialog.alert({
        title: '确认收货',
        message: '请确认已收到货物',
        showCancelButton: true   
      })
        .then(()=>{
          this.$toast({
            type: "loading",
            message: "确认中...",
            duration: 3000
          })
          let postData = {
            order_number: orderNumber
          }
          console.log(postData)
          this.handleAxios('confirm',postData)
        })
        .catch(()=>{
        })
    },

    //物流信息
    handleToLogistics(data){
      console.log(data)
      this.$router.push({
        path: '/logistics',
        query: {
          orderNumber: data.orderNumber,
          imgUrl: data.goodsList[0].photo
        }
      })
    },

    //取消订单
    handleCancelOrder(orderNumber){
      this.$dialog.alert({
        title: '取消订单',
        message: '确定取消该订单',
        showCancelButton: true   
      })
        .then(()=>{
          this.$toast({
            type: "loading",
            message: "取消中...",
            duration: 3000
          })
          let postData = {
            order_number: orderNumber
          }
          console.log(postData)
          this.handleAxios('cancel',postData)
        })
        .catch(()=>{
        })
    },

    //申请退款
    handleRefund(orderNumber){
      this.$dialog.alert({
        title: '申请退款',
        message: '确定申请退款',
        showCancelButton: true   
      })
        .then(()=>{
          this.$router.push({
            path: "/requestRefund",
            name: "requestRefund",
            params: {
              orderNumber: orderNumber
            }
          })
        })
        .catch(()=>{
        })
    }
  },
  created(){
    this.updateOrderData(null)
  },
  mounted(){
    this.initScroll()

    this.$nextTick(()=>{
      console.log(this.orderActive)
      this.$toast({
        type: "loading",
        duration: 3000
      })
      this.getOrderData()
    })
  }
}
</script>

<style lang="stylus" scoped>
.orderItems-wrapper
  position: absolute
  top: 90px
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  .blank
    width: 100%
    height: 2vw
</style>
