<template>
  <div class="mine-header">
    <div class="top">
      <span @click="handleToSet" class="mine-set iconfont">&#xe8b7;</span>
      <span @click="handleToCar" class="mine-shopCar iconfont">&#xe631;</span>
    </div>

    <div class="middle">
      <div class="middle-left">
        <span class="nickname">{{'Hi~,&nbsp;&nbsp;'+userData.nickname}}</span>
        <span class="phone">{{userData.phone}}</span>
      </div>
      <div class="middle-right">
        <van-image
          class="header-img"
          width="16vw"
          height="16vw"
          round
          fit="contain"
          :src="userData.head_img"
          style="-webkit-touch-callout: none"
        />
        <div class="edit" @click="handleToEditImg">
          <span>编辑</span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="bottom-item" @click="handleToCollect">
        <span>收藏</span>
        <span class="num">{{collectCount}}</span>
      </div>

      <div class="bottom-item" @click="handleToHistory">
        <span>足迹</span>
        <span class="num">{{footCount}}</span>
      </div>

      <div class="bottom-item" @click="handleToCoupon">
        <span>优惠劵</span>
        <span class="num">{{coupouCount}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { getUserCouponsTotal,getUserCollects } from '../../../../utils/axios/request'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "MineHeader",
  data(){
    return {
    }
  },
  computed: {
    ...mapState(['userData','allCount']),

    collectCount(){
      if(this.allCount && this.allCount.hasOwnProperty('collectcount')){
        return this.allCount.collectcount
      }else{
        return 0
      }
    },

    footCount(){
      if(this.allCount && this.allCount.hasOwnProperty('footcount')){
        return this.allCount.footcount
      }else{
        return 0
      }
    },

    coupouCount(){
      if(this.allCount && this.allCount.hasOwnProperty('coupoucount')){
        return this.allCount.coupoucount
      }else{
        return 0
      }
    },
  },
  methods:{
    ...mapMutations(['changeTab']),
    //跳转设置页面
    handleToSet(){
      this.$router.push('/set')
    },
    //跳转购物车
    handleToCar(){
      this.changeTab(4)
    },
    //跳转收藏页面
    handleToCollect(){
      this.$router.push({
        path: '/collect'
      })
    },
    //跳转足迹页面
    handleToHistory(){
      this.$router.push({
        path: '/history'
      })
    },
    //跳转优惠券页面
    handleToCoupon(){
      this.$router.push({
        path: '/coupon'
      })
    },
    //跳转编辑头像页面
    handleToEditImg(){
      this.$router.push({
        path: '/setPage',
        query:{
          type: 1
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
  .mine-header
    width: 92vw
    min-height: 30vw
    margin: 0 auto
    .top
      width: 100%
      height: 10vw
      padding-top: 1vw
      display: flex
      justify-content: flex-end
      align-items: center
      .mine-set
        color: #fff
        font-size: 6vw
        margin-right: 2vw
      .mine-shopCar
        color: #fff
        font-size: 5.5vw
        margin-right: 1vw
    .middle
      width: 100%
      display: flex
      justify-content: space-between
      align-items: center
      padding-top: 2vw
      .middle-left
        color: #fff
        display: flex
        flex-direction: column
        .nickname
          font-size: 5vw
          font-family: PFB
        .phone
          font-size: 3vw
          font-family: PFM
          margin-top: 2vw
      .middle-right
        position: relative
        .edit
          position: absolute 
          bottom: 1vw 
          right: -1vw
          width: 10vw
          height: 5vw
          background-color: #FCCE3D
          border-radius: 2vw
          line-height: 5vw
          text-align: center
          font-family: PFB
    .bottom
      width: 100%
      height: 15vw
      display: flex
      flex-direction: row
      justify-content: space-around
      align-items: center
      color: #fff
      .bottom-item
        display: flex
        align-items: center
        .num
          font-size: 5vw
          margin-left: 2vw
          font-family: hgzt

    // .header-desc
    //   display: flex
    //   flex-direction: column
    //   justify-content: center
    //   align-items: center
    //   .mine-netName
    //     font-size: 5vw
    //     color: #fff
    //     margin-top: 2vw
    // .mine-set
    //   position: absolute 
    //   right: .4rem
    //   top: .4rem
    //   font-size: .5rem
    //   color: #fff
</style>


