<template>
  <div class="btn-wrapper">
    <div class="btn" @click="handleLimitedClick">
      <span class="btn-text">立即登录</span>
    </div>
    <div class="btn" @click="handleToCodeLogin">
      <span class="btn-text">切换登录方式</span>
    </div>
    <!-- <div class="btn" v-if="is_app()" @click="handleWXLogin">
      <span class="btn-text">微信登录</span>
    </div> -->
    <div class="btn" @click="back">
      <span class="btn-text">返回</span>
    </div>
    <div class="signIn" v-if="false">
      <span>还没有账号?</span>
      <span class="signIn-btn">立即注册</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'
export default {
  name: "LoginBtn",
  computed:{
    ...mapState(['showAccountLogin'])
  },
  methods: {
    ...mapMutations(['changeTab','changeLoginWay','addAweixinData','updateUserData','changeLoginStatus']),
    handleLimitedClick(){
      this.$emit('limitedLogin')
    },
    handleToCodeLogin(){
      let bool = !this.showAccountLogin
      this.changeLoginWay(bool)
    },
    back(){
      this.$router.push('/')
      this.changeTab(1)
    },
    //app运行环境
    is_app(){
      //localStorage.plusReady == 'true' 
      if(typeof(plus) == 'object'){
        return true;
      }
      return false;
    },
    checkOpenId(openid){
      let postData = {
        openid: openid,
        type: 3
      }
      // let string1 = JSON.stringify(openid)
      // alert(string1)
      axios.post('api/method/Login',postData)
        .then((res)=>{
          // let string = JSON.stringify(res.data)
          // alert(string)
          if(res.data.code == '3001'){
            this.$router.push({
              path: "/getPhone"
            })
          }else if(res.data.code == 1){
            if(!localStorage.hasOwnProperty('userData')){
              this.updateUserData(res.data.data)
              let userDataString = JSON.stringify(res.data.data)
              localStorage.userData = userDataString
              this.changeLoginStatus(true)
              this.changeTab(5)
              this.$router.push('/')
              // this.$router.go(-1)
            }else{
              let userData = JSON.parse(localStorage.userData)
              this.updateUserData(userData)
              this.changeLoginStatus(true)
              this.changeTab(5)
              this.$router.push('/')
              // this.$router.go(-1)
            }
          }
        })
        .catch((err)=>{
          console.log('check openid err',err)
        })
    },
    handleWXLogin(){
      let that = this
      if(localStorage.hasOwnProperty('plusReady') && localStorage.plusReady == 'true'){
        plus.oauth.getServices(function(services){
          // let string = JSON.stringify(services)
          let aweixin = null
          for(let item of services){
            if(item.id == 'weixin'){
              aweixin = item
            }
          }
          aweixin.login(function(e){
            // let string = JSON.stringify(aweixin.userInfo.openid)
            // alert(string)
            // alert('weixin login')
            that.addAweixinData(aweixin.userInfo)
            that.checkOpenId(aweixin.userInfo.openid)
          }, function(e){
            alert('登录认证失败')
          } );
        },function(e){
          alert('获取登录授权服务列表失败')
        })
      }else{
        alert('plus no ready')
      }
    }
  },
  mounted(){
    if(this.is_app()){
      this.changeLoginWay(true)
    }else{
      this.changeLoginWay(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .btn-wrapper
    margin-top: 1rem
    width: 100%
    .btn
      width: 90%
      height: 1rem
      margin: .2rem auto 
      background-color: #E41436
      text-align: center
      line-height: 1rem
      border-radius: .5rem
      color: #fff
    .signIn
      width: 100%
      height: 1rem
      text-align: center
      .signIn-btn
        color: #E41436
        margin-left: .2rem
</style>