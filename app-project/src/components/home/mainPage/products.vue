<template>
  <div class="wrapper">
    <div class="title">
      <div class="title-part" @click="handleClick(0)">
        <span :class="['part-top',mainProductActive == 0 ? 'top-active' : '']">全部</span>
        <span :class="['part-bottom',mainProductActive == 0 ? 'bottom-active' : '']">猜你喜欢</span>
      </div>
      <div class="middle"></div>
      <div class="title-part" @click="handleClick(1)">
        <span :class="['part-top',mainProductActive == 1 ? 'top-active' : '']">推荐</span>
        <span :class="['part-bottom',mainProductActive == 1 ? 'bottom-active' : '']">好物推荐</span>
      </div>
    </div>
    <div class="product-wrapper">
      <ProductItem v-if="productsList.length > 0" v-for="item of productsList" :data="item"  :key="item.id" @productItemClick="productItemClick(item.id)"/>
    </div>
  </div>
</template>

<script>
import ProductItem from '../../miniComponents/productItem'
import { mapMutations,mapState } from 'vuex'
export default {
  name: "MainProducts",
  components: {
    ProductItem
  },
  props: {
    productsList: Array
  },
  computed: {
    ...mapState(['mainProductActive'])
  },
  methods: {
    ...mapMutations(['changeMainProductActive']),
    //点击跳转产品页面
    productItemClick(id){
      this.$router.push({
        path: '/product',
        query: {
          id: id
        }
      })
    },
    //tab点击
    handleClick(val){
      this.changeMainProductActive(val)
    },
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
      margin-bottom: 4vw
      display: flex
      flex-direction: row
      justify-content: space-around
      .middle
        width: 1.5px
        height: 10vw
        background-color: #ddd
        margin: 0 -10vw
      .title-part
        display: flex
        flex-direction: column
        align-items: center
        .part-top
          font-size: 4.5vw
          font-family: PFH
          margin-bottom: 1vw
        .top-active
          color: #ff5756
        .part-bottom
          font-size: 3.5vw
          font-family: PFM
          color: #aaa
          padding: 1vw
        .bottom-active
          color: #fff
          background-color: #ff5756
          border-radius: 3vw


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


