<template>
  <div class="wrapper">
    <div class="title">
      <!-- <span>为你推荐</span> -->
      <van-divider :style="{ fontSize: '.4rem' , color: 'black', borderColor: 'black', padding: '0 16px' }">
        为你推荐
      </van-divider>
    </div>
    <div class="product-wrapper">
      <ProductItem v-if="productsList.length > 0" v-for="item of productsList" :data="item"  :key="item.id" @productItemClick="productItemClick(item.id)"/>
    </div>
  </div>
</template>

<script>
import ProductItem from '../../miniComponents/productItem'
export default {
  name: "MainProducts",
  components: {
    ProductItem
  },
  props: {
    productsList: Array
  },
  methods: {
    //点击跳转产品页面
    productItemClick(id){
      this.$router.push({
        path: '/product',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .van-divider
    margin-top: 0
  .wrapper
    width: 100%
    min-height: 100vh
    .title
      font-size: .4rem
      font-weight: bold
      text-align: center
      margin-bottom: .4rem
    .product-wrapper
      width: 100%
      min-height: 100vw
      display: flex
      flex-direction: row
      flex-wrap: wrap
      justify-content: space-between
      padding: 0 2vw
      box-sizing: border-box
</style>


