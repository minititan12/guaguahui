<template>
  <div class="warn-wrapper" v-if="showWarn">
    <span class="iconfont">&#xe631;</span>
    <span class="warn-text">那么多好商品,你都不加购物车吗？</span>
    <div class="login-btn" v-if="showLogin" @click="handleToLogin">登录并同步购物车商品</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "ShoppingWarn",
  computed: {
    ...mapState(['login','cart']),
    showWarn(){
      if(this.login){
        if(this.cart.length <= 0){
          return true
        }else{
          return false
        }
      }else{
        return true
      }
    },
    showLogin(){
      if(this.login){
        return false
      }else{
        return true
      }
    }
  },
  methods: {
    handleToLogin(){
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .warn-wrapper
    width: 100%
    position: absolute
    top: 0
    bottom: 0
    display: flex
    flex-direction: column
    align-items: center
    color: #7A7A7A
    .iconfont
      width: 2rem 
      height: 2rem
      margin-top: 1rem
      margin-bottom: .5rem
      font-size: .8rem
      color: #9D9D9D
      line-height: 2rem
      text-align: center
      display: block
      border: .01rem solid #9D9D9D
      border-radius: 1rem
    .warn-text
      margin-bottom: .2rem
    .login-btn
      padding: .3rem .2rem
      background-color: #ff5756
      border-radius: .5rem
      color: #FFE9EE
</style>

