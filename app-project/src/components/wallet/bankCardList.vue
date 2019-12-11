<template>
  <div>
    <div class="bank-card" :style="{'background':'url('+item.bank_img+')'}" :key="item.id" v-for="item in bankCardList">
      <van-image :src="item.bank_logo" />
      <div class="content">
        <div class="bank-name">{{item.bank}}</div>
        <div class="bank-type">储蓄卡</div>
        <div class="bank-no">{{formatBankNo(item.bank_no)}}</div>
      </div>
      <div @click="showPop(item)" class="manage">
        <van-icon name="setting-o" />
        <span>管理</span>
      </div>
    </div>
    <van-action-sheet @select="select" :round="false" v-model="showOperate" :actions="actions" />
  </div>
</template>
<script>
import {myBindBank,unbindBank} from '@/utils/axios/request'
export default {
  data(){
    return {
      // 我的银行卡列表
      bankCardList:[],
      // 是否显示操作银行卡弹窗
      showOperate:false,
      // 当前操作的银行卡
      currentBankCard:null,
      // 操作选项
      actions:[{type:"unbind",name:"解除绑定",color:"#ff5756"},{type:"cancel",name:"取消",color:"#9f9f9f"}]
    }
  },
  created(){
    myBindBank().then(res=>{
      if(res.data.code != 1){
        this.$toast(res.data.message);
        return;
      }
      this.bankCardList = res.data.data;
    }).catch(res=>{
      
    });
  },
  methods:{
    // 格式化卡号
    formatBankNo(bank_no){
      return bank_no.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2");
    },
    // 显示操作弹窗
    showPop(bankCard){
      this.showOperate = true;
      this.currentBankCard = bankCard;
    },
    select(item){
      if(item.type=="unbind"){
        this.showOperate = false;
        unbindBank({
          bind_bank_id:this.currentBankCard.id
        }).then(res=>{
          if(res.data.code != 1){
            this.$toast(res.data.message);
            return;
          }
          this.bankCardList = this.bankCardList.filter(card=>card.id != this.currentBankCard.id);
        }).catch(res=>{});
      }
      if(item.type == "cancel"){
        this.showOperate = false;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .bank-card
    padding 6vw
    box-sizing border-box
    display flex
    justify-content flex-start
    background-size 100% 100% !important 
  .van-image
    width 12vw
    height 12vw
    margin-right 3vw
  .content
    flex 1
    color white
    .bank-name
      font-size 4.2vw
      font-family PFH
      line-height 6vw
    .bank-type
      font-size 3vw
      font-family PFM
      line-height 5vw
      padding-bottom 4vw
    .bank-no
      font-size 4.4vw
      font-family hgzt
      line-height 5vw 
      padding-bottom 2vw
  .manage
    color white
    display flex
    justify-content flex-start
    font-size 3vw
    font-family PFM
    .van-icon 
      margin-right 1vw
</style>