<template>
  <div class="collect-wrapper">
    <van-nav-bar
      title="收藏"
      left-arrow
      @click-left="handleBack"
    >
      <!-- <div slot="right">
        <van-icon name="setting-o"/>
        <span class='right-text'>管理</span>
      </div> -->
    </van-nav-bar>

    <div class="tabs">
      <span :class="active == 1 ? 'actived-tab': 'tab'" @click="handleChangeActive(1)">商品</span>
      <span :class="active == 2 ? 'actived-tab': 'tab'" @click="handleChangeActive(2)">店铺</span>
    </div>

    <mescroll-vue :down="down" :up="up" @init="init">
      <!-- 商品收藏框 -->
      <div v-if="active == 1">
        <div class="goodCollectItem" v-for="item of collectList">
          <van-image 
            :src="item.cover_img" 
            width="25vw" 
            height="25vw" 
            fit="contain"
            @click="handleToProduct(item.ids)"
          />
          <div class="item-right">
            <span class="title" @click="handleToProduct(item.ids)">{{item.goods_name}}</span>
            <span class="num">{{item.total + '人收藏'}}</span>
            <div class="right-bottom">
              <span class="price">{{'￥' + item.price}}</span>
              <span class="btn" @click="handleConfirmCancel(item.ids,item.flag)">取消收藏</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 店铺收藏框 -->
      <div v-if="active == 2">
        <div class="shopCollectItem" v-for="item of collectList">
          <van-image 
            round 
            :src="item.shop_img" 
            width="15vw" 
            height="15vw" 
            fit="contain" 
            @click="handleToShop(item.ids)"
          />
          <div class="item-right">
            <div class="right-top">
              <span class="title" @click="handleToShop(item.ids)">{{item.company}}</span>
              <span class="btn" @click="handleConfirmCancel(item.ids,item.flag)">取消收藏</span>
            </div>
            
            <span class="num">{{item.total + '人关注'}}</span>
            <div class="imgs">
              <van-image class="img" v-for="imgItem of item.shopinfo" :src="imgItem.cover_img" width="20vw" height="20vw" fit="contain"/>
              <!-- <span>更多</span> -->
            </div>
          </div>
        </div>
      </div>

      <div class="warn" v-show="showWarn">
        <span class="iconfont">&#xe605;</span>
        <span class="warn-text">没有收藏任何{{active == 1 ? '商品' : '店铺'}}</span>
      </div>
    </mescroll-vue>

  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { getCollects,doCollect } from '../../utils/axios/request'
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  name: "Collect",
  components: {
    MescrollVue
  },
  data(){
    return {
      active: 1,
      collectList: [],
      showWarn: false,
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
          mescroll.resetUpScroll();
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
      },
    }
  },
  computed: {
    ...mapState(['userData']),
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },
    //处理上拉加载
    handlePullingUp(page){
      this.getCollectList(page.num)
    },
    //回退
    handleBack(){
      this.$router.go(-1)
    },
    //跳转产品页面
    handleToProduct(id){
      this.$router.push({
        path: '/product',
        query:{
          id: id
        }
      })
    },
    //跳转商铺页面
    handleToShop(id){
      this.$router.push({
        path: '/shop',
        query:{
          shopID: id
        }
      })
    },
    //改变active
    handleChangeActive(val){
      this.active = val
      this.showWarn = false
      this.collectList = []
      this.mescroll.resetUpScroll()
    },
    //获取收藏列表
    getCollectList(page){
      let postData = {
        page: page,
        flag: this.active,
        user_id: this.userData.id
      }

      getCollects(postData)
        .then((res)=>{
          console.log('getCollects',res.data)
          let data = res.data
          if(page == 1){
            setTimeout(()=>{
              this.mescroll.endSuccess(data.data.list.length,data.data.list.length>=10)
              if(data.data.list.length == 0){
                this.showWarn = true
              }
            },1000);
          }else{
            this.mescroll.endSuccess(data.data.list.length,data.data.list.length>=10)
          }

          if(data.code == 1){
            if(page == 1){
              this.collectList = [...data.data.list]
            }else{
              this.collectList = [...this.collectList,...data.data.list]
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
          this.mescroll.endErr()
          console.log('getCollects err',err)
        })
    },
    //取消收藏操作
    handleCancelCollect(ids,flag){
      let postData = {
        flag: flag,
        ids: ids,
        user_id: this.userData.id,
        is_collect: 0
      }

      this.$toast({
        message: '取消中',
        type: 'loading',
        duration: 1200
      })

      doCollect(postData)
        .then((res)=>{
          console.log('doCollect',res.data)
          if(res.data.code == 1){
            this.$toast({
              message: '取消成功',
              type: 'success',
              duration: 1200
            })
            this.mescroll.resetUpScroll()
          }
        })
        .catch((err)=>{
          this.$toast.clear()
          console.log('doCollect err',err)
        })
    },
    //取消确认
    handleConfirmCancel(ids,flag){
      this.$dialog.alert({
        title: '取消收藏',
        message: '请确认是否取消收藏',
        showCancelButton: true   
      })
        .then(()=>{
          this.handleCancelCollect(ids,flag)
        })
        .catch(()=>{
        })
    }
  },
}
</script>

