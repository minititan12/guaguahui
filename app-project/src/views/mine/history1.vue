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

    <div class="content-wrapper" ref="wrapper">
      <div style="padding-top:3vw">
        <div v-show="pullDown" class="pull-down">
          <van-icon :class="{'refresh':refresh}" color="#FF5756" name="down" size="20" />
        </div>

        <div class="history" v-for="item in historyList" @click="handleToProduct(item.goods_id)" :key="item.goods_id">
          <van-checkbox v-show="showCheck" v-model="item.chose" checked-color="#ff5756"></van-checkbox>
          <van-image width="27vw" height="27vw" fit="cover" :src="item.cover_img"/>
          <div class="content">
            <div class="goods-name">{{item.goods_name}}</div>
            <div class="price">¥{{item.price}}</div>
          </div>
        </div>

        <div class="pullUpLoading">
          <van-loading color="#FF5756" size="24px" v-show="showLoading&&historyList.length > 9">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
          <div class="no-more" v-show="!showLoading &&historyList.length > 9">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>没有更多了</span>
          </div>
        </div>
      </div>
      <div class="content-refresh" v-show="refreshing">
        <van-loading color="#FF5756" size="24px">
          <img class="loading-img" src="/public/uploads/home/load.png" alt="">
          <span>加载中...</span>
        </van-loading>
      </div>
    </div>

    <div v-show="showCheck" class="footer">
      <van-checkbox @change="allChange" v-model="allChose" checked-color="#ff5756">全部</van-checkbox>
      <div @click="deleteHistory" class="delete">删除</div>
    </div>
  </div>
</template>

<script>
import {footprint,deletefootprint} from '@/utils/axios/request'
import Bscroll from 'better-scroll'
export default {
  name: "History",
  data(){
    return {
      historyList:[],
      showLoading:true,
      pullDown:true,
      refresh:false,
      refreshing:false,
      page:1,
      allChose:false,

      showCheck:false
    }
  },
  created(){
    this.getFootprint();
  },
  mounted(){
    this.initScroll();
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
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
    manage(){
      if(!this.showCheck){
        for(let i in this.historyList){
          this.historyList[i]['chose'] = false;
        }
        this.allChose = false;
      }
      this.showCheck = !this.showCheck;
    },
    allChange(){
      for(let i in this.historyList){
        this.historyList[i]['chose'] = this.allChose;
      }
    },
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
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        this.$toast("删除成功");
        this.showCheck = false;
        this.page = 1;
        this.scroll.openPullUp();
        this.showLoading = true;
        this.getFootprint();
      }).catch();
    },
    getFootprint(cb){
      footprint({
        page:this.page,
        size:10
      }).then(res=>{
        cb?cb():"";
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        if(res.data.data.length == 0){
          this.showLoading = false;
          if(this.scroll){
            this.scroll.closePullUp();
          }
          return;
        }
        for(let i in res.data.data){
          res.data.data[i]["chose"] = false;
        }
        if(this.page == 1 && res.data.data.length < 10 && this.scroll){
          this.scroll.closePullUp();
        }
        if(this.page == 1){
          this.historyList = res.data.data;
        }else{
          this.historyList = [...this.historyList,...res.data.data,];
        }
        this.page++;
      }).catch();
    },
    //初始化主页面滚动条
    initScroll(){
      let el = this.$refs.wrapper
      this.scroll = new Bscroll(el,{
        pullDownRefresh: {
          threshold: 55,
          stop: 40
        },
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.scroll.on('pullingDown',()=>{
        this.pullDown = false;
        this.refreshing = true;
        this.page = 1;
        this.getFootprint(()=>{
          this.pullDown = true;
          this.refreshing = false;
          this.scroll.finishPullDown();
          this.scroll.refresh();
          this.scroll.openPullUp();
        });
      })
      this.scroll.on('scroll',(pos)=>{
        if(pos.y > 55){
          if(!this.refresh){
            this.refresh = true;
          }
        }else{
          if(this.refresh){
            this.refresh = false;
          }
        }
      });
      this.scroll.on('pullingUp',()=>{
        this.getFootprint(()=>{
          this.scroll.finishPullUp();
          this.scroll.refresh();
        });
      });

      this.scroll.on('beforeScrollStart',()=>{
        this.scroll.refresh()
      })
    },
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

  .content-wrapper
    position: fixed
    overflow: hidden
    top: 46px
    bottom: 0
    left: 0
    right: 0
    z-index: 2
    .history
      background white
      border-radius 3vw
      margin 3vw 3vw 0 3vw
      padding 3vw 2vw
      display flex
      justify-content flex-start
      &:nth-of-type(2)
        margin-top 0
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
    .content-refresh
      position absolute
      left 0
      top 0
      width 100%
      z-index 2
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      height 13vw
      .loading-img
        width: 6vw
        margin-right: 2vw
    .pull-down
      display flex
      justify-content center
      align-items center
      height 50px
      position absolute
      width 100%
      left 0
      top -50px
      .van-icon-down
        transition all 300ms
        transform rotate(0deg)
        &.refresh
          transform rotate(180deg)
    .pullUpLoading
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      height 13vw
      .loading-img
        width: 6vw
        height: 5vw
        margin-right: 2vw
      .no-more
        height: 15vw
        line-height: 15vw
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
        font-size: 4vw
  .footer
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