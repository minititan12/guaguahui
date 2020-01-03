<template>
  <div class="coupon-wrapper">
    <van-nav-bar
      title="优惠劵"
      left-arrow
      @click-left="handleBack"
      @click-right="handleToSearch"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>

    <van-sticky>
      <van-tabs v-model="active" title-active-color="#FF5756" @change="handleActiveChange">
        <van-tab title="全部"></van-tab>
        <van-tab title="未使用"></van-tab>
        <van-tab title="已使用"></van-tab>
        <van-tab title="已过期"></van-tab>
      </van-tabs>
    </van-sticky>

    <div class="coupon-items" ref="couponItems">
      <div>

        <div class="blank"></div>

        <CouponItem :showStatus="true" :data="item" v-for="item of couponList" />

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
          <span>该状态没有优惠券</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import CouponItem from '../../components/miniComponents/couponItem'
import { getMyCoupons } from '../../utils/axios/request'
import { mapState } from 'vuex'
export default {
  name: "Coupon",
  components: {
    CouponItem,
  },
  data(){
    return {
      active: 0,
      page: 1,
      couponList:[],
      status: -1,
      showLoading: false,
      showNoMore: false,
      showWarn: false
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },

    //跳转优惠券搜索页面
    handleToSearch(){
      console.log('search')
      this.$router.push({
        path: '/couponSearch'
      })
    },

    //排序下优惠券
    sortCouponList(){
      let unusedList = []
      let usedList = []
      let pastList = []

      for(let item of this.couponList){
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

      this.couponList = unusedList.concat(usedList,pastList)
    },

    //获取优惠劵信息
    getCouponData(){
      let postData = {
        page: this.page,
        user_id: this.userData.id,
        status: this.status,
        keyword: ''
      }
      getMyCoupons(postData)
        .then((res)=>{
          console.log('getMyCoupons',res.data)
          if(res.data.code == 1){
            if(res.data.data.list.length > 0){
              this.couponList = [...this.couponList,...res.data.data.list]
              this.page = this.page + 1
              this.$nextTick(()=>{
                this.sortCouponList()
                if(this.couponList.length > 6){
                  this.showLoading = true
                  this.showNoMore = false
                  this.couponScroll.finishPullUp()
                }else{
                  this.showLoading = false
                  this.showNoMore = false
                }
              })
            }else{
              if(this.couponList.length > 0){
                this.showLoading = false
                this.showNoMore = true
                this.couponScroll.closePullUp()
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

    //初始化优惠券列表滚动
    initCouponScroll(){
      this.couponScroll = new BScroll(this.$refs.couponItems,{
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

      this.couponScroll.on('pullingUp',()=>{
        console.log(this.couponScroll)
        console.log('pulling up get')
        this.getCouponData()
      })

      this.couponScroll.on('beforeScrollStart',()=>{
        this.couponScroll.refresh()
      })
    },
    
    //active改变
    handleActiveChange(name,title){
      // console.log(name,title)
      this.status = name - 1
      this.page = 1
      this.showLoading = false
      this.showNoMore = false
      this.showWarn = false
      this.couponScroll.closePullUp()
      this.couponList = []
      this.getCouponData()
    },
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
  .coupon-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .coupon-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
  
  .coupon-wrapper >>> .van-icon-search
    font-size: 4.5vw
    color: #999

  .coupon-wrapper >>> .van-tabs__line
    background-color: #FF5756 

  .coupon-wrapper >>> .van-tab
    font-size: 3.5vw
    color: #000
    font-family: PFB
  
  .coupon-wrapper
    width: 100%
    .coupon-items
      position: absolute 
      top: 90px
      bottom: 0
      left: 0
      right: 0
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
        font-family: PFH
        color: #000
        .iconfont
          font-size: 10vw
          color: #FF5756
          margin: 10vw 0 5vw 0 
</style>