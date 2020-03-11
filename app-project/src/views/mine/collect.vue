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

    <div class="collect-items" ref="collectItems">
      <div>

        <transition name="fade">
          <div class="collect-refresh" v-if="showRefresh">
            <van-loading color="#FF5756" size="24px">
              <img class="loading-img" src="/public/uploads/home/load.png" alt="">
              <span class="text">加载中...</span>
            </van-loading>
          </div>
        </transition>

        <div class="blank"></div>

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
          <span>没有收藏任何{{active == 1 ? '商品' : '店铺'}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getCollects,doCollect } from '../../utils/axios/request'
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  name: "Collect",
  data(){
    return {
      active: 1,
      collectList: [],
      page: 1,
      showLoading: false,
      showNoMore: false,
      showWarn: false,
      showRefresh: false
    }
  },
  computed: {
    ...mapState(['userData']),
  },
  methods: {
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
    //初始化滚动
    initCollectScroll(){
      let el = this.$refs.collectItems
      this.collectScroll = new Bscroll(el,{
        pullDownRefresh: {
          threshold: 50,
          stop: 0
        },
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.collectScroll.on('beforeScrollStart',()=>{
        this.collectScroll.refresh()
      })

      this.collectScroll.on('pullingDown',()=>{
        console.log('pulling down')
        this.showRefresh = true
        this.$nextTick(()=>{
          this.collectScroll.refresh()
        })
        this.initCollectData()
        this.getCollectList('init')
        setTimeout(()=>{
          this.collectScroll.finishPullDown()
          this.showRefresh = false
          this.collectScroll.refresh()
        },1500)
      })

      this.collectScroll.on('pullingUp',()=>{
        console.log('pulling up')
        this.getCollectList()
      })
    },
    //初始化数据
    initCollectData(){
      this.page = 1
      this.showLoading = false
      this.showNoMore = false
      this.showWarn = false
    },
    //改变active
    handleChangeActive(val){
      this.active = val
      this.initCollectData()
      this.collectScroll.closePullUp()
      this.collectList = []
      this.getCollectList()
    },
    //获取收藏列表
    getCollectList(type){
      let postData = {
        page: this.page,
        flag: this.active,
        user_id: this.userData.id
      }

      getCollects(postData)
        .then((res)=>{
          console.log('getCollects',res.data)
          if(res.data.code == 1){
            if(res.data.data.list.length > 0){
              if(type == 'init'){
                this.collectList = [...res.data.data.list]
              }else{
                this.collectList = [...this.collectList,...res.data.data.list]
              }
              
              this.page = this.page + 1
              this.$nextTick(()=>{
                this.collectScroll.refresh()
                if(this.collectList.length > 9){
                  this.showLoading = true
                  this.showNoMore = false
                  if(this.collectScroll){
                    this.collectScroll.finishPullUp()
                  }
                }else{
                  this.showLoading = false
                  this.showNoMore = true
                }
              })
            }else{
              if(type == 'init'){
                this.collectList = []
                this.showWarn = true
              }else{
                if(this.collectList.length > 0){
                  this.showLoading = false
                  this.showNoMore = true
                  if(this.collectScroll){
                    this.collectScroll.closePullUp()
                  }
                }else{
                  this.showLoading = false
                  this.showNoMore = false
                  this.showWarn = true
                }
              }
            }
          }
        })
        .catch((err)=>{
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
        message: '加载中',
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
            this.initCollectData()
            this.getCollectList('init')
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
  created(){
    this.getCollectList()
  },
  mounted(){
    this.initCollectScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .fade-leave
    height: 16vw
    opacity: 1
  .fade-leave-active
    transition: all .5s ease
    // transition: opacity .5s ease
  .fade-leave-to
    height: 0
    opacity: 0

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

    .collect-items
      position: absolute 
      top: calc(46px + 10vw)
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      background-color: #f5f7fa

      .collect-refresh
        width: 100%
        display: flex
        justify-content: center
        background-color: #f5f7fa
        .van-loading
          // height: 16vw
          display: flex
          justify-content: center
          align-items: center
          .loading-img
            width: 6vw
            margin-right: 2vw
          .text
            display: inline-block
            font-size: 3.5vw
            line-height: 6vw
            padding: 5vw 0

      .blank
        width: 100%
        height: 3vw

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