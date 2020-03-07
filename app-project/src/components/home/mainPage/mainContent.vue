<template>
  <div>
    <mescroll-vue :down="down" :up="up" @init="init">
      <MainSwiper :swiperList="swiperList"></MainSwiper>
      <MainIcons :iconsList="iconsList"></MainIcons>
      <TodayHot :todayHotList="todayHotList"></TodayHot>
      <LimitMore :seckillData="seckillData"></LimitMore>
      <LimitShopping :seckillData="seckillData"></LimitShopping>
      <BrandAD :brandADList="brandADList"></BrandAD>
      <ProductAD :productADList="productADList"></ProductAD>
      <MainActivity :activityList="activityList"></MainActivity>
      <MainProducts :productsList="productsList"></MainProducts>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { lunbo,getClass,hotlist,getClassbrand,checkSeckill,getGoods,brandadsense,goodsadsense } from '../../../utils/axios/request'
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
    'MainProducts': () => import('./products'),
    MescrollVue,
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
      showLoading: true,

      // 是否显示下拉箭头
      pullDown:true,
      // 是否下拉到足够的距离刷新
      refresh:false,

      // mescroll滚动的距离
      scrollTop: 0,
      mescroll: null,
      down:{
        offset: 120,
        htmlContent:'<div class="droping"><p class="downwarp-progress"></p><p class="downwarp-tip"></p></div><div class="refreshing"><p class="loading"></p><img class="loading-img" src="/public/uploads/home/load.png" alt=""><span>加载中...</span></div>',
        inited:(mescroll, downwarp)=>{
          mescroll.droping = downwarp.querySelector('.droping');
          mescroll.refreshing = downwarp.querySelector('.refreshing');
        },
        inOffset:(mescroll)=>{
          mescroll.droping.style.display="block";
          mescroll.refreshing.style.display="none";
          mescroll.droping.querySelector('.downwarp-tip').innerText = "下拉刷新";
        },
        outOffset:(mescroll)=>{
          mescroll.droping.querySelector('.downwarp-tip').innerText = "释放刷新";
        },
        onMoving(mescroll, rate, downHight){
          let deg = 0;
          deg = parseInt(downHight)*4.5;
          mescroll.droping.querySelector('.downwarp-progress').style.transform = "rotate("+ deg +"deg)";
        },
        showLoading:(mescroll)=>{
          mescroll.droping.style.display="none";
          mescroll.refreshing.style.display="block";
        },
        auto:false,
        callback:(mescroll)=>{
          this.refreshData();
          mescroll.resetUpScroll();
        }
      },
      up:{
        isBounce: false,
        htmlNodata: '<div class="pullUpLoading"><div class="no-more"><img class="loading-img" src="/images/load.png" alt=""><span>没有更多了</span></div></div>',
        htmlLoading: '<div class="pullUpLoading"><p class="loading"></p><img class="loading-img" src="/images/load.png" alt=""><span>加载中...</span></div>',
        auto:true,
        callback:this.handlePullingUp,
        onScroll:(mescroll, y, isUp)=>{
          this.scrollTop = y;
        }
      }
    }
  },
  computed: {
    ...mapState(['mainPageRefresh','currentTab','toTop'])
  },
  methods: {
    ...mapMutations(['updateRefreshStatus','changeSearchText','updatedToTop']),

    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },

    //触发下拉之后更新数据
    refreshData(){
      this.changeSearchText('')
      this.getSwiperList()
      this.getIconsList()
      this.getActivityList()
      this.getlimitShoppingData()
      // this.getRecommendData()
      this.getTodayHotList()
    },
    //上拉加载的操作
    handlePullingUp(page){
      if(this.mescroll){
        console.log('pullingup')
        this.getProductsList(page.num)
      }
    },
    //获取首页轮播图数据
    getSwiperList(){
      lunbo()
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
      getClass()
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
      hotlist()
        .then((res)=>{
          console.log('hotlist:',res.data)
          let data = res.data
          this.$toast.clear()
          if(data.code == 1){
            this.todayHotList = data.data
            // this.$nextTick(()=>{
            //   this.scroll.refresh()
            // })
          }
        })
        .catch((err)=>{
          this.$toast.clear()
          console.log('get hotlist err' + err)
        })
    },
    //获取首页活动数据
    getActivityList(){
      getClassbrand()
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
      checkSeckill()
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
    getProductsList(page){
      let postData = {
        page: page
      }
      getGoods(postData)
        .then((res)=>{
          console.log('productData:',res.data)
          let data = res.data
          if(page == 1){
            setTimeout(()=>{
              this.mescroll.endSuccess(data.data.length,data.data.length>=10);	
            },1000);
          }else{
            this.mescroll.endSuccess(data.data.length,data.data.length>=10);	
          }
          if(data.code == 1){
            if(page == 1){
              this.productsList = data.data;
            }else{
              this.productsList = [...this.productsList,...data.data]
            }
            this.productPage = this.productPage + 1
          }
        })
        .catch((err)=>{
          this.mescroll.endErr();
          console.log('get product err' + err)
        })
    },
    //获取首页品牌广告的数据
    getBrandADData(){
      brandadsense()
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
      goodsadsense()
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
    // this.getRecommendData()
    this.getBrandADData()
    this.getProductADData()
    this.getTodayHotList()
  },
  //keep-alive页面显示时触发
  activated(){
    if(this.mescroll){
      if(this.scrollTop){
        this.mescroll.scrollTo(this.scrollTop,0);
      }
    }
  },
  watch:{
    currentTab(){
      if(this.currentTab == 1){
        // console.log('refresh')
        if(this.mescroll){
          if(this.scrollTop){
            this.mescroll.scrollTo(this.scrollTop,0);
          }
        }
      }
    },
    toTop(){
      if(this.toTop){
        console.log('totop')
        this.mescroll.scrollTo(0,0)
        this.updatedToTop(false)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .mescroll{
      position absolute
      left 0
      top 18vw
      height calc( 100% - 30vw)
      background linear-gradient(to bottom, #fff, #F6F7FB 300vw, #F6F7FB)  
      >>> .mescroll-upwarp{
          padding: 0;
      }
  }

  // >>> .downwarp-content
  //   display: flex
  //   flex-direction: row
  //   justify-content: center
  //   align-items: center
  >>> .droping
        .downwarp-tip
          color #FF5756
        .downwarp-progress
          border-color #FF5756
          border-bottom-color: transparent;
  >>> .refreshing
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        color #FF5756
        .loading
          display inline-block
          width 4.2vw
          height 4.2vw
          margin-right 2vw
          border-radius 50%
          border 1px solid #FF5756
          border-bottom-color transparent
          vertical-align middle
          animation mescrollRotate .8s linear infinite
        .loading-img
          width: 6vw
          height: 5vw
          margin-right: 2vw
  >>> .pullUpLoading
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        color #FF5756
        height 15vw
        .loading
          display inline-block
          width 4.2vw
          height 4.2vw
          margin-right 2vw
          border-radius 50%
          border 1px solid #FF5756
          border-bottom-color transparent
          vertical-align middle
          animation mescrollRotate .8s linear infinite
        .loading-img
          width: 6vw
          height: 5vw
          margin-right: 2vw
        .no-more
          line-height: 15vw
          font-size: 4vw
</style>


