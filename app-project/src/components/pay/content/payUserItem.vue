<template>
  <div class="userItem-wrapper" v-if="showUserItem" @tap="handleChangeDefault()">
    <span class="icon-left iconfont">&#xe62f;</span>
    <div class="userItem-middle">
      <div class="middle-top">
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
  name: "PayUserItem",
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
    handleChangeDefault(e){
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
    height: 2rem
    margin: .2rem auto
    background-color: #fff
    border-radius: .2rem
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-around
    .icon-left
      display: block
      width: .6rem
      height: .6rem
      line-height: .6rem
      font-size: .45rem
      background-color: #E41436
      text-align: center
      border-radius: .3rem
      color: #fff
      margin-left: .1rem
    .userItem-middle
      width: 75%
      display: flex
      flex-direction: column
      .middle-top
        margin-bottom: .2rem
        .user-name
          font-size: .3rem
          font-weight: bold
          margin-right: .2rem
        .user-phone
          color: #9A9A9A
      .middle-bottom
        margin-bottom: .4rem
</style>
