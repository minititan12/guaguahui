<template>
  <div class="page-content-wrapper">
    <OrderPageHeader></OrderPageHeader>
    <OrderPageItem />
  </div>
</template>

<script>
import OrderPageHeader from './orderPageHeader'
import OrderPageItem from './orderPageItem'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'OrderPageContent',
  components: {
    OrderPageHeader,
    OrderPageItem
  }
}
</script>

<style lang="stylus" scoped>
  .page-content-wrapper
    width: 100%
    min-height: 100vh
    background-color: #eee
    position: absolute 
    top: 0
    left: 0
</style>