<template>
  <div class="search-wrapper" v-show="showSearch" ref="searchScroll">
    <div class="items-wrapper">
      <div class="search-items">
        <ProductItem v-for="item of searchList" :data="item" @productItemClick="productItemClick(item.id)" :key="item.id"/>
      </div>

      <div class="searchGoods-loading" v-if="showLoading">
          <van-loading color="#FF5756" size="24px">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
        </div>
        
      <div class="no-more" v-show="showNoMore">
        <img class="loading-img" src="/public/uploads/home/load.png" alt="">
        <span>没有更多了</span>
      </div>

      <div class="warn" v-if="showWarn">
        <span>未搜索到任何商品</span>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../miniComponents/productItem'
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
import { searchGoods } from '../../utils/axios/request'
export default {
  name:"SearchGoods",
  data(){
    return {
      searchList: [],
      page: 1,
      showLoading: true,
      showNoMore: false,
      showWarn: false
    }
  },
  components: {
    ProductItem
  },
  computed: {
    ...mapState(['showSearch','searchText'])
  },
  watch: {
    searchText(){
      this.showLoading = false
      this.showNoMore = false
      this.showWarn = false
      this.page = 1
      if(this.searchScroll){
        this.searchScroll.closePullUp()
      }
      this.searchList = []
      if(this.searchText.length > 0){
        this.getSearchGoods('init')
      }
    }
  },
  methods: {
    ...mapMutations(['changeSearchText']),
    //可以继续加载的状态
    loadingStatus(){
      this.showLoading = true
      this.showNoMore = false
      this.showWarn = false
    },
    //没有更多的状态
    noMorestatus(){
      this.showLoading = false
      this.showNoMore = true
      this.showWarn = false
    },
    //提醒的状态
    warnStatus(){
      this.showLoading = false
      this.showNoMore = false
      this.showWarn = true
    },
    //获取搜索的商品列表
    getSearchGoods(type){
      if(this.searchText.length > 0){
        let postdata = {
          goods_name: this.searchText,
          page: this.page
        }
        searchGoods(postdata)
          .then((res)=>{
            console.log('searchGoods',res.data)
            if(res.data.code == 1){
              if(type == 'init'){
                if(res.data.data.length > 0){
                  this.searchList = [...res.data.data]
                  this.$nextTick(()=>{
                    if(this.searchList.length > 8){
                      this.page = this.page + 1
                      this.loadingStatus()
                      if(this.searchScroll){
                        this.searchScroll.refresh()
                        if(!this.searchScroll.pullupWatching){
                          this.searchScroll.openPullUp()
                        }
                      }
                    }else{
                      this.noMorestatus()
                    }
                  })
                }else{
                  this.warnStatus()
                }
              }else{
                if(res.data.data.length > 0){
                  this.searchList = [...this.searchList,...res.data.data]
                  this.loadingStatus()
                  this.$nextTick(()=>{
                    this.page = this.page + 1
                    this.searchScroll.finishPullUp()
                    if(!this.searchScroll.pullupWatching){
                      this.searchScroll.openPullUp()
                    }
                    this.searchScroll.refresh()
                  })
                }else{
                  this.noMorestatus()
                  this.searchScroll.closePullUp()
                  this.searchScroll.refresh()
                }
              }
            }
          })
          .catch((err)=>{
            console.log('search err',err)
          })
      }
    },
    //初始化搜索列表滚动
    initScroll(){
      this.$nextTick(()=>{
        let el = this.$refs.searchScroll
        this.searchScroll = new Bscroll(el,{
          click: true,
          tap: true,
          bounce:{
            top: false
          },
          pullUpLoad: {
            threshold: 60
          },
          eventPassthrough: 'horizontal'
        })

        this.searchScroll.on('pullingUp',()=>{
          console.log('pullingup')
          this.getSearchGoods()
        })

        this.searchScroll.on('beforeScrollStart',()=>{
          this.searchScroll.refresh()
        })

        // console.log('searchScroll',this.searchScroll)
      })
    },
    productItemClick(id){
      // console.log(this.searchScroll)
      this.$router.push('/product?id='+ id)
    }
  },
  mounted(){
    this.initScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .search-wrapper
    position: fixed 
    top: 12vw
    left: 0
    right: 0
    bottom: 12vw
    background-color: #eee
    z-index: 4
    overflow: hidden
    .items-wrapper
      min-height: 100%
      .search-items
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-between
        padding: 2vw
        box-sizing: border-box

      .searchGoods-loading
        width: 100%
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        padding: 3vw 0
        font-family: PFB
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
        font-family: PFB
        .loading-img
          width: 6vw
          margin-right: 2vw

      .warn
        margin-top: 20vw
        font-family: PFH
        font-size: 5vw
        text-align: center
</style>