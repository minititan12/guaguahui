<template>
  <div class="product-wrapper">
    <ProductContent></ProductContent>

    <ProductFooter></ProductFooter>

    <ProductPopUp></ProductPopUp>

    <ImgMasking></ImgMasking>

    <ServePopUp></ServePopUp>

    <SharePopUp></SharePopUp>

    <div class="back" @click="back">
      <span class="iconfont">&#xe624;</span>
    </div>

    <div class="share" v-if="is_app()" @click="openSharePopUp">
      <span class="iconfont">&#xe61c;</span>
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
import ProductContent from '../../components/product/productContent'
import ProductFooter from '../../components/product/productFooter'
import ProductPopUp from '../../components/product/productPopUp'
import ImgMasking from '../../components/product/imgMasking'
import ServePopUp from '../../components/product/servePopUp'
import SharePopUp from '../../components/product/sharePopUp'
import GroupDialog from '../../components/product/groupDialog'

import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "Product",
  data(){
    return {
      productData: {}
    }
  },
  components: {
    ProductContent,
    ProductFooter,
    ProductPopUp,
    ImgMasking,
    ServePopUp,
    SharePopUp,
    GroupDialog
  },
  computed:{
    ...mapState(['login','openid'])
  },
  methods: {
    ...mapMutations(['changeShowSearch','changeCurrentProductData','changeProductDetailData','updateServePopUp','updateSharePopUp','changeLoginStatus','updateUserData','changeCurrentBuyDetail']),
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      
      return false;
    },
    handleToHome(){
      this.$router.push('/')
    },
    getProductData(){
      // console.log(this.$route)
      let id = this.$route.query.id ? this.$route.query.id : 286
      axios.get('/api/method/getGoodsInfo?id=' + id)
        .then((res)=>{
          console.log('getGoodsInfo',res.data)
          if(res.data.code == 1){
            this.productData = res.data.data
            this.changeCurrentProductData(res.data.data)
          }
        })
        .catch((err)=>{
          console.log('get product err')
        })
    },
    back(){
      // this.changeShowSearch(false)
      console.log(this.$router)
      setTimeout(()=>{
        this.$router.go(-1)
      },350)
    },
    openSharePopUp(){
      console.log('openSharePopUp')
      this.updateSharePopUp(true)
    },
    handleToDownload(){
      this.$router.push({
        path: "/download"
      })
    },
    handleCheckOpenid(){
      // console.log(this.$route.query.id)
      if(/MicroMessenger/.test(window.navigator.userAgent)){
        if(!this.openid){
          let id = this.$route.query.id
          axios.post('/index/index/getOpenid',{
            id: id
          })
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
    }
  },
  created(){
    // this.changeShowSearch(false)
    this.updateServePopUp(false)
    this.updateSharePopUp(false)
    this.changeCurrentBuyDetail(null)
    this.changeCurrentProductData({})
    this.getProductData()
  },
  mounted(){
    if(!this.login){
      if(localStorage.hasOwnProperty('userData')){
        this.changeLoginStatus(true)
        let data = JSON.parse(localStorage.userData)
        this.updateUserData(data)
      }
    }
    this.handleCheckOpenid()
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


