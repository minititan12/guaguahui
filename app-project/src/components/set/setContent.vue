<template>
  <div class="setContent-wrapper">
    <van-nav-bar title="设置" left-arrow @click-left="handleBackClick"/>

    <div class="headImg">
      <van-image
        round
        class="img"
        width="15vw"
        height="15vw"
        :src="img"
      />
      <div class="img-btn" @click="handleToSetPage(1)">
        <span>点击修改头像</span>
      </div>
    </div>

    <div class="informationDesc">
      <div class="title">
        信息详情
      </div>
      <van-cell icon="contact" title="修改昵称" :value="name" is-link @click="handleToSetPage(0)"/>

      <van-cell icon="edit" title="手机号" :value="phone" is-link/>

      <van-cell icon="label-o" title="隐私政策" is-link @click="handleToSetPage(2)"/>

      <van-cell icon="home-o" title="关于呱呱汇" is-link @click="handleToSetPage(3)"/>
    </div>
  </div>
</template>

<script>
export default {
  name:"SetContent",
  computed:{
    name(){
      if(localStorage.userData){
        let userData = JSON.parse(localStorage.userData)
        return userData.nickname
      }
    },
    phone(){
      if(localStorage.userData){
        let userData = JSON.parse(localStorage.userData)
        return userData.phone
      }
    },
    img(){
      if(localStorage.userData){
        let userData = JSON.parse(localStorage.userData)
        return userData.head_img
      }
    }
  },
  methods:{
    handleBackClick(){
      this.$router.go(-1)
    },
    handleToSetPage(type){
      this.$router.push({
        path: '/setPage',
        query:{
          type: type
        }
      })
    }
  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
  .setContent-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
  .setContent-wrapper >>> .van-nav-bar__arrow
    color: #ff5756
    font-size: 5vw
  .setContent-wrapper >>> .van-cell__value
    text-align: left
    color: #ff5756
    font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
    font-weight: bold
    font-size: 3.5vw
  .setContent-wrapper >>> .van-cell__title
    color: #999
    font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
  .setContent-wrapper >>> .van-cell__left-icon
    color: #000
    font-size: 5vw

  .setContent-wrapper
    width: 100%
    height: 100%
    background-color: #F6F7FB
    .headImg
      width: 100%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .img
        margin: 3vw 0
      .img-btn
        padding: 2vw
        margin-bottom: 3vw
        color: #fff
        font-size: 3.5vw
        background-color: #FF5756
        border-radius: 4vw
    .informationDesc
      background-color: #fff
      width: 92vw
      margin: 0 auto
      border-radius: 3vw
      .title
        padding: 3vw 4vw
        font-size: 4vw
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
</style>