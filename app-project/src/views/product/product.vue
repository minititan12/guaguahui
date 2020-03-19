<template>
  <div class="product-wrapper">
    <NormalProduct v-if="type == 1 || type == 5"></NormalProduct>

    <GroupProduct v-if="type == 2"></GroupProduct>
    
    <SeckillProduct v-if="type == 3"></SeckillProduct>

    <ProductPopUp></ProductPopUp>

    <ImgMasking></ImgMasking>

    <ServePopUp></ServePopUp>

    <SharePopUp :shareData="shareData"></SharePopUp>

    <div class="back" v-if="showBack()" @click="back">
      <span class="iconfont">&#xe624;</span>
    </div>

    <div class="share" v-if="is_app()" @click="openSharePopUp">
      <span class="iconfont">&#xe61c;</span>
    </div>

    <div class="collect" v-if="showCollectIcon()" @click="handleGoodCollect">
      <van-icon :class="is_collect == 0 ? 'star' : 'active-star'" name="star" />
    </div>

    <div class="backToHome" v-if="!is_app()" @click="handleToHome">
      app首页
    </div>

    <div class="download" v-if="!is_app()" @click="handleToDownload">
      <van-image
        width="15vw"
        height="15vw"
        fit="contain"
        src="/public/uploads/ggh-icon.png"
      />
      <span style="margin-top: 1vw">下载app</span>
    </div>

    <GroupDialog></GroupDialog>

  </div>
</template>

<script>
import NormalProduct from './normalProduct'
import GroupProduct from './groupProduct'
import SeckillProduct from './seckillProduct'
import ProductPopUp from '../../components/product/productPopUp'
import ImgMasking from '../../components/product/imgMasking'
import ServePopUp from '../../components/product/servePopUp'
import SharePopUp from '../../components/product/sharePopUp'
import GroupDialog from '../../components/product/groupDialog'

