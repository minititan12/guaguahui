<template>
  <div class="bankCard-wrapper">
    <van-nav-bar
      title="我的银行卡"
      left-arrow
      @click-left="handleBack"
    />
    <div @click="goAddBankCard" class="add">+添加银行</div>
  </div>
</template>
<script>
import {myBindBank} from '@/utils/axios/request'
export default {
  data(){
    return {
      // 我的银行卡列表
      bankCardList:[],
    }
  },
  created(){
    myBindBank().then(res=>{
      if(res.data.code != 1){
        this.$toast(res.data.message);
        return;
      }
      this.bankCardList = res.data.data;
    });
  },
  methods:{
    handleBack(){
      this.$router.go(-1)
    },
    // 跳转至添加银行页面
    goAddBankCard(){
      this.$router.push({
        path: "/addBankCard"
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
  .bankCard-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .bankCard-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
  
  .bankCard-wrapper
    .add
      color #ff5756
      border 1px solid #ff5756
      height 10vw
      line-height 10vw
      font-size 4vw
      text-align center
      width 60vw
      margin 6vw auto
      border-radius 6vw
      font-family: PFH
</style>