<template>
  <div class="addressHeader-wrapper">
    <van-nav-bar title="新建收货地址" left-arrow @click-left="handleBack"/>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: "NewAddressHeader",
  methods: {
    //返回
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .addressHeader-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .addressHeader-wrapper >>> .van-nav-bar__title
    color: #000
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
    font-size: 4vw
</style>