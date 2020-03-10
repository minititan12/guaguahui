<template>
  <div class="icon-wrapper">
    <van-image
      width="49%"
      fit="contain"
      class="left"
      :src="oneUrl"
      @click="handleToGroupBuy"
      style="-webkit-touch-callout: none"
    />

    <van-image
      width="49%"
      fit="contain"
      :src="twoUrl"
      @click="handleToCutPrice"
      style="-webkit-touch-callout: none"
    />
  </div>
</template>

<script>
export default {
  name: 'MarketingIcon',
  data(){
    return {
      oneUrl: '/public/static_app/index/images/pingtuan_index.png',
      twoUrl: '/public/static_app/index/images/bargin_index.png'
    }
  },
  methods: {
    handleToGroupBuy(){
      this.$router.push({
        path: "/groupBuy"
      })
    },
    handleToCutPrice(){
      this.$router.push({
        path: "/cutPrice"
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .icon-wrapper
    width: 93vw
    margin: 2vw auto
    .left
      border-right: 1px solid #ddd
</style>