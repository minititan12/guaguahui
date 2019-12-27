<template>
  <div class="userItem-wrapper" v-if="showUserItem" @click="handleChangeDefault()">
    <!-- <span class="icon-left iconfont">&#xe62f;</span> -->
    <div class="userItem-middle">
      <div class="middle-top">
        <van-image width="6vw" height="6vw" fit="contain" src="/images/dz.png" />
        <span class="user-name">{{addressData.real_name}}</span>
        <span class="user-phone">{{addressData.phone}}</span>
      </div>
      <div class="middle-bottom">
        <span class="user-address">{{addressData.city + addressData.county + addressData.address}}</span>
      </div>
    </div>
    <span class="icon-right iconfont">&#xe623;</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "IntegralUserItem",
  computed: {
    ...mapState(['defaultAddress']),
    addressData(){
      if(this.defaultAddress.code == 1){
        if(Object.keys(this.defaultAddress.data).length > 0){
          return this.defaultAddress.data
        }
      }else{
        return {}
      }
    },
    showUserItem(){
      if(this.defaultAddress.code == 1){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    handleChangeDefault(){
      console.log('tap')
      setTimeout(()=>{
        this.$router.push('/addressList')
      },320)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .userItem-wrapper
    width: 94%
    height: 25vw
    margin: 3vw auto
    padding: 3vw
    background-color: #fff
    border-radius: 3vw
    box-sizing: border-box
    font-family: PFB
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    .userItem-middle
      width: 80%
      display: flex
      flex-direction: column
      .middle-top
        display: flex
        flex-direction: row
        align-items: center
        .user-name
          font-size: 4vw
          font-family: PFH
          margin: 0 3vw 0 2vw
        .user-phone
          color: #9A9A9A
          font-size: 3.5vw
      .middle-bottom
        font-size: 3.7vw
        margin: 3vw 0
        margin-left: 8vw
</style>
