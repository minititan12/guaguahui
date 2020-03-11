<template>
  <div class="title-wrapper">
    <van-skeleton
      title
      :row="15"
      :loading="loading"
    >

      <div class="top">
        <!-- 标题 -->
        <div class="title">
          {{title}}
        </div>

        <!-- 产品价格 -->
        <div class="price">
          <span class="price-icon">￥</span>
          <span class="price-text">{{price}}</span>
          <span class="price-cancel" v-if="showCancel">原价: {{currentProductData.second_price}}</span>
        </div>

        <!-- 优惠劵 -->
        <div class="coupon">
          <div class="icons">
            <span v-for="item of couponDesc">
              {{item}}
            </span>
          </div>

          <div class="more-coupon" @click="handleToGetCoupon">
            <span>更多优惠劵</span>
            <van-icon name="arrow" />
          </div>
        </div>

      </div>

      <ProductProps />

      <TitleShop />

      <Serve/>

      <ProductComment/>

      <BackHome v-if="!is_app()" />
    
    </van-skeleton>
  </div>
</template>

<script>
import { getAllShopsCoupons } from '../../../utils/axios/request'
import ProductComment from './title/productComment'
import ProductProps from './title/productProps'
import TitleShop from './title/titleShop'
import Serve from './title/serve'
import BackHome from './title/backHome'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "ProductTitle",
  components: {
    ProductComment,
    ProductProps,
    TitleShop,
    Serve,
    BackHome
  },

  data(){
    return {
      loading: true,
      goodCouponData: null,
      couponDesc: []
    }
  },

  computed:{
    ...mapState(['currentProductData']),
    //产品价格
    price(){
      if(this.currentProductData){
        return this.currentProductData.price
      }
    },

    //显示划掉的原价
    showCancel(){
      if(this.currentProductData && this.currentProductData.hasOwnProperty('second_price')){
        return true
      }else{
        return false
      }
    },

    //显示产品原价
    showOriginPrice(){
      if(this.currentProductData && this.currentProductData.flag == 1){
        if(this.currentProductData.discount != '1'){
          return true
        }
      }
      return false
    },

    //产品的标题
    title(){
      if(this.currentProductData){
        return this.currentProductData.goods_name
      }
    }
  },

  methods:{
    //是不是在app中
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      
      return false;
    },
    //获取优惠券描述
    getCouponDesc(){
      if(this.goodCouponData){
        let result = []

        for(let item of this.goodCouponData.list){
          let desc = '满'+ item.full + '减' + item.value 
          result.push(desc)
        }

        this.couponDesc = result.slice(0,2)
      }
    },
    //获取商店优惠券列表
    getGoodCouponData(){
      let postData = {
        company_id: this.currentProductData.user_id,
        goods_id: this.currentProductData.id
      }

      getAllShopsCoupons(postData)
        .then((res)=>{
          console.log('getAllShopsCoupons',res.data)
          if(res.data.code ==1){
            this.goodCouponData = res.data.data
            this.$nextTick(()=>{
              this.getCouponDesc()
            })
          }
        })
        .catch((err)=>{
          console.log('getAllShopsCoupons err',err)
        })
    },
    //跳转领取优惠券
    handleToGetCoupon(){
      this.$router.push({
        path: '/getCoupon',
        query:{
          shop_id: this.currentProductData.user_id,
          good_id: this.currentProductData.id
        }
      })
    }
  },

  watch: {
    currentProductData(){
      if(this.currentProductData){
        this.loading = false
      }
    }
  },

  created(){
    this.getGoodCouponData()
  },

  mounted(){
    if(this.currentProductData){
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>

  .title-wrapper
    width: 100%
    color: #000
    margin-top: 2vw
    position: relative
    z-index: 1
    .top
      width: 94%
      padding: 2vw 0
      background-color: #fff
      margin: 0 auto
      border-radius: 3vw
      .title
        min-height: 6vw
        max-height: 12vw
        margin: 0 4vw 2vw 4vw
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
        font-size: 4.5vw
        line-height: 6vw
        letter-spacing: .2vw
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden
      .price
        color: #FF4D51
        margin: 0 4vw 2vw 4vw
        .price-icon
          font-size: 3.5vw
          font-family: hgzt
        .price-text
          font-size: 5vw
          font-family: hgzt
        .price-cancel
          color: #aaa
          font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
          margin-left: 4vw
          text-decoration: line-through
      .coupon
        margin: 4vw 4vw 2vw 4vw
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        .icons
          span 
            display: inline-block
            color: #fff
            background-color: #FF5756
            margin-right: 2vw
            font-size: 3.5vw
            padding: 2vw 3vw
            border-radius: 3vw
        .more-coupon
          display: flex
          flex-direction: row
          align-items: center
          font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
          font-weight: bold
          font-size: 3.5vw
          color: #969799
          padding: 2vw 0
      .groupBuy
        margin: 3vw 4vw 2vw 4vw
        .groupBuy-num
          font-size: 3.5vw
          padding-bottom: 3vw
          color: #666
        .icons
          display: flex
          flex-direction: row
          .icon-jt
            margin: 0 3vw
          .icon
            display: flex
            flex-direction: column
            align-items: center
            .icon-text
              margin-top: 3vw
              font-size: 3.5vw
              font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
</style>


