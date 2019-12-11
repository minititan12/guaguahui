<template>
  <div class="footer-wrapper" ref="footerWrapper">

    <div class="footer-item" :class="this.currentTab == 1 ? 'activeItem' : 'unactiveItem'" @click="handleTabClick(1)">
      <div class="icon">
        <span class="iconfont">&#xe708;</span>
      </div>
      <span class="title">首页</span>
    </div>

    <div class="footer-item" :class="this.currentTab == 2 ? 'activeItem' : 'unactiveItem'" @click="handleTabClick(2)">
      <div class="icon">
        <span class="iconfont">&#xe65e;</span>
      </div>
      <span class="title">分类</span>
    </div>

    <div class="footer-item" :class="this.currentTab == 3 ? 'activeItem' : 'unactiveItem'" @click="handleTabClick(3)">
      <div class="icon">
        <span class="iconfont">&#xe72c;</span>
      </div>
      <span class="title">消息</span>
      <span v-if="unreadNum > 0" class="num">{{unreadNum}}</span>
    </div>

    <div class="footer-item" :class="this.currentTab == 4 ? 'activeItem' : 'unactiveItem'" @click="handleTabClick(4)">
      <div class="icon">
        <span class="iconfont">&#xe631;</span>
      </div>
      <span class="title">购物车</span>
    </div>

    <div class="footer-item" :class="this.currentTab == 5 ? 'activeItem' : 'unactiveItem'" @click="handleTabClick(5)">
      <div class="icon">
        <span class="iconfont">&#xe62e;</span>
      </div>
      <span class="title">我的</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {getMsgRedtotal} from '@/utils/axios/request'
export default {
  name: 'HomeFooter',
  computed: {
    ...mapState(['currentTab','login','messageNum','unread']),
    unreadNum(){
      let num = this.messageNum;
      if(this.unread){
        if(this.unread[0]){
          num += this.unread[0].un_total;
        }
        if(this.unread[1]){
          num += this.unread[1].un_total
        }
      }
      if(num > 99){
        return '99+'
      }
      return num;
    },
  },
  created(){
    getMsgRedtotal().then(res=>{
      this.updateUnread(res.data.data);
    }).catch(res=>{});
  },
  methods: {
    ...mapMutations(['changeTab','updatedToTop','changeShowSearch','updateUnread']),
    handleTabClick(index){
      if(this.currentTab == index){
        this.changeShowSearch(false)
      }

      if(this.currentTab == 1 && index == 1){
        this.updatedToTop(true)
      }else{
        this.changeTab(index)
      }
      if(index == 4 && !this.login){
        this.$router.push('/login')
        this.changeTab(1)
      }      
      if(index == 5 && !this.login){
        this.$router.push('/login')
        this.changeTab(1)
      }
    }
  },
  watch: {
    currentTab(){
      if(this.currentTab != 1 && this.currentTab != 2){
        this.changeShowSearch(false)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .footer-wrapper
    width: 100%
    height: 12vw
    position: fixed 
    z-index: 999
    bottom: 0
    background-color: #fff
    display: flex
    flex-direction: row
    justify-content: space-around
    box-sizing: border-box
    .activeItem
      color: #ff5756
      .icon
        background-color: #fff
        position: absolute 
        top: -4vw
        width: 12vw
        height: 12vw
        border-radius: 12vw
        display: flex
        justify-content: center
        align-items: center
        .iconfont
          color: #fff
          background-color: #ff5756
          width: 8vw
          height: 8vw
          line-height: 8vw
          border-radius: 4vw
          text-align: center
      .title
        position: absolute 
        bottom: 1.8vw
    .unactiveItem
      color: #666
      .iconfont
        color: #666
    .footer-item
      width: 18vw
      height: 100%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      position: relative
      .icon
        margin-bottom: 1vw
        .iconfont
          font-size: 5vw
      .title
        font-size: 3vw
        font-family: PFB
      .num
        position: absolute 
        top: .08rem
        right: .1rem
        display: block
        font-size: .3rem
        width: .35rem
        height: .35rem
        background-color: red
        line-height: .35rem
        text-align: center
        border-radius: .16rem
        color: #fff
</style>


