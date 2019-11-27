<template>
  <div class="changeName-wrapper">
    <div class="show-text">
      <span class="text">会员名:</span>
      <span class="nickName">{{nickName}}</span>
    </div>
    <van-field
      class="new-name"
      v-model="newName"
      placeholder="请输入新会员名"
      label="新会员名:"
      left-icon="contact"
    />
    <van-button 
      @click="handleChangeName" 
      class="change-btn"
      type="primary"
      color="#FF5756"
      round
      size="large"
    >
      修改会员名
    </van-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name:"ChangeName",
  data(){
    return {
      newName: ''
    }
  },
  computed:{
    ...mapState(['userData']),
    nickName(){
      return this.userData.nickname
    }
  },
  methods:{
    ...mapMutations(['updateUserData','changeLoginStatus']),
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
    handleChangeName(){
      if(this.newName.length){
        let postData = {
          nickname: this.newName,
          user_id: this.userData.id,
          phone: this.userData.phone
        }
        axios.post('api/method/editnickname',postData)
          .then((res)=>{
            console.log('editnickname:',res.data)
            if(res.data.code == 1){
              this.handleUpdateUserData()
            }
          })
          .catch((err)=>{
            console.log('editnickname err:',err)
          })
      }else{
        this.$toast({
          message: "请填写新会员名"
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .changeName-wrapper >>> .van-cell__title
    font-size: 4vw
    color: #000
    font-family: PFB
  .changeName-wrapper >>> .van-icon
    font-size: 5vw

  .changeName-wrapper >>> .van-field__control
    font-size: 3.5vw
    color: #000
    &::placeholder
      font-size: 3.5vw
      color: #999

  .changeName-wrapper
    width: 100%
    height: calc(100% - 46px)
    box-sizing: border-box
    background-color: #F6F7FB
    // background-color: #999
    padding-top: 5vw
    .show-text
      width: 90%
      height: 10vw
      background-color: #fff
      border-radius: 5vw
      display: flex
      flex-direction: row
      align-items: center
      padding: 0 5vw
      box-sizing: border-box
      margin-bottom: 3vw
      margin-left: 5vw
      .text
        margin-right: 5vw
        font-size: 4vw
        font-family: PFB
        color: #000
      .nickName
        font-size: 4vw
        font-family: PFM
        color: #999
    .new-name
      width: 90%
      margin-left: 5vw
      border-radius: 5vw
    .change-btn
      // margin-left: 10vw
      width: 80%
      margin-top: 10vw
      margin-left: 10vw
</style>