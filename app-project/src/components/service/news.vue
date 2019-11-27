<template>
  <!-- 1:文字，2：红包，3：文章 ,css:类型 -->
  <div v-if="renderLeft" class="left-wrapper">
    <div class="space"></div>
    <div class="text-wrapper">
      <van-image
        class="left-img"
        round
        fit="cover"
        width=".8rem"
        height=".8rem"
        :src="leftImg"
      />

      <van-image
        v-if="showImg"
        fit="cover"
        width="2rem"
        height="2rem"
        :src="contentImg"
      />
      <span v-if="showText" class="text">{{data.text}}</span>
    </div>
  </div>

  <div v-else-if="renderRight" class="right-wrapper">
    <div class="space"></div>
    <div class="text-wrapper">
      <span class="text" v-if="showText">{{data.text}}</span>
      <!-- <img :src="rightImg" alt=""> -->
      <van-image
        v-if="showImg"
        fit="cover"
        width="2rem"
        height="2rem"
        :src="contentImg"
      />
      <van-image
        class="right-img"
        round
        fit="cover"
        width=".8rem"
        height=".8rem"
        :src="rightImg"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "News",
  props: ['data'],
  computed:{
    ...mapState(['userData']),
    leftImg(){
      return 'public' + this.$route.query.shop_img
    },
    rightImg(){
      if(this.userData.head_img){
        return this.userData.head_img
      }
    },
    renderLeft(){
      if(this.data.css == 'left'){
        return true
      }else{
        return false
      }
    },
    renderRight(){
      if(this.data.css == 'right'){
        return true
      }else{
        return false
      }
    },
    contentImg(){
      if(this.data.type == 2){
        return this.data.img
      }
    },
    showImg(){
      if(this.data.type == 2){
        return true
      }else{
        return false
      }
    },
    showText(){
      if(this.data.type == 1){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .left-wrapper
    padding: 0 .3rem
    .space
      height: .2rem
      width: 100%
    .text-wrapper
      width: 100%
      display: flex
      flex-direction: row
      justify-content: flex-start
      align-items: center
      .text
        line-height: .6rem
        font-size: .3rem
        background-color: #bbb
        border-radius: .3rem
        text-align: center
        padding: 0 .3rem
        color: #000
      .left-img
        flex-shrink: 0
        margin-right: .2rem
  .right-wrapper
    padding: 0 .3rem
    .space
      height: .2rem
      width: 100%
    .text-wrapper
      width: 100%
      display: flex
      flex-direction: row
      justify-content: flex-end
      align-items: center
      .text
        max-width: 80vw
        line-height: .6rem
        font-size: .3rem
        background-color: #F7C748
        border-radius: .3rem
        padding: 0 .3rem
        color: #000
        word-break:break-all
      .right-img
        flex-shrink: 0
        margin-left: .2rem
</style>