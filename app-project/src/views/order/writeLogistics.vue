<template>
  <div class="write-logistics-wrapper">
    <van-nav-bar title="填写物流" left-arrow @click-left="handleBack"/>
    <div>
      <van-field 
        clearable 
        label="订单号" 
        v-model="express_no"
        placeholder="请输入订单号" 
      />
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>快递公司</span>
        </div>
        <div @click="showExpressList=true" class="van-cell__value">
          <div class="van-field__body chose">
            <span>{{express.name}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div @click="submitLogistics" class="logistics">提交</div>
    </div>
    <van-action-sheet 
      v-model="showExpressList"
      close-on-click-action 
      :actions="expressList" 
      cancel-text="取消"
      @cancel="showExpressList=false"
      @select="onExpressSelect"
    />
  </div>
</template>
<script>
import {expressList,refundGoods} from '@/utils/axios/request'
export default {
  data(){
    return {
      order_id:"",
      express_no:"",
      showExpressList:false,
      expressList:[],
      express:{
        id:"",
        name:"选择快递"
      },
    }
  },
  created(){
    this.order_id = this.$route.query.order_id;
    expressList().then(res=>{
      if(res.data.code != 1){
        this.$toast(res.data.message);
        return;
      }
      this.expressList = res.data.data;
    }).catch(res=>{});
  },
  methods:{
    handleBack(){
      this.$router.go(-1)
    },
    onExpressSelect(item){
      this.express = item;
    },
    submitLogistics(){
      if(!this.express_no.length){
        this.$toast({
          message: "请填写订单号",
          duration: 1200
        })
        return
      }
      if(!this.express.id){
        this.$toast({
          message: "请选择物流公司",
          duration: 1200
        })
        return
      }
      refundGoods({
        express:this.express.id,
        express_no:this.express_no,
        order_id:this.order_id
      }).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        this.$toast("提交成功");
        this.handleBack();
      }).catch(res=>{});
    }
  }
}
</script>
<style lang="stylus" scoped>
  .write-logistics-wrapper
    background #f5f7fa
  .write-logistics-wrapper .van-nav-bar >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .chose
    justify-content space-between
    color black
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