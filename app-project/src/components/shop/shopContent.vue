<template>
  <div class="shopContent-wrapper">
    <div class="shopHeader">
      <!-- <img :src="backImg" alt=""> -->
      <!-- <van-image
        class="header-img"
        width="100vw"
        height="120px"
        fit="cover"
        :src="header_img"
        style="-webkit-touch-callout: none"
      /> -->
      <div class="masking">
        <div class="header-top">
          <!-- <span>{{title}}</span> -->
          <span class="top-name">耐克旗舰店</span>
          <div class="top-right">
            <div class="collectShop">
              <span>收藏店铺</span>
            </div>
            <div class="header-cross" @click="handleBackClick">
              <van-icon name="cross" />
            </div>
          </div>
        </div>

        <div class="header-middle">
          <span>店铺评分</span>
          <span class="middle-num">4.9</span>
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

        <!-- <van-sticky @scroll="handleSticky" ref="vanSticky">
          <van-tabs style="margin-bottom: .2rem" v-model="active">
            <van-tab title="综合"></van-tab>
            <van-tab title="销量"></van-tab>
            <van-tab>
              <div slot="title">
                价格<van-icon name="arrow-up" />
              </div>
            </van-tab>
            <van-tab>
              <div slot="title">
                价格<van-icon name="arrow-down" />
              </div>
            </van-tab>
          </van-tabs>
        </van-sticky> -->
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
import axios from 'axios'
import Bscroll from 'better-scroll'
import ProductItem from '../miniComponents/productItem'
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
      showNoMore: false
    }
  },
  computed:{
    // shopID(){
    //   return this.$route.query.shopID
    // }
  },
  methods:{
    //获取商店商品数据
    getShopData(type){
      let user_id = this.$route.query.shopID
      let postData = {
        user_id: user_id,
        page: this.page,
        status: this.active
      }

      axios.post('api/method/getshopgoods',postData)
        .then((res)=>{
          console.log('getshopgoods',res.data)
          if(res.data.code == 1){
            this.title = res.data.company.company
            // this.header_img = res.data.company.shop_img
            if(type == 'pullingup'){
              if(res.data.data.length == 0){
                this.showLoading = false
                this.showNoMore = true
              }else{
                this.goodsList = [...this.goodsList,...res.data.data]

                this.$nextTick(()=>{
                  this.shopScroll.finishPullUp()
                  this.shopScroll.refresh()
                })
              }
            }else{
              this.goodsList = res.data.data
              if(this.shopScroll){
                this.$nextTick(()=>{
                  this.shopScroll.scrollTo(0,0)
                  this.shopScroll.finishPullUp()
                  this.shopScroll.refresh()
                })
              }
            }
            
            this.page = this.page + 1
          }
        })
        .catch((err)=>{
          console.log('getshopgoods err',err)
        })
    },
    //上拉处理函数
    onPullingUp(){
      console.log('pullingup')
      this.getShopData('pullingup')
    },
    //初始化商店产品滚动
    initShopScroll(){
      let el = this.$refs.shopGoodsWrapper
      this.shopScroll = new Bscroll(el,{
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
    // handleSticky(event){
    //   // console.log(event.isFixed)
    //   if(event.isFixed){
    //     this.$refs.vanSticky.style.backgroundColor = '#E31436'
    //   }
    // }
  },
  mounted(){
    this.initShopScroll()
    this.getShopData('init')
  },
  activated(){
    this.shopScroll.refresh()
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
    },
    goodsList(){
      if(this.goodsList.length >= 10){
        this.showLoading = true
      }else{
        this.showLoading = false
      }
    },
    active(){
      console.log('active change')
      this.page = 1
      this.showNoMore = false
      this.goodsList = []
      this.getShopData('init')
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
            font-family: PFB
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
          font-family: PFM
          margin-bottom: 3vw
          font-size: 3.5vw
          .middle-num
            margin-left: 2vw
            font-family: hgzt
            color: #FF5756
        .header-tabs
          display: flex
          flex-direction: row
          align-items: center
          font-family: PFM
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
          font-family: PFH
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