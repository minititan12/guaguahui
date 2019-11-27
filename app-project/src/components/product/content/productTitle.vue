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

        <!-- 拼团 -->
        <div class="groupBuy" v-if="type == 2">
          <div class="groupBuy-num">
            <span>累计已拼2.8万件</span>
          </div>
          <div class="icons">
            <div class="icon">
              <van-image width="6vw" fit="contain" src="/images/tzkt.png"/>
              <span class="icon-text">团长开团</span>
            </div>
            <van-image class="icon-jt" width="4vw" fit="contain" src="/images/jt.png"/>

            <div class="icon">
              <van-image width="6vw" fit="contain" src="/images/yqhy.png"/>
              <span class="icon-text">邀请好友</span>
            </div>
            <van-image class="icon-jt" width="4vw" fit="contain" src="/images/jt.png"/>

            <div class="icon">
              <van-image width="6vw" fit="contain" src="/images/ptcg.png"/>
              <span class="icon-text">拼团成功</span>
            </div>
          </div>
        </div>

        <!-- 优惠劵 -->
        <div class="coupon" v-if="type == 1">
          <div class="icons">
            <span>下单立减20元</span>
            <span>满400减20</span>
          </div>

          <div class="more-coupon">
            <span>更多优惠劵</span>
            <van-icon name="arrow" />
          </div>
        </div>

      </div>

      <ProductProps v-if="type == 1"/>

      <GroupRules v-if="type==2"/>

      <TitleShop />

      <GroupList v-if="type == 2" />

      <Serve/>

      <!-- <ProductDetail/> -->

      <ProductComment/>

      <BackHome v-if="!is_app()" />
    
    </van-skeleton>
  </div>
</template>

<script>
import axios from 'axios'
import ProductDetail from './title/productDetail'
import ProductComment from './title/productComment'
import ProductProps from './title/productProps'
import TitleShop from './title/titleShop'
import GroupList from './title/groupList'
import GroupRules from './title/groupRules'
import Serve from './title/serve'
import BackHome from './title/backHome'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "ProductTitle",
  components: {
    ProductDetail,
    ProductComment,
    ProductProps,
    TitleShop,
    GroupList,
    GroupRules,
    Serve,
    BackHome
  },

  data(){
    return {
      loading: true 
    }
  },

  computed:{
    ...mapState(['currentProductData','currentBuyDetail']),
    //产品价格
    price(){
      if(this.currentBuyDetail){
        return this.currentBuyDetail.price
      }else if(this.currentProductData){
        return this.currentProductData.price
      }
    },

    //是否显示产品原价
    showCancel(){
      if(this.currentProductData && this.currentProductData.hasOwnProperty('second_price')){
        return true
      }else{
        return false
      }
    },

    //产品的类型(1正常2拼团)
    type(){
      if(this.currentProductData){
        return this.currentProductData.flag
      }
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
    }
  },

  watch: {
    currentProductData(){
      if(this.currentProductData){
        this.loading = false
      }
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
        margin: 0 4vw
        padding-bottom: 2vw
        font-family: PFH
        font-size: 4.5vw
        letter-spacing: .2vw
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        line-height: 6vw
        min-height: 8vw
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
          font-family: PFM
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
          font-family: PFB
          font-size: 3.5vw
          color: #969799
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
              font-family: PFM
</style>


