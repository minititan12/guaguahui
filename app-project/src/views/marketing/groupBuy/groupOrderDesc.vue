<template>
  <div class="groupOrderDesc-wrapper">
    <van-nav-bar
      title="拼团详情"
      left-arrow
      @click-left="handleBack"
    />

    <div class="order-desc" v-if="orderDesc">
      <div class="top">
        <van-image class="top-img" width="22vw" :src="orderDesc.cover_img"/>
        <div class="top-right">
          <div class="top-status">
            <div class="top-nickname">
              <span style="margin-right: 2vw">团长:</span>
              <span>{{orderDesc.nickname}}</span>
            </div>
            <span class="top-statusText">拼团进行中</span>
          </div>
          <div class="top-name">{{orderDesc.goods_name}}</div>
          <!-- <div class="top-desc">{{orderDesc.desc}}</div> -->
        </div>
      </div>

      <div class="bottom">
        <div class="startTime">
          <span style="color: #999; margin-right: 2vw">下单时间:</span>
          <span>{{orderDesc.order_add_time}}</span>
        </div>

        <div class="warn">
          <van-icon name="after-sale" />
          <span>过期自动退款</span>
        </div>
      </div>
    </div>

    <!-- 差多少人数 -->
    <div class="human-num">
      <span>再邀{{number}}人,立即成团</span>
    </div>
    
    <!-- 剩余时间 -->
    <div class="time">
      <span class="text">剩余时间</span>

      <van-count-down :time="time">
        <template v-slot="timeData">
          <span class="item">{{ getDescTime(timeData.hours) }}</span>
          <span class="item-middle">:</span>
          <span class="item">{{ getDescTime(timeData.minutes) }}</span>
          <span class="item-middle">:</span>
          <span class="item">{{ getDescTime(timeData.seconds) }}</span>
        </template>
      </van-count-down>
    </div>

    <!-- 提示图片 -->
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

    <!-- 用户头像 -->
    <div class="images">
      <div class="image">
        <van-image :src="imgList[0]" width="12vw" height="12vw" round />
        <div class="leader">
          <span>团长</span>
        </div>
      </div>

      <van-image v-for="img of imgList.slice(1)" class="image" :src="img" width="12vw" height="12vw" round/>
      <van-image v-for="n in number" class="image" src="/images/wz.png" width="12vw" height="12vw" round/>
    </div>

    <div class="inviteGroup" @click="openSharePopUp">
      <span>邀请好友拼团</span>
    </div>

    <SharePopUp :shareData="shareData"></SharePopUp>
  </div>
</template>

<script>
import { getShareSpellGroupDes } from '../../../utils/axios/request'
import SharePopUp from '../../../components/product/sharePopUp'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "GroupOrderDesc",
  components: {
    SharePopUp
  },
  data(){
    return {
      currentGroupData: null,
      imgList: [],
      time: 0,
      number: 0,
      orderDesc: null
    }
  },
  computed: {
    ...mapState(['payOrderData','userData']),
    shareData(){
      if(this.currentGroupData){
        return {
          title: this.currentGroupData.goods_name,
          content: 'www.gghbuy.com',
          photo: this.currentGroupData.cover_img,
          href: process.env.VUE_APP_SHARE_HOST + '#/groupOrderShare?team_id=' + this.currentGroupData.group
        }
      }
    }
  },
  methods: {
    ...mapMutations(['updateSharePopUp']),
    handleBack(){
      this.$router.go(-1)
    },
    //获取不够的人数
    getNumber(){
      if(this.currentGroupData){
        let data = this.currentGroupData
        this.number = data.group_num - data.already_group_num
      }
    },
    //获取开团用户头像
    getImg(){ 
      if(this.currentGroupData){
        let data = this.currentGroupData.data.userInfo
        let result = []

        for(let item of data){
          if(item.header == 1){
            result.unshift(item.head_img)
          }else{
            result.push(item.head_img)
          }
        }

        this.imgList = result
      }
    },
    //获取两位数的时间
    getDescTime(num){
      let n = parseInt(num)
      if(num < 10){
        return '0' + n
      }else{
        return n
      }
    },
    //获取倒计时
    getTime(){
      if(this.currentGroupData){
        let data = this.currentGroupData
        let time = data.group_end_time
        let t = new Date(time).getTime()
        let now = new Date().getTime()

        this.time = t-now
      }
    },
    //获取订单详情
    getOrderDesc(){
      let result = {}

      if(this.currentGroupData){
        let data = this.currentGroupData
        // let attr1 = ''
        // let attr2 = ''
        // let attr3 = ''
        result.order_number = data.order_number
        result.goods_name = data.goods_name
        result.cover_img = data.cover_img
        result.order_add_time = data.order_add_time
        for(let item of data.data.userInfo){
          if(item.header == 1){
            result.nickname = item.nickname
            break
          }
        }

        // if(data.attr1_name){
        //   attr1 = data.attr1_name + ':' + data.attr1_value + ' '
        // }
        // if(data.attr2_name){
        //   attr2 = data.attr2_name + ':' + data.attr2_value + ' '
        // }
        // if(data.attr3_name){
        //   attr3 = data.attr3_name + ':' + data.attr3_value + ' '
        // }

        // result.desc = attr1 + attr2 + attr3

        this.orderDesc = result
      }
    },
    //获取订单完成后的拼团信息
    getGroupData(){
      let postData = {
        speelgroup_record_id: this.$route.query.team_id
      }

      getShareSpellGroupDes(postData)
        .then((res)=>{
          console.log('getShareSpellGroupDes:',res.data)
          if(res.data.code == 1){
            this.currentGroupData = res.data.data
            this.getNumber()
            this.getImg()
            this.getTime()
            this.getOrderDesc()
          }
        })
        .catch((err)=>{
          console.log('getShareSpellGroupDes err',err)
        })
    },
    //打开分享弹窗
    openSharePopUp(){
      console.log(this.shareData)
      this.updateSharePopUp(true)
    }
  },
  created(){
    // console.log(this.$route)
    this.getGroupData()
  }
}
</script>

<style lang="stylus" scoped>
  .groupOrderDesc-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .groupOrderDesc-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .groupOrderDesc-wrapper
    width: 100%
    height: 100%
    color: #000
    background-color: #f6f7fb

    .order-desc
      width: 94%
      margin: 2vw auto
      background-color: #fff
      border-radius: 3vw
      .top
        display: flex
        flex-direction: row
        align-items: center
        .top-img
          margin: 4vw 3vw
        .top-right
          max-width: 70%
          padding-right: 2vw
          box-sizing: border-box
          .top-status
            margin-bottom: 3.5vw
            font-family: PFH
            font-size: 3.8vw
            display: flex
            flex-direction: row
            justify-content: space-between
            .top-statusText
              color: #FF5756
          .top-name
            margin-bottom: 1vw
            font-size: 3.6vw
            line-height: 5vw
          .top-desc
            font-size: 3.3vw
            color: #999
      .bottom
        width: 100%
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        padding: 1vw 3vw 3vw 3vw
        box-sizing: border-box
        font-family: PFB
        .warn
          display: flex
          align-items: center
          color: #FF5756
          font-family: PFH

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
      margin-bottom: 10vw
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
      margin-top: 5vw
      .image
        margin: 0 2vw
        position: relative
        .leader
          position: absolute 
          bottom: 0
          right: -1vw
          background-color: yellow 
          color: #000
          font-size: 3vw
          font-family: PFB
          padding: 1vw
          border-radius: 2vw
    
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