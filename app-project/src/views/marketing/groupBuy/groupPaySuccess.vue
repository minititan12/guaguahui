<template>
  <div class="paySuccess-wrapper">
    <van-nav-bar
      title="支付完成"
      left-arrow
      @click-left="handleBack"
    />

    <div class="undone-wrapper" v-show="!showGroupDone">
      <div class="human-num" >
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
        <div class="image">
          <van-image :src="imgList[0]" width="12vw" height="12vw" round />
          <div class="leader">
            <span>团长</span>
          </div>
        </div>

        <van-image v-for="img of imgList.slice(1)" class="image" :src="img" width="12vw" height="12vw" round/>
        <van-image v-for="n in getNumber()" class="image" src="/images/wz.png" width="12vw" height="12vw" round/>
      </div>

      <div class="inviteGroup" @click="handleInviteGroup">
        <span>邀请好友拼团</span>
      </div>
    </div>

    <SharePopUp :shareData="shareData"></SharePopUp>

    <div class="warn" v-if="showWarn">
      <span class="text">请点击箭头指引的按钮并分享</span>
      <span class="iconfont">&#xe604;</span>
    </div>

    <div class="done-wrapper" v-show="showGroupDone">
      <div class="done-text">拼团成功</div>
      <div class="done-btn" @click="handleToOrder">查看订单</div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import SharePopUp from '../../../components/product/sharePopUp'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "GroupPaySuccess",
  components: {
    SharePopUp
  },
  data(){
    return {
      currentGroupData: null,
      showWarn: false,
      imgList: []
    }
  },
  computed: {
    ...mapState(['payOrderData','userData']),
    type(){
      if(this.$route.query.team_id == -1){//发起
        return 1
      }else{//加入
        return 2
      }
    },
    shareData(){
      if(this.currentGroupData){
        return {
          title: this.currentGroupData.goods_name,
          content: '呱呱汇拼团商品',
          photo: this.currentGroupData.cover_img,
          href: process.env.VUE_APP_SHARE_HOST + '#/groupOrderShare?team_id='+ this.currentGroupData.speelgroup_record_id
        }
      }else{
        return null
      }
    },
    showGroupDone(){
      if(this.currentGroupData){
        let data = this.currentGroupData

        if(data.all_group_num == data.already_group_num){
          return true
        }else{
          return false
        }
      }else{
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['updateSharePopUp']),
    //app运行环境
    is_app(){
      //localStorage.plusReady == 'true' 
      if(typeof(plus) == 'object'){
        return true;
      }
      return false;
    },
    //微信web
    is_wxWebPay(){
      if(/MicroMessenger/.test(window.navigator.userAgent)){
        return true;
      }
      return false;	
    },
    handleBack(){
      this.$router.push({
        path: "/groupBuy"
      })
    },
    //查看订单
    handleToOrder(){
      this.$router.push({
        path: "/orderPage",
        query:{
          orderID: 1
        }
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
        if(this.currentGroupData.hasOwnProperty('group_userinfos')){
          console.log('has userinfos')
          let result = []
          for(let item of this.currentGroupData.group_userinfos){
            if(item.header == 1){
              result.unshift(item.head_img)
            }else{
              result.push(item.head_img)
            }
          }

          this.imgList = result
        }else{
          this.imgList = [data.head_img]
        }
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

    //配置微信内网页分享
    configWXShare(){
      let _this = this
      wx.ready(function () {   //需在用户可能点击分享按钮前就先调用

        if(_this.shareData){
          wx.updateAppMessageShareData({ 
            title: _this.shareData.title, // 分享标题
            desc: _this.shareData.content, // 分享描述
            link: _this.shareData.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _this.shareData.photo, // 分享图标
            success: function () {
              // 设置成功
            }
          })

          wx.updateTimelineShareData({ 
            title: _this.shareData.title, // 分享标题
            link: _this.shareData.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _this.shareData.photo, // 分享图标
            success: function () {
              // 设置成功
            }
          })
        }

      })
    },

    //请求操作
    handlePost(postData){
      // let a = JSON.stringify(postData)
      // alert(a)
      //url路径
      let url = this.type == 1 ? "api/method/userDoSpellGroup" : "api/method/userPartSpellGroup"

      axios.post(url,postData)
        .then((res)=>{
          console.log('getCurrentGroupData:',res.data)
          // let b = JSON.stringify(res.data)
          // alert(b)
          if(res.data.code == 1){
            this.currentGroupData = res.data.data
            this.getHeaderImg()
            if(this.is_wxWebPay()){
              this.configWXShare()
            }
          }
        })
        .catch((err)=>{
          alert('err')
          console.log('getCurrentGroupData err',err)
        })
    },

    //获取订单完成后的拼团信息
    getGroupData(){
      //发起拼团
      if(this.type == 1){
        let postData = {
          user_id: this.userData.id,
          goods_id: this.$route.query.goods_id,
          activity_spell_group_id: this.$route.query.group_id,
          order_number: this.$route.query.order_number,
          // goods_id: 1,
          // activity_spell_group_id: 5,
          // order_number: "20191203020157495924"
        }

        this.handlePost(postData)
      }else{//加入拼团
        let postData = {
          user_id: this.userData.id,
          goods_id: this.$route.query.goods_id,
          activity_spell_group_id: this.$route.query.group_id,
          order_number: this.$route.query.order_number,
          speelgroup_record_id: this.$route.query.team_id
        }
        
        this.handlePost(postData)
      }
    },
    //处理邀请好友拼团
    handleInviteGroup(){
      // let string = JSON.stringify(this.shareData)
      // alert(string)
      if(this.is_app()){
        this.updateSharePopUp(true)
        return 
      }

      if(this.is_wxWebPay()){
        this.showWarn = true
      }
    }
  },
  created(){
    // console.log(this.$route)
    // let a = JSON.stringify(this.$route.query)
    // alert(a)
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
    .undone-wrapper
      width: 100%
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

    .warn
      position: absolute 
      top: 5vw
      right: 8vw
      z-index:2
      .text
        color: #000
      .iconfont
        font-size: 7vw
        color: red

    .done-wrapper
      width: 100%
      text-align: center
      .done-text
        margin-top: 15vw
        font-family: PFH
        font-size: 7vw
      .done-btn
        width: 50%
        margin: 10vw auto
        background-color: #FF5756
        height: 10vw
        line-height: 10vw
        font-size: 4vw
        font-family: PFB
        border-radius: 5vw
</style>