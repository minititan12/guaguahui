<template>
  <div class="payContent-wrapper">
    <IntegralUserItem />
    <IntegralConfirmItem />
  </div>
</template>

<script>
import { getDefault } from '../../utils/axios/request'
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
      getDefault(getDefaultAddressOptions)
        .then((res)=>{
          console.log(res.data)
          if(res.data.code == 1){
            this.updateDefaultAddress(res.data)
          }else{
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        })
        .catch((err)=>{})
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
