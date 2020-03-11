<template>
  <div class="product-item" @click="handleClick">
    <!-- <img class="product-img" v-lazy="data.cover_img"> -->
    <van-image
      width="44vw"
      height="44vw"
      fit="contain"
      class="product-img"
      lazy-load
      :src="data.cover_img"
      style="-webkit-touch-callout: none"
    />
    <div class="title">
      <span class="text">
        <!-- <span class="text-desc">呱呱特卖</span> -->
        {{data.goods_name}}
        <!-- <span class="text-content"></span> -->
      </span>
      <div class="sale">
        <span>已销{{data.clinch_count}}件</span>
      </div>
      <div class="price-wrapper">
        <span class="price">
          <span class="price-icon">￥</span>
          <span>{{data.price}}</span>
        </span>
        <span v-if="showCancel" class="cancel">{{data.second_price}}</span>
        <span class="limit-buy">立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    data: Object,
    showCancel: Boolean
  },
  methods: {
    handleClick(){
      // console.log('handleClick')
      this.$emit('productItemClick')
    },
    getGoodsName(name){
      let goodsName = name.slice(0,25)
      return goodsName
    }
  }
}
</script>

<style lang="stylus" scoped>
  .product-item
    display: block
    width: 47vw
    background-color: #fff
    margin-bottom: 2vw
    border-radius: 3vw
    overflow: hidden
    .product-img
      display: block
      margin: 2vw auto
      border-radius: 3vw
      overflow: hidden
    .title
      display: flex
      flex-direction: column
      margin: 0 2vw
      min-height: 10vw
      padding-bottom: 3vw
      letter-spacing: .2vw
      font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
      font-weight: bold
      .text
        width: 100%
        // height: 10vw
        font-size: 4vw
        line-height: 5vw
        // font-weight: bold
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 1
        /*! autoprefixer: off */
        -webkit-box-orient: vertical
        overflow: hidden
      .sale
        font-size: 3vw
        font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
        font-weight: bold
        color: #999
        padding: 1vw 0 2vw 0
      .price-wrapper
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        .price
          font-family: hgzt
          font-size: 4.5vw
          color: #FD4140
          text-align: left
          letter-spacing: .1vw
          .price-icon
            font-size: 3vw
        .cancel
          text-decoration: line-through
        .limit-buy
          display: inline-block
          padding: 2vw 2.5vw
          font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
          border-radius: 4vw
          background-color: #FF5756
          // border-radius: 3vw
          color: #fff
</style>