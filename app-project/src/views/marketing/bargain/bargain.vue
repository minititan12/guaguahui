<template>
  <div class="bargain-wrapper">
    <van-nav-bar
      title="疯狂砍价"
      left-arrow
      @click-left="handleBack"
    />
    <div class="page" ref="page">
      <div>
        <div class="page-wrapper">
          <BargainProduce @reload="reload"></BargainProduce>
          <BargainFriends></BargainFriends>
        </div>
        
        <TitleShop />
        <van-image
          width="94vw"
          style="padding:0 3vw;margin-bottom:2vw"
          src="/public/static/bargin/bargin_icon_1.png"
        />
        <ProductComment></ProductComment>
        <ProductDesc></ProductDesc>
      </div>
    </div>

    <ProductPopUp></ProductPopUp>
    <SharePop></SharePop>
  </div>
</template>
<script>
import BargainFriends from '../../../components/marketing/cutPrice/bargainFriends'
import BargainProduce from '../../../components/marketing/cutPrice/bargainProduce'
import ProductDesc from '../../../components/product/content/productDesc'
import TitleShop from '../../../components/product/content/title/titleShop'
import ProductComment from '../../../components/product/content/title/productComment'
import ProductPopUp from '../../../components/product/productPopUp'
import SharePop from '../../../components/sharePop/sharePop'
import { getGoodsInfo,barginGoodsDetail } from '../../../utils/axios/request'
import Bscroll from 'better-scroll'
import { mapState,mapMutations } from 'vuex'
export default {
  data(){
    return {
      // 砍价活动ID 
      bargin_item_id:"",
      // 商品ID
      goods_id:"",
    }
  },
  computed: {
    ...mapState(['userData','currentProductData'])
  },
  created(){
    if(this.$route.query.goods_id){
      this.goods_id = this.$route.query.goods_id;
    }
    if(this.$route.query.bargin_item_id){
      this.bargin_item_id = this.$route.query.bargin_item_id;
    }

    this.updateSharePopUp(false)
    this.closePopup()
    this.changeCurrentBuyDetail(null)
    this.updateBargainData({});
    this.changeCurrentProductData(null);

    this.getProduct();
    this.getBargain();
  },
  components:{
    BargainProduce,BargainFriends,ProductDesc,TitleShop,ProductComment,ProductPopUp,SharePop
  },
  mounted(){
    this.initScroll();
  },
  methods:{
    ...mapMutations(['changeCurrentBuyDetail','closePopup','updateSharePopUp','changeCurrentProductData','updateBargainData','updateShareInfo']),
    handleBack(){
      this.$router.go(-1)
    },
    initScroll(){
      let el = this.$refs.page;
      this.productScroll = new Bscroll(el,{
        click: true,
        // eventPassthrough: 'horizontal',
        bounce:{
          top: false,
          bottom: true
        }
      })

      let that = this

      this.productScroll.on('beforeScrollStart',function(){
        console.log('beforeScrollStart')
        that.productScroll.refresh()
      })
    },
    // 砍价完重新请求页面
    reload(bargin_item_id){
      this.bargin_item_id = bargin_item_id;
      this.getBargain();
    },
    // 获取商品详情
    getProduct(){
      let getData = {
        id: this.goods_id,
        bargin_item_id: this.bargin_item_id
      }
      getGoodsInfo(getData)
        .then((res)=>{
          if(res.data.code != 1){
            return;
          }
          this.changeCurrentProductData(res.data.data);
        }).catch((err)=>{
          console.log('get product err')
        })
    },
    // 获取砍价商品详情
    getBargain(){
      let goods_id = this.$route.query.goods_id?this.$route.query.goods_id:"";
      let postData = {
        goods_id,
        user_id:this.userData.id,
        bargin_item_id:this.bargin_item_id
      }
      barginGoodsDetail(postData)
        .then(res=>{
          if(res.data.code != 1){
            return;
          }
          if(!res.data.data.bargin_friend_list){
            res.data.data.bargin_friend_list = [];
          }
          this.updateBargainData(res.data.data);
          this.configWXShare();
        }).catch((err)=>{
          console.log('barginGoodsDetail err')
        })
    },
    //配置微信内网页分享
    configWXShare(){
      if(/MicroMessenger/.test(window.navigator.userAgent)){
        wx.ready(()=> {   //需在用户可能点击分享按钮前就先调用 
          wx.updateAppMessageShareData({ 
            title: this.currentProductData.goods_name, // 分享标题
            desc: '呱呱汇拼团商品', // 分享描述
            link: process.env.VUE_APP_SHARE_HOST +'#/bargain?goods_id='+ this.currentProductData.id +'&&bargin_item_id=' + this.bargin_item_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.currentProductData.cover_img, // 分享图标
            success: function () {
              // 设置成功
            }
          })

          wx.updateTimelineShareData({ 
            title: this.currentProductData.goods_name, // 分享标题
            link: process.env.VUE_APP_SHARE_HOST +'#/bargain?goods_id='+ this.currentProductData.id +'&&bargin_item_id=' + this.bargin_item_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            desc: '呱呱汇拼团商品', // 分享描述
            imgUrl: this.currentProductData.cover_img, // 分享图标
            success: function () {
              // 设置成功
            }
          })
        })
      }
    },
  }
}
</script>
<style lang="stylus" scoped>
  .bargain-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .bargain-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
  .van-nav-bar
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index 2!important
  .page
    width: 100%
    position: fixed
    top: 46px
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    background-color: #F6F7FB
  .page-wrapper
    background-image url('/public/static/bargin/bargin_bg.png')
    width 100%
    padding 2vw 0
    overflow-y auto
    box-sizing border-box
    // padding-top 56px
</style>