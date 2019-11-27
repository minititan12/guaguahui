<template>
  <div class="payMethods-wrapper">
    <div class="top">
      <span>支付方式</span>
    </div>
    <van-radio-group v-model="radio">
      <div class="zhifubao" @click="updatedPayRadio('1')">
        <div class="left">
          <span class="iconfont">&#xe601;</span>
          <span class="text">支付宝</span>
        </div>
        <van-radio class="right" name="1" checked-color="#07c160"/>
      </div>

      <div class="weixin" @click="updatedPayRadio('2')">
        <div class="left">
          <span class="iconfont">&#xe600;</span>
          <span class="text">微信</span>
        </div>
        <van-radio class="right" name="2" checked-color="#07c160"/>
      </div>
    </van-radio-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "PayMethods",
  data(){
    return {
      radio: '1'
    }
  },
  methods:{
    ...mapMutations(['changePayRadio']),
    updatedPayRadio(val){
      this.radio = val
    }
  },
  watch: {
    radio(){
      if(this.radio.length > 0){
        // console.log(1)
        this.changePayRadio(this.radio)
      }
    }
  },
  mounted(){
    this.changePayRadio(this.radio)
  }
}
</script>

<style lang="stylus" scoped>
  .payMethods-wrapper
    width: 94vw
    margin: 2vw auto 
    background-color: #fff
    padding: 2vw 5vw
    box-sizing: border-box
    border-radius: .2rem
    .top
      color: #999
      height: 5vw
      line-height: 5vw

    .zhifubao
      background-color: #fff
      height: 8vw
      width: 100%
      margin-top: 2vw
      display: flex
      flex-direction: row
      justify-content: space-between
      .left
        height: 100%
        display: flex
        flex-direction: row
        align-items: center
        .iconfont
          font-size: 7vw
          color: #1296DB
          margin-right: 2vw
        .text
          font-weight: bold
    .weixin
      background-color: #fff
      height: 8vw
      width: 100%
      margin-top: 2vw
      display: flex
      flex-direction: row
      justify-content: space-between
      .left
        height: 100%
        display: flex
        flex-direction: row
        align-items: center
        .iconfont
          font-size: 7vw
          color: #427E43
          margin-right: 2vw
        .text
          font-weight: bold
</style>