<style lang="stylus" scoped>
  .collect-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .collect-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold

  .collect-wrapper
    width: 100%
    .tabs
      width: 100%
      height: 8vw
      display: flex
      align-items: flex-end
      justify-content: center
      font-size: 3.5vw
      font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
      font-weight: bold
      margin-bottom: 2vw

      .tab
        margin: 0 5vw
        display: block
      .actived-tab
        margin: 0 5vw
        display: block
        font-size: 4.5vw
        padding-bottom: 1vw
        border-bottom: 3px solid red

    .mescroll
      position: absolute 
      top: calc(46px + 10vw)
      left: 0
      height: calc(100% - 2vw)
      background-color: #f5f7fa
      padding-top: 2vw
      >>> .mescroll-upwarp
            padding: 0

      .goodCollectItem
        width: 94vw
        margin: 0 auto
        margin-bottom: 3vw
        padding: 2vw
        box-sizing: border-box 
        background-color: #fff
        display: flex
        justify-content: space-between
        .item-right
          width: 64vw
          display: flex
          flex-direction: column
          justify-content: center
          padding-left: 2vw
          box-sizing: border-box
          font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
          color: #000
          .title
            font-size: 3.5vw
            line-height: 5vw
            letter-spacing: .2vw
            font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
            font-weight: bold
            margin-bottom: 2vw
          .num
            font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
            font-weight: bold
            margin-bottom: 5vw
            color: #9d9d9d
          .right-bottom
            width: 100%
            display: flex
            justify-content: space-between
            align-items: center
            .price
              color: #ff5756
              font-family: hgzt
              font-size: 4vw
            .btn
              background-color: #ff5756
              color: #fff
              font-size: 3vw
              padding: 2vw 2vw
              border-radius: 4vw
      
      .shopCollectItem
        width: 94vw
        margin: 0 auto
        margin-bottom: 3vw
        padding: 2vw
        box-sizing: border-box 
        background-color: #fff
        display: flex
        justify-content: space-between
        .item-right
          width: 75vw
          display: flex
          flex-direction: column
          justify-content: center
          padding-left: 2vw
          box-sizing: border-box
          font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
          color: #000
          .right-top
            width: 100%
            display: flex
            justify-content: space-between
            align-items: center
            .title
              font-size: 3.5vw
              line-height: 5vw
              letter-spacing: .2vw
              font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
              font-weight: bold
              margin-bottom: 2vw
            .btn
              background-color: #ff5756
              color: #fff
              font-size: 3vw
              padding: 2vw 2vw
              border-radius: 4vw
          .num
            font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
            font-weight: bold
            margin-bottom: 2vw
            color: #9d9d9d
          .imgs
            display: flex
            flex-direction: row
            align-items: center
            justify-content: flex-start
            .img
              border: 1px solid #ddd
              box-sizing: border-box
              margin-right: 2vw

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
  
  >>> .warn
        display: flex
        flex-direction: column
        align-items: center
        margin: 5vw 0
        .iconfont
          font-size: 10vw
          margin-bottom: 2vw
        .warn-text
          font-size: 4.5vw
          font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serifs
          font-weight: bold
</style>