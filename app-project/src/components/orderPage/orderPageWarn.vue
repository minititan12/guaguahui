<template>
  <div class="warn-wrapper">
    <span class="iconfont">&#xe605;</span>
    <span class="warn-text">您没有{{title}}的商品</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "OrderPageWarn",
  data(){
    return {
      titleList: ['待付款','待发货','待收货']
    }
  },
  computed: {
    ...mapState(['orderActive']),
    title(){
      if(this.orderActive > 0){
        return this.titleList[this.orderActive - 1]
      }else{
        return '已下单'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .warn-wrapper
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    margin-top: 1rem
    .iconfont
      color: #666
      font-size: .8rem
      margin-bottom: .3rem
    .warn-text
      font-size: .35rem
</style>