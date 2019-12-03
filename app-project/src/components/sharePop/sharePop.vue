<template>
  <div @click="closeSharePopUp" class="share-wrapper" v-if="sharePopUp">
    <div class="masking"></div>
    <div @click.stop="stopSpread" class="shareContent">
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
import { mapState,mapMutations } from 'vuex'
export default {
  computed:{
    ...mapState(['sharePopUp','shareInfo'])
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
  methods:{
    ...mapMutations(['updateSharePopUp']),
    closeSharePopUp(){
      this.updateSharePopUp(false);
    },
    stopSpread(){

    },
    shareToPyq(){
      this.closeSharePopUp();
      if(this.shares[0] && this.shares[0].authenticated){
        this.shares[0].send({
          type: 'web',
          title: this.shareInfo.title,
          content: this.shareInfo.content,
          thumbs: [this.shareInfo.thumbs],
          pictures: [this.shareInfo.pictures],
          href: this.shareInfo.href,
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
      this.closeSharePopUp();
      if(this.shares[0] && this.shares[0].authenticated){
        this.shares[0].send({
          type: 'web',
          title: this.shareInfo.title,
          content: this.shareInfo.content,
          thumbs: [this.shareInfo.thumbs],
          pictures: [this.shareInfo.pictures],
          href: this.shareInfo.href,
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
  }
}
</script>
<style lang="stylus" scoped>
  .share-wrapper
    position: fixed
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
      position: fixed 
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