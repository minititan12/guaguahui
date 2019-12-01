<template>
  <div class="cart-wrapper">
      <CartItems @delItemToRefresh="delItemToRefresh"></CartItems>
      <CartBottom></CartBottom>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CartItems from './cartItems'
import CartBottom from './cartBottom'
import axios from 'axios'
export default {
  name: "ShoppingCart",
  components: {
    CartItems,
    CartBottom
  },
  methods: {
    delItemToRefresh(){
      this.$emit('delItemToRefresh')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cart-wrapper
    position: fixed
    top: 12vw
    left: 0
    right: 0
    bottom: 12vw
    background-color: #F6F7FB
</style>

