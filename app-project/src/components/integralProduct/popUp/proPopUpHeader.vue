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
  name: "ProPopUpHeader",
  data(){
    return {
      currentImg: ""
    }
  },
  computed: {
    ...mapState(['currentCreditGoodDetail','proPopUpImg','integralProBuyDetail']),
    price(){
      if(this.currentCreditGoodDetail){
        let pri = this.currentCreditGoodDetail.base.price
        if(this.integralProBuyDetail){
          pri = this.integralProBuyDetail.price
        }
        return parseInt(pri)
      }
    },
    proPopUpImg(){
      if(this.proPopUpImg && this.proPopUpImg.length > 0){
        this.currentImg = this.proPopUpImg
      }
    },
    stock(){
      let stock = 0
      if(this.integralProBuyDetail){
        stock = this.integralProBuyDetail.store
      }

      return stock
    }
  },
  created(){
    if(this.currentCreditGoodDetail){
      this.currentImg = this.currentCreditGoodDetail.base.goods_cover
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
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
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


