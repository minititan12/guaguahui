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
    ...mapMutations(['updateCurrentGoodsInputValue']),
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },

    //上拉加载的操作
    handlePullingUp(page){
      if(this.mescroll){
        console.log('pullingup')
        if(this.currentGoodsInputValue.length > 0){
          this.getSearchList(page.num)
        }else{
          this.getGoodsList(page.num)
        }
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
              this.goodsList = [...data.data.attributes_amount];
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
    getSearchList(page){
      console.log('getSearchList')
      let id = this.$route.query.goodsID
      let postData = {
        id: id,
        goods_name: this.currentGoodsInputValue,
        page: page,
        status: this.active
      }
      searchbrandGoods(postData)
        .then((res)=>{
          console.log('searchbrandGoods:',res.data)
          let data = res.data
          if(page == 1){
            setTimeout(()=>{
              this.mescroll.endSuccess(data.data.length,data.data.length>=10)
            },1000)
          }else{
            this.mescroll.endSuccess(data.data.length,data.data.length>=10)
          }

          if(data.code == 1){
            if(page == 1){
              this.goodsList = [...data.data]
            }else{
              this.goodsList = [...this.goodsList,...data.data]
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
          console.log('get searchProduct err' + err)
        })
    },

    //跳转到商品详情页
    handleToProduct(id){
      this.$router.push('/product?id=' + id)
    },

    //active变化的时候
    handleActiveChange(name,title){
      //把商品列表清空
      this.goodsList = []
      this.mescroll.resetUpScroll()
    }
  },

  watch:{
    //输入框的值
    currentGoodsInputValue(val){
      console.log('inputvalue change')
      if(this.active == 0){
        this.goodsList = []
        this.mescroll.resetUpScroll()
      }else{
        this.active = 0
      }
    },
  },

  //keep-alive返回页面时
  activated(){
    console.log('activated')
    if(localStorage.fromHomeToGoods == 'true'){
      if(this.currentGoodsInputValue.length){
        this.updateCurrentGoodsInputValue('')
      }else{
        if(this.active == 0){
          this.goodsList = []
          this.mescroll.resetUpScroll()
        }else{
          this.active = 0
        }
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
      position: absolute 
      top: 45px
      left: 0
      width: 100vw
    
    .mescroll{
      position absolute
      left 0
      top 89px
      height calc( 100% - 89px) 
      >>> .mescroll-upwarp{
          padding: 0;
      }
    }
  
  >>> .goodsList-wrapper
        display: flex
        flex-direction: row
        justify-content: space-between
        flex-wrap: wrap
        padding: 3vw 2vw 0 2vw

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


