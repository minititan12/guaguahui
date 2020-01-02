<template>
  <div class="Masking-wrapper" v-if="showMasking" @click="handleMaskingShow">
    <div class="swipe-wrapper">
      <van-swipe>
        <van-swipe-item v-if="swipeList.length > 0" v-for="(image, index) in swipeList" :key="index">
          <!-- <img class="swipe-img" :src="image" /> -->
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
  name: "ImgMasking",
  computed:{
    ...mapState(['showMasking','currentProductData']),
    swipeList(){
      if(this.currentProductData && this.currentProductData.hasOwnProperty('photo')){
        return this.currentProductData.photo
      }
    }
  },
  methods: {
    ...mapMutations(['changeShowMasking']),
    handleMaskingShow(){
      console.log('handleMaskingShow')
      this.changeShowMasking(false)
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