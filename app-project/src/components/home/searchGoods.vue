<template>
  <div class="search-wrapper" v-show="showSearch" ref="searchScroll">
    <div class="items-wrapper">
      <div class="search-items">
        <ProductItem v-for="item of searchList" :data="item" @productItemClick="productItemClick(item.id)" :key="item.id"/>
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
import axios from 'axios'
export default {
  name:"SearchGoods",
  data(){
    return {
      searchList: [],
      page: 1,
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
      this.page = 1
      this.searchList = []
      if(this.searchText.length > 0){
        let postdata = {
          goods_name: this.searchText,
          page: this.page
        }
        axios.post('/api/method/searchGoods',postdata)
          .then((res)=>{
            console.log('firstsearch',res.data)
            if(res.data.code == 1){
              this.searchList = res.data.data
              this.$nextTick(()=>{
                this.searchScroll.refresh()
              })
              this.page = this.page + 1
              console.log(this.searchList)
              if(!res.data.data.length){
                this.showWarn = true
                console.log('get none')
              }
            }else{
              this.showWarn = true
              console.log('search err')
            }
          })
          .catch((err)=>{
            console.log('search err',err)
          })
      }
    },
    searchList(){
      if(this.searchList.length){
        this.showWarn = false
      }
    }
  },
  methods: {
    ...mapMutations(['changeSearchText']),
    getMoreSearchGoods(){
      if(this.searchText.length > 0){
        let postdata = {
          goods_name: this.searchText,
          page: this.page
        }
        axios.post('/api/method/searchGoods',postdata)
          .then((res)=>{
            console.log('getMoreSearch:',res.data)
            if(res.data.code == 1){
              this.searchList = [...this.searchList,...res.data.data]
              this.$nextTick(()=>{
                this.searchScroll.refresh()
              })
              this.page = this.page + 1
              console.log(this.searchList)
              if(!res.data.data.length){
                console.log('get none')
              }
            }else{
              console.log('search err')
            }
            if(res.data.code == 1 && res.data.data.length){
              this.searchScroll.finishPullUp()
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
          this.getMoreSearchGoods()
          console.log('pullingup')
        })

        let that = this
        this.searchScroll.on('beforeScrollStart',()=>{
          that.searchScroll.refresh()
        })
      })
    },
    productItemClick(id){
      console.log(this.searchScroll)
      this.$router.push('/product?id='+ id)
    },

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
      .warn
        margin-top: 20vw
        font-family: PFH
        font-size: 5vw
        text-align: center
</style>