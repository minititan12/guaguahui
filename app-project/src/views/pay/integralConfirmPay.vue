<template>
  <div class="pay-wrapper">
    <IntegralConfirmHeader />
    <IntegralConfirmContent />
    <div class="commit" @click="handleCommitOrder">
      <span>提交订单</span>
    </div>
  </div>
</template>

<script>
import IntegralConfirmHeader from '../../components/integralConfirmPay/integralConfirmHeader'
import IntegralConfirmContent from '../../components/integralConfirmPay/integralConfirmContent'
import { creditGoodsOrder } from '../../utils/axios/request'
import { mapState } from 'vuex'
export default {
  name: "IntergralConfirmPay",
  components: {
    IntegralConfirmHeader,
    IntegralConfirmContent
  },
  computed: {
    ...mapState(['integralProBuyDetail','userData','defaultAddress'])
  },
  methods: {
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
      let postData = {
        goods_id: this.integralProBuyDetail.good_id,
        user_id: this.userData.id,
        number: this.integralProBuyDetail.number,
        sku_key: this.integralProBuyDetail.sku_key,
        address: this.getAddress()
      }
      creditGoodsOrder(postData)
        .then((res)=>{
          console.log('creditGoodsOrder',res.data)
          if(res.data.code == 1){
            this.$toast({
              message: '提交订单成功',
              type: 'success',
              duration: 1200
            })
          }
        })
        .catch((err)=>{})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .pay-wrapper
    width: 100%
    height: 100%
    background-color: #F6F7FB
    .commit
      position: absolute 
      bottom: 0
      width: 100%
      height: 12vw
      background-color: #ff5756
      color: #fff
      line-height: 12vw
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
      font-size: 4vw
      text-align: center
</style>


