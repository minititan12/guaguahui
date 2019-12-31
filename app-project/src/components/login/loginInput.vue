<template>
  <div class="loginInput-wrapper">
    <div class="login-top">
      <van-cell-group>
        <van-field
          v-model="phone"
          clearable
          placeholder="请输入手机号码"
        />
      </van-cell-group>
    </div>
    <div class="login-bottom">
      <van-cell-group v-if="!showAccountLogin">
        <van-field
          v-model="code"
          center
          clearable
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" plain @click="getCode" size="small" type="primary">{{getCodeStatus ? codeTime + "s" : "发送验证码"}}</van-button>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="showAccountLogin">
        <van-field
          v-model="code"
          clearable
          type="password"
          placeholder="请输入密码"
        >
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getCode } from '../../utils/axios/request'
import { mapState } from 'vuex'
export default {
  name: "LoginInput",
  data(){
    return {
      phone: "",
      code: "",
      codeTime: 60,
      getCodeStatus: false
    }
  },
  computed: {
    ...mapState(['showAccountLogin']),
    postData(){
      return {
        phone: this.phone,
        code: this.code
      }
    }
  },
  watch: {
    phone(){
      this.$emit('updatePostData',this.postData)
    },
    code(){
      this.$emit('updatePostData',this.postData)
    },
    showAccountLogin(){
      this.code = ''
    },
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
  },
  methods: {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginInput-wrapper
    position: relative
    width: 100vw
    background-color: #fff
    .login-top
      border-bottom: .05rem solid #E41436
    .login-bottom
      border-bottom: .05rem solid #E41436
</style>