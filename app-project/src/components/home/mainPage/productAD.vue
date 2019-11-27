<template>
  <div class="productAD-wrapper">
    <div class="productAD-content">
      <div class="product-top">
        <van-image
          width="45.5vw"
          fit="contain"
          lazy-load
          v-for="item of topList"
          :src="item.cover_img"
          @click="handleToLink(item.link_url)"
          style="-webkit-touch-callout: none"
        />
      </div>
      <div class="product-bottom">
        <van-image
          width="29.5vw"
          fit="contain"
          lazy-load
          v-for="item of bottomList"
          :src="item.cover_img"
          style="-webkit-touch-callout: none"
          @click="handleToLink(item.link_url)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductAD",
  data(){
    return {
    }
  },
  props: {
    productADList: Array
  },
  computed:{
    topList(){
      if(this.productADList.length > 0){
        let result = []
        for(let i = 0; i < 2; i++){
          result.push(this.productADList[i])
        }
        return result
      }
    },
    bottomList(){
      if(this.productADList.length > 0){
        let result = []
        for(let i = 2; i < 5; i++){
          result.push(this.productADList[i])
        }
        return result
      }
    }
  },
  methods:{
    //点击跳转页面
    handleToLink(url){
      if(url.length > 0){
        this.$router.push(url)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .productAD-wrapper
    width: 100vw
    margin: 3vw 0
    min-height: 40vw
    .productAD-content
      width: 93vw
      margin: 0 auto
      .product-top
        display: flex
        flex-direction: row
        justify-content: space-between
        margin-bottom: 2vw
      .product-bottom
        display: flex
        flex-direction: row
        justify-content: space-between
</style>