<template>
  <div class="title-wrapper">
    <van-skeleton
      title
      :row="10"
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

    <ProductProps v-if="type == 1"></ProductProps>

    <div class="groupBuy-rules" v-if="type == 2">
      <span class="title">拼团规则</span>
      <span class="text">拼团时间24小时,过期没有成团,自动作废,支付金额退回到余额</span>
    </div>

    <div class="title-shop">
      <div class="shop-top">
        <div class="top-left">
          <van-image
            class="left-img"
            width="20vw"
            height="20vw"
            fit="contain"
            :src="shopImg"
          />
          <span>{{shopName}}</span>
        </div>

        <div class="top-right" @click="handleToshop">
          <span>进去逛逛</span>
        </div>
      </div>

      <div class="shop-bottom">
        <div>
          <span>商品描述:</span>
          <span class="bottom-score">4.92</span>
        </div>
        
        <div>
          <span>卖家服务:</span>
          <span class="bottom-score">4.88</span>
        </div>

        <div>
          <span>物流服务:</span>
          <span class="bottom-score">4.90</span>
        </div>
      </div>
    </div>

    <GroupList v-if="type == 2"></GroupList>

    <div class="serve">
      <van-cell @click="showServePopUp" is-link>
        <template slot="title">
          <span class="custom-title">服务</span>
          <div class="serve-item">
            <van-icon color="red" name="passed" />
            <span>全场包邮</span>
          </div>
          <div class="serve-item">
            <van-icon color="red" name="passed" />
            <span>极速发货</span>
          </div>
          <div class="serve-item">
            <van-icon color="red" name="passed" />
            <span>售后保障</span>
          </div>
          <div class="serve-item">
            <van-icon color="red" name="passed" />
            <span>七天无理由</span>
          </div>
          
        </template>
      </van-cell>
    </div>

    <!-- <ProductDetail/> -->

    <ProductComment/>

    <div class="to-home">
      <van-cell v-if="!is_app()" @click="handleToHome" title="呱呱汇首页" is-link/>
    </div>
    
    </van-skeleton>

    <!-- <div class="gray"></div> -->
    <!-- <div class="pay-item">
      <span class="iconfont zhifubao">&#xe601;</span>
      <span class="pay-text">支付宝支付</span>
      <span class="iconfont weixin">&#xe600;</span>
      <span class="pay-text">微信支付</span>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import ProductDetail from './productDetail'
import ProductComment from './productComment'
import ProductProps from './productProps'
import GroupList from './groupList'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "ProductTitle",
  components: {
    ProductDetail,
    ProductComment,
    ProductProps,
    GroupList
  },
  data(){
    return {
      loading: true 
    }
  },
  computed:{
    ...mapState(['currentProductData','currentBuyDetail']),
    price(){
      if(this.currentBuyDetail){
        return this.currentBuyDetail.price
      }else if(this.currentProductData){
        return this.currentProductData.price
      }
    },
    showCancel(){
      if(this.currentProductData && this.currentProductData.hasOwnProperty('second_price')){
        return true
      }else{
        return false
      }
    },
    type(){
      if(this.currentProductData){
        return this.currentProductData.flag
      }
    },
    title(){
      if(this.currentProductData){
        return this.currentProductData.goods_name
      }
    },
    shopImg(){
      if(this.currentProductData){
        let shopImg = this.currentProductData.hasOwnProperty('shop') ? ('/public' + this.currentProductData.shop.shop_img) : ''
        return shopImg
      }else{
        return ''
      }
    },
    shopName(){
      if(this.currentProductData){
        let shopName = this.currentProductData.hasOwnProperty('shop') ? this.currentProductData.shop.company : ''
        return shopName
      }else{
        return ''
      }
    }
  },
  methods:{
    ...mapMutations(['openPopup','updateServePopUp','changeTab']),
    showServePopUp(){
      setTimeout(()=>{
        this.updateServePopUp(true)
      },200)
    },
    handleToHome(){
      this.changeTab(1)
      this.$router.push({
        path: '/'
      })
    },
    handleToshop(){
      this.$router.push({
        path: '/shop',
        query: {
          shopID: this.currentProductData.user_id
        }
      })
    },
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
  .title-wrapper >>> .placeholder
    width: 100vw
    min-height: 100vw
  .title-wrapper >>> .left-img
    margin-right: .2rem
  .title-wrapper >>> .gray
    width: 100vw
    height: .2rem
    background-color: #eee
  .title-wrapper >>> .van-cell__title
    display: flex
    align-items: center
    font-size: 3.2vw
  .title-wrapper >>> .custom-title
    margin-right: 1vw
  .title-wrapper >>> .serve-item
    display: inline-flex
    align-items: center
    padding-top: 1vw
    margin-right: 1vw
    .van-icon
      font-size: 3.5vw
    span
      color: #aaa
    
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
    
    .groupBuy-rules
      width: 94%
      margin: 2vw auto
      background-color: #fff
      display: flex
      flex-direction: column
      padding: 3vw
      box-sizing: border-box
      letter-spacing: .3vw
      font-family: PFM
      border-radius: 3vw
      .title
        font-size: 3.8vw
        font-family: PFB
        margin-bottom: 2vw
      .text
        color: #999
        font-size: 3.5vw

    .title-shop
      width: 94%
      background-color: #fff
      margin: 2vw auto
      border-radius: 3vw
      padding: 3vw
      box-sizing: border-box
      display: flex
      flex-direction: column
      .shop-top
        margin-bottom: 3vw
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        .top-left
          display: flex
          flex-direction: row
          align-items: center
          font-family: PFH
          span 
            font-size: 4vw
        .top-right
          font-size: 3.5vw
          line-height: 7vw
          color: #FF4D51
          padding: 0 3vw
          background-color: #fff
          font-family: PFM
          border: 1px solid #FF4D51
          border-radius: 4vw
      .shop-bottom
        display: flex
        flex-direction: row
        justify-content: space-between
        font-family: PFB
        font-size: 3.8vw
        .bottom-score
          color: #FF4D51
          margin-left: .1rem
          font-family: hgzt

    .to-home
      width: 94%
      margin: 2vw auto
      border-radius: 3vw
      overflow: hidden
      .van-cell__title
        font-family: PFH
        font-size: 3.5vw
      
    .serve
      width: 94%
      margin: 2vw auto
      border-radius: 3vw
      overflow: hidden
      .van-cell
        align-items: center
        font-family: PFB
        .van-cell__title
          align-items: center

    .pay-item
      padding: .25rem 4vw
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      .pay-text
        font-size: .2rem
        margin: 0 .1rem
      .zhifubao
        color: #1296DB
      .weixin
        color: #427E43

    .attribute-item
      padding: 3vw 4vw
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
    .attribute-item >>> .van-icon
      font-size: 16px
      color: #969799
      .text
        margin-right: .1rem

    // .custom-title
    //   font-size: 3.8vw
    //   margin-right: 3vw
</style>


