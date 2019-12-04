<template>
  <div class="share-wrapper" v-if="sharePopUp">
    <div class="masking" @click="closeSharePopUp"></div>
    <div class="shareContent">
      <div class="share-item" v-if="false">
        <span class="iconfont qq">&#xe7cc;</span>
        <span class="text">分享QQ</span>
      </div>
      <div class="share-item" v-if="false">
        <span class="iconfont wb">&#xe603;</span>
        <span class="text">分享微博</span>
      </div>
      <div class="share-item" @click="shareToPyq">
        <span class="iconfont pyq">&#xe60c;</span>
        <span class="text">分享朋友圈</span>
      </div>
      <div class="share-item" @click="shareToFriend">
        <span class="iconfont wx">&#xe600;</span>
        <span class="text">分享朋友</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name:"SharePopUp",
  data(){
    return {
      shares: []
    }
  },
  props: {
    shareData: Object
  },
  computed:{
    ...mapState(['sharePopUp','currentProductData'])
  },
  methods:{
    ...mapMutations(['updateSharePopUp']),
    closeSharePopUp(){
      this.updateSharePopUp(false)
    },
    shareToPyq(){
      this.closeSharePopUp()

      if(this.shares[0] && this.shares[0].authenticated){
        // this.shares[0].send({
        //   type: 'web',
        //   title: this.currentProductData.goods_name,
        //   content: '呱呱汇商品',
        //   thumbs: [this.currentProductData.cover_img],
        //   pictures: [this.currentProductData.cover_img],
        //   href: 'http://test.gghbuy.com/index1.html#/product?id='+ this.currentProductData.id,
        //   extra: {
        //     scene: 'WXSceneTimeline'
        //   }
        // },function(){
        //   alert('分享成功!')
        // })
        this.shares[0].send({
          type: 'web',
          title: this.shareData.title,
          content: this.shareData.content,
          thumbs: [this.shareData.photo],
          pictures: [this.shareData.photo],
          href: this.shareData.href,
          extra: {
            scene: 'WXSceneTimeline'
          }
        },function(){
          alert('分享成功!')
        })
      }else{
        alert('没有分享通道')
      }
    },
    shareToFriend(){
      this.closeSharePopUp()
      let thumbsImg = this.currentProductData.cover_img

      if(this.shares[0] && this.shares[0].authenticated){
        this.shares[0].send({
          type: 'web',
          title: this.shareData.title,
          content: this.shareData.content,
          thumbs: [this.shareData.photo],
          pictures: [this.shareData.photo],
          href: this.shareData.href,
          extra: {
            scene: 'WXSceneSession'
          }
        },function(){
          alert('分享成功!')
        })
      }else{
        alert('没有分享通道')
      }
    }
  },
  mounted(){

    let that = this
    if(localStorage.plusReady == 'true'){
      plus.share.getServices(function(s){
        that.shares = s
      },function(e){
        alert('获取分享服务列表失败'+e.message)
      })
    }
  },
  // watch:{
  //   currentProductData(){
  //     if(this.currentProductData){
  //       let that = this
  //       wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
  //         wx.updateTimelineShareData({ 
  //           title: that.currentProductData.goods_name, // 分享标题
  //           link: 'http://www.gghbuy.com/index1.html#/product?id='+ that.currentProductData.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //           imgUrl: that.currentProductData.cover_img, // 分享图标
  //           success: function () {
  //             // 设置成功
  //             console.log('分享成功')
  //           }
  //         })
  //       })
  //     }
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
  .share-wrapper
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 13
    .masking
      width: 100%
      height: 100%
      background-color: rgba(0,0,0,0.3)
    .shareContent
      position: absolute 
      bottom: 0
      left: 0
      right: 0
      background-color: #fff
      height: 40vw
      display: flex
      flex-direction: row
      justify-content: space-around
      align-items: center
      .share-item
        display: flex
        flex-direction: column
        align-items: center
        .text
          font-size: .2rem
          font-weight: bold
          margin-top: .2rem
        .iconfont
          font-size: .8rem
        .qq
          color: #008CFF
        .wb
          color: #D81E06
        .pyq
          color: #43A838
        .wx
          color: #1AB45E
</style>