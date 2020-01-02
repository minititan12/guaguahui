<template>
  <div class="payContent-wrapper" ref="payContentWrapper">
    <div>
      <div class="pay-blank"></div>
      <PayUserItem></PayUserItem>
      <PayWarn></PayWarn>
      <PayItems></PayItems>
      <div class="pay-blank"></div>
    </div>
  </div>
</template>

<script>
import PayUserItem from './content/payUserItem'
import PayItems from './content/payItems'
import Bscroll from 'better-scroll'
import PayWarn from './content/payWarn'
import { getDefault } from '../../utils/axios/request'
import { mapState,mapMutations } from 'vuex'
export default {
  name: "PayContent",
  components: {
    PayUserItem,
    PayItems,
    PayWarn
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
      getDefault(getDefaultAddressOptions)
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
    top: 46px
    bottom: 12vw
    left: 0
    right: 0
    overflow: hidden
    .pay-blank
      width: 100%
      height: .1rem
</style>
