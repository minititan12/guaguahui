<template>
  <div class="download-wrapper">
    <div class="download">
      <van-image class="download-img" width="30vw" src="http://www.gghbuy.com/public/static/images/azlogo.png"></van-image>
      <span class="download-text">呱呱汇 品牌特卖app</span>
      <van-button @click="handleDownload" class="download-btn" type="primary">点击下载</van-button>
      <!-- <div class="hint">
        <span>您的订单已下,请先下载app</span>
        <span>到我的,待付款中查看</span>
      </div> -->
    </div>
    <div class="warn" v-if="showWarn">
      <span class="text">请点击箭头指引的按钮并在浏览器中打开下载</span>
      <span class="iconfont">&#xe604;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Download",
  data(){
    return {
      showWarn: false
    }
  },
  methods: {
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      
      return false;
    },
    //ios设备
    is_ios(){
      if(/iPhone/.test(window.navigator.userAgent)){
        return true
      }
      return false
    },
    //android设备
    is_android(){
      if(/Android/.test(window.navigator.userAgent)){
        return true
      }
      return false
    },
    //微信web
    is_wxWebPay(){
      if(/MicroMessenger/.test(window.navigator.userAgent)){
        return true;
      }
      return false;	
    },
    //支付宝web
    is_aliWebPay(){
      if(/AlipayClient/.test(window.navigator.userAgent)){
        return true;
      }
      return false;	
    },
    handleDownload(){
      if(this.is_ios()){
        window.location.href="https://apps.apple.com/cn/app/%E5%91%B1%E5%91%B1%E6%B1%87/id1095029004"
        window.open()
        return 
      }
      if(this.is_wxWebPay()){
        this.showWarn = true
        return 
      }
      if(this.is_aliWebPay()){
        this.showWarn = true
        return 
      }

      window.location.href="http://www.gghbuy.com/guaguahuiapp.apk"
      window.open()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .download-wrapper
    width: 100vw
    height: 100vh
    background-image: url('/public/uploads/xzbj.jpg')
    background-size: 100vw 100vh
    .download
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .download-text
        font-size: .4rem
        color: #000
        margin: .3rem 0
      .hint
        margin-top: .3rem
        display: flex
        flex-direction: column
        align-items: center
        span 
          margin-top: .2rem
    .warn
      position: absolute 
      top: 5vw
      right: 8vw
      z-index:2
      .text
        color: #000
      .iconfont
        font-size: .6rem
        color: red
</style>