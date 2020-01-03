<template>
  <div class="GroupBuy-wrapper">
    <van-nav-bar
      title="火热拼团"
      right-text="我的"
      left-arrow
      @click-left="handleBack"
      @click-right="onClickRight"
    >
      <!-- <van-icon name="cart-o" slot="right" /> -->
    </van-nav-bar>

    <!-- 火热拼团内容 -->
    <div class="groupBuy-content" ref="groupBuyContent">
      <div>
        <div class="blank"></div>

        <div class="head-img">
          <van-image
            width="100%"
            :src="head_img"
          />
        </div>

        <!-- 今日必拼 -->
        <div class="todayGroup">
          <div class="todayGroup-top">
            <span class="top-title">今日必拼</span>
            <span class="top-date">{{date}}</span>
          </div>

          <div class="todayGroup-bottom">
            <div 
              v-if="todayList.length > 0" 
              v-for="item of todayList" 
              class="bottom-item"
              @click="handleToProduct(item)"
            >
              <van-image width="100%" height="25vw" fit="contain" :src="item.cover_img"/>

              <div class="item-middle">
                <span class="item-icon">{{item.group_num}}人团</span>
                <span class="item-title">{{item.goods_name}}</span>
              </div>

              <div class="item-bottom">
                <span class="item-price">￥{{item.group_price}}</span>
                <span class="item-originPrice">原价:{{item.price}}</span>
              </div>

            </div>
          </div>
        </div>

        <GroupList :groupList="groupList"></GroupList>

        <div class="group-loading" v-show="showLoading">
          <van-loading color="#FF5756" size="24px">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
        </div>

        <div class="no-more" v-show="showNoMore">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span>没有更多了</span>
        </div>

      </div>
    </div>
    
  </div>
</template>

<script>
import { getSpellGroupHotGoods,getSpellGroupGoods } from '../../../utils/axios/request'
import Bscroll from 'better-scroll'
import GroupList from '../../../components/marketing/groupBuy/groupList'
import { mapMutations } from 'vuex'
export default {
  name: "GroupBuy",
  components: {
    GroupList
  },
  data(){
    return {
      date: "",
      head_img: '',
      todayList: [],
      groupList: [],
      page: 1,
      showLoading: false,
      showNoMore: false,
    }
  },
  methods: {
    ...mapMutations(['changeTab']),
    //处理返回我的页面
    handleBack(){
      this.changeTab(5)
      this.$router.push({
        path: '/'
      })
    },
    //处理右侧点击
    onClickRight(){
      this.$router.push({
        path: "/mineGroup"
      })
    },
    //获取今天的日期
    getTodayDate(){
      let date = new Date()
      let month = date.getMonth() + 1
      let result = month + '月' + date.getDate() + '日'
      this.date = result
    },
    //获取今日必拼数据
    getTodayGroupData(){
      getSpellGroupHotGoods()
        .then((res)=>{
          console.log('getSpellGroupHotGoods:',res.data)
          let data = res.data
          if(data.code == 1){
            this.head_img = data.data.header_img
            this.todayList = data.data.list
          }
        })
        .catch((err)=>{
          console.log('getSpellGroupHotGoods err')
        })
    },
    //获取拼团列表数据
    getGroupListData(){
      let postData = {
        page: this.page
      }
      getSpellGroupGoods(postData)
        .then((res)=>{
          console.log('getSpellGroupGoods:',res.data)
          let data = res.data
          if(data.code == 1){
            if(data.data.list.length > 0){
              this.groupList = [...this.groupList,...data.data.list]
              this.page = this.page + 1

              this.$nextTick(()=>{
                if(this.groupList.length > 6){
                  if(this.groupScroll){
                    this.groupScroll.finishPullUp()
                    this.groupScroll.refresh()
                  }
                  this.showLoading = true
                }else{
                  this.showLoading = false
                  this.showNoMore = true
                }
              })
            }else{
              this.showLoading = false
              this.showNoMore = true
              this.groupScroll.closePullUp()
            }
          }
        })
        .catch((err)=>{
          console.log('getSpellGroupGoods err')
        })
    },
    //初始化拼团滚动条
    initGroupScroll(){
      let el = this.$refs.groupBuyContent
      this.groupScroll = new Bscroll(el,{
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

      this.groupScroll.on('beforeScrollStart',()=>{
        this.groupScroll.refresh()
      })

      this.groupScroll.on('pullingUp',()=>{
        this.getGroupListData()
      })
    },
    handleToProduct(item){
      this.$router.push({
        path: '/product',
        query:{
          id: item.goods_id,
          group_id: item.id,
          // shop_id: item.user_id
        }
      })
    }
  },
  created(){
    this.getTodayDate()
    this.getTodayGroupData()
    this.getGroupListData()
  },
  mounted(){
    this.initGroupScroll()
    // console.log(this.groupScroll)
  },
  activated(){
    // if(this.groupScroll){
    //   if(!this.groupScroll.pullupWatching){
    //     this.groupScroll.openPullUp({
    //       threshold: 10,
    //       stop: 0
    //     })
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>
  .GroupBuy-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .GroupBuy-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
  
  .GroupBuy-wrapper >>> .van-nav-bar__text
    font-family: PFH
    font-size: 3.6vw
    color: #FF5756
  
  .GroupBuy-wrapper >>> .blank
    height: 4vw
    width: 100%
  
  .GroupBuy-wrapper
    width: 100%
    height: 100%
    background-color: #F6F7FB
    // background-color: #999
    font-family: PHM
    .groupBuy-content
      position: absolute 
      top: 46px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      //首图
      .head-img
        width: 94%
        min-height: 20vw
        margin: 0 auto 4vw auto  

      //加载模块
      .group-loading
        width: 100%
        padding-bottom: 4vw
        display: flex
        justify-content: center
        align-items: center
        .loading-img
          width: 6vw
          height: 5vw
          margin-right: 2vw
      
      //没有更多模块
      .no-more
        width: 100%
        padding-bottom: 4vw
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        font-family: PFH
        font-size: 4vw
        .loading-img
          width: 6vw
          height: 5vw
          margin-right: 2vw

      //今日必拼
      .todayGroup
        width: 94%
        padding: 3vw 2vw
        box-sizing: border-box
        border-radius: 2vw
        margin: 0 auto
        background-color: #fff
        .todayGroup-top
          width: 100%
          box-sizing: border-box
          padding-bottom: 2vw
          .top-title
            font-size: 4vw
            font-family: PFH
          .top-date
            padding: 0 2vw
            display: inline-block
            margin-left: 2vw
            background-color: #FF3C36
            color: #fff
            font-size: 3vw
            line-height: 6vw
            font-family: hgzt
            border-radius: 3vw
        .todayGroup-bottom
          width: 100%
          display: flex
          flex-direction: row
          justify-content: space-around
          .bottom-item
            width: 33%
            .item-middle
              margin: 2vw 0
              font-size: 3.2vw
              font-family: PFB
              line-height: 5vw
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 2
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              overflow: hidden
              .item-icon
                display: inline-block
                font-family: PFM
                padding: 0 1vw
                background: linear-gradient(to right,#FFD297,#FF8F05)
                border-radius: 1vw
                color: #fff
                margin-right: 2vw
                vertical-align: middle
              .item-title
                font-size: 4vw
                vertical-align: middle
            .item-bottom
              .item-price
                font-family: hgzt
                color: #FC4E4D
                font-size: 3.8vw
                margin-right: 2vw
              .item-originPrice
                font-size: 3vw
                color: #999
              
</style>