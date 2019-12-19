<template>
  <div class="refund-details-wrapper">
    <van-nav-bar title="退款详情" left-arrow @click-left="handleBackClick"/>
    <div class="head">
      <van-image
        v-if="refundDetail.refund_status == 4"
        width="10vw"
        height="10vw"
        fit="contain"
        src="/public/static/refund/icon_success.png"
      />
      <van-image
        v-else
        width="10vw"
        height="10vw"
        fit="contain"
        src="/public/static/refund/icon_time.png"
      />
      <div>
        <div class="sttus">{{getStatus}}</div>
        <div v-if="refundDetail.complete_at" class="complete-time">{{refundDetail.complete_at}}</div>
      </div>
    </div>
    <div class="main">
      <div class="goods">
        <van-image
          width="20vw"
          height="20vw"
          fit="contain"
          :src="refundDetail.goods_photo"
        />
        <div class="content">
          <div class="name">{{refundDetail.goods_name}}</div>
          <div class="attr">{{getDesc}}</div>
          <div class="num">x{{refundDetail.number}}</div>
        </div>
      </div>

      <div class="part">
        <div class="label">退款总金额</div>
        <div class="result">¥{{refundDetail.money}}</div>
      </div>
      <div class="part">
        <div class="label">退款原因</div>
        <div class="result">{{refundDetail.reason}}</div>
      </div>
      <div class="part">
        <div class="label">申请件数</div>
        <div class="result">{{refundDetail.number}}</div>
      </div>
      <div class="part">
        <div class="label">申请时间</div>
        <div class="result">{{refundDetail.create_at}}</div>
      </div>
    </div>
    <div v-if="refundDetail.refund_status == 1" class="footer">
      <div @click="goLogistics" class="logistics">填写物流</div>
    </div>
  </div>
</template>
<script>
import {refundDetail} from '@/utils/axios/request'
export default {
  data(){
    return {
      order_id:"",
      refundDetail:{},
    }
  },
  computed:{
    getDesc(){
      let desc = "";
      if(this.refundDetail.attr1_name !== ""){
        desc+= this.refundDetail.attr1_name+ ":" + this.refundDetail.attr1_value;
      }
      if(this.refundDetail.attr2_name !== ""){
        desc+= " " + this.refundDetail.attr2_name+ ":" + this.refundDetail.attr2_value;
      }
      if(this.refundDetail.attr3_name !== ""){
        desc+= " " + this.refundDetail.attr3_name+ ":" + this.refundDetail.attr3_value;
      }
      return desc;      
    },
    getStatus(){
      let refund_status = "";
      switch(this.refundDetail.refund_status){
        case 0:
          refund_status = "商家处理中"
          break;
        case 1:
          refund_status = "商家同意退款"
          break;
        case 2:
          refund_status = "商家拒绝退款"
          break;
        case 3:
          refund_status = "等待商家收货"
          break;
        case 4:
          refund_status = "退款成功"
          break;
      }
      return refund_status;
    }
  },
  created(){
    this.order_id = this.$route.query.order_id;
    refundDetail({
      order_id:this.order_id
    }).then(res=>{
      if(res.data.code != 1){
        this.$toast(res.data.message);
        return;
      }
      this.refundDetail = res.data.data;
    }).catch(res=>{});
  },
  methods:{
    handleBackClick(){
      this.$router.go(-1)
    }, 
    goLogistics(){
      this.$router.push({
        path: '/writeLogistics',
        query: {
          order_id: this.order_id,
        }
      })      
    }   
  }  
}
</script>
<style lang="stylus" scoped>
  .refund-details-wrapper
    background #f5f7fa
  .refund-details-wrapper .van-nav-bar >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .head
    background #ff5756
    height 18vw
    padding-bottom 6vw
    display flex
    justify-content flex-start
    align-items center
    color white
    font-size 5vw
    font-family PFH
    .complete-time
      font-size 3vw
      font-family hgzt
      padding-top 2vw
    .van-image
      margin 0 5vw
  .main
    width 95vw
    background-color white
    border-radius 3vw
    margin -6vw auto 0
    padding 3vw 2vw
    box-sizing border-box
    .goods
      display flex
      justify-content flex-start
      padding-bottom 2vw
      margin-bottom 2vw
      border-bottom 1px solid #eee
      .van-image
        margin-right 2vw
      .content
        flex 1
        .name
          font-size 3.8vw
          font-family PFH
          line-height 4.6vw
          height 10vw
        .attr
          padding-bottom 1vw
          font-size 3vw
          color #999
          line-height 4.5vw
        .num
          font-size 3vw
          color #999
          line-height 4.5vw  
    .part
      background-color white
      display flex
      justify-content space-between
      align-items center
      padding 2vw
      font-size 3.6vw
      .label
        color #767676
  .footer
    position fixed
    left 0
    bottom 0
    right 0
    display flex
    justify-content center
    align-items center
    font-size 4vw
    color white
    height 16vw
    background white
    .logistics
      width 80vw
      height 10vw
      line-height 10vw
      text-align center
      border-radius 5vw      
      margin 0 2vw
      background #f3284f
</style>