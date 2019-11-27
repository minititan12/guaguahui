<template>
  <div class="payHeader-wrapper">
    <van-nav-bar title="结算" left-arrow @click-left="handleBackClick"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "PayHeader",
  methods: {
    ...mapMutations(['initConfirmList','initComfirmTotalPrice']),
    handleBackClick(){
      this.initConfirmList()
      this.initComfirmTotalPrice()
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .payHeader-wrapper >>> .van-icon
      color: #E31436
      font-size: 20px
</style>
