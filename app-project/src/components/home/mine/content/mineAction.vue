<template>
  <div class="action-wrapper">
    <div class="title">
      <span>常用功能</span>
    </div>

    <div class="actions">
      <van-cell @click="handleToAddress" title="地址管理" icon="location-o" is-link /> 
      <van-cell @click="handleToShopEnter" title="商户入驻" icon="shop-o" is-link />
      <van-cell @click="handleToMineContect" title="联系我们" icon="service-o" is-link />
      <van-cell @click="handleToComplaint" title="我的投诉/举报" icon="warn-o" is-link />
      <van-cell @click="handleLogOut" title="退出登录" icon="share" />     
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "MineAction",
  methods: {
    ...mapMutations(['changeLoginStatus','updateUserData']),
    //点击跳转地址页面
    handleToAddress(){
      this.$router.push('/addressList')
    },
    //跳转商户入驻页面
    handleToShopEnter(){
      this.$router.push({
        path:"/setPage",
        query:{
          type: 4
        }
      })
    },
    //联系我们
    handleToMineContect(){
      this.$router.push({
        path:"/setPage",
        query:{
          type: 3
        }
      })
    },
    //投诉/举报
    handleToComplaint(){
      this.$router.push({
        path:"/complaint"
      })
    },
    //处理登出
    handleLogOut(){
      this.$router.push('/login')
      localStorage.removeItem('userData')
      localStorage.removeItem('gghToken')
      this.updateUserData({})
      this.changeLoginStatus(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .action-wrapper >>> .van-cell
    padding: 3vw 0 

  .action-wrapper >>> .van-icon
    font-size: 5vw
    margin-right: 2vw
  
  .action-wrapper >>> .van-cell__title
    font-size: 4vw
    color: #999

  .action-wrapper
    width: 92vw
    margin: 3vw auto 10vw auto 
    padding: 3vw
    box-sizing: border-box
    min-height: 50vw
    background-color: #fff
    border-radius: 3vw
    .title
      font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
      font-weight: bold
      font-size: 4.5vw
      line-height: 7vw
</style>