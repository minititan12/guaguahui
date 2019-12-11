<template>
  <div class="withdraw-wrapper">
    <van-nav-bar
      title="提现"
      left-arrow
      @click-left="handleBack"
    />
    <div class="chose-card">
      <div class="label">选择银行卡</div>
      <div v-if="empty">
        <div class="tip">暂无银行卡</div>
        <div @click="goAddBankCard" class="add">添加银行卡</div>
      </div>
    </div>
    <div class="withdraw">
      <div class="label">提现金额</div>
      <input placeholder="¥100" type="text">
      <div class="tip">可提现金额为0</div>
    </div>
    <div class="submit">提交</div>
  </div>
</template>
<script>
import {myBindBank,withdraw} from '@/utils/axios/request'
export default {
  data(){
    return {
      // 我的银行卡列表
      bankCardList:[],
      // 是否未有银行卡
      empty:false,
    }
  },
  created(){
    myBindBank().then(res=>{
      if(res.data.code != 1){
        this.$toast(res.data.message);
        return;
      }
      if(res.data.data.length == 0){
        this.empty = true;
      }
      this.bankCardList = res.data.data;
    });
  },
  methods: {
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
  .withdraw-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .withdraw-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .withdraw-wrapper
    background #f5f7fa
    .chose-card
      background white
      margin 3vw
      padding 1vw 3vw
      border-radius 3vw  
      .label
        color #868686
        font-size 3.6vw    
        line-height 12vw
      .tip
        font-size 4vw
        text-align center
        color #999
        line-height 8vw
      .add
        background-color #ff5756
        width 30vw
        line-height 10vw
        border-radius 5vw
        font-size 3.8vw
        text-align center
        font-family: PFM
        color white
        margin 2vw auto        
    .withdraw
      background white
      margin 0 3vw
      padding 5vw 3vw
      border-radius 3vw
      .label
        color #868686
        font-size 3.6vw
        line-height 5vw
      input
        font-size 9vw
        line-height 10vw
        padding 4vw 0
        width 100%
        &::-webkit-input-placeholder
          color #e8e8e8
      .tip
        color black
        font-size 3vw
        line-height 3.6vw
    .submit
      background-color #ff5756
      width 70vw
      height 10vw
      line-height 10vw
      border-radius 5vw
      font-size 3.8vw
      text-align center
      font-family: PFM
      color white
      margin 6vw auto
</style>