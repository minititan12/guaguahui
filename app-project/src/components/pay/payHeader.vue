<template>
  <div class="payHeader-wrapper">
    <van-nav-bar title="确认订单" left-arrow @click-left="handleBackClick"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "PayHeader",
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .payHeader-wrapper >>> .van-icon
    color: #ff5756
    font-size: 5vw
  
  .payHeader-wrapper >>> .van-nav-bar__title
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
    font-size: 4vw
</style>
