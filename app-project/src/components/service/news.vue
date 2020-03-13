<template>
  <!-- 1:文字，2：富文本,css:类型 -->
  <div v-if="renderLeft" class="left-wrapper">
    <div class="text-wrapper">
      <van-image
        class="left-img"
        round
        fit="cover"
        width="10vw"
        height="10vw"
        :src="leftImg"
      />

      <van-image
        v-if="showImg"
        fit="cover"
        width="20vw"
        height="20vw"
        :src="contentImg"
      />
      <span v-if="showText" class="text">{{data.text}}</span>
    </div>
    <div class="space"></div>
  </div>

  <div v-else-if="renderRight" class="right-wrapper">
    <div class="text-wrapper">
      <div class="text" v-if="showText" @click="handleToProduct">
        <van-image
          v-if="showImg"
          fit="cover"
          width="20vw"
          height="20vw"
          :src="contentImg"
          class="img"
        />
        <span>{{data.text}}</span>
      </div>

      <van-image
        class="right-img"
        round
        fit="cover"
        width="10vw"
        height="10vw"
        :src="rightImg"
      />
    </div>
    <div class="space"></div>
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
      return this.$route.query.shop_img
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
      if(this.data.type == 1 || this.data.type == 2){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    handleToProduct(){
      if(this.data.type == 2){
        let path = this.data.url.split('#')[1]
        this.$router.push(path)
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
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        line-height: 7vw
        font-size: 4vw
        background-color: #bbb
        border-radius: .3rem
        text-align: center
        padding: 0 .3rem
        color: #000
      .left-img
        flex-shrink: 0
        margin-right: .2rem
  .right-wrapper
    padding: 0 4vw
    .space
      height: 2vw
      width: 100%
    .text-wrapper
      width: 100%
      display: flex
      flex-direction: row
      justify-content: flex-end
      align-items: center
      .text
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        max-width: 80vw
        line-height: 7vw
        font-size: 4vw
        background-color: #F7C748
        border-radius: 3vw
        padding: 1vw 3vw
        color: #000
        word-break:break-all
        .img
          flex-shrink: 0
          margin-right: 2vw
      .right-img
        flex-shrink: 0
        margin-left: 2vw
</style>