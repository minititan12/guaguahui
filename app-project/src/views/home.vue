<template>
  <div>
    <HomeTop></HomeTop>
    <!-- <Homeheader></Homeheader> -->
    <MainContent v-show="showContent"></MainContent>
    <ClassifyContent v-show="showClassifyContent"></ClassifyContent>
    <ShoppingContent v-if="showShoppingContent"></ShoppingContent>
    <MessageContent v-if="showMessageContent"></MessageContent>
    <MineContent v-if="showMine"></MineContent>
    <SearchGoods></SearchGoods>
    <PrivatePolicy v-if="showPolicy"></PrivatePolicy>
    <HomeFooter></HomeFooter>
  </div>
</template>

<script>
import Homeheader from '../components/home/homeHeader'
import HomeFooter from '../components/home/homeFooter'
import HomeTop from '../components/home/homeTop'
import SearchGoods from '../components/home/searchGoods'
// import MainContent from '../components/home/mainPage/mainContent'
// import ClassifyContent from '../components/home/classify/classifyContent'
// import MessageContent from '../components/home/message/messageContent'
// import ShoppingContent from '../components/home/shopping/shoppingContent'
import MineContent from '../components/home/mine/mineContent'
// import PrivatePolicy from '../components/home/privatePolicy'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "Home",
  components: {
    Homeheader,
    HomeFooter,
    HomeTop,
    'PrivatePolicy': () => import('../components/home/privatePolicy'),
    'MainContent': () => import('../components/home/mainPage/mainContent'),
    'ClassifyContent': () => import('../components/home/classify/classifyContent'),
    'MessageContent': () => import('../components/home/message/messageContent'),
    'ShoppingContent': () => import('../components/home/shopping/shoppingContent'),
    MineContent,
    SearchGoods
  },
  computed:{
    ...mapState(['currentTab','openid','showPolicy']),
    showContent(){
      if(this.currentTab === 1){
        return true
      }else{
        return false
      }
    },
    showClassifyContent(){
      if(this.currentTab === 2){
        return true
      }else{
        return false
      }
    },
    showMessageContent(){
      if(this.currentTab === 3){
        return true
      }else{
        return false
      }
    },
    showShoppingContent(){
      if(this.currentTab === 4){
        return true
      }else{
        return false
      }
    },
    showMine(){
      if(this.currentTab == 5){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['updateUserData','changeLoginStatus','changeShowPolicy']),
    handleCheckOpenid(){
      if(/MicroMessenger/.test(window.navigator.userAgent)){
        if(!this.openid){
          this.$dialog.alert({
            title: '授权',
            message: '是否授权呱呱汇访问微信用户信息',
            showCancelButton: true   
          })
            .then(()=>{
              window.location.href='/index/index/index2'
            })
            .catch(()=>{
              wx.closeWindow()
            })
        }
      }
    },
    //显示隐私政策提醒
    handleShowPolicy(){
      this.changeShowPolicy(true)
      localStorage.setItem('loaded',true)
    },
    
    //是不是在app中
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      
      return false;
    },
  },
  created(){
    this.handleCheckOpenid()
    if(this.is_app()){
      if(typeof(localStorage.loaded) == 'undefined'){
        this.handleShowPolicy()
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>