import { mapMutations, mapState } from 'vuex'
import {getGoodsInfo,getOpenid,checkCollects,history,doCollect} from '@/utils/axios/request'
export default {
  name: "Product",
  data(){
    return {
      type: 0,
      is_collect: 0
    }
  },

  components: {
    NormalProduct,
    GroupProduct,
    SeckillProduct,
    ProductPopUp,
    ImgMasking,
    ServePopUp,
    SharePopUp,
    GroupDialog
  },
  
  computed:{
    ...mapState(['login','openid','currentProductData','userData']),
    shareData(){
      if(this.currentProductData){
        return {
          title: this.currentProductData.goods_name,
          content: '呱呱汇商品',
          photo: process.env.VUE_APP_REQUEST_HOST + '/' + this.currentProductData.cover_img,
          href: process.env.VUE_APP_SHARE_HOST + '#/product?id=' + this.currentProductData.id + '&type=share'
        }
      }
    },
  },

  methods: {
    ...mapMutations(['changeCurrentProductData','closePopup','updateServePopUp','updateSharePopUp','changeCurrentBuyDetail','updateAllSpellGroups','updatedGroupBuyID','updateGroupBuyData','updatedSeckillData']),
    //是不是运行在app上
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      
      return false;
    },

    // 是否显示返回按钮
    showBack(){
      if(this.$route.query.type == 'share'){
        return false
      }
      return true
    },

    //是否显示收藏按钮
    showCollectIcon(){
      if(this.is_app()){
        if(this.login){
          if(this.currentProductData.flag == 1){
            return true
          }
        }
      }
      return false
    },

    //跳转到主页
    handleToHome(){
      this.$router.push('/')
    },

    //获取产品数据
    getProductData(){
      // console.log(this.$route)
      let id = this.$route.query.id ? this.$route.query.id : 286
      let getData = {
        id: id
      }
      getGoodsInfo(getData)
        .then((res)=>{
          console.log('getGoodsInfo',res.data)
          if(res.data.code == 1){
            this.type = res.data.data.flag
            this.changeCurrentProductData(res.data.data);
            if(res.data.data.flag == 1){
              this.history()//记录足迹
            }
          }
        })
        .catch((err)=>{
          console.log('get product err')
        })
    },
    // 记录足迹
    history(){
      let id = this.$route.query.id ? this.$route.query.id : 286
      history({
        goods_id:id
      }).then().catch();
    },
    //返回
    back(){
      console.log(this.$router)
      setTimeout(()=>{
        this.$router.go(-1)
      },350)
    },

    //打开分享弹出框
    openSharePopUp(){
      console.log('openSharePopUp')
      this.updateSharePopUp(true)
    },

    //跳转到下载
    handleToDownload(){
      this.$router.push({
        path: "/download"
      })
    },

    //处理检查openid
    handleCheckOpenid(){
      // console.log(this.$route.query.id)
      if(/MicroMessenger/.test(window.navigator.userAgent)){
        if(!this.openid){
          let id = this.$route.query.id
          let postData = {
            id: id
          }
          getOpenid(postData)
            .then((res)=>{
              console.log('getOpenid',res.data)
            })
            .catch((err)=>{
              console.log('getOpenid err',err)
            })
          this.$dialog.alert({
            title: '授权',
            message: '是否授权呱呱汇访问微信用户信息',
            showCancelButton: true   
          })
            .then(()=>{
              let url = '/index/index/index2?id='+id
              console.log(url)
              window.location.href= url
            })
            .catch(()=>{
              wx.closeWindow()
            })
        }
      }
    },

    //检查商品是否收藏
    checkCollect(){
      let postData = {
        flag: 1,
        user_id: this.userData.id,
        ids: this.$route.query.id
      }

      checkCollects(postData)
        .then((res)=>{
          console.log('checkCollects',res.data)
          if(res.data.code == 1){
            this.is_collect = res.data.data.is_collect
          }
        })
        .catch((err)=>{
          console.log('checkCollects err',err)
        })
    },

    //处理收藏或取消产品
    handleGoodCollect(){
      let is_collect = this.is_collect == 0 ? 1 : 0
      let postData = {
        flag: 1,
        ids: this.$route.query.id,
        user_id: this.userData.id,
        is_collect: is_collect
      }

      doCollect(postData)
        .then((res)=>{
          console.log('doCollect',res.data)
          if(res.data.code ==1){
            if(this.is_collect == 0){
              this.$toast({
                message: '收藏成功',
                duration: 1200,
                type: 'success'
              })
            }else{
              this.$toast({
                message: '取消成功',
                duration: 1200,
                type: 'success'
              })
            }
            this.is_collect = is_collect
          }
        })
        .catch((err)=>{
          console.log('doCollect err',err)
        })
    }
  },

  created(){
    this.getProductData()//获取产品信息
    this.updateServePopUp(false)//关闭服务上拉框
    this.updateSharePopUp(false)//关闭分享上拉框
    this.closePopup()           //关闭商品上拉框
    this.changeCurrentBuyDetail(null)//更新购买信息为空
    this.changeCurrentProductData({})//更新当前产品信息为空
    this.updateAllSpellGroups([])//更新可拼团的信息为空
    this.updatedGroupBuyID(-1)//更新拼团的队伍id为-1
    this.updateGroupBuyData(null)//更新拼团购买信息为空
    this.updatedSeckillData(null)//更新秒杀产品信息为空
  },

  mounted(){
    if(this.login){
      this.checkCollect()//检查是否收藏该产品
    }
  }
}
</script>

<style lang="stylus" scoped>
  .back
    width: 8vw
    height: 8vw
    background-color: rgba(60,60,60,.5)
    position: absolute 
    top: 3vw
    left: 3vw
    z-index: 3
    text-align: center
    overflow: hidden
    border-radius: 8vw
    .iconfont
      color: #fff
      font-size: 5vw
      line-height: 8vw

  .share
    width: 8vw
    height: 8vw
    background-color: rgba(60,60,60,.5)
    position: absolute 
    top: 3vw
    right: 3vw
    z-index: 3
    text-align: center
    overflow: hidden
    border-radius: 8vw
    .iconfont
      color: #fff
      line-height: 8vw
  
  .collect
    width: 8vw
    height: 8vw
    background-color: rgba(60,60,60,.5)
    position: absolute 
    top: 3vw
    right: 12vw
    z-index: 3
    overflow: hidden
    border-radius: 8vw
    display: flex
    align-items: center
    justify-content: center
    .star
      font-size: 5vw
      color: #fff
    .active-star
      font-size: 5vw
      color: #ff5657

  .backToHome
    position: absolute
    top: 22vw
    right: 2vw
    width: 15vw
    height: 7vw
    background-color: #E41436
    color: #fff
    line-height: 7vw
    text-align: center
    border-radius: 5vw
    font-size: 3vw

  .download
    position: absolute
    top: 2vw
    right: 2vw
    z-index: 3
    display: flex
    flex-direction: column
    align-items: center
    color: #E41436
    font-weight: bold
    font-size: 3vw

</style>


