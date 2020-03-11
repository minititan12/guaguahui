<template>
  <div class="redemption-record-wrapper">
    <van-nav-bar
      title="兑换记录"
      left-arrow
      @click-left="handleBack"
    />
    <div class="list">
      <div @click="goRedemptionDetails(item)" class="record" v-for="item of creditOrderList">
        <div class="time">{{item.create_at}}</div>
        <div class="content">
          <van-image
            width="20vw"
            height="20vw"
            fit="contain"
            :src="item.sku_img"
          />
          <div class="info">
            <div class="name">{{item.goods_name}}</div>
            <div class="attr">{{getAttrDesc(item.sku)}}</div>
            <div class="num">X{{item.number}}</div>
          </div>
          <div>
            <div class="deduction">-{{item.order_money}}积分</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { creditOrderList } from '../../../utils/axios/request'
export default {
  name: "RedemptionRecord",
  data(){
    return {
      creditOrderList: []
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    //跳转兑换订单详情
    goRedemptionDetails(item){
      let str = JSON.stringify(item)
      this.$router.push({
        path: '/redemptionDetails',
        name: 'redemptionDetails',
        params: {
          data: str
        }
      });
    },
    //获取兑换记录数据
    getCreditOrderList(){
      let getData = {
        user_id: this.userData.id
      }
      creditOrderList(getData)
        .then((res)=>{
          console.log('creditOrderList',res.data)
          if(res.data.code == 1){
            this.creditOrderList = res.data.data
          }else{
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        })
        .catch((err)=>{})
    },
    //获取属性描述
    getAttrDesc(obj){
      let strAry = []
      for(let key in obj){
        let str = key + ':' + obj[key]
        strAry.push(str)
      }

      return strAry.join()
    }
  },
  created(){
    this.getCreditOrderList()
  }
}
</script>

<style lang="stylus" scoped>
  .redemption-record-wrapper
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
    .list
      .record
        background white
        margin 3vw
        border-radius 3vw
        padding 0 2vw
        .time
          font-size 3vw
          color #393939 
          font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
          font-weight bold
          height 9vw
          line-height 9vw
        .content
          display flex
          justify-content flex-start
          padding-bottom 3vw
          .van-image
            margin-right 2vw
          .info
            flex 1
            .name
              font-size 3.8vw
              font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
              font-weight bold
              line-height 4.6vw
              height 10vw
            .attr
              padding-bottom 1vw
              font-size 3vw
              color #999
              line-height 4.5vw
            .num
              font-size 3vw
              color #999
              line-height 4.5vw  
          .deduction
            color #ff5756
            font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
            font-weight bold
            width 18vw
            text-align center
            padding-top 4vw
</style>