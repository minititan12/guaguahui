<template>
  <div class="content-wrapper" ref="wrapper">
    <div class="all-wrapper">
      <transition name="fade">
        <div class="content-refresh" v-if="mainPageRefresh">
          <van-loading color="#FF5756" size="24px">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
        </div>
      </transition>
      <!-- <LittleTitle :recommendList="recommendList"></LittleTitle> -->
      <MainSwiper :swiperList="swiperList"></MainSwiper>
      <MainIcons :iconsList="iconsList"></MainIcons>
      <TodayHot :todayHotList="todayHotList"></TodayHot>
      <LimitMore :seckillData="seckillData"></LimitMore>
      <LimitShopping :seckillData="seckillData"></LimitShopping>
      <BrandAD :brandADList="brandADList"></BrandAD>
      <ProductAD :productADList="productADList"></ProductAD>
      <MainActivity :activityList="activityList"></MainActivity>
      <MainProducts :productsList="productsList"></MainProducts>
      <div class="pullUpLoading">
        <van-loading color="#FF5756" size="24px" v-show="showLoading">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span>加载中...</span>
        </van-loading>
        <div class="no-more" v-show="!showLoading">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span>没有更多了</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import axios from 'axios'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'MainContent',
  components: {
    'LittleTitle': () => import('./littleTitle'),
    'MainSwiper': () => import('./swiper'),
    'MainIcons': () => import('./icons'),
    'TodayHot': () => import('./todayHot'),
    'LimitMore': () => import('./limitMore'),
    'LimitShopping': () => import('./limitShopping'),
    'BrandAD': () => import('./brandAD'),
    'ProductAD': () => import('./productAD'),
    'MainActivity': () => import('./mainActivity'),
    'MainProducts': () => import('./products')
  },
  data(){
    return {
      swiperList: [],
      iconsList: [],
      seckillData: null,
      activityList: [],
      productsList: [],
      // recommendList:[],
      todayHotList: [],
      brandADList: [],
      productADList: [],
      productPage: 1,
      y: null,
      showLoading: true
    }
  },
  computed: {
    ...mapState(['mainPageRefresh','currentTab','toTop'])
  },
  methods: {
    ...mapMutations(['updateRefreshStatus','changeSearchText','updatedToTop']),
    //触发下拉之后更新数据
    refreshData(){
      this.changeSearchText('')
      this.getSwiperList()
      this.getIconsList()
      this.getActivityList()
      this.getProductsList(true)
      this.getlimitShoppingData()
      // this.getRecommendData()
      this.getTodayHotList()
    },
    //上拉加载的操作
    handlePullingUp(){
      if(this.scroll){
        console.log('pullingup')
        this.getProductsList()
      }
    },
    //初始化主页面滚动条
    initScroll(){
      let el = this.$refs.wrapper
      this.scroll = new Bscroll(el,{
        pullDownRefresh: {
          threshold: 50,
          stop: 0
        },
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.scroll.on('pullingDown',()=>{
        this.productPage = 1
        this.updateRefreshStatus(true)
        this.refreshData()
        setTimeout(()=>{
          this.updateRefreshStatus(false)
          this.scroll.finishPullDown()
          this.scroll.refresh()
        },2000)
      })

      let that = this

      this.scroll.on('pullingUp',this.handlePullingUp)

      this.scroll.on('beforeScrollStart',()=>{
        that.scroll.refresh()
      })
    },
    //获取首页轮播图数据
    getSwiperList(){
      axios.get('/api/method/lunbo')
        .then((res)=>{
          console.log('swiper data:',res.data)
          if(res.data.code == 1){
            this.swiperList = res.data.data
          }
        })
        .catch((err)=>{
          console.log('get swiper data err' + err)
        })
    },
    //获取首页分类数据
    getIconsList(){
      axios.get('/api/method/getClass')
        .then((res)=>{
          let data = res.data
          console.log('icons:',res.data)
          if(data.code == 1){
            this.iconsList = data.data
          }
        })
        .catch((err)=>{
          console.log('get icons err' + err)
        })
    },
    //获取今日热销数据
    getTodayHotList(){
      axios.get('/api/method/hotlist')
        .then((res)=>{
          console.log('hotlist:',res.data)
          let data = res.data
          this.$toast.clear()
          if(data.code == 1){
            this.todayHotList = data.data
            this.$nextTick(()=>{
              this.scroll.refresh()
            })
          }
        })
        .catch((err)=>{
          this.$toast.clear()
          console.log('get hotlist err' + err)
        })
    },
    //获取首页活动数据
    getActivityList(){
      axios.get('/api/method/getClassbrand')
        .then((res)=>{
          console.log('activityData:',res.data)
          let data = res.data
          if(data.code == 1){
            this.activityList = data.data
          }
        })
        .catch((err)=>{
          console.log('get activity err' + err)
        })
    },
    //获取秒杀产品数据
    getlimitShoppingData(){
      axios.get('api/method/checkSeckill')
        .then((res)=>{
          console.log('checkSeckill',res.data)
          if(res.data.code == 1){
            this.seckillData = res.data.data
          }
        })
        .catch((err)=>{
          console.log('checkSeckill',err)
        })
    },
    //获取首页产品的数据
    getProductsList(refresh){
      let postData = {
        page: this.productPage
      }
      axios.post('/api/method/getGoods',postData)
        .then((res)=>{
          console.log('productData:',res.data)
          let data = res.data
          if(data.code == 1){
            if(refresh){
              this.productsList = data.data
            }else{
              if(data.data.length > 0){
                setTimeout(()=>{
                  this.productsList = [...this.productsList,...data.data]

                  this.$nextTick(()=>{
                    this.scroll.finishPullUp()
                    this.scroll.refresh()
                  })
                },300)
              }else{
                this.showLoading = false
              }
            }
            this.productPage = this.productPage + 1
          }
        })
        .catch((err)=>{
          console.log('get product err' + err)
        })
    },
    //获取首页品牌广告的数据
    getBrandADData(){
      axios.get('api/method/brandadsense')
        .then((res)=>{
          console.log('brandadsense data:',res.data)
          if(res.data.code == 1){
            this.brandADList = res.data.data
          }
        })
        .catch((err)=>{
          console.log('get brandadsense err' + err)
        })
    },
    //获取首页产品广告的数据
    getProductADData(){
      axios.get('api/method/goodsadsense')
        .then((res)=>{
          console.log('goodsadsense data:',res.data)
          if(res.data.code == 1){
            this.productADList = res.data.data
          }
        })
        .catch((err)=>{
          console.log('get goodsadsense err' + err)
        })
    }
  },
  created(){
    this.$toast({
      type: "loading",
      duration: 4000
    })
    this.changeSearchText('')
    this.getSwiperList()
    this.getIconsList()
    this.getlimitShoppingData()
    this.getActivityList()
    this.getProductsList(true)
    // this.getRecommendData()
    this.getBrandADData()
    this.getProductADData()
    this.getTodayHotList()
  },
  mounted(){
    this.initScroll()
  },
  //keep-alive页面显示时触发
  activated(){
    if(this.scroll){
      this.scroll.refresh()
      if(this.y){
        this.scroll.scrollTo(0,this.y)
      }
    }
  },
  watch:{
    currentTab(){
      if(this.currentTab == 1){
        // console.log('refresh')
        if(this.scroll){
          this.scroll.refresh()
          if(this.y){
            this.scroll.scrollTo(0,this.y)
          }
        }
      }else{
        if(this.scroll){
          this.y = this.scroll.y
        }
      }
    },
    toTop(){
      if(this.toTop){
        console.log('totop')
        this.scroll.scrollTo(0,0,0)
        this.updatedToTop(false)
      }
    },
    '$route'(to,from){
      if(from.name == 'home'){
        if(this.scroll){
          this.y = this.scroll.y
        }
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .fade-leave
    height: 15vw
  .fade-leave-active
    transition: height .5s ease
  .fade-leave-to
    height: 0
    opacity: 1

  .content-wrapper >>> .van-loading__text
    color: #FF5756
    font-family: PFH
  .content-wrapper >>> .van-loading
    height: 15vw
    display: flex
    align-items: center

  .content-wrapper
    position: fixed
    overflow: hidden
    top: 18vw
    bottom: 1rem
    left: 0
    right: 0
    z-index: 2
    .all-wrapper
      background: linear-gradient(to bottom, #fff, #F6F7FB 300vw, #F6F7FB)
      // background-color: #999
      .content-refresh
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        background-color: #fff
        .loading-img
          width: 6vw
          margin-right: 2vw
      .pullUpLoading
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        .loading-img
          width: 6vw
          height: 5vw
          margin-right: 2vw
        .no-more
          height: 15vw
          line-height: 15vw
          font-family: PFH
          font-size: 4vw
</style>


