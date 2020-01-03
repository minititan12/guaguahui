<template>
  <div class="normalProduct-wrapper">
    <ProductContent></ProductContent>
    <ProductFooter></ProductFooter>
  </div>
</template>

<script>
import ProductContent from '../../components/product/productContent'
import ProductFooter from '../../components/product/productFooter'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "NormalProduct",
  components: {
    ProductContent,
    ProductFooter
  }
}
</script>

<style lang="stylus" scoped>
  .normalProduct-wrapper
    width: 100%
    height: 100%

</style>


