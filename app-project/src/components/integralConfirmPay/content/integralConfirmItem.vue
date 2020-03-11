<template>
  <div class="confirmItem-wrapper">

    <div class="goodItem">
      <div class="goodItem-img">
        <van-image
          width="25vw"
          height="25vw"
          fit="contain"
          :src="photo"
          style="-webkit-touch-callout: none"
        />
      </div>

      <div class="goodItem-middle">
        <span class="goodItem-title">{{title}}</span>
        <span class="goodItem-desc">{{getDesc()}}</span>
      </div>

      <div class="goodItem-right">
        <div class="right-top">
          <span class="right-icon">-</span>
          <span class="right-price">{{price}}</span>
        </div>
        <span class="right-number">x{{number}}</span>
      </div>
    </div>

    <!-- 底下价格数量描述 -->
    <div class="item-bottom">
      <span class="bottom-number">共 {{number}} 件</span>
      <span class="bottom-text">总计:</span>
      <span class="bottom-icon">-</span>
      <span class="bottom-price">{{getTotalPrice()}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "IntegralConfirmItem",
  computed: {
    ...mapState(['userData','integralProBuyDetail','currentCreditGoodDetail']),
    photo(){
      if(this.integralProBuyDetail){
        this.integralProBuyDetail.photo
      }else{
        return ''
      }
    },
    title(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.base.goods_name
      }else{
        return ''
      }
    },
    price(){
      if(this.integralProBuyDetail){
        let pri = this.integralProBuyDetail.price
        return parseInt(pri)
      }else{
        return 0
      }
    },
    number(){
      if(this.integralProBuyDetail){
        return this.integralProBuyDetail.number
      }
    }
  },
  methods: {
    //获取总价格
    getTotalPrice(){
      if(this.integralProBuyDetail){
        let pri = parseInt(this.integralProBuyDetail.price)
        let num = parseInt(this.integralProBuyDetail.number)
        return pri * num 
      }
    },

    //获取描述
    getDesc(){
      if(this.integralProBuyDetail){
        let skuObj = JSON.parse(this.integralProBuyDetail.sku_key)
        let strAry = []
        for(let key in skuObj){
          let str = key + ': ' + skuObj[key]
          strAry.push(str)
        }

        return strAry.join()
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
  .confirmItem-wrapper
    width: 94%
    font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
    font-weight: bold
    margin: 3vw auto
    color: #000
    background-color: #fff
    border-radius: 3vw
    padding: 5vw 3vw 0 3vw
    box-sizing: border-box
    .goodItem
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-around
      margin-bottom: 3vw
      .goodItem-img
        width: 25vw
        height: 25vw
        border-radius: 3vw
        overflow: hidden
        box-shadow: 0 0 2vw 1vw #eee
      .goodItem-middle
        width: 50%
        font-size: 3.3vw
        display: flex
        margin-left: 2vw
        flex-direction: column
        align-items: flex-start
        .goodItem-title
          margin: 1vw 0
          color: #444
        .goodItem-desc
          font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
          color: #B9B9B9
          margin-top: 3vw
      .goodItem-right
        display: flex
        flex-direction: column
        align-items: flex-end
        .right-top 
          display: flex
          flex-direction: row
          align-items: center
          .right-icon
            font-size: 3.5vw
          .right-price
            font-size: 3.5vw
            font-family: hgzt
        .right-number
          color: #B9B9B9
          font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif

    .item-bottom
      width: 100%
      height: 10vw
      display: flex
      flex-direction: row
      justify-content: flex-end
      align-items: center
      .bottom-number
        font-size: 3vw
        margin-right: 2vw
      .bottom-icon
        font-size: 3vw
        margin-left: 1vw
        color: #FE5655
      .bottom-price
        font-size: 4vw
        font-family: hgzt
        color: #FE5655
</style>