<template>
  <div class="servePopUpContent" v-if="servePopUp">
    <div class="masking" @click="closePopUp"></div>
    <div class="serveContent">
      <!-- <van-nav-bar style="border-top: 1px solid #eee" title="服务">
        <van-icon @click="closePopUp" name="cross" slot="right" />
      </van-nav-bar>
      <div class="serveData" v-html="serveData"></div> -->
      <div class="content-header">
        <span>服务</span>
        <div class="header-icon">
          <van-icon @click="closePopUp" name="cross"/>
        </div>
      </div>
      <div class="serve-text">
        <div class="text-top">
          <van-image height="9vw" width="10vw" src="/public/uploads/fuwu.png"></van-image>
          <span>全场包邮</span>
        </div>
        <span class="text-bottom">全场所有商品包邮</span>
      </div>

      <div class="serve-text">
        <div class="text-top">
          <van-image height="9vw" width="10vw" src="/public/uploads/fuwu.png"></van-image>
          <span>极速发货</span>
        </div>
        <span class="text-bottom">从支付起计算，24小时没有快递单号，经我们确认无误后，将会在24小时左右赔偿你10元。法定假日，及已标注限定发货时间的商品除外</span>
      </div>

      <div class="serve-text">
        <div class="text-top">
          <van-image height="9vw" width="10vw" src="/public/uploads/fuwu.png"></van-image>
          <span>售后保障</span>
        </div>
        <span class="text-bottom">收到货品，一旦发现质量问题，请联系我们，为您及时处理售后，全额退款</span>
      </div>

      <div class="serve-text">
        <div class="text-top">
          <van-image height="9vw" width="10vw" src="/public/uploads/fuwu.png"></van-image>
          <span>7天无理由</span>
        </div>
        <span class="text-bottom">商品未经使用，支持7天无理由退款</span>
      </div>

      <div @click="closePopUp" class="confirm-btn">
        <van-button round size="large" type="primary" color="#f13a39">
          确认
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name:"ServePopUp",
  data(){
    return {
      serveData: ''
    }
  },
  computed:{
    ...mapState(['servePopUp'])
  },
  methods:{
    ...mapMutations(['updateServePopUp']),
    closePopUp(){
      this.updateServePopUp(false)
    },
    initServeData(){
      axios.get('api/method/explain')
        .then((res)=>{
          console.log('explain',res.data)
          if(res.data.code == 1){
            this.serveData = res.data.data.content
          }
        })
        .catch((err)=>{
          console.log('explain err',err)
        })
    }
  },
  created(){
    this.initServeData()
  }
}
</script>

<style lang="stylus" scoped>
  .servePopUpContent >>> .van-icon
    color: red

  .servePopUpContent
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 12
    .masking
      width: 100%
      height: 100%
      background-color: rgba(0,0,0,0.3)
    .serveContent
      position: absolute 
      bottom: 0
      left: 0
      right: 0
      background-color: #fff
      border-top-left-radius: 5vw
      border-top-right-radius: 5vw
      .content-header
        position: relative
        width: 100vw
        height: 12vw
        font-size: 5vw
        font-family: PFH
        color: #000
        letter-spacing: 1vw
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        .header-icon
          position: absolute 
          top: 3vw
          right: 5vw
      .serve-text
        padding: 2vw 4vw
        box-sizing: border-box
        .text-top
          display: flex
          flex-direction: row
          align-items: center
          font-size: 4vw
          font-family: PFB
        .text-bottom
          display: block
          color: #888
          margin-left: 2vw
      .confirm-btn
        padding: 3vw 4vw
</style>