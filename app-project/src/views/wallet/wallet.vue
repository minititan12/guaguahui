<template>
  <div class="wallet-wrapper">
    <van-nav-bar
      title="我的钱包"
      left-arrow
      @click-left="handleBack"
    />
    <div class="withdraw">
      <div class="tip">
        <van-image src="/public/static/wallet/wallet_how.png" />
        <span>如何提现？</span>
      </div>
      <div class="balance">
        <span class="unit">¥</span>
        <span>{{userData.brokerage}}</span>
      </div>
      <div class="goWithdraw" @click="goWithdraw">我要提现</div>
    </div>
    <div class="bank-card" @click="goBankCard">
      <div>银行卡</div>
      <van-icon name="arrow" />
    </div>
    <div class="month">
      <div>收支明细</div>
      <div class="date" @click="showDate">
        <div>{{date}}</div>
        <van-image src="/public/static/wallet/wallet_arrow.png" />
      </div>
    </div>
    <div class="detail">
      <div class="statistics">支出 ￥{{commissionDetails.withdraw}}    收入 ￥{{commissionDetails.income}}</div>
      <div class="list" :key="index" v-for="(item,index) in commissionDetails.list">
        <van-image v-if="item.type==2" src="/public/static/wallet/wallet_expenditure.png" />
        <van-image v-if="item.type==1" src="/public/static/wallet/wallet_income.png" />
        <div class="content">
          <div class="type">{{item.type==1?"收入":""}}{{item.type==2?"提现":""}}</div>
          <div class="time">{{item.create_at}}</div>
        </div>
        <div :class="{'income':item.type==1}" class="money">{{item.money}}</div>
      </div>
    </div>
    <van-overlay :show="choseDate" @click="hideDate">
      <div class="wrapper" @click.stop>
        <van-datetime-picker
          v-model="pickerDate"
          type="year-month"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="confirmDate"
          @cancel="hideDate"
        />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {dataFormat} from '@/utils/utils'
import { mapState } from 'vuex'
import {commissionLog} from '@/utils/axios/request'
export default {
  name: "Wallet",
  data(){
    return {
      currentDate:new Date(),
      pickerDate:null,
      maxDate:new Date(),
      minDate:new Date(2019, 1, 1),
      // 是否显示选择时间弹窗
      choseDate:false,
      // 佣金明细
      commissionDetails:{
        list:[]
      }
    }
  },
  computed:{
    ...mapState(['userData']),
    // 时间格式化
    date(){
      return dataFormat(this.currentDate,'yyyy年MM月');
    }
  },
  created(){
    this.commissionLog();
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    formatter(type, value){
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    showDate(){
      this.pickerDate = this.currentDate;
      this.choseDate = true;
    },
    hideDate(){
      this.choseDate = false;
    },
    confirmDate(date){
      this.currentDate = date;
      this.hideDate();
      this.commissionLog();
    },
    // 获取月份的佣金明细
    commissionLog(){
      commissionLog({
        date:dataFormat(this.currentDate,'yyyy-MM')
      }).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        this.commissionDetails = res.data.data;
      }).catch(res=>{
      });
    },
    // 跳转至我的银行卡
    goBankCard(){
      this.$router.push({
        path: "/bankCard"
      })
    },
    // 跳转至提现页面
    goWithdraw(){
        this.$router.push({
        path: "/withdraw"
      })    
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wallet-wrapper .van-nav-bar
    position fixed
    left 0
    top 0
    right 0
  .wallet-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  .wallet-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .wallet-wrapper
    background-color #f5f7fa
    padding-top 46px;
    box-sizing border-box
    .withdraw
      background url('/public/static/wallet/wallet_bg.png')
      width 100%
      height 42vw
      background-size 100% 100%
      .tip
        display flex
        justify-content center
        align-items center
        color #ffd5b6
        font-size 3.2vw
        height 6vw
        padding-top 5vw
        .van-image
          width 4vw
          margin-right 2vw
      .balance
        display flex
        justify-content center
        align-items center
        color white
        font-family hgzt
        font-size 7vw
        line-height 8vw
        padding-top 2vw
        .unit
          font-size 4vw
          margin-right 1vw
      .goWithdraw
        color #ff5756
        background white
        margin 4vw auto 0
        width 32vw
        font-size 4vw
        font-family PFB
        height 10vw
        line-height 10vw
        border-radius 5vw
        text-align center
    .bank-card
      display flex
      justify-content space-between
      align-items center
      height 12vw
      background white
      padding 0 3vw
      font-size 4vw
      font-family PFH
      border-bottom 1px solid #eee
    .month
      display flex
      justify-content space-between
      align-items center
      height 12vw
      background white
      padding 0 3vw
      font-size 4.4vw
      font-family PFH
      .date
        display flex
        justify-items center
        align-items center
        font-size 3.6vw
        color #585858
        font-family PFM
        .van-image
          width 2vw
          margin-left 1vw
    .detail
      background-color white
      border-radius 3vw
      overflow hidden
      margin 0 3vw
      .statistics
        background #fff3e9
        text-align right 
        height 12vw
        line-height 12vw
        padding 0 3vw
        font-family PFB
        font-size 3.6vw
      .list
        display flex
        justify-content flex-start
        align-items center
        padding 3vw 3vw 3vw 2vw
        border-bottom 1px solid rgba(229, 229, 229, 0.5);
        .van-image
          width 12vw
          margin-right 2vw
        .content
          flex 1
          line-height 5vw
          .type
            color black
            font-family PFB
            font-size 4vw
          .time
            color #a7a7a7
            font-size 3.2vw
        .money
          font-size 3.6vw
          font-family PFB
          &.income
            color #ff5756
    .van-overlay
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
</style>