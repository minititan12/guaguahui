<template>
  <div class="GroupProduct-wrapper">
    <SeckillProductContent></SeckillProductContent>
    <SeckillFooter></SeckillFooter>
  </div>
</template>

<script>
import SeckillProductContent from '../../components/product/seckillProductContent'
import SeckillFooter from '../../components/product/seckillFooter'
export default {
  name: "SeckillProduct",
  components: {
    SeckillProductContent,
    SeckillFooter
  }
}
</script>

<style lang="stylus" scoped>
  .GroupProduct-wrapper
    width: 100%
    height: 100%
</style>


