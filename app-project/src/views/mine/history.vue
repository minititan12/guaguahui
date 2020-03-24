<template>
  <div class="history-wrapper">
    <van-nav-bar
      title="足迹"
      left-arrow
      @click-left="handleBack"
    >
      <div @click="manage" slot="right">
        <van-icon name="setting-o"/>
        <span class='right-text'>{{showCheck?"完成":"管理"}}</span>
      </div>
    </van-nav-bar>

    <!-- <div class="content-wrapper" ref="wrapper"> -->
    <mescroll-vue :down="down" :up="up" @init="init">
      <div class="history" v-for="item in historyList" :key="item.goods_id">
        <van-checkbox v-show="showCheck" v-model="item.chose" checked-color="#ff5756"></van-checkbox>
        <van-image width="27vw" height="27vw" fit="cover" :src="item.cover_img" @click="handleToProduct(item.goods_id)"/>
        <div class="content" @click="handleToProduct(item.goods_id)">
          <div class="goods-name">{{item.goods_name}}</div>
          <div class="price">¥{{item.price}}</div>
        </div>
      </div>
    </mescroll-vue>

    <div v-show="showCheck" class="footer">
      <van-checkbox @change="allChange" v-model="allChose" checked-color="#ff5756">全部</van-checkbox>
      <div @click="deleteHistory" class="delete">删除</div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import {footprint,deletefootprint} from '@/utils/axios/request'
export default {
  name: "History",
  components: {
    MescrollVue
  },
  data(){
    return {
      historyList:[],
      allChose:false,
      scrollTop: 0,
      showCheck:false,

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
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },

    //处理跳转product页面
    handleToProduct(id){
      // console.log('click')
      this.$router.push({
        path: '/product',
        query: {
          id: id
        }
      })
    },

    //处理上拉加载
    handlePullingUp(page){
      this.getFootprint(page.num)
    },

    //管理
    manage(){
      if(!this.showCheck){
        for(let i in this.historyList){
          this.historyList[i]['chose'] = false;
        }
        this.allChose = false;
      }
      this.showCheck = !this.showCheck;
    },

    //选择全部
    allChange(){
      for(let i in this.historyList){
        this.historyList[i]['chose'] = this.allChose;
      }
    },

    //删除历史
    deleteHistory(){
      let id = [];
      for(let i in this.historyList){
        if(this.historyList[i]['chose']){
          id.push(this.historyList[i].id);
        }
      }
      if(id.length == 0){
        this.$toast("请选择足迹");
        return;
      }
      deletefootprint({
        id
      }).then(res=>{
        if(res.data.code == 1){
          this.showCheck = false
          this.mescroll.resetUpScroll()
          this.$toast("删除成功")
        }else{
          this.$toast(res.data.message);
        }
      }).catch((err)=>{
        console.log('delete err')
      });
    },

    //获取足迹数据
    getFootprint(page){
      footprint({
        page:page,
        size:10
      }).then(res=>{
        console.log('foot Data:',res.data)
        let data = res.data

        if(page == 1){
          setTimeout(()=>{
            this.mescroll.endSuccess(data.data.length,data.data.length>=10)
          },1000)
        }else{
          this.mescroll.endSuccess(data.data.length,data.data.length>=10)
        }

        let list = [...data.data]
        for(let i in list){
          list[i]["chose"] = false;
        }

        if(data.code == 1){
          if(page == 1){
            this.historyList = [...list]
          }else{
            this.historyList = [...this.historyList,...list]
          }
        }else{
          this.$toast({
            message: data.message,
            type: 'fail',
            duration: 1500
          })
        }
      }).catch((err)=>{
        this.mescroll.endErr()
        console.log('get foot data err')
      });
    },
  },
  watch:{
    '$route'(to,from){
      console.log(to,from)
      if(from.name == 'home' && to.name == 'history'){
        this.mescroll.resetUpScroll()
      }else{
        this.mescroll.scrollTo(this.scrollTop,0)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

  .history-wrapper 
    background-color #f5f7fa
    .van-icon-arrow-left
      color: #FF5756
      font-size: 5vw
  
  .history-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold

  .history-wrapper >>> .van-nav-bar__text
    color: #444

  .history-wrapper >>> .van-icon-setting-o
    color: #666
    font-size: 5vw

  .history-wrapper >>> .right-text
    color: #666
    margin-left: 1vw
    font-size: 3.5vw

  .mescroll
    position: fixed
    top: 46px
    left: 0
    z-index: 2
    height: calc(100% - 46px)
  >>> .mescroll-upwarp
        padding: 0
  >>>.history
        background white
        border-radius 3vw
        margin 3vw 3vw 0 3vw
        padding 3vw 2vw
        display flex
        justify-content flex-start
        .van-checkbox
          padding-right 2vw
        .van-image
          margin-right 3vw
          border-radius 1vw
          overflow hidden
        .content
          flex 1
          display flex
          justify-content space-between
          flex-direction column
          .goods-name
            font-size 4vw
            line-height 5vw
            font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
            font-weight bold
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical
          .price
            font-size 5vw
            color #ff5756
            font-family hgzt
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

  >>>.footer
        position fixed
        left 0
        bottom 0
        right 0
        display flex
        justify-content space-between
        align-items center
        padding 0 4vw
        height 14vw
        background white
        z-index 5
        .delete
          background #ff5756
          height 8vw
          line-height 8vw
          color white
          width 20vw
          border-radius 4vw
          text-align center
</style>