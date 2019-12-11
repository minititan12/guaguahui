<template>
  <div class="wallet-wrapper">
    <van-nav-bar
      title="我的钱包"
      left-arrow
      @click-left="handleBack"
    />
    <div>
      <div @click="goWithdraw">我要提现</div>
    </div>
    <div class="bank-card" @click="goBankCard">
      <div>银行卡</div>
      <van-icon name="arrow" />
    </div>
    <div class="month">
      <div>收支明细</div>
      <div @click="showDate">
        <div>{{date}}</div>
      </div>
    </div>
    <div class="detail">
      <div class="statistics">支出 ￥400.00    收入 ￥23.43</div>
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
    }
  },
  computed:{
    // 时间格式化
    date(){
      return dataFormat(this.currentDate,'yyyy年MM月');
    }
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
  .wallet-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .wallet-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .wallet-wrapper
    background-color #f5f7fa
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
        font-size 4vw
    .van-overlay
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
</style>