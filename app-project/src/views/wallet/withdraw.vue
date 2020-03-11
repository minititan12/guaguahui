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
      <div>
        <div @click="switchBankCard(item)" class="bank-card" :key="item.id" v-for="item in bankCardList">
          <van-image :src="item.bank_logo" />
          <div class="bank-no">{{formatBankNo(item.bank_no)}}</div>
          <div :class="{'active':bind_bank==item.id}" class="select"></div>
        </div>
      </div>
    </div>
    <div class="withdraw">
      <div class="label">提现金额</div>
      <input @input="inputMoney" @change="inputMoney" v-model="money" placeholder="¥100" type="text">
      <div class="tip">可提现金额为{{userData.brokerage}}</div>
    </div>
    <div @click="withdraw" class="submit">提交</div>
  </div>
</template>
<script>
import {myBindBank,withdraw} from '@/utils/axios/request'
import { mapState } from 'vuex'
export default {
  data(){
    return {
      // 我的银行卡列表
      bankCardList:[],
      // 是否未有银行卡
      empty:false,
      // 选择的银行卡号ID
      bind_bank:"",
      money:"",
      request:false,
    }
  },
  computed:{
    ...mapState(['userData']),
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
      if(res.data.data[0]){
        this.bind_bank = res.data.data[0].id;
      }
      this.bankCardList = res.data.data;
    }).catch(res=>{
    });
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    // 金额的输入
    inputMoney (event) {
      let val = event.target.value.trim();
      val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
      val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
      val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
      val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数 
      if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        val= Number(val) + ''; 
      }
      this.money = val;
    },
    // 点击提现
    withdraw(){
      if(this.request){
        return;
      }
      if(!this.bind_bank){
        this.$toast({
          message: "请添加银行卡",
          duration: 1200
        })
        return;
      }
      if(this.money <= 0){
        this.$toast({
          message: "请填写提现金额",
          duration: 1200
        })
        return;
      }
      this.request = true;
      withdraw({
        money:this.money,
        bind_bank:this.bind_bank
      }).then(res=>{
        this.request = false;
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        this.money = "";
        this.$toast("申请成功");
      }).catch(res=>{
        this.request = false;
      })
    },
    // 切换银行卡
    switchBankCard(item){
      if(item.id != this.bind_bank){
        this.bind_bank = item.id;
      }
    },
      // 格式化卡号
    formatBankNo(bank_no){
      return bank_no.substr(0,4)+"********"+bank_no.substr(-4);;
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
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold

  .withdraw-wrapper
    background #f5f7fa
    .chose-card
      background white
      margin 3vw
      padding 1vw 3vw 0
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
        font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
        color white
        margin 2vw auto  
      .bank-card   
        display flex
        justify-content flex-start
        align-items center  
        border-bottom 1px solid rgba(229, 229, 229, 0.5);
        .van-image
          width 14vw
        .bank-no
          flex 1
          font-size 3.6vw
          font-family hgzt
        .select
          width 10px
          height 10px
          border-radius 10px
          position relative
          border 1px solid #d2d2d2
          &.active
            border 1px solid #ff5756
            &::after
              position absolute
              content ''
              left 2px
              top 2px
              width 6px
              height 6px
              border-radius 3px
              background #ff5756
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
      font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
      color white
      margin 6vw auto
</style>