<template>
  <div class="right-wrapper" ref="rightWrapper">
    <div>
      <div class="product-blank"></div>
      <img class="adver-img" @click="handleADClick" :src="adImg" alt="">
      <div class="product-list">
        <div class="product-item" 
        @click="handleToGoods(item.id,item.brand_name)" 
        v-for="item of productList" v-if="productList.length > 0"
        :key="item.id">
          <img class="product-img" :src="item.thumb" alt="">
          <!-- <van-image
            class="product-img"
            width="20vw"
            height="20vw"
            :src="item.thumb"
            style="-webkit-touch-callout: none"
          /> -->
          <span class="product-title">{{item.brand_name}}</span>
        </div>
      </div>
      <div class="product-blank"></div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState,mapMutations } from 'vuex'
export default {
  name: "RightContent",
  computed: {
    ...mapState(['classifyList','currentClassifySort']),
    productList(){
      if(this.classifyList.length > 0 && this.currentClassifySort > -1){
        for(let item of this.classifyList){
          if(item.sort == this.currentClassifySort){
            return item.contentList
          }
        }
      }
    },
    adImg(){
      if(this.classifyList.length > 0 && this.currentClassifySort > -1){
        for(let item of this.classifyList){
          if(item.sort == this.currentClassifySort){
            return item.psterimg
          }
        }
      }
    },
    adLink(){
      if(this.classifyList.length > 0 && this.currentClassifySort > -1){
        for(let item of this.classifyList){
          if(item.sort == this.currentClassifySort){
            return item.linkurl
          }
        }
      }
    }
  },
  methods: {
    //初始化右边滚动条组件
    initRightClassifyScroll(){
      this.$nextTick(()=>{
        let el = this.$refs.rightWrapper
        this.rightClassifyScroll = new Bscroll(el,{
          click: true,
          tap: true,
          eventPassthrough: 'horizontal',
          bounce:{
            top: false
          }
        })

        let that = this
        this.rightClassifyScroll.on('beforeScrollStart',function(){
          // console.log('beforeScrollStart')
          that.rightClassifyScroll.refresh()
        })
      })
    },
    //处理跳转到小类页面
    handleToGoods(id,brand_name){
      this.$router.push({
        path: '/goods',
        query:{
          goodsID: id,
          brand_name: brand_name
        }
      })
    },
    //处理广告图片的点击
    handleADClick(){
      // console.log('adclick',this.adLink)
      if(this.adLink.length){
        this.$router.push(this.adLink)
      }
    }
  },
  mounted(){
    this.initRightClassifyScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .right-wrapper
    position: absolute 
    left: 24%
    top: 2vw
    right: 0
    bottom: 0
    box-sizing: border-box
    overflow: hidden
    text-align: center
    background-color: #fff
    // border-top: .01vw solid #eee
    border-left: .01vw solid #eee
    .product-blank
      width: 100%
      height: 2vw
    .adver-img
      width: 95%
      margin: 3vw auto 
    .product-list
      width: 100%
      display: flex
      flex-direction: row
      flex-wrap: wrap
      .product-item
        width: 25vw
        display: flex
        flex-direction: column
        align-items: center
        margin-bottom: 4vw
        color: #000
        font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
        letter-spacing: .2vw
        .product-img
          width: 20vw
          height: 20vw
          margin-bottom: 3vw
</style>


