<template>
  <div class="shopContent-wrapper">
    <div class="shopHeader">
      <div class="masking">
        <div class="header-top">
          <span class="top-name">{{title}}</span>
          <div class="top-right">
            <div class="collectShop" @click="handleCollectShop">
              <span>{{is_collect == 0 ? '收藏店铺' : '取消收藏'}}</span>
            </div>
            <div class="header-cross" @click="handleBackClick">
              <van-icon name="cross" />
            </div>
          </div>
        </div>

        <div class="header-middle">
          <span>店铺评分</span>
          <span class="middle-num">4.9</span>
          <span class="coupon" @click="getCoupon">领取优惠券</span>
        </div>

        <div class="header-tabs">
          <div 
            :class="active == 0 ? 'actived-tab' : 'tab'"
            @click="handleChangeActive(0)"
          >
            <span>综合</span>
          </div>
          <div 
            :class="active == 1 ? 'actived-tab' : 'tab'"
            @click="handleChangeActive(1)"
          >
            <span>销量</span>
          </div>
          <div 
            :class="active == 2 ? 'actived-tab' : 'tab'"
            @click="handleChangeActive(2)"
          >
            <span>价格</span>
            <van-icon name="arrow-up" />
          </div>
          <div 
            :class="active == 3 ? 'actived-tab' : 'tab'"
            @click="handleChangeActive(3)"
          >
            <span>价格</span>
            <van-icon name="arrow-down" />
          </div>
        </div>

      </div>
    </div>

    <div class="shop-goods" ref="shopGoodsWrapper">
      <div class="goodItems">
        <div class="blank"></div>

        <ProductItem
          v-if= "goodsList.length > 0"
          v-for= "item of goodsList"
          :data = "item"
          @productItemClick="handleToProduct(item.id)"
        >
        </ProductItem>

        <div class="shop-loading" v-if="showLoading">
          <van-loading color="#FF5756" size="24px">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
        </div>
        <div class="no-more" v-show="showNoMore">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span>没有更多了</span>
        </div>
        <div class="blank"></div>
      </div>
    </div>

  </div>
</template>

