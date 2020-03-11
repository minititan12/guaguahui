<template>
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "TitleShop",
  computed:{
    ...mapState(['currentProductData']),
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
  methods: {
    //切换到商店页面
    handleToshop(){
      this.$router.push({
        path: '/shop',
        query: {
          shopID: this.currentProductData.user_id
        }
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
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
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
        .left-img
          margin-right: 3vw
        span 
          font-size: 4vw
      .top-right
        font-size: 3.5vw
        line-height: 7vw
        color: #FF4D51
        padding: 0 3vw
        background-color: #fff
        font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
        border: 1px solid #FF4D51
        border-radius: 4vw
    .shop-bottom
      display: flex
      flex-direction: row
      justify-content: space-between
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
      font-size: 3.8vw
      .bottom-score
        color: #FF4D51
        margin-left: .1rem
        font-family: hgzt
</style>