<template>
  <div class="commentContent-wrapper">
    <van-nav-bar title="评价" left-arrow @click-left="handleBackClick"/>

    <van-cell-group :key="index" v-for="(item,index) in orderEvaluation">

      <van-cell>
        <div class="good_desc">
          <van-image
            width="1.8rem"
            height="1.8rem"
            fit="contain"
            :src="item.cover_img"
          />
          <div class="desc-text">
            <span class="text-title">{{item.goods_name}}</span>
            <span class="desc">{{getDesc(item)}}</span>
          </div>
        </div>
      </van-cell>

      <van-cell>
        <div style="margin-bottom: .2rem">整体评分</div>
        <van-rate allow-half v-model="item.stars" />
      </van-cell>

      <van-cell>
        <div style="margin-bottom: .2rem">请上传评价图片</div>
        <div class="van-uploader" style="vertical-align: middle;">
          <div class="van-uploader__wrapper">
            <div class="van-uploader__preview" :key="index" v-for="(img,index) in item.imageUrl">
              <div @click="previewImg(item.imageUrl,index)" class="van-image van-uploader__preview-image" style="overflow: hidden; border-radius: 4px;">
                <img :src="img" class="van-image__img" style="object-fit: cover;">
              </div>
              <i @click.stop="deleteImg(item,index)" class="van-icon van-icon-clear van-uploader__preview-delete"></i>
            </div>
          </div>
        </div>
        <van-uploader v-show="item.imageUrl.length<=4" :name="index" :after-read="uploadImage" :accept="'image/*'" :max-count="9" />
      </van-cell>
      <van-field
        v-model="item.remark"
        rows="4"
        autosize
        label="评价"
        type="textarea"
        placeholder="宝贝满足你的期待吗？说说它的优点和缺点吧"
      />
    </van-cell-group>
    <van-cell>
      <van-button @click="handlePostComment" type="primary" round>提交评价</van-button>
    </van-cell>
  </div>
</template>

<script>
import axios from 'axios'
import {orderDetail,evaImageUpload} from '@/utils/axios/request'
import { mapState } from 'vuex'
import { ImagePreview } from 'vant';
export default {
  name: "CommentContent",
  data(){
    return {

      // 订单号
      order_number:"",
      // 订单详情
      orderEvaluation:[],
    }
  },
  computed:{
    ...mapState(['userData'])
  },
  created(){
    this.order_number = this.$route.query.order_number;
    this.getOrderDetail();
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    // 预览图片
    previewImg(images,startPosition){
      ImagePreview({images,startPosition});
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
        this.orderEvaluation[name].imageUrl.push(res.data.data.src);
      }).catch(res=>{})
    },
    // 移除图片
    deleteImg(item,index){
      item.imageUrl.splice(index,1);
    },
    // 获取订单详情
    getOrderDetail(){
      orderDetail({
        order_number:this.order_number
      }).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        let orderEvaluation = [];
        for(let i in res.data.data.goods_info){
          orderEvaluation.push({
            goods_id:res.data.data.goods_info[i].goods_id,
            cover_img:res.data.data.goods_info[i].cover_img,
            goods_name:res.data.data.goods_info[i].goods_name,
            attr1_name:res.data.data.goods_info[i].attr1_name,
            attr1_value:res.data.data.goods_info[i].attr1_value,
            attr2_name:res.data.data.goods_info[i].attr2_name,
            attr2_value:res.data.data.goods_info[i].attr2_value,
            attr3_name:res.data.data.goods_info[i].attr3_name,
            attr3_value:res.data.data.goods_info[i].attr3_value,
            stars:0,
            remark:"",
            imageUrl:[]
          });
        }
        this.orderEvaluation = orderEvaluation;
      }).catch(res=>{});
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
    handlePostComment(){
      let data = {
        order_number:this.order_number,
        user_id:this.userData.id,
        nickname: this.userData.nickname,
        head_img: this.userData.head_img,
      }
      let goodList = [];
      for(let i in this.orderEvaluation){
        if(this.orderEvaluation[i].stars > 0){
          goodList.push({
            goods_id:this.orderEvaluation[i].goods_id,
            stars:this.orderEvaluation[i].stars,
            remark:this.orderEvaluation[i].remark,
            imageUrl:this.orderEvaluation[i].imageUrl,
          });
        }
      }
      if(goodList.length == 0){
        this.$toast("请选择商品评价");
        return;
      }
      data.goodList = goodList;
      axios.post('api/method/showComment',data)
        .then((res)=>{
          console.log('showComment',res.data)
          if(res.data.code == 1){
            this.$toast({
              type: 'success',
              message: "已评价",
              duration: 1200
            })
            setTimeout(()=>{
              this.$router.go(-1)
            },1200)
          }else{
            this.$toast({
              type: 'fail',
              message: "评价失败",
              duration: 1200
            })
          }
        })
        .catch((err)=>{
          this.$toast({
            type: 'fail',
            message: "评价失败",
            duration: 1200
          })
          console.log('showComment err',err)
        })
    }
  },
}
</script>

<style lang="stylus" scoped>
  .commentContent-wrapper >>> .van-icon
    color: #E31436
    font-size: 20px

  .van-nav-bar
    position fixed
    left 0
    top 0
    right  0
  .commentContent-wrapper
    padding-top 46px
    box-sizing border-box
  .commentContent-wrapper >>> .good_desc
    display: flex
    flex-direction: row
    .desc-text
      margin-left: .2rem
      display: flex
      flex-direction: column
      .text-title
        display: block
        font-size: .3rem
        font-weight: bold
        line-height: .4rem
        margin-bottom: .1rem
        padding: .1rem
      .desc
        display: block
        line-height: .4rem
        padding: 0 .1rem
</style>