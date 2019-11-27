<template>
  <div class="changeImg-wrapper">
    <div class="top">
      <span>会员头像</span>
      <img :src="head_img" alt="">
    </div>
    <div class="bottom">
      <span>上传头像</span>
      <van-uploader 
        v-model="file" 
        :max-size=500000 
        @oversize="handleOverSize"
        :max-count="1" 
        multiple 
      />
    </div>
    <van-button 
      color="#FF5756"     
      @click="handleChangeImg" 
      class="change-btn" 
      type="primary"
      round
    >
      修改头像
    </van-button>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState,mapMutations } from 'vuex'
export default {
  name: "ChangeImg",
  data(){
    return {
      file: []
    }
  },
  computed:{
    ...mapState(['userData']),
    head_img(){
      return this.userData.head_img
    }
  },
  methods:{
    ...mapMutations(['updateUserData','changeLoginStatus']),
    handleOverSize(){
      this.$toast({
        type: "fail",
        message: "图片大小不能超过500k",
        duration: 1200
      })
    },
    handleUpdateUserData(){
      let userID = {
        user_id: this.userData.id
      }
      // console.log('userID:',userID)
      axios.post('api/method/get_user_id',userID)
        .then((res)=>{
          console.log('get_user_id:',res.data)
          if(res.data.code == 1){
            this.updateUserData(res.data.data)
            localStorage.removeItem('userData')
            localStorage.userData = JSON.stringify(res.data.data)
            this.changeLoginStatus(true)
            this.$router.go(-1)
            console.log(1)
          }
        })
        .catch((err)=>[
          console.log('post userid err' + err)
        ])
    },
    handleChangeImg(){
      if(this.file.length){
        let postData = {
          file: this.file[0].content,
          user_id: this.userData.id,
          phone: this.userData.phone
        }
        axios.post('api/method/headimg',postData)
          .then((res)=>{
            console.log('headimg:',res.data)
            if(res.data.code == 1){
              this.handleUpdateUserData()
            }
          })
          .catch((err)=>{
            console.log('headimg err:',err)
          })
      }else{
        this.$toast({
          message: "请上传头像图片"
        })
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .changeImg-wrapper
    width: 100%
    height: calc(100% - 46px)
    box-sizing: border-box
    background-color: #F6F7FB
    // background-color: #999
    padding-top: 5vw
    .top
      width: 90vw
      margin: 0 auto
      font-family: PFH
      color: #000
      padding: 2vw 4vw
      box-sizing: border-box
      border-radius: 5vw
      background-color: #fff
      font-size: 3.5vw
      img
        width: 15vw
        margin-left: 5vw
    .bottom
      width: 90vw
      margin: 3vw auto
      background-color: #fff 
      padding: 2vw 4vw
      box-sizing: border-box
      border-radius: 5vw
      display: flex
      align-items: center
      font-family: PFH
      font-size: 3.5vw
      color: #000
      span
        margin-right: 5vw
    .change-btn
      width: 80%
      margin-left: 10% 
</style>