<template>
  <div class="popup-Header">
    <div class="header-img">
      <van-image
        width="25vw"
        height="25vw"
        fit="contain"
        :src="currentImg"
      />
    </div>
    <div class="header-right">
      <div class="price">
        <span class="icon">￥</span>
        <span class="text">{{price}}</span>
      </div>
      <span class="piece">库存{{stock}}件</span>
      <span class="title">选择 分类</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "PoPUpHeader",
  data(){
    return {
      currentImg: ""
    }
  },
  computed: {
    ...mapState(['currentProductPopUpImg','currentProductData','currentProductPopUpStock','currentBuyDetail']),
    price(){
      if(this.currentBuyDetail){
        return this.currentBuyDetail.price
      }else if (this.currentProductData){
        return this.currentProductData.price
      }else{
        return 0
      }
    },
    stock(){
      if(this.currentBuyDetail){
        let stock = parseFloat(this.currentBuyDetail.stock)
        if(this.currentBuyDetail.stock && this.currentBuyDetail.stock > 0){
          stock = this.currentBuyDetail.stock
        }else{
          stock = 0
        }
        return stock
      }else if (this.currentProductData){
        return this.currentProductData.amount
      }else{
        return 0
      }
    }
  },
  watch: {
    currentProductPopUpImg(){
      if(this.currentProductPopUpImg && this.currentProductPopUpImg.length > 0){
        this.currentImg = this.currentProductPopUpImg
      }
    }
  },
  created(){
    if(this.currentProductData){
      this.currentImg = this.currentProductData.cover_img
    }
  }
}
</script>

<style lang="stylus" scoped>
  .popup-Header
    width: 100%
    height: 30vw
    display: flex
    flex-direction: row
    align-items: center
    margin-bottom: .2rem
    .header-img
      height: 25vw
      width: 25vw
      margin: 0 2.5vw
      border-radius: .1rem
      overflow: hidden
    .header-right
      display: flex
      flex-direction: column
      span 
        margin-bottom: .2rem
      .piece
        font-size: .2rem
        color: #777
      .title
        font-size: .2rem
      .price
        font-family: hgzt
        color: #FF5103
        margin-bottom: .2rem
        .icon
          font-size: .2rem
          margin-right: .1rem
        .text
          font-size: .4rem
</style>


