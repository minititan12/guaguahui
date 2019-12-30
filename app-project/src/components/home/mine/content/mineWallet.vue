<template>
  <div class="wallet-wrapper">
    <div class="wallet-top">
      <span>我的钱包</span>
    </div>

    <div class="wallet-bottom">
      <div class="mineIntegral" @click="handleToIntegral">
        <span class="integral-title">我的积分</span>
        <span class="integral-num">{{credit}}</span>
      </div>
      <div class="wallet" @click="handleToWallet">
        <div class="balance-top">
          <span class="balance-title">钱包余额</span>
          <span class="balance-out">提现</span>
        </div>
        <div class="balance-num">
          <span class="num-icon">￥</span>
          <span class="num-text">{{userData.brokerage}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCredit } from '../../../../utils/axios/request'
export default {
  name: "MineWallet",
  data(){
    return {
      credit: 0
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    handleToIntegral(){
      this.$router.push({
        path: "/integralShop"
      })
    },
    handleToWallet(){
      this.$router.push({
        path: '/wallet'
      })
    },
    //获取积分
    getCredit(){
      let getData = {
        user_id: this.userData.id
      }
      getCredit(getData)
        .then((res)=>{
          console.log('getCredit',res.data)
          if(res.data.code == 1){
            this.credit = res.data.data.credit
          }else{
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        }).catch(()=>{})
    },
  },
  created(){
    this.getCredit()
  }
}
</script>

<style lang="stylus" scoped>
  .wallet-wrapper
    width: 92vw
    min-height: 30vw
    margin: 3vw auto 0 auto
    border-radius: 3vw
    box-sizing: border-box
    padding: 3vw
    background-color: #fff
    .wallet-top
      line-height: 7vw
      font-size: 4.5vw
      font-family: PFH
    .wallet-bottom
      width: 100%
      height: 18vw
      margin-top: 2vw
      // background-color: red
      display: flex
      flex-direction: row
      justify-content: space-between
      .mineIntegral
        background-image: url('/images/wdjf.png')
        background-size: 100%
        background-repeat: no-repeat
        width: 48%
        height: 100%
        padding: 3vw
        box-sizing: border-box
        display: flex
        flex-direction: column
        .integral-title
          font-family: PFB
        .integral-num
          font-family: PFH
          font-size: 5vw
          margin-top: 3vw
      .wallet
        background-image: url('/images/qbye.png')
        background-size: 100%
        background-repeat: no-repeat
        width: 48%
        height: 100%
        padding: 3vw
        box-sizing: border-box
        display: flex
        flex-direction: column
        .balance-top
          display: flex
          flex-direction: row
          justify-content: space-between
          // align-items: center
          font-family: PFB
          .balance-out
            color: #FB5756
            font-size: 4vw
        .balance-num
          font-family: PFH
          font-size: 5vw
          margin-top: 3vw
          .num-icon
            font-size: 3vw
</style>