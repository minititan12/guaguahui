<template>
  <div class="refund-wrapper">
    <van-sticky>
      <van-nav-bar title="退款/售后" left-arrow @click-left="handleBackClick"/>
    </van-sticky>
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
</template>

<script>
import {refundList} from '@/utils/axios/request'
export default {
  name: "Refund",
  data(){
    return {
      refundList:[]
    }
  },
  created(){
    refundList().then(res=>{
      if(res.data.code != 1){
        this.$toast(res.data.message);
        return;
      }
      this.refundList = res.data.data;
    }).catch(res=>{})
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
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
  .refund-wrapper
    background #f5f7fa
  .refund-wrapper .van-nav-bar >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .refund-wrapper >>> .van-nav-bar__title
    font-size: 4vw
    font-family: PFH
    color: #000

  .refund
    background-color white
    margin 3vw
    padding 0 2vw
    border-radius 2vw
    .head
      display flex
      justify-content flex-start
      align-items center
      height 10vw
      font-size 4vw
      font-family: PFB
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
          font-family PFH
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