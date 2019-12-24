<template>
  <div class="intergral-wrapper">
    <van-nav-bar
      title="我的积分"
      right-text="兑换记录"
      left-arrow
      @click-right="goRedemptionRecord"
      @click-left="handleBack"
    />
    <div class="head">
      <div class="label">当前积分</div>
      <div class="integral">505</div>
      <!-- <div class="tip">积分当钱花，天天都能省！</div> -->
      <div class="details" @click="goIntegralDetails">积分明细</div>
    </div>

    <div class="content">
      <div class="tabs">
        <div :class="active == index ? 'activedTab' : 'tab'" v-for="(item,index) of tabList" @click="handleChangeActive(index)">{{item}}</div>
      </div>

      <div class="goodItems" ref="goodItems">
        <div class="items-wrapper">
          <IntergralGoodItem />
          <IntergralGoodItem />
          <IntergralGoodItem />
          <IntergralGoodItem />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IntergralGoodItem from '../../../components/miniComponents/intergralGoodItem'
import Bscroll from 'better-scroll'
export default {
  name: "IntergralShop",
  components: {
    IntergralGoodItem
  },
  data(){
    return {
      tabList: ['全部','1-50','51-100','101-300','300以上'],
      active: 0
    }
  },
  methods: {
    initScroll(){
      let el = this.$refs.goodItems
      this.intergralGoodsScroll = new Bscroll(el,{
        bounce: {
          top: false
        },
        // pullUpLoad: {
        //   threshold: 10,
        //   stop: 0
        // },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.intergralGoodsScroll.on('beforeScrollStart',()=>{
        this.intergralGoodsScroll.refresh()
      })

      // this.groupScroll.on('pullingUp',()=>{
      //   this.getGroupListData()
      // })
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
      this.active = index
    }
  },
  mounted(){
    this.initScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .intergral-wrapper
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
</style>