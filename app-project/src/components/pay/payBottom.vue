<template>
  <div class="payBottom-wrapper">
    <div class="pay-right">
      <span class="pay-number">共{{numberCount}}件</span>
      <span class="pay-text">合计:</span>
      <span class="pay-total">￥{{totalPrice}}</span>
      <div class="pay-btn" @click="handleCommitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: "PayBottom",
  computed: {
    ...mapState(['confirmListTotalPrice','confirmData','confirmList','userData','defaultAddress']),
    //总数量
    numberCount(){
      if(this.confirmData.length > 0){
        let count = 0
        for(let shopItem of this.confirmData){
          for(let item of shopItem.good_list){
            count = count + parseInt(item.number)
          }
        }
        return count
      }
    },
    //总价格
    totalPrice(){
      if(this.confirmData.length > 0){
        let result = 0
        for(let shopItem of this.confirmData){
          for(let item of shopItem.good_list){
            let price = parseInt(item.number) * parseFloat(item.price)
            result = result + price
          }
        }
        return result.toFixed(2)
      }
    },
    commitData(){
      let hasConfirmList = this.confirmList.length > 0 ? true : false
      let hasUserData = Object.keys(this.userData).length > 0 ? true : false
      let hasConfirmListTotalPrice = parseFloat(this.confirmListTotalPrice) > 0 ? true : false
      let hasDefaultAddress = this.defaultAddress.code == 1 ? true : false

      if(hasConfirmList && hasConfirmListTotalPrice && hasUserData && hasDefaultAddress){
        let result = []
        for(let item of this.confirmList){
          result.push({
            goods_id: item.goods_id,
            number: item.number,
            user_id: this.userData.id,
            amount: item.totalPrice,
            goods_attr_id: item.hasOwnProperty('goods_attr_id') ? item.goods_attr_id : '',
            buyer_address: this.defaultAddress.data,
            user_id_to: item.user_id_to,
            attr1_name: item.hasOwnProperty('attr1_name') ? item.attr1_name : '',
            attr1_value: item.hasOwnProperty('attr1_value') ? item.attr1_value : '',
            attr2_name: item.hasOwnProperty('attr2_name') ? item.attr2_name : '',
            attr2_value: item.hasOwnProperty('attr2_value') ? item.attr2_value : '',
            attr3_name: item.hasOwnProperty('attr3_name') ? item.attr3_name : '',
            attr3_value: item.hasOwnProperty('attr3_value') ? item.attr3_value : '',
            price: item.price,
            goods_name: item.title
          })
        }

        return result
      }
    }
  },
  methods: {
    ...mapMutations(['updatePayOrderData','countConfirmTotalPrice','addWaitPayList','updateWaitPayList','initConfirmList','initComfirmTotalPrice','clearCart','clearSelectedID','updateSelectedList']),
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      
      return false;
    },

    commitHandle(){
      //初始化确认订单列表
      this.initConfirmList()
      //初始化确认订单总价格
      this.initComfirmTotalPrice()
      //清空选择的商品ID
      this.clearSelectedID()
      //更新选择的商品列表
      this.updateSelectedList()
      // console.log(1)
    },

    //删除上传到未支付的商品
    delSuccessOrder(){
      if(this.confirmList[0].hasOwnProperty('id')){
        let id = []
        for(let item of this.confirmList){
          id.push(item.id)
        }
        let delObject = {
          user_id: this.userData.id,
          id: id
        }
        console.log(delObject)
        axios.post('api/method/delCart',delObject)
          .then((res)=>{
            console.log('delcart:',res.data)
            //删除之后,对一些数据的初始化
            this.commitHandle()
          })
          .catch((err)=>{
            console.log('post delcart err',err)
          })
      }else{
        this.commitHandle()
      }
    },

    //获取提交订单信息
    getOrderGoods(){
      let result = []

      for(let shopItem of this.confirmData){
        let goods_list = []
        for(let item of shopItem.good_list){
          goods_list.push({
            goods_attr_id: item.id,
            number: item.number
          })
        }

        result.push({
          shop_id: shopItem.shop_id,
          coupon: 0,
          goods_list: goods_list
        })
      }

      return result
    },

    //获取地址信息
    getAddress(){
      let data = this.defaultAddress.data
      let buyer_address = data.province + data.city + data.county + data.address

      let result = {
        buyer_name: data.real_name,
        buyer_phone: data.phone,
        buyer_address: buyer_address
      }

      return result
    },

    //提交订单
    handleCommitOrder(){
      // let hasConfirmList = this.confirmList.length > 0 ? true : false
      let hasUserData = Object.keys(this.userData).length > 0 ? true : false
      let hasDefaultAddress = this.defaultAddress.code == 1 ? true : false

      if(!hasUserData){
        this.$toast({
          message: "请先登录",
          type: "fail",
          duration: 1500
        })
        return
      }
      if(!hasDefaultAddress){
        this.$toast({
          message: "请先填写默认地址",
          type: "fail",
          duration: 1500
        })
        return
      }

      let order_goods = this.getOrderGoods()
      let address = this.getAddress()

      //把商品上传到服务器获取订单号
      let commitObject = {
        user_id: this.userData.id,
        order_goods: order_goods,
        address: address
      }
      console.log('waitPay commitData',commitObject)

      //上传到待支付列表
      axios.post('api/method/makeOrder',commitObject)
        .then((res)=>{
          console.log('waitpay:',res.data)
          if(res.data.code == 1){
            this.updatePayOrderData(res.data.data)

            this.$router.push({
              path: '/payment'
            })
          }

            // if(!this.is_app()){
            //   this.$router.push({
            //     path: "/download"
            //   })
            // }else{
              
            // }
        })
        .catch((err)=>{
          console.log('commit data err',err)
        })
    }
  },
  mounted(){
    this.countConfirmTotalPrice()
  }
}
</script>

<style lang="stylus" scoped>
  .payBottom-wrapper
    position: absolute
    bottom: 0
    width: 100%
    height: 12vw
    font-family: PFB
    background-color: #fff
    overflow: hidden
    .pay-right
      float: right
      display: flex
      height: 100%
      font-size: 3.5vw
      flex-direction: row
      align-items: center
      .pay-number
        margin-right: 2vw
      .pay-total
        color: #FE5655
        font-family: hgzt
      .pay-btn
        text-align: center
        padding: 3vw 5vw
        background-color: #ff5756
        border-radius: 5vw
        margin: 0 5vw
        color: #fff
</style>
