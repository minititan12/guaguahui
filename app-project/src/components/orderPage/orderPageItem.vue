<template>
  <div>
    <mescroll-vue :down="down" :up="up" @init="init">
      <div class="list-wrapper" v-if="list.length > 0">
        <!-- 全部商品项 -->
        <OrderItem  
          v-for= "item of list" 
          :data= "item" 
          :key= "item.orderNumber" 
        />
      </div>
      <OrderPageWarn v-show="showWarn"/>
    </mescroll-vue>
  </div>

</template>

<script>
import OrderItem from '../miniComponents/orderItem'
import OrderPageWarn from './orderPageWarn'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { mapState,mapMutations } from 'vuex'
import { getMyOrder } from '../../utils/axios/request'
export default {
  name: "OrderPageItem",
  components: {
    OrderItem,
    OrderPageWarn,
    MescrollVue
  },
  data(){
    return {
      list: [],
      showItems: true,
      orderRefresh: false,
      showWarn: false,

      // mescroll滚动的距离
      scrollTop: 0,
      mescroll: null,
      //mescroll下拉刷新配置参数
      down:{
        offset: 120,
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

      //mscroll上拉加载配置参数
      up:{
        isBounce: false,
        htmlNodata: '<div class="pullUpLoading"><div class="no-more"><img class="loading-img" src="/images/load.png" alt=""><span>没有更多了</span></div></div>',
        htmlLoading: '<div class="pullUpLoading"><p class="loading"></p><img class="loading-img" src="/images/load.png" alt=""><span>加载中...</span></div>',
        auto:true,
        callback:this.handlePullingUp,
        onScroll:(mescroll, y, isUp)=>{
          this.scrollTop = y;
        }
      }
    }
  },
  computed: {
    ...mapState(['orderActive','userData']),
  },
  methods: {
    ...mapMutations(['updateOrderData']),
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },

    //整合获取到的数据
    getList(data){
      let result = []

      if(data && Object.keys(data).length > 0){
        for(let key in data){
          result.push({
            orderNumber: key,
            goodsList: data[key]
          })
        }
      }

      return result
    },

    //获取订单信息
    getOrderData(page){
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
        page: page
      }
      console.log(postData)
      getMyOrder(postData)
        .then((res)=>{
          console.log('getMyorder:',res.data)

          let data = res.data
          if(page == 1){
            this.updateOrderData(data.data)
            if(data.count){
              setTimeout(()=>{
                this.mescroll.endSuccess(data.count,data.count>=10)
                this.showWarn = false
              },1000)
            }else{
              setTimeout(()=>{
                this.mescroll.endSuccess(0,false)
                this.mescroll.hideUpScroll()
                this.showWarn = true
              },300)
            }
          }else{
            this.mescroll.endSuccess(data.count,data.count>=10)
          }

          if(data.code == 1){
            let list = this.getList(data.data)
            if(page == 1){
              this.list = [...list]
            }else{
              this.list = [...this.list,...list]
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
          console.log('post getMyOrder err' + err)
        })
    },

    //上拉加载
    handlePullingUp(page){
      this.getOrderData(page.num)
    }
  },
  watch: {
    orderActive(){
      this.showWarn = false
      this.list = []
      this.mescroll.resetUpScroll();
    }
  },
  activated(){
    if(this.mescroll){
      if(this.scrollTop){
        this.mescroll.scrollTo(this.scrollTop,0);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  >>> .mescroll
        position: absolute
        top: 90px
        left: 0
        height: calc(100% - 90px)
  >>> .mescroll-upwarp
        padding: 0

  >>> .list-wrapper
        width: 100%

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
</style>
