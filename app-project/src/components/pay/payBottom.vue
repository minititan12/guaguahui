<template>
  <div class="payBottom-wrapper">
    <div class="pay-right">
      <span class="pay-number">共{{numberCount}}件</span>
      <span class="pay-text">合计:</span>
      <span class="pay-total">￥{{confirmListTotalPrice}}</span>
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
    ...mapState(['confirmListTotalPrice','confirmList','userData','defaultAddress']),
    numberCount(){
      if(this.confirmList.length > 0){
        let count = 0
        for(let item of this.confirmList){
          count = count + parseInt(item.number)
        }
        return count
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
    ...mapMutations(['countConfirmTotalPrice','addWaitPayList','updateWaitPayList','initConfirmList','initComfirmTotalPrice','clearCart','clearSelectedID','updateSelectedList']),
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
    handleCommitOrder(){
      let hasConfirmList = this.confirmList.length > 0 ? true : false
      let hasUserData = Object.keys(this.userData).length > 0 ? true : false
      let hasDefaultAddress = this.defaultAddress.code == 1 ? true : false
      if( hasConfirmList && hasUserData && hasDefaultAddress){
        //把商品上传到服务器获取订单号
        let commitObject = {
          wait_pay_order: this.commitData
        }
        console.log(commitObject)

        //上传到待支付列表
        axios.post('api/method/waitPay',commitObject)
          .then((res)=>{
            console.log('waitpay:',res.data)
            if(res.data.code == 1){
              //删除上传到未支付的商品
              this.delSuccessOrder()
              
              //整合获取的订单号生成新的支付信息
              let data = res.data.data.data
              let order_number = ""
              let amount = 0
              if(data.length > 1){
                for(let i = 0; i < data.length; i++){
                  if(i > 0){
                    order_number = order_number + "|" + data[i].ordernumber.order_number
                  }else{
                    order_number = data[i].ordernumber.order_number
                  }
                  amount = amount + parseFloat(data[i].amount)
                }
              }else{
                order_number = data[0].ordernumber.order_number
                amount = parseFloat(data[0].amount)
              }

              this.$router.push({
                path: '/payment',
                name: 'payment',
                params: {
                  order_number: order_number,
                  amount: amount,
                  user_id: data[0].user_id,
                }
              })

              // if(!this.is_app()){
              //   this.$router.push({
              //     path: "/download"
              //   })
              // }else{
                
              // }
            }
          })
          .catch((err)=>{
            console.log('commit data err',err)
          })
      }else{
        if(!hasUserData){
          this.$toast({
            message: "请先登录",
            type: "fail",
            duration: 1500
          })
        }
        if(!hasDefaultAddress){
          this.$toast({
            message: "请先填写默认地址",
            type: "fail",
            duration: 1500
          })
        }
        if(!hasConfirmList){
          this.$toast({
            message: "请先添加商品",
            type: "fail",
            duration: 1500
          })
        }
      }
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
