<template>
  <div class="list-header-wrapper">
    <van-nav-bar title="收货地址" right-text="添加" left-arrow @click-left="handleAddressBack" @click-right="handleAddAddress"/>
  </div>
</template>

<script>
export default {
  name: "AddressListHeader",
  methods: {
    //处理返回
    handleAddressBack(){
      this.$router.go(-1)
    },
    //跳转添加地址页面
    handleAddAddress(){
      this.$router.push('/newAddress')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list-header-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .list-header-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH 
  .list-header-wrapper >>> .van-nav-bar__text
    color: #666
    font-family: PFB
</style>