<template>
  <div class="GroupProduct-wrapper">
    <SeckillProductContent></SeckillProductContent>
    <ProductFooter></ProductFooter>
  </div>
</template>

<script>
import SeckillProductContent from '../../components/product/seckillProductContent'
import ProductFooter from '../../components/product/productFooter'
export default {
  name: "SeckillProduct",
  components: {
    SeckillProductContent,
    ProductFooter
  }
}
</script>

<style lang="stylus" scoped>
  .GroupProduct-wrapper
    width: 100%
    height: 100%
</style>


