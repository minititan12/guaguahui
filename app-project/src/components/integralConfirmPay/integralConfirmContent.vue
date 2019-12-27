<template>
  <div class="payContent-wrapper">
    <IntegralUserItem />
    <IntegralConfirmItem />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState,mapMutations } from 'vuex'
import IntegralUserItem from './content/integralUserItem'
import IntegralConfirmItem from './content/integralConfirmItem'
export default {
  name: "IntegralConfirmContent",
  components: {
    IntegralUserItem,
    IntegralConfirmItem
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    ...mapMutations(['updateDefaultAddress']),
    //初始化获取默认地址
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
</style>
