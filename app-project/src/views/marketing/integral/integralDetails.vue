<template>
  <div class="intergral-details-wrapper">
    <van-nav-bar
      title="积分明细"
      left-arrow
      @click-left="handleBack"
    />
    <div class="details">
      <div class="title">
        <div class="month">本月</div>
        <div>
          <span>获取 <span class="income">{{income}} </span></span>
          <span>使用 <span>{{expend}}</span></span>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="item of detailList">
          <div>
            <div class="type">{{getStatusDesc(item.type)}}</div>
            <div class="time">{{item.create_at}}</div>
          </div>
          <div class="data">{{parseInt(item.number)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { creditLog } from '../../../utils/axios/request'
export default {
  name: "IntergralDetails",
  data(){
    return {
      statusList: ['购物得积分','积分兑换'],
      creditLogData: null
    }
  },
  computed: {
    ...mapState(['userData']),
    income(){
      if(this.creditLogData){
        return this.creditLogData.income
      }else{
        return 0
      }
    },
    expend(){
      if(this.creditLogData){
        return this.creditLogData.expend
      }else{
        return 0
      }
    },
    detailList(){
      if(this.creditLogData){
        return this.creditLogData.list
      }else{
        return []
      }
    }
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    //获取积分明细
    getCreditLog(){
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dateString = year + '-' + month

      let getData = {
        user_id: this.userData.id,
        date: dateString
      }
      creditLog(getData)
        .then((res)=>{
          console.log('creditLog',res.data)
          if(res.data.code == 1){
            this.creditLogData = res.data.data
          }else{
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        }).catch((err)=>{})
    },
    //获取积分状态描述
    getStatusDesc(type){
      let index = parseInt(type) - 1
      return this.statusList[index]
    }
  },
  created(){
    this.getCreditLog()
  }
}
</script>

<style lang="stylus" scoped>
  .intergral-details-wrapper
    background #f5f7fa
    .van-nav-bar
      .van-icon
        color #FF5756
        font-size 5vw
      .van-nav-bar__title
        color #000
        font-size 4vw
        font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight bold
    .title
      display flex
      justify-content space-between
      align-items center
      padding 0 4vw
      height 10vw
      line-height 10vw
      font-size 3vw
      font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
      font-weight bold
      .income
        color #ff5756
    .list
      background white  
      margin 0 3vw
      border-radius 3vw
      padding 0 3vw
      .item
        display flex
        justify-content space-between
        align-items center
        height 17vw
        border-bottom 1px solid #eee
        font-size 4vw
        .type
          font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
          font-weight bold
          line-height 6vw
        .time
          color #7c7c7c
          font-size 3vw
        .data
          color #ff5756
          font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
          font-weight bold
</style>