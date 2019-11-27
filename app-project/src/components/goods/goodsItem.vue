<template>
  <div class="goods-wrapper">
    <div class="goods-tab">
      <van-tabs v-model="active" title-active-color="#FF5756">
        <van-tab title="综合"></van-tab>
        <van-tab title="销量"></van-tab>
        <van-tab>
          <div slot="title">
            价格<van-icon name="arrow-down" />
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            价格<van-icon name="arrow-up" />
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="wrapper-contain" ref="goodsWrapper" >
      <div class="good-wrapper" >
        <div class="blank"></div>
        <ProductItem
          v-if= "goodsList.length > 0"
          v-for= "item of goodsList"
          :data = "item"
          @productItemClick="handleToProduct(item.id)">
        </ProductItem>
        <div class="goodsList-loading" v-if="showLoading">
          <van-loading color="#FF5756" size="24px">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
        </div>
        <div class="no-more" v-show="showNoMore">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span>没有更多了</span>
        </div>
        <!-- <div class="blank"></div> -->
        <div class="goods-warn" v-if="showWarn">
          <span class="iconfont">&#xe610;</span>
          <span>该系列没有商品上架</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Bscroll from 'better-scroll'
import ProductItem from '../miniComponents/productItem'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "GoodsItem",
  data(){
    return {
      goodsList: [],
      showWarn: false,
      page: 1,
      active: 0,
      inputValue: '',
      showLoading: true,
      showNoMore: false
    }
  },
  components:{
    ProductItem
  },
  computed:{
    ...mapState(['currentGoodsInputValue'])
  },
  
  methods: {
    //获取商品数据(根据goodsID,页码page,属性status)
    getGoodsList(type){
      console.log('getGoodsList')
      let id = this.$route.query.goodsID
      let postData = {
        id: id,
        page: this.page,
        status: this.active
      }
      axios.post('/api/method/getBarndGoods',postData)
        .then((res)=>{
          console.log('getBarndGoods:',res.data)
          if(res.data.code == 1){
            // console.log(res.data.count)
            if(type == 'pullingUp'){        //上拉加载
              if(res.data.data.count > 0){
                this.goodsList = [...this.goodsList,...res.data.data.attributes_amount]
                this.page = this.page + 1

                this.$nextTick(()=>{
                  this.goodsScroll.finishPullUp()
                })
              }else{
                this.goodsScroll.closePullUp()
                this.showLoading = false
                this.showNoMore = true
              }
            }else {      //切换active或者第一次加载或者清空搜索关键字
              this.goodsList = [...res.data.data.attributes_amount]
              this.page = this.page + 1

              this.goodsScroll.scrollTo(0,0)
              //如果pullup被关闭,就打开
              if(!this.goodsScroll.pullupWatching){
                this.$nextTick(()=>{
                  this.goodsScroll.openPullUp({
                      threshold: 60
                  })
                })
              }
            }

          }else{
            this.goodsScroll.finishPullUp()
          }

          if(!this.goodsList.length){
            this.showWarn = true
            this.showLoading = false
            this.showNoMore = false
          }
        })
        .catch((err)=>{
          console.log('get goods err',err)
        })
    },

    //获取搜索数据
    getSearchList(type){
      console.log('getSearchList')
      let id = this.$route.query.goodsID
      let postData = {
        id: id,
        goods_name: this.currentGoodsInputValue,
        page: this.page,
        status: this.active
      }
      axios.post('api/method/searchbrandGoods',postData)
        .then((res)=>{
          console.log('searchbrandGoods:',res.data)
          if(res.data.code == 1){
            if(type == 'pullingUp'){        //上拉加载
              if(res.data.data.length > 0){
                this.goodsList = [...this.goodsList,...res.data.data]
                this.page = this.page + 1

                this.$nextTick(()=>{
                  this.goodsScroll.finishPullUp()
                })
              }else{
                this.goodsScroll.closePullUp()
                this.showLoading = false
                this.showNoMore = true
              }
            }else {            //切换active或者第一次加载
              this.goodsList = [...res.data.data]
              this.page = this.page + 1

              this.goodsScroll.scrollTo(0,0)
              //如果pullup被关闭,就打开
              if(!this.goodsScroll.pullupWatching){
                this.$nextTick(()=>{
                  this.goodsScroll.openPullUp({
                      threshold: 60
                  })
                })
              }

            }
          }else{
            this.goodsScroll.finishPullUp()
          }

          if(!this.goodsList.length){
            this.showWarn = true
            this.showLoading = false
            this.showNoMore = false
          }
        })
        .catch((err)=>{
          console.log('searchbrandGoods err:',err)
        })
    },

    //上划时
    onPullingUp(){
      console.log('pullingup')
      if(this.currentGoodsInputValue.length){
        this.getSearchList('pullingUp')
      }else{
        this.getGoodsList('pullingUp')
      }
    },
    
    //初始化滚动页面
    initGoodsScroll(){
      let el = this.$refs.goodsWrapper
      this.goodsScroll = new Bscroll(el,{
        pullUpLoad: {
          threshold: 60
        },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.goodsScroll.on('pullingUp',this.onPullingUp)

      this.goodsScroll.on('beforeScrollStart',()=>{
        this.goodsScroll.refresh()
      })
    },

    //跳转到商品详情页
    handleToProduct(id){
      // this.goodsScroll.refresh()
      this.$router.push('/product?id=' + id)
    },

    //初始化组件数据
    initData(type){
      if(type == 'active'){
        this.page = 1
        this.showLoading = true
        this.showNoMore = false
      }else{
        this.page = 1
        this.active = 0
        this.showLoading = true
        this.showNoMore = false
      }
    }
  },

  watch:{
    //tab的属性active值
    active(){
      console.log('active change')

      this.initData('active')
      //切换active的时候先把pullup关了,把商品列表清空
      if(this.goodsScroll && this.goodsScroll.pullupWatching){
        this.goodsScroll.closePullUp()
      }
      this.goodsList = []

      //根据有无搜索关键词
      //判断是获取商品数据还是搜索商品数据
      if(this.currentGoodsInputValue.length){
        this.getSearchList()
      }else{
        this.getGoodsList()
      }
    },

    //输入框的值
    currentGoodsInputValue(val){
      console.log('inputvalue change')
      if(this.currentGoodsInputValue.length){
        let changeActive = false
        if(this.active != 0){
          changeActive = true
        }
        this.initData()
        if(!changeActive){
          this.getSearchList()
        }
      }else{
        console.log('input length 0')
        let changeActive = false
        if(this.active != 0){
          changeActive = true
        }
        this.initData()
        if(!changeActive){
          this.getGoodsList()
        }
      }
    },
    //商品数据数组
    goodsList(){
      if(this.goodsList.length){
        this.showWarn = false
      }
    }
  },

  mounted(){
    this.initGoodsScroll()
  },

  //keep-alive返回页面时
  activated(){
    console.log('activated')
    this.showWarn = false
    if(localStorage.fromHomeToGoods == 'true'){
      this.initData()
      this.$nextTick(()=>{
        this.getGoodsList()
      })
    }
    this.goodsScroll.refresh()
  },

  updated(){
    this.goodsScroll.refresh()
  }
}
</script>

<style lang="stylus" scoped>
  .goods-wrapper >>> .van-tabs--line .van-tabs__wrap
    height: 8vw
    margin-top: 1vw

  .goods-wrapper >>> .van-tab
    line-height: 8vw
    font-family: PFH
    font-size: 4vw
    color: #000
  
  .goods-wrapper >>> .van-tabs__line
    background-color: #FF5756

  .goods-wrapper
    width: 100%
    .goods-tab
      position: fixed
      top: 45px
      left: 0
      width: 100vw
    .wrapper-contain
      position: fixed 
      top: calc(45px + 9vw)
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      .good-wrapper
        width: 100%
        // min-height: calc(100vh - 80px)
        padding: 0 2vw
        box-sizing: border-box
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-between
        align-items: flex-start
        .blank
          width: 100%
          height: .4rem
        .goods-warn
          width: 100%
          text-align: center
          font-size: 5vw
          font-family: PFH
          line-height: 10vw
          display: flex
          flex-direction: column
          .iconfont
            font-size: 10vw
            margin-top: 5vw
        .goodsList-loading
          width: 100%
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          padding: 3vw 0
          .loading-img
            width: 6vw
            margin-right: 2vw
        .no-more
          width: 100%
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          padding: 3vw 0
          .loading-img
            width: 6vw
            margin-right: 2vw
        .good-item
          width: 45vw
          height: 60vw
          background-color: #fff
          margin-bottom: .2rem
          // float: left
          .good-img
            width: 45vw
            height: 45vw
          .good-title
            display: flex
            flex-direction: column
            margin: 0 .15rem
            .text
              width: 95%
              height: .6rem
              font-size: .3rem
              font-weight: 400
              padding-top: .1rem
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 2
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
            .price
              font-size: .35rem
              color: red
              text-align: left
</style>


