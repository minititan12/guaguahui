<template>
  <div class="payContent-wrapper" ref="payContentWrapper">
    <div>
      <div class="pay-blank"></div>
      <PayUserItem></PayUserItem>
      <PayWarn></PayWarn>
      <PayMethods v-if="showMethods()"></PayMethods>
      <PayItems></PayItems>
      <div class="pay-blank"></div>
    </div>
  </div>
</template>

<script>
import PayUserItem from './content/payUserItem'
import PayItems from './content/payItems'
import PayMethods from './content/paymethods'
import Bscroll from 'better-scroll'
import PayWarn from './content/payWarn'
import axios from 'axios'
import { mapState,mapMutations } from 'vuex'
export default {
  name: "PayContent1104",
  components: {
    PayUserItem,
    PayItems,
    PayWarn,
    PayMethods
  },
  data(){
    return {
      defaultAddressData: {}
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    ...mapMutations(['updateDefaultAddress']),
    //微信web
    is_wxWebPay(){
      if(/MicroMessenger/.test(window.navigator.userAgent)){
        return true;
      }
      return false;	
    },
    //支付宝web
    is_aliWebPay(){
      if(/AlipayClient/.test(window.navigator.userAgent)){
        return true;
      }
      return false;	
    },
    //app运行环境
    is_app(){
      //localStorage.plusReady == 'true' 
      if(typeof(plus) == 'object'){
        return true;
      }
      return false;
    },
    //h5web
    is_h5Web(){
      if(this.is_app()){
        return false;
      }
      if(this.is_wxWebPay()){
        return false;
      }
      if(this.is_aliWebPay()){
        return false;
      }
      return true;
    },
    showMethods(){
      if(this.is_app()){
        return true
      }

      if(this.is_h5Web()){
        return true
      }

      return false
    },
    initPayContentScroll(){
      let el = this.$refs.payContentWrapper
      this.payContentScroll = new Bscroll(el,{
        click: true,
        tap: true,
        eventPassthrough: 'horizontal',
        bounce:{
          top: false
        }
      })
    },
    initGetDefaultAddress(){
      let getDefaultAddressOptions = {
        user_id: this.userData.id
      }
      console.log(getDefaultAddressOptions)
      axios.post('api/method/getDefault',getDefaultAddressOptions)
        .then((res)=>{
          console.log(res.data)
          this.updateDefaultAddress(res.data)
        })
        .catch((err)=>{
          console.log('get default address data err' + err)
        })
    }
  },
  mounted(){
    this.initGetDefaultAddress()
    this.initPayContentScroll()
  },
  updated(){
    this.payContentScroll.refresh()
  }
}
</script>

<style lang="stylus" scoped>
  .payContent-wrapper
    position: absolute 
    top: .75rem
    bottom: 1rem
    left: 0
    right: 0
    overflow: hidden
    .pay-blank
      width: 100%
      height: .1rem
</style>
