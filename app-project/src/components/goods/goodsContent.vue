<template>
  <div class="goods-content-wrapper">
    <GoodsHeader></GoodsHeader>
    <GoodsItem></GoodsItem>
  </div>
</template>

<script>
import GoodsHeader from './goodsHeader'
import GoodsItem from './goodsItem'
export default {
  name: "GoodsContent",
  components: {
    GoodsHeader,
    GoodsItem
  }
}
</script>

<style lang="stylus" scoped>
  .goods-content-wrapper
    width: 100%
    min-height: 100vh
    background-color: #eee
</style>