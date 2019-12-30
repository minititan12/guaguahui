<template>
  <div class="integral-wrapper">
    <van-nav-bar
      title="积分商城"
      right-text="兑换记录"
      left-arrow
      @click-right="goRedemptionRecord"
      @click-left="handleBack"
    />
    <div class="head">
      <div class="label">当前积分</div>
      <div class="integral">{{credit}}</div>
      <!-- <div class="tip">积分当钱花，天天都能省！</div> -->
      <div class="details" @click="goIntegralDetails">积分明细</div>
    </div>

    <div class="content">
      <div class="tabs">
        <div :class="active == index ? 'activedTab' : 'tab'" v-for="(item,index) of tabList" @click="handleChangeActive(index)">{{item}}</div>
      </div>

      <div class="goodItems" ref="goodItems">
        <div class="items-wrapper">
          <IntegralGoodItem :itemData="item" v-for="item of goodList"/>

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
            <span>该积分区间没有商品</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IntegralGoodItem from '../../../components/miniComponents/integralGoodItem'
import { getCreditGoods,getCredit } from '../../../utils/axios/request'
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  name: "IntegralShop",
  components: {
    IntegralGoodItem
  },
  data(){
    return {
      tabList: ['全部','1-50','51-100','101-300','300以上'],
      active: 0,
      page: 1,
      goodList: [],
      showLoading: false,
      showNoMore: false,
      showWarn: false,
      credit: 0
    }
  },
  computed:{
    ...mapState(['userData'])
  },
  methods: {
    //loading状态
    loadingStatus(){
      this.showLoading = true
      this.showNoMore = false
      this.showWarn = false
    },
    //没有更多状态
    noMoreStatus(){
      this.showLoading = false
      this.showNoMore = true
      this.showWarn = false
    },
    //提醒状态
    warnStatus(){
      this.showLoading = false
      this.showNoMore = false
      this.showWarn = true
    },
    //初始化滚动
    initScroll(){
      let el = this.$refs.goodItems
      this.intergralGoodsScroll = new Bscroll(el,{
        bounce: {
          top: false
        },
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.intergralGoodsScroll.on('beforeScrollStart',()=>{
        this.intergralGoodsScroll.refresh()
      })

      this.intergralGoodsScroll.on('pullingUp',()=>{
        console.log('pulling up')
        this.getIntegralList()
      })

      // console.log(this.intergralGoodsScroll)
    },
    handleBack(){
      this.$router.go(-1)
    },
    //跳转兑换记录
    goRedemptionRecord(){
      this.$router.push('/redemptionRecord');
    },
    //跳转积分明细
    goIntegralDetails(){
      this.$router.push('/integralDetails');
    },
    //改变active
    handleChangeActive(index){
      if(this.active != index){
        this.active = index
        this.showLoading = false
        this.showNoMore = false
        this.showWarn = false
        this.page = 1
        if(this.intergralGoodsScroll){
          this.intergralGoodsScroll.closePullUp()
        }
        this.goodList = []
        this.intergralGoodsScroll.scrollTo(0,0)
        this.$toast({
          type: 'loading',
          duration: 3000
        })
        this.getIntegralList('init')
      }
    },
    //获取积分
    getCredit(){
      let getData = {
        user_id: this.userData.id
      }
      getCredit(getData)
        .then((res)=>{
          console.log('getCredit',res.data)
          if(res.data.code == 1){
            this.credit = res.data.data.credit
          }else{
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        }).catch(()=>{})
    },
    //获取积分列表
    getIntegralList(type){
      let levelStr = ''
      switch(this.active){
        case 0:
          levelStr = ''
          break
        case 1:
          levelStr = '1-50'
          break
        case 2:
          levelStr = '51-100'
          break
        case 3:
          levelStr = '101-300'
          break
        case 4:
          levelStr = '301-up'
          break
      }

      //获取get参数
      let getParams = undefined
      if(levelStr.length >0){
        getParams = {
          level: levelStr,
          page: this.page
        }
      }else{
        getParams = {
          page: this.page
        }
      }

      getCreditGoods(getParams)
        .then((res)=>{
          console.log('getCreditGoods',res.data)
          this.$toast.clear()
          if(res.data.code == 1){
            if(type == 'init'){//第一次请求或者切换active请求
              this.goodList = [...res.data.data]

              this.$nextTick(()=>{
                if(res.data.data.length < 10){//请求的列表数据没达到10个
                  if(res.data.data.length > 0){
                    this.noMoreStatus()
                    if(this.intergralGoodsScroll){
                      this.intergralGoodsScroll.closePullUp()
                    }
                  }else{//请求的列表数据为空
                    this.warnStatus()
                  }
                }else{//请求的列表数据达到10个
                  this.page = this.page + 1
                  this.loadingStatus()
                  if(this.intergralGoodsScroll){
                    this.intergralGoodsScroll.finishPullUp()
                  }
                  if(!this.intergralGoodsScroll.pullupWatching){//打开pullup功能
                    this.intergralGoodsScroll.openPullUp({
                      threshold: 10,
                      stop: 0
                    })
                  }
                }

                this.intergralGoodsScroll.refresh()
              })
            }else{//pullup请求列表数据
              this.goodList = [...this.goodList,...res.data.data]
              this.$nextTick(()=>{
                if(res.data.data.length < 10){//请求的列表数据不足10个
                  this.noMoreStatus()
                  // console.log(this.intergralGoodsScroll)
                }else{//请求的列表数据达到10个
                  this.page = this.page + 1
                  this.loadingStatus()
                  if(this.intergralGoodsScroll){//结束pullup
                    this.intergralGoodsScroll.finishPullUp()
                    this.intergralGoodsScroll.refresh()
                  }
                }
              })
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
    }
  },
  created(){
    this.getCredit()
    this.getIntegralList()
  },
  mounted(){
    this.initScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .integral-wrapper
    background #fff
    .van-nav-bar
      .van-icon
        color #FF5756
        font-size 5vw
      .van-nav-bar__title
        color #000
        font-size 4vw
        font-family PFH
      .van-nav-bar__text
        font-size 3.3vw
        color black
        font-family PFM

    .head
      height 30vw
      position relative
      background-image url('/public/static/integral/integral_bg.png')
      background-size 100% 100%
      .details
        position absolute
        right 9vw
        top 10vw
        background #f1f1f1
        font-size 3vw 
        font-family PFB
        color #5b5b5b
        height 7vw
        line-height 7vw
        border-radius 3.5vw
        padding 0 3vw
      .label
        font-size 4vw
        font-family PFB
        color #686868
        position absolute
        left 9vw
        top 6vw
      .integral
        font-size 9vw
        font-family hgzt
        position absolute
        left 9vw
        top 13vw
      .tip
        font-size 3vw
        font-family PFM
        color #9e9e9e
        position absolute
        left 9vw
        top 22vw
    
    .content
      position: absolute 
      top: calc(30vw + 46px)
      left: 0
      right: 0
      bottom: 0
      font-size: 3.5vw
      .tabs
        width: 100%
        padding: 3vw 5vw
        box-sizing: border-box
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        font-family: PFB
        .tab
          padding: 1vw 2vw
          border: 1px solid #dcdcdc
          border-radius: 5vw
          color: #dcdcdc
        .activedTab
          padding: 1vw 2vw
          background-color: #ffe6e6
          color: #ff5756
          border: 1px solid #ffe6e6
          border-radius: 5vw
      
      .goodItems
        position: absolute
        top: 11vw
        left: 0
        right: 0
        bottom: 0
        padding: 0 5vw
        box-sizing: border-box
        overflow: hidden
        .items-wrapper
          width: 100%
          display: flex
          flex-direction: row
          justify-content: space-between
          flex-wrap: wrap

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
            width: 100%
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