<script>
import { getshopgoods,doCollect,checkCollects } from '../../utils/axios/request'
import Bscroll from 'better-scroll'
import ProductItem from '../miniComponents/productItem'
import { mapState } from 'vuex'
export default {
  name: 'ShopContent',
  components:{
    ProductItem
  },
  data(){
    return {
      page: 1,
      title: '',
      active: 0,
      goodsList: [],
      id: 0,
      header_img: '',
      showLoading: false,
      showNoMore: false,
      is_collect: 0
    }
  },
  computed:{
    ...mapState(['userData'])
  },
  methods:{
    //获取商店商品数据
    getShopData(type){
      let shop_id = this.$route.query.shopID
      let postData = {
        shop_id: shop_id,
        page: this.page,
        status: this.active
      }

      getshopgoods(postData)
        .then((res)=>{
          console.log('getshopgoods',res.data)
          if(res.data.code == 1){
            this.title = res.data.company.company

            if(res.data.data.length > 0){
              if(type == 'init'){
                this.goodsList = [...res.data.data]
              }else{
                this.goodsList = [...this.goodsList,...res.data.data]
              }
              this.$nextTick(()=>{
                if(this.goodsList.length > 8){
                  this.showLoading = true
                  this.showNoMore = false
                  this.page = this.page + 1
                  if(this.shopScroll){
                    this.shopScroll.finishPullUp()
                  }
                }else{
                  this.showLoading = false
                  this.showNoMore = true
                  if(this.shopScroll){
                    this.shopScroll.closePullUp()
                  }
                }
              })
            }else{
              this.showLoading = false
              this.showNoMore = true
              if(this.shopScroll){
                this.shopScroll.closePullUp()
              }
            }
          }
        })
        .catch((err)=>{
          console.log('getshopgoods err',err)
        })
    },
    //上拉处理函数
    onPullingUp(){
      console.log('pullingup')
      this.getShopData()
    },
    //初始化商店产品滚动
    initShopScroll(){
      let el = this.$refs.shopGoodsWrapper
      this.shopScroll = new Bscroll(el,{
        bounce: {
          top: false
        },
        pullUpLoad: {
          threshold: 60,
          stop: 0
        },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.shopScroll.on('pullingUp',this.onPullingUp)

      this.shopScroll.on('beforeScrollStart',()=>{
        // console.log('beforeScrollStart')
        this.shopScroll.refresh()
      })
    },
    //切换tab
    handleChangeActive(val){
      if(this.active != val){
        this.active = val
        this.page = 1
        this.showLoading = false
        this.showNoMore = false
        this.shopScroll.closePullUp()
        this.goodsList = []
        this.shopScroll.scrollTo(0,0)
        this.getShopData()
      }
    },
    //跳转商品详情页面
    handleToProduct(id){
      this.$router.push('/product?id=' + id)
    },
    //跳转上一级页面
    handleBackClick(){
      this.$router.go(-1)
    },
    //领取优惠券
    getCoupon(){
      this.$router.push({
        path: '/getCoupon',
        query: {
          shop_id: this.$route.query.shopID
        }
      })
    },
    //处理收藏或者取消店铺
    handleCollectShop(){
      let is_collect = this.is_collect == 0 ? 1 : 0
      let postData = {
        flag: 2,
        ids: this.$route.query.shopID,
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
    },
    //判断店铺是否收藏
    checkCollect(){
      let postData = {
        flag: 2,
        user_id: this.userData.id,
        ids: this.$route.query.shopID
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
    }
  },
  created(){
    this.checkCollect()
    this.getShopData()
  },
  mounted(){
    this.initShopScroll()
  },
  activated(){
    this.checkCollect()
  },
  watch:{
    '$route'(to,from){
      console.log(to,from)
      //从商店页面跳转其他页面,存储下shopID
      if(from.name == 'shop'){
        this.id = from.query.shopID
      }
      //从其他页面进入商店页面,比对shopID是否改变
      if(to.name == "shop" && to.query.shopID != this.id){
        this.page = 1
        this.goodsList = []
        this.active = 0
        this.getShopData('init')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopHeader >>> .van-tabs__nav
    background-color: rgba(0,0,0,0)
  .shopHeader >>> .van-tab
    color: #fff
  .shopHeader >>> .van-hairline--top-bottom
    &::after
      border-width: 0
  .shopHeader >>> .van-tabs__line
    background-color: #fff



  .shopContent-wrapper
    background-color: #F6F7FB
    .shopHeader
      width: 100vw
      color: #fff
      position: fixed
      top: 0
      left: 0
      .header-img
        position: absolute 
        top: 0
        left: 0
        z-index: -2
      .masking
        width: 100vw
        min-height: 30vw
        background-color: #310E0A
        padding: 3vw 4vw 0 4vw
        box-sizing: border-box
        .header-top
          width: 100%
          padding: 1vw 0
          display: flex
          flex-direction: row
          justify-content: space-between
          align-items: center
          box-sizing: border-box
          margin-bottom: 2vw
          .top-name 
            font-size: 5vw
            font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
            font-weight: bold
          .top-right
            display: flex
            flex-direction: row
            align-items: center
            .collectShop
              height: 5vw
              line-height: 5vw
              border: 1px solid #fff
              border-radius: 4vw
              padding: 1vw 2vw
              margin-right: 2vw
            .header-cross
              width: 7vw
              height: 7vw
              border-radius: 5vw
              border: 1px solid #fff
              display: flex
              align-items: center
              justify-content: center
        .header-middle
          font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
          margin-bottom: 2vw
          font-size: 3.5vw
          display: flex
          align-items: center
          .middle-num
            margin-left: 2vw
            font-family: hgzt
            color: #FF5756
          .coupon
            font-size: 3vw
            background-color: #FF5756
            padding: 1vw
            margin-left: 2vw
        .header-tabs
          display: flex
          flex-direction: row
          align-items: center
          font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
          padding: 2vw 0
          .tab
            margin-right: 8vw
            font-size: 3.8vw
            color: #fff
            display: flex
            align-items: center
          .actived-tab
            margin-right: 8vw
            font-size: 5vw
            color: #FF5756
            display: flex
            align-items: center
    .shop-goods
      position: absolute  
      top: 30vw
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      background: linear-gradient(to bottom,#310E0A , #ffffff 25%, #ffffff);
      .goodItems
        display: flex
        padding: 0 2vw
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-between
        align-items: flex-start
        min-height: 90vh
        .blank
          width: 100vw
          height: 2vw
        .shop-loading
          width: 100%
          display: flex
          flex-direction: row
          justify-content: center
          align-items: center
          margin: 3vw 0
          .loading-img
            width: 6vw
            height: 5vw
            margin-right: 2vw
        .no-more
          width: 100%
          font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
          font-weight: bold
          font-size: 4vw
          display: flex
          flex-direction: row
          justify-content: center
          align-items: center
          margin: 3vw 0
          .loading-img
            width: 6vw
            height: 5vw
            margin-right: 2vw
</style>