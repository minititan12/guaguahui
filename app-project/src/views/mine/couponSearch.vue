<template>
  <div class="search-wrapper">
    <div class="search-header">
      <van-icon name="arrow-left" @click="handleBack"/>
      <van-search placeholder="请输入关键词搜索优惠券" v-model="value" @search="onSearch"/>
    </div>
    
    <div class="search-items" ref="searchCoupon">
      <div>

        <div class="blank"></div>

        <CouponItem v-if="searchList.length > 0" :showStatus="true" :data="item" v-for="item of searchList"/>
        
        <div class="loading" v-show="showLoading">
          <van-loading color="#FF5756" size="24px">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
        </div>
        <div class="no-more" v-show="showNoMore">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span>没有更多了</span>
        </div>

        <div class="warn" v-show="showWarn">
          <span class="iconfont">&#xe605;</span>
          <span>未搜索到优惠券</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import { getMyCoupons } from '../../utils/axios/request'
import CouponItem from '../../components/miniComponents/couponItem'
import { mapState } from 'vuex'
export default {
  name: "CouponSearch",
  components: {
    CouponItem,
  },
  data(){
    return {
      value: '',
      page: 1,
      searchList:[],
      showLoading: false,
      showNoMore: false,
      showWarn: false
    }
  },
  computed:{
    ...mapState(['userData'])
  },
  methods: {
    //初始化优惠券搜索列表滚动
    initCouponScroll(){
      this.searchCouponScroll = new BScroll(this.$refs.searchCoupon,{
        bounce: {
          top: false
        },
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        click:true,
        eventPassthrough:'horizontal'
      })

      this.searchCouponScroll.on('pullingUp',()=>{
        // console.log(this.searchCouponScroll)
        console.log('pulling up get')
        this.getCouponData()
      })

      this.searchCouponScroll.on('beforeScrollStart',()=>{
        this.searchCouponScroll.refresh()
      })
    },

    //排序下优惠券
    sortCouponList(){
      let unusedList = []
      let usedList = []
      let pastList = []

      for(let item of this.searchList){
        if(item.status == 0){
          unusedList.push(item)
        }
        if(item.status == 1){
          usedList.push(item)
        }
        if(item.status == 2){
          pastList.push(item)
        }
      }

      this.searchList = unusedList.concat(usedList,pastList)
    },

    //获取优惠劵数据
    getCouponData(){
      let postData = {
        page: this.page,
        user_id: this.userData.id,
        status: -1,
        keyword: this.value
      }
      getMyCoupons(postData)
        .then((res)=>{
          console.log('getMyCoupons',res.data)
          if(res.data.code == 1){
            if(res.data.data.list.length > 0){
              this.searchList = [...this.searchList,...res.data.data.list]
              this.page = this.page + 1
              this.$nextTick(()=>{
                this.sortCouponList()
                if(this.searchList.length > 6){
                  this.showLoading = true
                  this.showNoMore = false
                  this.searchCouponScroll.finishPullUp()
                }else{
                  this.showLoading = false
                  this.showNoMore = false
                }
              })
            }else{
              if(this.searchList.length > 0){
                this.showLoading = false
                this.showNoMore = true
                this.searchCouponScroll.closePullUp()
              }else{
                this.showLoading = false
                this.showNoMore = false
                this.showWarn = true
              }
              
            }
          }
        })
        .catch((err)=>{
          console.log('getMyCoupons err',err)
        })
    },
    //搜索
    onSearch(){
      this.page = 1
      this.searchList = []
      this.showLoading = false
      this.showNoMore = false
      this.showWarn = false
      this.getCouponData()
    },
    handleBack(){
      this.$router.go(-1)
    }
  },
  created(){
    this.getCouponData()
  },
  mounted(){
    this.initCouponScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .search-wrapper
    width: 100%

    .search-header
      width: 100%
      display: flex
      flex-direction: row
      align-items: center
      padding: 0 3vw
      .van-icon-arrow-left
        font-size: 5vw
        color: #FF5756
      .van-search
        width: 90%

    .search-items
      position: absolute 
      top: 54px
      left: 0
      right: 0
      bottom: 0
      background-color: #F6F7FB
      overflow: hidden

      .blank
        width: 100%
        height: 3vw
      .loading
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
      .warn
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        font-size: 5vw 
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
        color: #000
        .iconfont
          font-size: 10vw
          color: #FF5756
          margin: 10vw 0 5vw 0 
</style>