<template>
  <div class="page-content-wrapper">
    <OrderPageHeader></OrderPageHeader>
    <OrderPageItem 
      @hideWarn="handleHideWarn" 
      @showWarn="handleShowWarn"
    />
    <OrderPageWarn v-show="showWarn"></OrderPageWarn>
  </div>
</template>

<script>
import OrderPageHeader from './orderPageHeader'
import OrderPageItem from './orderPageItem'
import OrderPageWarn from './orderPageWarn'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'OrderPageContent',
  components: {
    OrderPageHeader,
    OrderPageItem,
    OrderPageWarn
  },
  data(){
    return {
      showWarn: false
    }
  },
  computed: {
    ...mapState(['orderList'])
  },
  methods: {
    handleShowWarn(){
      this.showWarn = true
    },
    handleHideWarn(){
      this.showWarn = false
    }
  },
  watch:{
    orderList(){
      if(this.orderList.length > 0){
        this.showWarn = false
      }
    }
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