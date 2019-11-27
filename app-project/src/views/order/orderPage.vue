<template>
  <div class="order-page-wrapper">
    <OrderPageContent></OrderPageContent>
  </div>
</template>

<script>
import OrderPageContent from '../../components/orderPage/orderPageContent'
import { mapMutations } from 'vuex'
export default {
  name: "OrderPage",
  components: {
    OrderPageContent
  },
  methods: {
    ...mapMutations(['changeTab'])
  },
  beforeRouteLeave (to, from, next) {
    console.log(to,from)
    if(to.name == 'pay'){
      this.changeTab(1)
      this.$router.push('/')
    }else{
      next()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>