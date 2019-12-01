<template>
  <div class="share-wrapper" v-if="value">
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
import { mapState } from 'vuex'
export default {
  props:{
    value:Boolean,
    productDetails:Object,
    bargin_item_id:{},
  },
  data(){
    return {
      shares: []
    }
  },
  computed:{
    ...mapState(['currentProductData'])
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
    closeSharePopUp(){
      this.$emit('input',false);
    },
    shareToPyq(){
      this.closeSharePopUp();
      if(this.shares[0] && this.shares[0].authenticated){
        this.shares[0].send({
          type: 'web',
          title: this.currentProductData.goods_name,
          content: '呱呱汇商品',
          thumbs: [this.currentProductData.cover_img],
          pictures: [this.currentProductData.cover_img],
          href: process.env.VUE_APP_SHARE_HOST +'#/bargain?goods_id='+ this.currentProductData.id +'&&bargin_item_id=' + this.bargin_item_id,
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
          title: this.currentProductData.goods_name,
          content: '呱呱汇商品',
          thumbs: [this.currentProductData.cover_img],
          pictures: [this.currentProductData.cover_img],
          href: process.env.VUE_APP_SHARE_HOST + '#/bargain?goods_id='+ this.currentProductData.id +'&&bargin_item_id=' + this.bargin_item_id,
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