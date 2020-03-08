<template>
  <div class="swiper-wrapper">
    <swiper :options="swiperOption" ref="mySwiper" v-if="productSwiperList" @click.native="handleClick">
      <!-- slides -->
      <swiper-slide v-for="item of productSwiperList" :key="item">
        <!-- <img class="swiper-img" :src="item" /> -->
        <van-image
          width="100vw"
          height="70vw"
          style="background-color: #F6F7FB"
          fit="contain"
          :src="item"
        />
      </swiper-slide>
      <!-- Optional controls -->
    </swiper>
    <div class="showPage">
      <span>{{swiperIndex + 1}}</span>
      <span class="showPage_icon">/</span>
      <span>{{allPages}}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'ProductSwiper',
  data(){
    const that = this
    return {
      swiperOption: {
        loop: false,
        slidesPerView: 1,
        on: {
          slideChange: function(){
            that.swiperIndex = this.realIndex
          }
        }
      },
      swiperIndex: 0,
    }
  },
  computed: {
    ...mapState(['currentProductData']),
    //轮播图列表
    productSwiperList(){
      if(this.currentProductData){
        return this.currentProductData.photo
      }else{
        return []
      }
    },
    //轮播图组件
    productSwiper(){
      return this.$refs.mySwiper.swiper
    },
    //总页数
    allPages(){
      if(this.productSwiperList && this.productSwiperList.length){
        return this.productSwiperList.length
      }
    }
  },
  methods: {
    ...mapMutations(['changeShowMasking']),
    //处理图片点击
    handleClick(){
      setTimeout(()=>{
        this.changeShowMasking(true)
      },310)
      console.log('1')
    }
  },
  updated(){
    this.productSwiper.update()
  },
  mounted(){
    this.changeShowMasking(false)
  }
}
</script>

<style lang='stylus' scoped>
.swiper-wrapper
  width: 100%
  height: 70vw
  position: relative
  background-color: #F6F7FB
  .showPage
    position: absolute 
    bottom: 8vw
    right: 10vw
    width: 12vw
    height: 6vw
    z-index: 2
    border-radius: 3vw
    text-align: center
    font-size: 3.5vw
    line-height: 6vw
    background-color: rgba(60,60,60,.5)
    color: #fff
    .showPage_icon
      margin: 0 1vw
</style>

