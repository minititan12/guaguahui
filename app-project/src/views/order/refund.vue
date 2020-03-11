<template>
  <div class="refund-wrapper">
    <van-nav-bar title="退款/售后" left-arrow @click-left="handleBackClick"/>
    <div class="refund-list" ref="refundList">
      <div>
        <div class="main">
          <div @click="goRefundDetails(item)" class="refund" :key="index" v-for="(item,index) in refundList">
            <div @click.stop="goShop(item)" class="head">
              <van-icon color="#B9B9B9" name="shop-o" />
              <div>{{item.shop_name}}</div>
              <van-icon name="arrow" />
            </div>
            <div class="goods">
              <van-image
                width="20vw"
                height="20vw"
                fit="contain"
                :src="item.cover_img"
              />
              <div class="content">
                <div class="name">{{item.goods_name}}</div>
                <div class="desc">{{getDesc(item)}}</div>
                <div class="num">x{{item.number}}</div>
              </div>
            </div>
            <div class="footer">
              <van-image
                width="5vw"
                fit="contain"
                src="/public/static/refund/icon_refund.png"
              />
              <div v-if="item.refund_status === 0">商家处理中</div>
              <div v-if="item.refund_status == 1">商家同意退款</div>
              <div v-if="item.refund_status == 2">商家拒绝退款</div>
              <div v-if="item.refund_status == 3">等待商家收货</div>
              <div v-if="item.refund_status == 4">退款成功</div>
            </div>
          </div>
        </div>


        <div class="warn" v-show="empty">
          <span class="iconfont">&#xe605;</span>
          <span>没有退款商品</span>
        </div>
        <div class="pullUpLoading">
          <van-loading color="#FF5756" size="24px" v-show="showLoading  && refundList.length > 10">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>加载中...</span>
          </van-loading>
          <div class="no-more" v-show="!showLoading  && refundList.length > 10">
            <img class="loading-img" src="/public/uploads/home/load.png" alt="">
            <span>没有更多了</span>
          </div>
        </div>       
      </div>
    </div>
  </div>
</template>

<script>
import {refundList} from '@/utils/axios/request'
import Bscroll from 'better-scroll'
export default {
  name: "Refund",
  data(){
    return {
      // 退款记录
      refundList:[],
      // 是否空数据
      empty:false,
      page: 1,
      showLoading: true,
    }
  },
  created(){
    this.getRefundList();
  },
  mounted(){
    this.initCollectScroll()
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    //初始化滚动
    initCollectScroll(){
      let el = this.$refs.refundList
      this.refundListScroll = new Bscroll(el,{
        bounce: {
          top: false
        },
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        click: true,
        // eventPassthrough: 'horizontal'
      })

      this.refundListScroll.on('beforeScrollStart',()=>{
        this.refundListScroll.refresh()
      })

      this.refundListScroll.on('pullingUp',()=>{
        this.getRefundList()
      })
    },
    getRefundList(){
      refundList({
        page:this.page
      }).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        if(this.page == 1&&res.data.data.length <= 0){
          this.empty = true;
        }
        if(res.data.data.length == 0){
          this.showLoading = false;
          this.refundListScroll.closePullUp();
          return;
        }
        if(this.page == 1 && res.data.data.length < 10 && this.cutPriceScroll){
          this.refundListScroll.closePullUp();
        }
        this.page++;
        this.refundList = [...this.refundList,...res.data.data,];

      }).catch(res=>{})
    },
    // 跳转退款详情
    goRefundDetails(item){
      this.$router.push({
        path: '/refundDetails',
        query: {
          order_id: item.order_id,
        }
      })
    },
    // 跳转到店铺
    goShop(item){
      this.$router.push({
        path: '/shop',
        query: {
          shopID: item.shop_id
        }
      })
    },
    // 获取属性值
    getDesc(item){
      let desc = "";
      if(item.attr1_name !== ""){
        desc+= item.attr1_name+ ":" + item.attr1_value;
      }
      if(item.attr2_name !== ""){
        desc+= " " + item.attr2_name+ ":" + item.attr2_value;
      }
      if(item.attr3_name !== ""){
        desc+= " " + item.attr3_name+ ":" + item.attr3_value;
      }
      return desc;
    },
  },
}
</script>

<style lang="stylus" scoped>
  .refund-wrapper .van-nav-bar >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .refund-wrapper >>> .van-nav-bar__title
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
    color: #000

  .refund-list
    position absolute 
    top 46px
    left 0
    right 0
    bottom 0
    overflow hidden
    background-color #f5f7fa
  .main
    padding-top 3vw
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
  .pullUpLoading
    width: 100%
    display: flex
    justify-content: center
    align-items: center
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
  .refund
    background-color white
    margin 3vw 3vw 0
    padding 0 2vw
    border-radius 2vw
    &:nth-of-type(1)
      margin-top 0
    .head
      display flex
      justify-content flex-start
      align-items center
      height 10vw
      font-size 4vw
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
      .van-icon-shop-o
        font-size 5vw
        margin-right 1vw
    .goods
      display flex
      justify-content flex-start
      .van-image
        margin-right 2vw
      .content
        flex 1
        .name
          font-size 3.8vw
          font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
          font-weight bold
          line-height 4.6vw
          height 10vw
        .desc
          padding-bottom 1vw
          font-size 3vw
          color #999
          line-height 4.5vw
        .num
          font-size 3vw
          color #999
          line-height 4.5vw    
    .footer
      height 10vw
      display flex
      justify-content flex-start
      align-items center
      font-size 3.6vw    
      .van-image
        margin-right 2vw
</style>