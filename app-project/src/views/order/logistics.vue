<template>
  <div class="logistics-wrapper">
    <van-sticky>
      <van-nav-bar class="logistics-header" title="物流信息" left-arrow @click-left="handleBackClick"/>
    </van-sticky>

    <div class="orderDetail">
      <van-image
        width="20vw"
        height="20vw"
        fit="contain"
        :src="imgUrl"
      />
      <div class="detail-right">
        <span class="right-title">{{title}}</span>
        <span class="right-number">快递号:{{orderNumber}}</span>
        <button class="btn" :data-clipboard-text="orderNumber">复制</button>
      </div>
    </div>
    
    <van-steps v-if="logisticsData.length > 0" direction="vertical" :active="0">
      <van-step v-for="item of logisticsData">
        <h3>{{item.context}}</h3>
        <p>{{item.time}}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import axios from 'axios'
import Clipboard from 'clipboard'
export default {
  name: "Logistics",
  data(){
    return {
      logisticsData: [],
      title: ''
    }
  },
  computed: {
    orderNumber(){
      return this.$route.query.orderNumber
    },
    imgUrl(){
      return this.$route.query.imgUrl
    }
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    getLogisticsData(){
      let postData = {
        order_number: this.$route.query.orderNumber,
        type: 0
      }
      axios.post('api/method/logisticsDetails',postData)
        .then((res)=>{
          console.log('logisticsDetails',res.data)
          if(res.data.code == 1){
            this.logisticsData = res.data.data.data
            this.title = res.data.kd
          }
        })
        .catch((err)=>{
          console.log('logisticsDetails err',err)
        })
    }
  },
  created(){
    var clipboard = new Clipboard('.btn');
    let that = this
    clipboard.on('success',function(e){
      console.log(e)
      that.$toast({
        message: '复制成功',
        type: 'success',
        duration: 1000
      })
    })

    clipboard.on('error',function(e){
      that.$toast({
        message: '复制失败',
        type: 'fail',
        duration: 1000
      })
    })
    
    this.getLogisticsData()
  }
}
</script>

<style lang="stylus" scoped>
  .logistics-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .orderDetail
    display: flex
    flex-direction: row
    align-items: center
    padding: 3vw
    border-bottom: 1px solid #eee
    .detail-right
      display: flex
      flex-direction: column
      margin-left: 3vw
      .right-title
        font-size: 4vw
        font-weight: bold
        margin-bottom: 2vw
      .right-number
        font-weight: bold
      .btn
        margin-top: 2vw
        width: 20vw
        height: 7vw
        font-weight: bold
        background-color: #FD4140
        color: #fff
        border-radius: 1vw
</style>