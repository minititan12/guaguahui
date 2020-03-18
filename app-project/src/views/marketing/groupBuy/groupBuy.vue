<template>
  <div class="GroupBuy-wrapper">
    <van-nav-bar
      title="火热拼团"
      right-text="我的"
      left-arrow
      @click-left="handleBack"
      @click-right="onClickRight"
    >
    </van-nav-bar>

    <!-- 火热拼团内容 -->
    <mescroll-vue :down="down" :up="up" @init="init">
      <div>
        <div class="head-img" v-if="showImg">
          <van-image
            width="100%"
            :src="head_img"
          />
        </div>

        <!-- 今日必拼 -->
        <div class="todayGroup" v-if="showToday">
          <div class="todayGroup-top">
            <span class="top-title">今日必拼</span>
            <span class="top-date">{{date}}</span>
          </div>

          <div class="todayGroup-bottom">
            <div
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

        <GroupList v-if="showGroup" :groupList="groupList"></GroupList>

        <div class="warn-wrapper" v-if="showWarn">
          <span class="warn-text">没有可拼团的活动</span>
        </div>
      </div>
    </mescroll-vue>
    
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { getSpellGroupHotGoods,getSpellGroupGoods } from '../../../utils/axios/request'
import GroupList from '../../../components/marketing/groupBuy/groupList'
import { mapMutations } from 'vuex'
export default {
  name: "GroupBuy",
  components: {
    GroupList,
    MescrollVue
  },
  data(){
    return {
      date: "",
      head_img: '',
      todayList: [],
      groupList: [],
      scrollTop: 0,
      down:{
        htmlContent:'<div class="droping"><p class="downwarp-progress"></p><p class="downwarp-tip"></p></div><div class="refreshing"><p class="loading"></p><img class="loading-img" src="/public/uploads/home/load.png" alt=""><span>加载中...</span></div>',
        inited:(mescroll, downwarp)=>{
          mescroll.droping = downwarp.querySelector('.droping');
          mescroll.refreshing = downwarp.querySelector('.refreshing');
        },
        inOffset:(mescroll)=>{
          mescroll.droping.style.display="block";
          mescroll.refreshing.style.display="none";
          mescroll.droping.querySelector('.downwarp-tip').innerText = "下拉刷新";
        },
        outOffset:(mescroll)=>{
          mescroll.droping.querySelector('.downwarp-tip').innerText = "释放刷新";
        },
        onMoving(mescroll, rate, downHight){
          let deg = 0;
          deg = parseInt(downHight)*4.5;
          mescroll.droping.querySelector('.downwarp-progress').style.transform = "rotate("+ deg +"deg)";
        },
        showLoading:(mescroll)=>{
          mescroll.droping.style.display="none";
          mescroll.refreshing.style.display="block";
        },
        auto:false,
        callback:(mescroll)=>{
          this.getTodayGroupData()
          mescroll.resetUpScroll()
        }
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
  computed: {
    //显示首图
    showImg(){
      if(this.head_img && this.head_img.length > 0){
        return true
      }
      return false
    },
    //显示今日必拼
    showToday(){
      if(this.todayList.length > 0){
        return true
      }
      return false
    },
    //显示拼团列表
    showGroup(){
      if(this.groupList.length > 0){
        return true
      }else{
        return false
      }
    },
    //显示warn
    showWarn(){
      if(this.head_img && this.head_img.length > 0){
        return false
      }
      if(this.todayList.length > 0){
        return false
      }
      if(this.groupList.length > 0){
        return false
      }

      return true
    }
  },
  methods: {
    ...mapMutations(['changeTab']),
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },
    //处理返回我的页面
    handleBack(){
      // this.changeTab(5)
      // this.$router.push({
      //   path: '/'
      // })
      this.$router.go(-1)
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
    //处理上拉加载
    handlePullingUp(page){
      this.getGroupListData(page.num)
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
    getGroupListData(page){
      let postData = {
        page: page
      }
      getSpellGroupGoods(postData)
        .then((res)=>{
          console.log('getSpellGroupGoods:',res.data)
          let data = res.data

          if(page == 1){
            setTimeout(()=>{
              this.mescroll.endSuccess(data.data.list.length,data.data.list.length>=10)
            },1000)
          }else{
            this.mescroll.endSuccess(data.data.list.length,data.data.list.length>=10)
          }

          if(data.code == 1){
            if(page == 1){
              this.groupList = [...data.data.list]
            }else{
              this.groupList = [...this.groupList,...data.data.list]
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
          console.log('getSpellGroupGoods err')
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
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
  
  .GroupBuy-wrapper >>> .van-nav-bar__text
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
    font-size: 3.6vw
    color: #FF5756
  
  .GroupBuy-wrapper
    width: 100%
    height: 100%
    background-color: #F6F7FB
    font-family: PHM

  >>> .mescroll
        position: absolute 
        top: 46px
        left: 0
        height: calc(100% - 46px - 2vw)
        padding-top: 2vw
      
  >>> .mescroll-upwarp
        padding: 0
  //首图
  >>> .head-img
        width: 94%
        min-height: 20vw
        margin: 0 auto 4vw auto  

  //今日必拼
  >>> .todayGroup
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
            font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
            font-weight: bold
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
          justify-content: flex-start
          padding: 0 .5%
          .bottom-item
            width: 33%
            .item-middle
              margin: 2vw 0
              font-size: 3.2vw
              font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
              font-weight: bold
              line-height: 5vw
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 2
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              overflow: hidden
              .item-icon
                display: inline-block
                font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
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
  
  >>> .droping
        .downwarp-tip
          color #FF5756
        .downwarp-progress
          border-color #FF5756
          border-bottom-color: transparent;
  >>> .refreshing
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        color #FF5756
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
  >>> .warn-wrapper
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        padding: 10vw 0
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
        .warn-text
          margin-top: 5vw
          font-size: 5vw
          color: #bbb
</style>