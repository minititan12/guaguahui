<template>
  <div class="orderItems-wrapper" ref="orderItems" v-show="showItems">

    <div>
      <transition name="fade">
        <div class="order-refresh" v-if="orderRefresh">
          <van-loading color="#FF5756" size="24px">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span class="loading-text">加载中...</span>
          </van-loading>
        </div>
      </transition>

      <div class="blank"></div>

      <!-- 全部商品项 -->
      <div v-if="list.length > 0">
        <OrderItem  
          v-for= "item of list" 
          :data= "item" 
          :key= "item.orderNumber" 
        />
      </div>

      <div class="orderPage-loading" v-show="showLoading">
        <van-loading color="#FF5756" size="24px">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span>加载中...</span>
        </van-loading>
      </div>
      
      <div class="no-more" v-show="showNoMore">
        <img class="loading-img" src="/public/uploads/home/load.png" alt="">
        <span>没有更多了</span>
      </div>

      <OrderPageWarn v-show="showWarn"/>
    </div>

  </div>

</template>

<script>
import OrderItem from '../miniComponents/orderItem'
import OrderPageWarn from './orderPageWarn'
import Bscroll from 'better-scroll'
import { mapState,mapMutations } from 'vuex'
import { getMyOrder,delOrder,cancelOrder,receipt} from '../../utils/axios/request'
export default {
  name: "OrderPageItem",
  data(){
    return {
      showItems: true,
      page: 1,
      showLoading: true,
      showNoMore: false,
      showWarn: false,
      orderRefresh: false
    }
  },
  components: {
    OrderItem,
    OrderPageWarn
  },
  computed: {
    ...mapState(['orderData','orderActive','userData']),
    //订单列表
    list(){
      let result = []

      if(this.orderData && Object.keys(this.orderData).length > 0){
        for(let key in this.orderData){
          result.push({
            orderNumber: key,
            goodsList: this.orderData[key]
          })
        }
      }
      return result
    }
  },
  watch: {
    orderActive(){
      this.reGetData()
    }
  },
  methods: {
    ...mapMutations(['updateOrderData','updatePayOrderData']),
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

    //重新请求数据
    reGetData(){
      this.showLoading = false
      this.showNoMore = false
      this.showWarn = false
      this.page = 1
      if(this.orderScroll){
        this.orderScroll.closePullUp()
      }
      this.updateOrderData(null)
      this.$toast({
        type: "loading",
        duration: 3000
      })
      this.getOrderData('init')
    },

    //初始化滚动
    initScroll(){
      let el = this.$refs.orderItems
      this.orderScroll = new Bscroll(el,{
        pullDownRefresh: {
          threshold: 50,
          stop: 0
        },
        pullUpLoad: {
          threshold: 60
        },
        click: true,
        eventPassthrough: 'horizontal',
      })

      this.orderScroll.on('pullingDown',()=>{
        this.orderRefresh = true
        this.$nextTick(()=>{
          this.orderScroll.refresh()
        })
        this.page = 1
        this.getOrderData('init')

        setTimeout(()=>{
          this.orderRefresh = false
          this.$nextTick(()=>{
            this.orderScroll.refresh()
          })
          this.orderScroll.finishPullDown()
        },2000)
      })

      this.orderScroll.on('pullingUp',()=>{
        console.log('pulling up')
        this.getOrderData()
      })

      this.orderScroll.on('beforeScrollStart',()=>{
        this.orderScroll.refresh()
      })
    },

    //获取订单信息
    getOrderData(type){
      let status = 0
      switch(this.orderActive){
        case 0:
          status = -1
          break
        case 1:
          status = 0
          break
        case 2:
          status = 2
          break 
        case 3:
          status = 3
          break
        default:
          status = 0
      }
      let postData = {
        user_id: this.userData.id,
        status: status,
        page: this.page
      }
      console.log(postData)
      getMyOrder(postData)
        .then((res)=>{
          console.log(res.data)
          this.$toast.clear()

          if(res.data.code == 1){
            if(type == 'init'){//初始化请求数据
              this.updateOrderData(res.data.data)
              this.$nextTick(()=>{
                if(res.data.count > 0){
                  if(res.data.count < 10){
                    if(this.orderScroll){
                      this.orderScroll.closePullUp()
                    }
                    this.noMoreStatus()
                    if(this.orderScroll){
                      this.orderScroll.refresh()
                    }
                  }else{
                    this.page = this.page + 1
                    this.loadingStatus()
                    if(this.orderScroll){
                      this.orderScroll.refresh()
                    }

                    if(this.orderScroll && !this.orderScroll.pullupWatching){
                      this.orderScroll.openPullUp()
                    }
                  }
                }else{
                  this.warnStatus()             
                }
              })
            }else{//上拉加载请求数据
              let data = {
                ...this.orderData,
                ...res.data.data
              }
              this.updateOrderData(data)

              this.$nextTick(()=>{
                if(res.data.count < 10){
                  this.noMoreStatus()
                  this.orderScroll.refresh()
                  this.orderScroll.closePullUp()
                }else{
                  this.page = this.page + 1
                  this.loadingStatus()
                  this.orderScroll.refresh()
                  this.orderScroll.finishPullUp()
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
        .catch((err)=>{
          this.$toast.clear()
          console.log('post getMyOrder err' + err)
        })
    }
  },
  created(){
    this.$nextTick(()=>{
      if(this.orderActive == 0){
        this.getOrderData('init')
      }
    })
  },
  mounted(){
    this.initScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .fade-leave
    height: 15vw
    opacity: 1
  .fade-leave-active
    transition: all .5s ease
  .fade-leave-to
    height: 0
    opacity: 0

  .orderItems-wrapper >>> .van-loading
    height: 15vw
    display: flex
    justify-content: center
    align-items: center
  .orderItems-wrapper >>> .van-loading__text
    color: #FF5756
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold

  .orderItems-wrapper
    position: absolute
    top: 90px
    left: 0
    right: 0
    bottom: 0
    overflow: hidden

    .order-refresh
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      .loading-img
        width: 6vw
        margin-right: 2vw

    .blank
      width: 100%
      height: .1vw

    .orderPage-loading
      width: 100%
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      padding: 3vw 0
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
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
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
      .loading-img
        width: 6vw
        margin-right: 2vw
</style>
