<template>
  <div class="accessCoupon-wrapper">
    <van-nav-bar class="accessCoupon-header" title="可用优惠劵" left-arrow @click-left="handleBackClick"/>

    <div class="couponItems">
      <CouponItem :selected="true" @select="handleSelect(item)" :data='item' v-for="item of couponData.list" />
    </div>

  </div>
</template>

<script>
import CouponItem from '../../components/miniComponents/couponItem'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "AccessCoupon",
  components: {
    CouponItem,
  },
  data(){
    return {
      couponData: null
    }
  },
  computed:{
    ...mapState(['confirmData'])
  },
  methods: {
    ...mapMutations(['updatedConfirmData']),
    handleBackClick(){
      this.$router.go(-1)
    },
    //选择优惠券
    handleSelect(data){
      console.log('select')
      let coupon = {
        id: data.id,
        value: data.value
      }

      let confirmData = JSON.parse(JSON.stringify(this.confirmData))
      for(let item of confirmData){
        if(item.shop_id == data.company_id){
          item.coupon = coupon
          this.updatedConfirmData(confirmData)
          this.$router.go(-1)
          return 
        }
      }
    }
  },
  created(){
    console.log(this.$route)
    this.couponData = JSON.parse(this.$route.params.data)
  }
}
</script>

<style lang="stylus" scoped>
  .accessCoupon-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .accessCoupon-wrapper >>> .van-nav-bar__title
    font-size: 4vw
    font-family: PFH
    color: #000

  .couponItems
    position: absolute 
    top: 46px
    left: 0
    right: 0
    bottom: 0
    overflow: scroll
    background-color: #F6F7FB
</style>