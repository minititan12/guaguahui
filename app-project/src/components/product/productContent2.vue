<template>
  <div class="wrapper">
    <mescroll-vue :down="down" :up="up" @init="init">
      <ProductSwiper></ProductSwiper>
      <ProductTitle></ProductTitle>
      <ProductDesc></ProductDesc>
    </mescroll-vue>
  </div>
</template>

<script>
import ProductSwiper from './content/productSwiper'
import ProductTitle from './content/productTitle'
import ProductDesc from './content/productDesc'
export default {
  name: "ProductContent",
  components: {
    ProductSwiper,
    ProductTitle,
    ProductDesc
  },
  data(){
    return {
      down: {
        use: false
      },
      up:{
        use: false
      }
    }
  },
  methods:{
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },
  }
}
</script>

<style lang="stylus" scoped>
  // .wrapper
  //   position: fixed
  //   top: 0
  //   left: 0
  //   bottom: 12vw
  >>> .mescroll
        width: 100%
        position: absolute
        top: 0
        left: 0
        height: 100%
        padding-bottom: 12vw
  >>> .mescroll-upwarp
        padding: 0
</style>


