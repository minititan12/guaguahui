<template>
  <div class="requestRefund-wrapper">
    <van-nav-bar title="申请退款" left-arrow @click-left="handleBackClick"/>

    <van-cell style="padding-left: 25px" title="订单号">
      {{order_number}}
    </van-cell>

    <div class="goods">
      <van-image
        width="20vw"
        height="20vw"
        fit="contain"
        :src="goods_info.photo"
      />
      <div class="content">
        <div class="name">{{goods_info.goods_name}}</div>
        <div class="desc">
          <div class="attr">{{getDesc(goods_info)}}</div>
        </div>
        <div class="details">
          <div>x{{goods_info.number}}</div>
          <div>￥{{goods_info.amount}}</div>
        </div>
      </div>
    </div>
    <van-cell title="退款金额" :value="'￥'+goods_info.order_money" value-class="money-class" />

    <van-radio-group class="need_return" checked-color="#f3284f" v-model="need_return">
      <van-cell-group>
        <van-cell title="仅退款" clickable @click="need_return = '2'">
          <van-radio slot="right-icon" name="2" />
        </van-cell>
        <van-cell title="退货退款" clickable @click="need_return = '1'">
          <van-radio slot="right-icon" name="1" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <van-cell>
      <div style="margin-bottom: .2rem">退款凭证</div>
      <div class="van-uploader" style="vertical-align: middle;">
        <div class="van-uploader__wrapper">
          <div class="van-uploader__preview" :key="index" v-for="(img,index) in imgUrl">
            <div @click="previewImg(index)" class="van-image van-uploader__preview-image" style="overflow: hidden; border-radius: 4px;">
              <img :src="img" class="van-image__img" style="object-fit: cover;">
            </div>
            <i @click.stop="deleteImg(index)" class="van-icon van-icon-clear van-uploader__preview-delete"></i>
          </div>
          <van-uploader v-show="imgUrl.length<9" name="uploadImg" :after-read="uploadImage" :accept="'image/*'" :max-count="9" />
        </div>
      </div>
    </van-cell>

    <van-cell-group class="reason">
      <van-field
        style="padding-left: 25px"
        v-model="reason"
        rows="4"
        autosize
        label="申请理由"
        type="textarea"
        placeholder="请填写你想要申请退款的理由"
      />

      <van-button 
        style="margin: 25px"
        color="#f3284f"
        @click="handleToRequestRefund"
      >
        提交申请
      </van-button>
    </van-cell-group>
  </div>
</template>

<script>
import {refundGoodsInfo,evaImageUpload,refundApply} from '@/utils/axios/request'
import { ImagePreview } from 'vant';
export default {
  name: "RequestRefund",
  data(){
    return {
      reason:"",
      imgUrl:[],
      need_return:"2",
      order_number:"",
      goods_attr_id:"",
      goods_info:{},
    }
  },
  created(){
    this.order_number = this.$route.query.order_number;
    this.goods_attr_id = this.$route.query.goods_attr_id;
    refundGoodsInfo({
      order_number: this.order_number,
      goods_attr_id: this.goods_attr_id,
    }).then(res=>{
      if(res.data.code != 1){
        this.$toast(res.data.message);
        return;
      }
      this.goods_info = res.data.data;
    }).catch(res=>{})
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    // 预览图片
    previewImg(startPosition){
      ImagePreview({images:this.imgUrl,startPosition});
    },
    // 上传图片
    uploadImage(file,{name}){
      let param = new FormData();
      param.append('file',file.file);
      evaImageUpload(param).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        this.imgUrl.push(res.data.data.src);
      }).catch(res=>{})
    },
    // 移除图片
    deleteImg(index){
      this.imgUrl.splice(index,1);
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
    handleToRequestRefund(){
      if(this.reason.length == 0){
        this.$toast("请填写申请理由");
        return 
      }
      let data = {
        order_number: this.order_number,
        goods_attr_id: this.goods_attr_id,
        reason: this.reason,
        img:this.imgUrl,
        need_return:this.need_return,
        money:this.goods_info.order_money,
      }
      refundApply(data).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        this.$toast({
          type: "success",
          message: "申请成功",
          duration: 1200
        })
        setTimeout(()=>{
          this.$router.go(-1)
        },1200)
      }).catch(res=>{})
    }
  },
}
</script>

<style lang="stylus" scoped>
  .requestRefund-wrapper
    background #f5f5f5
    padding-top 46px
    box-sizing border-box
  .van-nav-bar
    position fixed
    left 0
    top 0
    right  0
  .requestRefund-wrapper .van-nav-bar >>> .van-icon
    color: #E31436
    font-size: 20px

  .money-class
    font-size 4.2vw
    color #f3284f
  .goods
    display flex
    justify-content flex-start
    padding 2vw 3vw
    background white
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
        display flex
        justify-content space-between
        height 9vw
        .attr
          font-size 3vw
          color #999
          line-height 4.5vw
          flex 1
      .details
        display flex
        justify-content space-between
        align-items center
  .need_return
    margin-top 2vw
  .reason
    margin-top 2vw
</style>