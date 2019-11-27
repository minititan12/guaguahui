<template>
  <div class="brandAD-wrapper">
    <div class="brandAD-items">
      <van-image
        width="48%"
        class="brandAD-img"
        fit="contain"
        @click="handleClick(item.link_url)"
        :key="item.id"
        lazy-load
        v-for="item of brandADList"
        :src="item.cover_img"
        style="-webkit-touch-callout: none"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name:"BrandAD",
  props:{
    brandADList: Array
  },
  methods:{
    //处理品牌图片点击
    handleClick(url){
      if(url.length > 0){
        this.$router.push(url)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .brandAD-wrapper
    width: 93vw
    margin: 0 auto
    min-height: 62vw
    padding: 0 3vw
    display: flex
    flex-direction: column
    justify-content: flex-end
    border-radius: 3vw
    overflow: hidden
    box-sizing: border-box
    background-image: url('/public/uploads/huichangA1.png')
    background-size: 93vw
    background-repeat: no-repeat
    .brandAD-items
      display: flex
      flex-direction: row
      flex-wrap: wrap
      justify-content: space-between
      .brandAD-img
        margin-bottom: 2vw 
</style>