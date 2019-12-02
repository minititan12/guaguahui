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
          <BargainProduce @reload="reload" :productDetails="productDetails" :bargainDetails="bargainDetails"></BargainProduce>
          <BargainFriends :friends="friends"></BargainFriends>
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
import axios from 'axios'
import Bscroll from 'better-scroll'
import { mapState,mapMutations } from 'vuex'
export default {
  data(){
    return {
      // 商品详情
      productDetails:{},
      // 砍价详情
      bargainDetails:{},
      // 砍价的好友列表
      friends:[],
      // 砍价活动ID 
      bargin_item_id:"",
      // 商品ID
      goods_id:"",
    }
  },
  computed: {
    ...mapState(['userData',])
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
        eventPassthrough: 'horizontal',
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
      axios.get(`/api/method/getGoodsInfo?id=${this.goods_id}&&bargin_item_id=${this.bargin_item_id}`).then((res)=>{
        if(res.data.code != 1){
          return;
        }
        this.productDetails = res.data.data;
        this.changeCurrentProductData(res.data.data);
      }).catch((err)=>{
        console.log('get product err')
      })
    },
    // 获取砍价商品详情
    getBargain(){
      let goods_id = this.$route.query.goods_id?this.$route.query.goods_id:"";
      axios.post('api/method/barginGoodsDetail',{
        goods_id,
        user_id:this.userData.id,
        bargin_item_id:this.bargin_item_id
      }).then(res=>{
        if(res.data.code != 1){
          return;
        }
        this.bargainDetails = res.data.data;
        if(res.data.data.bargin_friend_list){
          this.friends = res.data.data.bargin_friend_list;
        }
        this.updateBargainData(res.data.data);
      }).catch((err)=>{
        console.log('barginGoodsDetail err')
      })
    }
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