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
    ...mapState(['currentProductPopUpImg','currentProductData','currentProductPopUpStock','currentBuyDetail','groupGoodsDes','bargainData']),
    price(){
      if(this.currentProductData){
        let flag = this.currentProductData.flag

        if(flag == 1){
          if(this.currentBuyDetail){
            return this.currentBuyDetail.price
          }else{
            return this.currentProductData.price
          }
        }

        if(flag == 2){
          if(this.groupGoodsDes){
            return this.groupGoodsDes.group_price
          }
        }

        if(flag == 3){
          return this.currentProductData.spike_price
        }

        if(flag == 4){
          if(this.bargainData){
            return this.bargainData.bargin_price
          }
        }
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
    .header-img
      height: 25vw
      width: 25vw
      margin: 0 4vw 0 3vw
      border-radius: 2vw
      overflow: hidden
    .header-right
      display: flex
      flex-direction: column
      font-family: PFB
      .price
        font-family: hgzt
        color: #FF5756
        margin-bottom: 3vw
        .icon
          font-size: 3vw
        .text
          font-size: 5vw
      .piece
        font-size: 3vw
        color: #777
        margin-bottom: 2vw
      .title
        font-size: 3vw
        margin-bottom: 3vw
</style>


