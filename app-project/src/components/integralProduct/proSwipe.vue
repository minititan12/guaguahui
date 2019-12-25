<template>
  <div class="swiper-wrapper">
    <swiper :options="swiperOption" ref="mySwiper" v-if="swiperList" @click.native="handleClick">
      <swiper-slide v-for="item of swiperList" :key="item">
        <van-image
          width="100vw"
          height="70vw"
          style="background-color: #F6F7FB"
          fit="contain"
          :src="item"
        />
      </swiper-slide>
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
  name: 'ProSwipe',
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
    ...mapState(['currentCreditGoodDetail']),
    //轮播图列表
    swiperList(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.base.goods_photo
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
      if(this.swiperList && this.swiperList.length){
        return this.swiperList.length
      }
    }
  },
  methods: {
    ...mapMutations(['changeShowProMask']),
    //处理图片点击
    handleClick(){
      setTimeout(()=>{
        this.changeShowProMask(true)
      },310)
    }
  },
  updated(){
    this.productSwiper.update()
  },
  mounted(){
    this.changeShowProMask(false)
  }
}
</script>

<style lang='stylus' scoped>
.swiper-wrapper
  width: 100vw
  max-height: 70vw
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

