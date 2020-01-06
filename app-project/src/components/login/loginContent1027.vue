<template>
  <div class="loginContent-wrapper">
    <van-image
      width="100vw"
      height="50vh"
      fit="cover"
      :src="bg_img"
      style="-webkit-touch-callout: none;border-bottom: 1px solid rgba(0,0,0,0.2)"
    />
    <div class="loginContent-middle">
      <van-field
        v-model="phone"
        clearable
        left-icon="phone-o"
        placeholder="请输入手机号"
      />

      <van-field
        v-model="code"
        center
        clearable
        left-icon="edit"
        placeholder="请输入验证码"
      >
        <van-button 
          color="#f13a39" 
          slot="button" 
          plain  
          round
          size="small" 
          type="primary"
          @click="getCode"
        >
          {{getCodeStatus ? codeTime + "s" : "发送验证码"}}
        </van-button>
      </van-field>
    </div>

    <div class="loginContent-btn">
      <van-button 
        color="#f13a39"  
        round
        size="large" 
        type="primary"
        @click="codeLogin"
      >
        登录
      </van-button>
      
      <van-button 
        color="#f13a39"  
        round
        size="large" 
        type="primary"
        @click="handleWXLogin"
        v-if="is_app()"
      >
        <span class="iconfont wx-icon">&#xe715;</span>
        微信登录
      </van-button>

      <van-button 
        round
        size="large"
        @click="handleBack"
      >
        返回
      </van-button>
    </div>
    <div class="copyRight">
      <span>Copyright©2019</span>
      <span>呱呱汇gghbuy.com 版权所有</span>
    </div>
  </div>
</template>

<script>
import LoginInput from './loginInput'
import LoginBtn from './loginBtn'
import { login,register,getCode} from '../../utils/axios/request'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "LoginContent",
  components: {
    LoginInput,
    LoginBtn
  },
  data(){
    return {
      postData: {},
      bg_img: '/public/uploads/signin.jpg',
      phone: "",
      code: "",
      codeTime: 60,
      getCodeStatus: false
    }
  },
  computed:{
    ...mapState(['showAccountLogin'])
  },
  methods: {
    ...mapMutations(['changeLoginStatus','changeTab','updateUserData','addAweixinData']),
    //app运行环境
    is_app(){
      //localStorage.plusReady == 'true' 
      if(typeof(plus) == 'object'){
        return true;
      }
      return false;
    },
    //获取验证码操作
    getCode(){
      if(!this.getCodeStatus){
        this.getCodeStatus = true
        let postData = {
          phone: this.phone,
          type: 1
        }
        console.log(postData)
        getCode(postData)
          .then((res)=>{
            console.log(res.data)
            if(res.data.code == '1'){
              this.getCodeStatus = true
            }else{
              this.$toast({
                message: "不是正确的手机号码",
                duration: 1200
              })
              this.getCodeStatus = false
              clearInterval(this.timer)
              this.codeTime = 60
            }
          })
          .catch((err)=>{
            console.log('get code err')
            this.$toast({
              message: "获取验证码出错",
              duration: 1200
            })
          })
      }
    },
    //验证码登录
    codeLogin(){
      if(this.phone.length != 11){
        this.$toast({
          message: "请填写正确的手机号码",
          duration: 1200
        })
        return 
      }
      if(!this.code){
        this.$toast({
          message: "请填写验证码",
          duration: 1200
        })
        return 
      }
      let postData = {
        phone: this.phone,
        code: this.code
      }
      register(postData)
        .then((res)=>{
          console.log('register',res.data)
          if(res.data.code == 1){
            this.updateUserData(res.data.data)
            let userDataString = JSON.stringify(res.data.data)
            localStorage.userData = userDataString
            
            let gghToken = JSON.stringify(res.data.data.token)
            localStorage.setItem('gghToken',gghToken)
            this.changeLoginStatus(true)
            
            this.$nextTick(()=>{
              this.$router.go(-1)
            })
          }else{
            this.$toast({
              message: "请填写正确的验证码",
              duration: 1200
            })
          }
        })
        .catch((err)=>{
          console.log('post data err')
        })
    },
    //检查openid是否在数据库存在
    // 存在的话就拉取数据,不存在的话录入手机
    checkOpenId(openid){
      let postData = {
        openid: openid,
        type: 3
      }
      // let string1 = JSON.stringify(openid)
      // alert(string1)
      login(postData)
        .then((res)=>{
          // let string = JSON.stringify(res.data)
          // alert(string)
          if(res.data.code == '3001'){
            this.$router.push({
              path: "/getPhone"
            })
          }else if(res.data.code == 1){
            let userDataString = JSON.stringify(res.data.data)
            localStorage.userData = userDataString
          
            let gghToken = JSON.stringify(res.data.data.token)
            localStorage.setItem('gghToken',gghToken)

            this.updateUserData(res.data.data)
            this.changeLoginStatus(true)
            this.changeTab(5)
            this.$router.push('/')
          }
        })
        .catch((err)=>{
          console.log('check openid err',err)
        })
    },
    //微信登录
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
            // let string = JSON.stringify(aweixin)
            // alert(string)
            if(aweixin.userInfo){
              that.addAweixinData(aweixin.userInfo)
              that.checkOpenId(aweixin.userInfo.openid)
            }else{
              aweixin.getUserInfo(function(e){
                // let string1 = JSON.stringify(aweixin)
                // alert(string1)
                that.addAweixinData(aweixin.userInfo)
                that.checkOpenId(aweixin.userInfo.openid)
              },function(e){
                alert('获取用户信息错误')
              })
            }
          }, function(e){
            alert('登录认证失败')
          } );
        },function(e){
          alert('获取登录授权服务列表失败')
        })
      }else{
        alert('plus no ready')
      }
    },
    handleBack(){
      this.changeTab(1)
      this.$router.push({
        path: "/"
      })
    }
  },
  watch: {
    getCodeStatus(){
      if(this.getCodeStatus){
        this.timer = setInterval(() => {
          this.codeTime--
          if(this.codeTime == 0){
            this.getCodeStatus = false
            clearInterval(this.timer)
            this.codeTime = 60
          }
        }, 1000);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginContent-wrapper >>> .van-cell
    line-height: 30px
    font-size: 18px

  .loginContent-wrapper >>> .van-icon
    font-size: 20px
    color: #E41436
    margin-right: .2rem

  .loginContent-wrapper
    width: 100%
    height: 100%
    .bg-img
      width: 100%
      height: 30vh
      background-color: #E41436
    .loginContent-middle
      width: 90vw
      position: absolute 
      top: 40vh
      left: 5vw
      padding: .2rem 0
      background-color: #fff
      border: 1px solid rgba(0,0,0,0.2)
      border-radius: 3vw
      overflow: hidden
    .loginContent-btn
      width: 80vw
      margin: 20vw auto 5vw auto
      .wx-icon
        color: #fff
        vertical-align: middle
        font-size: 20px
    .loginContent-btn >>> .van-button
      margin-top: 10px
    .loginContent-btn >>> .van-button--large
      height: 44px
      line-height: 44px
    .copyRight
      width: 90vw
      margin: 2vw auto
      display: flex
      flex-direction: column
      align-items: center
      text-align: center
      color: #999
      span 
        margin-top: .1rem
</style>