<template>
  <div class="goods-wrapper">
    <div class="goods-tab">
      <van-tabs v-model="active" @change="handleActiveChange" title-active-color="#FF5756">
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

    <mescroll-vue :down="down" :up="up" @init="init">
      <div class="goodsList-wrapper">
        <ProductItem
          v-if= "goodsList.length > 0"
          v-for= "item of goodsList"
          :data = "item"
          @productItemClick="handleToProduct(item.id)">
        </ProductItem>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { getBrandGoods,searchbrandGoods } from '../../utils/axios/request'
import Bscroll from 'better-scroll'
import ProductItem from '../miniComponents/productItem'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "GoodsItem",
  components:{
    ProductItem,
    MescrollVue
  },
  data(){
    return {
      goodsList: [],
      active: 0,
      scrollTop: 0,
      down:{
        use: false
      },

      up:{
        isBounce: false,
        htmlNodata: '<div class="pullUpLoading"><div class="no-more"><img class="loading-img" src="/public/uploads/home/load.png" alt=""><span>没有更多了</span></div></div>',
        htmlLoading: '<div class="pullUpLoading"><p class="loading"></p><img class="loading-img" src="/public/uploads/home/load.png" alt=""><span>加载中...</span></div>',
        auto:true,
        callback:this.handlePullingUp,
        onScroll:(mescroll, y, isUp)=>{
          this.scrollTop = y;
        }
      }
    }
  },
  computed:{
    ...mapState(['currentGoodsInputValue'])
  },
  
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },

    //上拉加载的操作
    handlePullingUp(page){
      if(this.mescroll){
        console.log('pullingup')
        this.getGoodsList(page.num)
      }
    },

    //获取商品数据(根据goodsID,页码page,属性status)
    getGoodsList(page){
      console.log('getGoodsList')
      let id = this.$route.query.goodsID
      let postData = {
        id: id,
        page: page,
        status: this.active
      }
      getBrandGoods(postData)
        .then((res)=>{
          console.log('getBrandGoods:',res.data)
          let data = res.data
          if(page == 1){
            setTimeout(()=>{
              this.mescroll.endSuccess(data.data.attributes_amount.length,data.data.attributes_amount.length>=10);
            },1000);
          }else{
            this.mescroll.endSuccess(data.data.attributes_amount.length,data.data.attributes_amount.length>=10);	
          }

          if(data.code == 1){
            if(page == 1){
              this.goodsList = data.data.attributes_amount;
            }else{
              this.goodsList = [...this.goodsList,...data.data.attributes_amount]
            }
          }else{
            this.$toast({
              message: data.message,
              type: 'fail',
              duration: 1500
            })
          }
        })
        .catch((err)=>{
          this.mescroll.endErr();
          console.log('get product err' + err)
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
      searchbrandGoods(postData)
        .then((res)=>{
          console.log('searchbrandGoods:',res.data)
          if(res.data.code == 1){
            if(type == 'pullingUp'){        //上拉加载
              if(res.data.data.length > 0){
                this.goodsList = [...this.goodsList,...res.data.data]
                this.page = this.page + 1
                this.loadingStatus()

                this.$nextTick(()=>{
                  this.goodsScroll.finishPullUp()
                  this.goodsScroll.refresh()
                })
              }else{
                this.noMoreStatus()
                this.$nextTick(()=>{
                  this.goodsScroll.closePullUp()
                  this.goodsScroll.refresh()
                })
              }
            }else {            //切换active或者第一次加载
              this.goodsList = [...res.data.data]
              this.page = this.page + 1

              if(this.goodsList.length > 0){
                if(this.goodsList.length < 8){
                  this.noMoreStatus()
                  this.$nextTick(()=>{
                    this.goodsScroll.refresh()
                    this.goodsScroll.closePullUp()
                  })
                }else{
                  this.loadingStatus()
                }
              }else{
                this.warnStatus()
              }

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
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        })
        .catch((err)=>{})
    },

    //跳转到商品详情页
    handleToProduct(id){
      this.$router.push('/product?id=' + id)
    },

    //active变化的时候
    handleActiveChange(name,title){
      //把商品列表清空
      this.goodsList = []

      if(this.currentGoodsInputValue.length){
        this.getSearchList()
      }else{
        this.mescroll.resetUpScroll()
      }
    }
  },

  watch:{
    //输入框的值
    currentGoodsInputValue(val){
      console.log('inputvalue change')
      if(this.currentGoodsInputValue.length){
        this.goodsList = []
        this.active = 0
        this.getSearchList()
      }else{
        this.goodsList = []
        this.active = 0
        this.mescroll.resetUpScroll()
      }
    },
  },

  //keep-alive返回页面时
  activated(){
    console.log('activated')
    if(localStorage.fromHomeToGoods == 'true'){
      if(this.active != 0){
        this.active = 0
      }else{
        this.mescroll.resetUpScroll()
      }
    }else{
      if(this.mescroll){
        if(this.scrollTop){
          this.mescroll.scrollTo(this.scrollTop,0);
        }
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .goods-wrapper
    width: 100%
    .goods-tab
      position: fixed
      top: 45px
      left: 0
      width: 100vw
    
    .mescroll{
      position absolute
      left 0
      top calc(45px + 10vw)
      height calc( 100% - 10vw - 45px) 
      >>> .mescroll-upwarp{
          padding: 0;
      }
    }
  
  >>> .goodsList-wrapper
    display: flex
    flex-direction: row
    justify-content: space-around
    flex-wrap: wrap
    padding-top: 3vw

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


