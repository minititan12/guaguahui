<template>
  <div class="serviceHeader-wrapper">
    <van-nav-bar :title="title" left-arrow @click-left="handleBackClick">
      <div class="right-wrapper" slot="right">
        <span class="iconfont">&#xe67f;</span>
        <span class="right-text" @click="handleToShop">店铺</span>
      </div>
    </van-nav-bar>
    <div class="br"></div>
  </div>
</template>

<script>
export default {
  name:"ServiceHeader",
  computed:{
    title(){
      return this.$route.query.shopName
    }
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    handleToShop(){
      let id = this.$route.query.id
      this.$router.push({
        path: '/shop',
        query: {
          shopID: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .serviceHeader-wrapper >>> .van-icon-arrow-left
    &:before
      color: #666
  .serviceHeader-wrapper >>> .right-wrapper
    height: 46px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    .iconfont
      height: 20px
      line-height: 20px
      font-size: 20px
    .right-text
      height: 14px
      line-height: 14px
      font-size: 10px
  .serviceHeader-wrapper
    position: fixed
    top: 0
    left: 0
    width: 100%
    .br
      width: 100%
      height: .01rem
      background-color: #ddd
</style>