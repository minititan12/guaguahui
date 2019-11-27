<template>
  <div class="swiper-wrapper">
    <div class="mySwiper-wrapper">
      <swiper :key="swiperKey" :options="swiperOption" ref="mySwiper" v-if="swiperList.length > 0" @click.native="handleClick">
        <swiper-slide v-for="item of swiperList" :key="item.id">
          <img class="swiper-img" :src="item.cover_img" />
        </swiper-slide>
      </swiper>
    </div>
    <!-- <div class="top"></div> -->
    <div class="showPage">
      <span>{{swiperIndex + 1}}</span>
      <span class="page-icon">/</span>
      <span>{{allIndex}}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'MainSwiper',
  data(){
    const that = this
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 1,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        on: {
          slideChange: function(){
            that.swiperIndex = this.realIndex
          }
        }
      },
      swiperIndex: 0,
      colorList: ["#292163","#CDCDCD","#E7D0C2","#DAA8F4","#C5C5C9"],
      swiperKey: 0
    }
  },
  props: {
    swiperList: Array
  },
  computed: {
    ...mapState(['currentTab']),
    swiper(){
      if(this.$refs){
        return this.$refs.mySwiper.swiper
      }
    },
    allIndex(){
      if(this.swiperList.length > 0){
        return this.swiperList.length
      }
    }
  },
  watch: {
    // swiperIndex(){
    //   this.changeBgColor(this.swiperIndex)
    // }
    currentTab(){
      if(this.currentTab == 1){
        this.forceSwipeRender()
      }
    }
  },
  methods: {
    //点击跳转页面
    handleClick(){
      let url = this.swiperList[this.swiperIndex].link_url
      console.log(url)
      this.$router.push(url)
    },
    forceSwipeRender(){
      this.swiperKey += 1
    }
    // changeBgColor(index){
    //   index = parseInt(index)
    //   let color = this.colorList[index]
    //   this.$refs.top.style.backgroundColor = color
    // }
  },
  mounted(){
    if(this.$refs && this.$refs.mySwiper){
      this.swiper.update()
    }
  },
  activated(){
    if(this.$refs && this.$refs.mySwiper){
      this.swiper.update()
    }
  }
}
</script>

<style lang='stylus' scoped>
// .swiper-wrapper >>> .swiper-slide
//   width: 95vw !important 
.swiper-wrapper >>> .swiper-container
  border-radius: .2rem
.swiper-wrapper
  width: 100vw
  padding-top: 2vw
  // height: 50vw
  position: relative
  overflow: hidden
  background-image: url('/public/uploads/bglogo.jpg')
  background-size: 100vw auto
  background-position: 0 -18vw
  background-repeat: no-repeat
  .mySwiper-wrapper
    width: calc(93vw + 1px)
    height: 47vw
    margin: 0 auto
    // position: fixed
    .swiper-img
      width: 93vw
      -webkit-touch-callout: none
  .top
    width: 100%
    height: 70%
    // background: linear-gradient(to right, #F13939, #F76132)
    background-color: #F13939
  .showPage
    position: absolute
    left: .6rem
    bottom: .4rem
    color: #E41436
    z-index: 2
    width: .8rem
    height: .4rem
    background-color: rgba(255,255,255,.5)
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    border-radius: .2rem
    .page-icon
      margin: 0 .05rem
</style>

