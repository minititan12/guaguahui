<template>
  <div>
    <div class="header">
      <van-nav-bar :title="title" left-arrow @click-left="handleBackClick"/>
    </div>
    <mescroll-vue :down="down" :up="up" @init="init">
      <ChangeName v-if="title == '修改会员名'"></ChangeName>
      <ChangeImg v-if="title == '修改头像'"></ChangeImg>
      <PrivatePolicy v-if="title == '隐私政策'"></PrivatePolicy>
      <GuaGuaHui v-if="title == '关于呱呱汇'"></GuaGuaHui>
      <ShopEnter v-if="title == '商户入驻'"></ShopEnter>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import ChangeName from './changeName'
import ChangeImg from './changeImg'
import PrivatePolicy from './privatePolicy'
import GuaGuaHui from './guaguahui'
import ShopEnter from './shopEnter'
export default {
  name:'SetPageContent',
  components:{
    MescrollVue,
    ChangeName,
    ChangeImg,
    PrivatePolicy,
    GuaGuaHui,
    ShopEnter
  },
  data(){
    return {
      down: {
        use: false,
      },
      up:{
        isBounce: false,
      }
    }
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
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },
    handleBackClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  >>> .van-nav-bar__arrow
        color: #FF5756
        font-size: 5vw
  
  >>> .van-nav-bar__title
        color: #000
        font-size: 4vw
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold

  >>> .header
        position: fixed 
        top: 0
        left: 0
        width: 100%
  
  >>> .mescroll
        position: fixed
        top: 46px
        left: 0
        height: calc(100% - 46px)
        background-color: #F6F7FB
  >>> .mescroll-upwarp
        padding: 0
</style>