<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <ProductSwiper></ProductSwiper>
      <GroupProductTitle></GroupProductTitle>
      <ProductDesc></ProductDesc>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import ProductSwiper from './content/productSwiper'
import GroupProductTitle from './content/groupProductTitle'
import ProductDesc from './content/productDesc'
import { mapState } from 'vuex'
export default {
  name: "GroupProductContent",
  components: {
    ProductSwiper,
    GroupProductTitle,
    ProductDesc
  },
  computed: {
    ...mapState(['currentProductData'])
  },
  methods: {
    initScroll(){
      let el = this.$refs.wrapper
      this.productScroll = new Bscroll(el,{
        click: true,
        eventPassthrough: 'horizontal',
        bounce:{
          top: false,
          bottom: true
        }
      })

      let that = this

      this.productScroll.on('beforeScrollStart',function(){
        console.log('beforeScrollStart')
        that.productScroll.refresh()
      })
    }
  },
  mounted(){
    this.initScroll()
  },
  watch: {
    currentProductData(){
      if(this.currentProductData){
        if(this.productScroll){
          this.productScroll.refresh()
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 12vw
    overflow: hidden
    background-color: #F6F7FB
    // background-color: #999
</style>


