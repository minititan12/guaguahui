<template>
  <div class="limitMore-wrapper">
    <div class="limitMore" @click="handleTomore">
      <img :src="moreImg" alt="">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:"LimitMore",
  props: {
    seckillData: Object
  },
  data(){
    return {
      moreImg: "/public/uploads/miaosha.png"
    }
  },
  methods:{
    //点击图片跳转限购页面
    handleTomore(){
      // console.log('查看更多')
      this.$router.push({
        path: '/limitBuy',
        query: {
          seckill_id: this.seckillData.seckill_id
        }
      })
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