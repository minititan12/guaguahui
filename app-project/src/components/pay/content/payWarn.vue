<template>
  <div class="pay-warn">
    <div class="warn-item" v-if="showAddressWarn">
      <span class="warn-text">请先设置默认地址</span>
      <span class="warn-btn" @click="handleToAddress">收货地址管理</span>
    </div>
    <div class="warn-item" v-if="showPayListWarn">
      <span class="warn-text">请先添加商品</span>
      <span class="warn-btn" @click="handleToCart">购物车</span>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: "PayWarn",
  computed: {
    ...mapState(['confirmData','defaultAddress']),
    showAddressWarn(){
      if(this.defaultAddress.code == 0){
        return true
      }else{
        return false
      }
    },
    showPayListWarn(){
      if(this.confirmData.length > 0){
        return false
      }else{
        return true
      }
    }
  },
  methods: {
    ...mapMutations(['changeTab']),
    handleToAddress(){
      this.$router.push('/addressList')
    },
    handleToCart(){
      this.$router.push('/')
      this.changeTab(4)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .pay-warn
    width: 100%
    .warn-item
      width: 100%
      margin: .5rem 0
      display: flex
      flex-direction: column
      align-items: center
      .warn-text
        font-size: .35rem
        margin-bottom: .1rem
      .warn-btn
        width: 2rem
        height: .8rem
        background-color: #E41436
        text-align: center
        line-height: .8rem
        border-radius: .2rem
        color: #FAC0CA
        margin-top: .2rem
</style>