<template>
  <div class="getCoupon-wrapper">
    <van-nav-bar
      title="领取优惠券"
      left-arrow
      @click-left="handleBack"
    />

    <div class="coupon-items">
      <CouponItem @get="handleGetCoupon(item)" :showBtn="true" :data="item" v-if="couponList.length > 0" v-for="item of couponList" />
    </div>
  </div>
</template>

<script>
import { getAllShopsCoupons,getCoupons } from '../../utils/axios/request'
import CouponItem from '../../components/miniComponents/couponItem'
import { mapState } from 'vuex'
export default {
  name: "GetCoupon",
  components: {
    CouponItem
  },
  data(){
    return {
      couponList: []
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    //获取商店优惠券列表
    getShopCouponData(){

      let goods_id = 0
      if(this.$route.query.hasOwnProperty('good_id')){
        goods_id = this.$route.query.good_id
      }
      
      let postData = {
        company_id: this.$route.query.shop_id,
        goods_id: goods_id
      }

      getAllShopsCoupons(postData)
        .then((res)=>{
          console.log('getAllShopsCoupons',res.data)
          if(res.data.code ==1){
            this.couponList = res.data.data.list
          }
        })
        .catch((err)=>{
          console.log('getAllShopsCoupons err',err)
        })
    },
    //领取优惠券
    handleGetCoupon(data){
      console.log('getCoupon')
      let postData = {
        company_id: data.company_id,
        user_id: this.userData.id,
        coupon_id: data.id,
      }

      getCoupons(postData)
        .then((res)=>{
          console.log('getCoupons',res.data)
          if(res.data.code == 1){
            this.$toast({
              message: '领取成功',
              type: 'success',
              duration: 1200
            })
          }
          if(res.data.code == -1){
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1200
            })
          }
        })
        .catch((err)=>{
          console.log('getCoupons err',err)
        })
    }
  },
  created(){
    this.getShopCouponData()
  }
}
</script>

<style lang="stylus" scoped>
  .getCoupon-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .getCoupon-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold

  .coupon-items
    position: absolute 
    top: 46px
    left: 0
    right: 0
    bottom: 0
    background-color: #F6F7FB
    overflow: scroll
</style>