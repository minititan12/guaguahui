<template>
  <div class="loginContent-wrapper">
    <van-image
      width="100vw"
      height="30vh"
      fit="cover"
      :src="bg_img"
      style="-webkit-touch-callout: none"
    />
    <LoginInput @updatePostData="updatePostData"></LoginInput>
    <LoginBtn @limitedLogin="limitedLogin"></LoginBtn>
    <div class="copyRight">
      <span>Copyright©2019</span>
      <span>呱呱汇gghbuy.com 版权所有</span>
    </div>
  </div>
</template>

<script>
import LoginInput from './loginInput'
import LoginBtn from './loginBtn'
import { login, register} from '../../utils/axios/request'
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
      bg_img: '/public/uploads/signin.jpg'
    }
  },
  computed:{
    ...mapState(['showAccountLogin'])
  },
  methods: {
    ...mapMutations(['changeLoginStatus','changeTab','updateUserData']),
    updatePostData(postData){
      this.postData = postData
    },
    accountLogin(){
      let postdata = {
        phone: this.postData.phone,
        password: this.postData.code,
        type: 2
      }
      login(postdata)
        .then((res)=>{
          console.log('login',res.data)
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
              message: "请输入正确的账号密码",
              duration: 1200
            })
          }
        })
        .catch((err)=>{
          console.log('post data err')
        })
    },
    codeLogin(){
      register(this.postData)
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
    limitedLogin(){
      if(this.showAccountLogin){
        this.accountLogin()
      }else{
        this.codeLogin()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginContent-wrapper
    width: 100%
    height: 100%
    .bg-img
      width: 100%
      height: 30vh
      background-color: #E41436
    .copyRight
      width: 90vw
      margin: 10vw auto
      display: flex
      flex-direction: column
      align-items: center
      text-align: center
      color: #999
      span 
        margin-top: .1rem
</style>