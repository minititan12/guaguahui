<template>
  <div class="requestRefund-wrapper">
    <van-nav-bar title="申请退款" left-arrow @click-left="handleBackClick"/>

    <van-cell style="padding-left: 25px" title="订单号">
      {{orderNumber}}
    </van-cell>

    <van-cell-group>
      <van-field
        style="padding-left: 25px"
        v-model="text"
        rows="4"
        autosize
        label="申请理由"
        type="textarea"
        placeholder="请填写你想要申请退款的理由"
      />

      <van-button 
        style="margin: 25px"
        type="primary"
        @click="handleToRequestRefund"
      >
        提交申请
      </van-button>
    </van-cell-group>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "RequestRefund",
  data(){
    return {
      text: '',
      orderNumber: ''
    }
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    handleToRequestRefund(){
      if(this.text.length == 0){
        this.$toast({
          message: "请填写申请理由",
          duration: 1200
        })
        return 
      }
      let postData = {
        order_number: this.orderNumber,
        return_reason: this.text
      }
      axios.post('api/method/requestRefund',postData)
        .then((res)=>{
          console.log('requestRefund',res.data)
          if(res.data.code == 1){
            this.$toast({
              type: "success",
              message: "申请成功",
              duration: 1200
            })
            setTimeout(()=>{
              this.$router.go(-1)
            },1200)
          }else{
            this.$toast({
              type: "fail",
              message: "申请失败",
              duration: 1200
            })
          }
        })
        .catch((err)=>{
          this.$toast({
            type: "fail",
            message: "申请失败",
            duration: 1200
          })
          console.log('retirement',err)
        })
    }
  },
  created(){
    this.orderNumber = this.$route.params.orderNumber
  }
}
</script>

<style lang="stylus" scoped>
  .requestRefund-wrapper >>> .van-icon
    color: #E31436
    font-size: 20px
</style>