<template>
  <div class="paySuccess-wrapper">
    <van-nav-bar
      title="支付完成"
      left-arrow
      @click-left="handleBack"
    />
    <div class="human-num">
      <span>再邀{{getNumber()}}人,立即成团</span>
    </div>
    <div class="time">
      <span class="text">剩余时间</span>

      <van-count-down :time="getTime()">
        <template v-slot="timeData">
          <span class="item">{{ timeData.hours }}</span>
          <span class="item-middle">:</span>
          <span class="item">{{ timeData.minutes }}</span>
          <span class="item-middle">:</span>
          <span class="item">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>

    <div class="icons">
      <div class="icon">
        <van-image width="6vw" fit="contain" src="/images/tzkt.png"/>
        <span class="icon-text">团长开团</span>
      </div>
      <van-image class="icon-jt" width="4vw" fit="contain" src="/images/jt.png"/>

      <div class="icon">
        <van-image width="6vw" fit="contain" src="/images/yqhy.png"/>
        <span class="icon-text">邀请好友</span>
      </div>
      <van-image class="icon-jt" width="4vw" fit="contain" src="/images/jt.png"/>

      <div class="icon">
        <van-image width="6vw" fit="contain" src="/images/ptmcg.png"/>
        <span class="icon-text">拼团成功</span>
      </div>
    </div>

    <div class="images">
      <van-image class="image" :src="getHeaderImg()" width="12vw" height="12vw" round/>
      <van-image v-for="n in getNumber()" class="image" src="/images/wz.png" width="12vw" height="12vw" round/>
    </div>

    <div class="inviteGroup" @click="handleInviteGroup">
      <span>邀请好友拼团</span>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from 'vuex'
export default {
  name: "GroupPaySuccess",
  data(){
    return {
      currentGroupData: null
    }
  },
  computed: {
    ...mapState(['payOrderData','userData'])
  },
  methods: {
    handleBack(){
      this.$router.push({
        path: "/groupBuy"
      })
    },
    //获取不够的人数
    getNumber(){
      if(this.currentGroupData){
        let data = this.currentGroupData
        return data.all_group_num - data.already_group_num
      }
    },
    //获取开团用户头像
    getHeaderImg(){ 
      if(this.currentGroupData){
        let data = this.currentGroupData
        return data.head_img
      }
    },
    //获取倒计时
    getTime(){
      if(this.currentGroupData){
        let data = this.currentGroupData
        let time = data.group_end_time
        let t = new Date(time).getTime()
        let now = new Date().getTime()

        return t-now
      }
    },
    //获取订单完成后的拼团信息
    getGroupData(){
      // if(this.$route.params.groupBuyID == -1){
        let postData = {
          user_id: this.userData.id,
          // goods_id: this.$route.params.goods_id,
          // activity_spell_group_id: this.$route.params.group_id,
          // order_number: this.$route.params.order_number,
          goods_id: 1,
          activity_spell_group_id: 5,
          order_number: "20191203020157495924"
        }
        axios.post("api/method/userDoSpellGroup",postData)
          .then((res)=>{
            console.log('userDoSpellGroup:',res.data)
            if(res.data.code == 1){
              this.currentGroupData = res.data.data
            }
          })
          .catch((err)=>{
            console.log('userDoSpellGroup err',err)
          })
      // }else{

      // }
    },
    //处理邀请好友拼团
    handleInviteGroup(){

    }
  },
  created(){
    
    this.getGroupData()
  }
}
</script>

<style lang="stylus" scoped>
  .paySuccess-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .paySuccess-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .paySuccess-wrapper
    width: 100%
    height: 100%
    color: #000
    .human-num
      width: 100%
      text-align: center
      font-family: PFH
      font-size: 7vw
      margin-top: 10vw
      margin-bottom: 5vw

    .time
      width: 100%
      display: flex
      flex-direction: row
      align-items: center
      font-size: 4vw
      font-family: PFB
      justify-content: center
      margin-bottom: 15vw
      .text
        margin-right: 2vw
      .item
        color: #fff
        background-color: #FF5756
        display: inline-block
        width: 7vw
        height: 7vw
        line-height: 7vw
        text-align: center
        margin: 0 1vw
        border-radius: 2vw
      .item-middle
        color: #FF5756
        font-size: 5vw

    .icons
      display: flex
      flex-direction: row
      width: 100%
      justify-content: center
      .icon-jt
        margin: 0 4vw
      .icon
        display: flex
        flex-direction: column
        align-items: center
        .icon-text
          margin-top: 3vw
          font-size: 3.5vw
          font-family: PFM
    
    .images
      width: 100%
      display: flex
      justify-content: center
      margin-top: 10vw
      .image
        margin: 0 2vw
    
    .inviteGroup
      width: 60%
      height: 10vw
      background-color: #FF5756
      margin: 10vw auto 
      text-align: center
      font-size: 4vw
      line-height: 10vw
      font-family: PFM
      color: #fff
      border-radius: 5vw

</style>