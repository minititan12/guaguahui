<template>
  <div class="pay-wrapper">
    <PayHeader></PayHeader>
    <PayContent></PayContent>
    <PayBottom></PayBottom>
  </div>
</template>

<script>
import PayHeader from '../../components/pay/payHeader'
import PayBottom from '../../components/pay/payBottom'
import PayBottom1104 from '../../components/pay/payBottom1104'
import PayContent from '../../components/pay/payContent'
import PayContent1104 from '../../components/pay/payContent1104'
import { mapMutations } from 'vuex'
export default {
  name: "Pay",
  components: {
    PayHeader,
    PayBottom,
    PayContent,
    PayContent1104,
    PayBottom1104
  },
  methods:{
    ...mapMutations(['initConfirmList','initComfirmTotalPrice','changeTab']),
    commitHandle(){
      //初始化确认订单列表
      this.initConfirmList()
      //初始化确认订单总价格
      this.initComfirmTotalPrice()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .pay-wrapper
    width: 100%
    height: 100%
    background-color: #F6F7FB
</style>


