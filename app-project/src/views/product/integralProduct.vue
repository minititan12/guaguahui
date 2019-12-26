<template>
  <div class="Product-wrapper">
    <IntegralProContent />
    <ProFooter/>
    <ProImgMask />
    <ProPopUp />
  </div>
</template>

<script>
import { getCreditGoodsDetail } from '../../utils/axios/request'
import { mapMutations } from 'vuex'
import IntegralProContent from '../../components/integralProduct/integralProContent'
import ProImgMask from '../../components/integralProduct/proImgMask'
import ProFooter from '../../components/integralProduct/proFooter'
import ProPopUp from '../../components/integralProduct/proPopUp'
export default {
  name: 'IntegralProduct',
  components: {
    IntegralProContent,
    ProImgMask,
    ProFooter,
    ProPopUp
  },
  methods: {
    ...mapMutations(['updateCurrentCreditGoodDetail','changeShowProPopUp']),
    //获取积分产品数据
    getProductData(){
      let getParams = {
        goods_id: this.$route.query.id
      }
      getCreditGoodsDetail(getParams)
        .then((res)=>{
          console.log('getCreditGoodsDetail',res.data)
          if(res.data.code == 1){
            this.updateCurrentCreditGoodDetail(res.data.data)
          }else{
            this.$toast({
              type: 'fail',
              message: res.data.message,
              duration: 1500
            })
          }
        })
        .catch((err)=>{
          console.log('getCreditGoodsDetail',err)
          this.$toast({
            type: 'fail',
            message: '请求失败',
            duration: 1500
          })
        })
    }
  },
  created(){
    this.changeShowProPopUp(false)
    this.getProductData()
  }
}
</script>

<style lang="stylus" scoped>
</style>