<template>
  <div class="header-wrapper">
    <van-nav-bar title="订单" left-arrow @click-left="handleBackClick"/>
    <van-tabs v-model="active" title-active-color="#FF5756">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "OrderPageHeader",
  data(){
    return{
      active: 0
    }
  },
  computed:{
    ...mapState(['orderActive'])
  },
  methods: {
    ...mapMutations(['updateOrderActive']),
    handleBackClick(){
      console.log(this.$router)
      this.$router.push({
        path: '/',
        name: 'home'
      })
    },
    correctActive(){
      if(this.active !== this.orderActive){
        this.active = this.orderActive
      }
    }
  },
  watch: {
    active(){
      this.updateOrderActive(this.active)
    }
  },
  activated(){
    this.correctActive()
  }
}
</script>

<style lang="stylus" scoped>
  .header-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .header-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold

  .header-wrapper >>> .van-tabs__line
    background-color: #FF5756 

  .header-wrapper >>> .van-tab
    font-size: 3.5vw
    color: #000
    font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
    font-weight: bold

  // .header-wrapper
  //   position: absolute 
  //   top: 0
  //   left: 0
  //   width: 100%
</style>