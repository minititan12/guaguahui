<template>
  <div class="refund-wrapper">
    <van-sticky>
      <van-nav-bar title="退款/售后" left-arrow @click-left="handleBackClick"/>
    </van-sticky>
    
    <van-sticky>
      <van-tabs v-model="active" title-active-color="#FF5756">
        <van-tab title="可退款"></van-tab>
        <van-tab title="退款中"></van-tab>
        <van-tab title="已退款"></van-tab>
      </van-tabs>
    </van-sticky>

    <OrderItem 
      v-if= "orderList.length > 0" 
      v-for= "item of list" 
      :data= "item" 
      :showDel= "item.status == 5 ? false : true"
      :statusText= "getStatusText(item.status)"
      @del= "handleDel(item.orderNumber)"
      @imgClick= "handleGoodClick(item.goods_id)"
      @titleClick= "handleGoodClick(item.goods_id)"
      @shopClick= "handleShopClick(item.user_id_to)"
    />
  </div>
</template>

<script>
import axios from 'axios'
import OrderItem from '../../components/miniComponents/orderItem'
import { mapState } from 'vuex'
export default {
  name: "Refund",
  components:{
    OrderItem
  },
  data(){
    return {
      orderList: [],
      active: 0
    }
  },
  computed:{
    ...mapState(['userData']),
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
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    getStatusText(status){
      if(status == 5){
        return '待退款'
      }else if(status == 9){
        return '已退款'
      }
    },
    getData(){
      let postData = {
        user_id: this.userData.id
      }
      axios.post('api/method/retirement',postData)
        .then((res)=>{
          console.log('retirement',res.data)
          if(res.data.code == 1){
            this.orderList = res.data.data
          }
        })
        .catch((err)=>{
          console.log('retirement',err)
        })
    },
    handleDel(orderNumber){
      this.$dialog.alert({
        title: '删除订单',
        message: '确定删除该订单',
        showCancelButton: true   
      })
        .then(()=>{
          this.$toast({
            type: "loading",
            message: "删除中...",
            duration: 1500
          })
          let postData = {
            order_number: orderNumber
          }
          console.log(postData)
          axios.post('api/method/delOrder',postData)
            .then((res)=>{
              console.log('delOrder',res.data)
              this.$toast.clear()
              if(res.data.code == 1){
                this.getData()
              }else{
                this.$toast({
                  type: "fail",
                  message: "删除失败",
                  duration: 1200
                })
              }
            })
            .catch((err)=>{
              this.$toast.clear()
              this.$toast({
                type: "fail",
                message: "删除失败",
                duration: 1200
              })
              console.log('delOrder',err)
            })
        })
        .catch(()=>{
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
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
  .refund-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .refund-wrapper >>> .van-nav-bar__title
    font-size: 4vw
    font-family: PFH
    color: #000
  
  .refund-wrapper >>> .van-tabs__line
    background-color: #FF5756 

  .refund-wrapper >>> .van-tab
    font-size: 3.5vw
    color: #000
    font-family: PFB

  .refund-wrapper
    width: 100vw
    min-height: 100vh
    background-color: #eee
</style>