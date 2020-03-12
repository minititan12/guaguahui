<template>
  <div class="getPhone-wrapper">
    <van-nav-bar title="手机绑定"/>
    <van-cell-group>
      
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
      />

      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button 
          slot="button" 
          size="small" 
          type="primary"
          @click="getCode"
        >
          {{getCodeStatus ? codeTime + "s" : "发送验证码"}}
        </van-button>
      </van-field>

      <van-button 
        type="primary"
        style="margin-top: .5rem"
        size= "large"
        @click="handleLoginClick"
      >
          登录
        </van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { getCode,bindPhone } from '../../utils/axios/request'
import { mapMutations,mapState } from 'vuex'
export default {
  name:"GetPhone",
  data(){
    return {
      phone: "",
      sms: "",
      getCodeStatus: false,
      codeTime: 60
    }
  },
  computed: {
    ...mapState(['aweixin'])
  },
  methods: {
    ...mapMutations(['updateUserData','changeTab','changeLoginStatus']),
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
    handleLoginClick(){
      let postData = {
        phone: this.phone,
        openid: this.aweixin.openid,
        nickname: this.aweixin.nickname,
        code: this.sms,
        channel_name: '微信',
        head_img: this.aweixin.headimgurl,
        province: this.aweixin.province,
        city: this.aweixin.city,
        sex: this.aweixin.sex
      }
      // let str = JSON.stringify(postData)
      // alert(str)

      bindPhone(postData)
        .then((res)=>{
          if(res.data.code == 1){
            if(!localStorage.hasOwnProperty('userData')){
              this.updateUserData(res.data.data)
              let userDataString = JSON.stringify(res.data.data)
              localStorage.userData = userDataString

              let gghToken = JSON.stringify(res.data.data.token)
              localStorage.setItem('gghToken',gghToken)
              
              this.changeLoginStatus(true)
              this.changeTab(5)
              this.$router.push('/')
              // this.$router.go(-1)
            }
          }else{
            this.$toast({
              message: res.data.message,
              duration: 1200
            })
          }
        })
        .catch((err)=>{
          // alert('bindPhone err')
          console.log('bindPhone err')
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

</style>