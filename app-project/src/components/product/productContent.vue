<template>
  <div class="wrapper">
    <ProductSwiper></ProductSwiper>
    <ProductTitle></ProductTitle>
    <ProductDesc></ProductDesc>
  </div>
</template>

<script>
import ProductSwiper from './content/productSwiper'
import ProductTitle from './content/productTitle'
import ProductDesc from './content/productDesc'
export default {
  name: "ProductContent",
  components: {
    ProductSwiper,
    ProductTitle,
    ProductDesc
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 12vw
    overflow-y: scroll
    background-color: #F6F7FB
</style>


