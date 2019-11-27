<template>
  <div class="orderItems-wrapper" v-if="showItems">

    <!-- 全部商品项 -->
    <PayItem v-if="orderActive == 0 && list.length > 0" 
      v-for= "item of list" 
      :data= "item" 
      :statusText= "getStatusText(item.status)"
      :key= "item.id" 
      :showDel= "showDel(item.status)"
      :showCancel= "item.status == 0 ? true : false"
      :showRefund= "showRefund(item.status)" 
      :showPay= "item.status == 0 ? true : false"
      :showConfirm= "item.status == 3 ? true : false" 
      :showLogistics = "item.status == 3 ? true : false"
      @del= "handleDelItem(item.orderNumber)"
      @cancel= "handleCancelOrder(item.orderNumber)"
      @pay= "handlePayOrder(item)"
      @refund= "handleRefund(item.orderNumber)"
      @confirm= "handleConfirm(item.orderNumber)"
      @logistics= "handleToLogistics(item)"
      @imgClick= "handleGoodClick(item.goods_id)"
      @titleClick= "handleGoodClick(item.goods_id)"
      @shopClick= "handleShopClick(item.user_id_to)"
    />
    
    <!-- 待付款的商品项 -->
    <PayItem v-if="orderActive == 1 && list.length > 0" 
      v-for= "item of list" 
      :data= "item" 
      :key= "item.id" 
      :statusText= "getStatusText(item.status)"
      :showPay= "true" 
      :showCancel= "true"
      @pay= "handlePayOrder(item)" 
      @cancel= "handleCancelOrder(item.orderNumber)"
      @imgClick= "handleGoodClick(item.goods_id)"
      @titleClick= "handleGoodClick(item.goods_id)"
      @shopClick= "handleShopClick(item.user_id_to)"
    />

    <!-- 待发货的商品项 -->
    <PayItem v-if="orderActive == 2 && list.length > 0" 
      v-for= "item of list" 
      :data= "item" 
      :statusText= "getStatusText(item.status)"
      :key= "item.id" 
      :showRefund= "true"
      @refund= "handleRefund(item.orderNumber)"
      @imgClick= "handleGoodClick(item.goods_id)"
      @titleClick= "handleGoodClick(item.goods_id)"
      @shopClick= "handleShopClick(item.user_id_to)"
    />

    <!-- 待收货的商品项 -->
    <PayItem v-if="orderActive == 3 && list.length > 0" 
      v-for= "item of list" 
      :data= "item" 
      :key= "item.id"
      :statusText= "getStatusText(item.status)"
      :showConfirm = "true" 
      :showLogistics = "true"
      @confirm= "handleConfirm(item.orderNumber)"
      @logistics= "handleToLogistics(item)"
      @imgClick= "handleGoodClick(item.goods_id)"
      @titleClick= "handleGoodClick(item.goods_id)"
      @shopClick= "handleShopClick(item.user_id_to)"
    />
  </div>

</template>

<script>
import PayItem from '../miniComponents/payItem'
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
    PayItem
  },
  computed: {
    ...mapState(['orderList','orderActive','userData']),
    list(){
      let result = []
      for(let item of this.orderList){
        result.push({
          originData: item,
          attr1_name: item.attr1_name,
          attr1_value: item.attr1_value,
          attr2_name: item.attr2_name,
          attr2_value: item.attr2_value,
          attr3_name: item.attr3_name,
          attr3_value: item.attr3_value,
          imgUrl: item.photo.photo,
          price: item.price,
          totalPrice: item.amount,
          shop: item.shop.company,
          number: item.number,
          title: item.title.goods_name,
          orderNumber: item.order_number,
          goods_id: item.goods_id,
          goods_attr_id: item.goods_attr_id,
          user_id: item.user_id,
          user_id_to: item.user_id_to,
          status: item.status
        })
      }
      return result
    }
  },
  watch: {
    orderActive(newActive,oldActive){
      console.log(newActive,oldActive)
      this.$emit('hideWarn')
      this.updateOrderList([])
      this.$toast({
        type: "loading",
        duration: 3000
      })
      this.getOrderData()
    },
    // orderList(){
    //   if(this.orderList.length > 0){
    //     this.showItems = true
    //   }else{
    //     this.showItems = false
    //     this.$emit('showWarn')
    //   }
    // }
  },
  methods: {
    ...mapMutations(['addToConfirmList','updateOrderList']),
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
            this.updateOrderList(res.data.data)
          }
          this.$nextTick(()=>{
            if(this.orderList.length > 0){
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

    getStatusText(status){
      switch(status){
        case 0:
          return '待付款'
        case 1:
          return '订单完成'
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
          return '已评价'
        default:
          return ''
      }
    },

    //判断是否显示删除按钮
    showDel(status){
      if(status == 1){
        return true
      }
      if(status == 8){
        return true
      }
      if(status == 9){
        return true
      }
      if(status == 10){
        return true
      }

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

    handlePayOrder(orderItem){
      console.log('payorder')
      this.$router.push({
        path: '/payment',
        name: 'payment',
        params: {
          order_number: orderItem.orderNumber,
          amount: orderItem.totalPrice,
          user_id: orderItem.user_id
        }
      })
    },

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
          imgUrl: data.imgUrl
        }
      })
    },

    handleGoodClick(goods_id){
      this.$router.push({
        path: '/product',
        query: {
          id: goods_id
        }
      })
    },

    handleShopClick(user_id_to){
      this.$router.push({
        path: '/shop',
        query: {
          shopID: user_id_to
        }
      })
    },

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
    this.updateOrderList([])
  },
  mounted(){
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
  padding: .2rem 0
</style>
