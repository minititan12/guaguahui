<template>
  <div class="setPageContent-wrapper">
    <van-sticky>
      <van-nav-bar :title="title" left-arrow @click-left="handleBackClick"/>
    </van-sticky>
    <ChangeName v-if="title == '修改会员名'"></ChangeName>
    <ChangeImg v-if="title == '修改头像'"></ChangeImg>
    <PrivatePolicy v-if="title == '隐私政策'"></PrivatePolicy>
    <GuaGuaHui v-if="title == '关于呱呱汇'"></GuaGuaHui>
    <ShopEnter v-if="title == '商户入驻'"></ShopEnter>
  </div>
</template>

<script>
import ChangeName from './changeName'
import ChangeImg from './changeImg'
import PrivatePolicy from './privatePolicy'
import GuaGuaHui from './guaguahui'
import ShopEnter from './shopEnter'
export default {
  name:'SetPageContent',
  components:{
    ChangeName,
    ChangeImg,
    PrivatePolicy,
    GuaGuaHui,
    ShopEnter
  },
  computed:{
    title(){
      let type = this.$route.query.type
      if(type == 0){
        return '修改会员名'
      }else if(type == 1){
        return '修改头像'
      }else if(type == 2){
        return '隐私政策'
      }else if(type == 3){
        return '关于呱呱汇'
      }else if(type == 4){
        return '商户入驻'
      }
    } 
  },
  methods:{
    handleBackClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .setPageContent-wrapper >>> .van-nav-bar__arrow
    color: #FF5756
    font-size: 5vw
  
  .setPageContent-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH
  
  .setPageContent-wrapper
    width: 100%
    height: 100%
</style>