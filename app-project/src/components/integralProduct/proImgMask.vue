<template>
  <div class="Masking-wrapper" v-if="showProMask" @click="closeMaskingShow">
    <div class="swipe-wrapper">
      <van-swipe>
        <van-swipe-item v-if="swipeList.length > 0" v-for="(image, index) in swipeList" :key="index">
          <van-image
            width="100vw"
            height="120vw"
            fit="contain"
            :src="image"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: "ProImgMask",
  computed:{
    ...mapState(['showProMask','currentCreditGoodDetail']),
    swipeList(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.base.goods_photo
      }
    }
  },
  methods: {
    ...mapMutations(['changeShowProMask']),
    closeMaskingShow(){
      this.changeShowProMask(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .Masking-wrapper
    position: absolute 
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 5
    background-color: rgba(0,0,0,0.98)
    display: flex
    align-items: center
    .swipe-wrapper
      width: 100%
      // .swipe-img
      //   width: 100%
      //   display: block
</style>