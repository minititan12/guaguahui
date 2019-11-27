<template>
  <div class="limitMore-wrapper">
    <div class="limitMore" @click="handleTomore">
      <img :src="moreImg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:"LimitMore",
  data(){
    return {
      moreImg: "/public/uploads/miaosha.png"
    }
  },
  methods:{
    //点击图片跳转限购页面
    handleTomore(){
      // console.log('查看更多')
      this.$router.push('/limitBuy')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .limitMore-wrapper
    width: 100vw
    padding: 3vw 0
    .limitMore
      width: 100%
      min-height: 20vw
      img
        width: 100%
</style>