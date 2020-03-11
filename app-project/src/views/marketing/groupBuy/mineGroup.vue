<template>
  <div class="mineGroup-wrapper">
    <van-nav-bar title="我的拼团" left-arrow @click-left="handleBack"/>
    
    <div class="mineGroupList" ref="mineGroupList">
      <div>

        <div 
          class="mineGroupItem"
          @click="handleToShareGroup(item)" 
          v-for="item of mineGroupList" 
          v-if="mineGroupList.length > 0"
        >
          <div class="top">
            <van-image class="top-img" width="25vw" :src="item.cover_img"/>
            <div class="top-right">
              <div class="top-order">
                <span style="color: #FF5756; margin-right: 2vw">订单号:</span>
                <span>{{item.order_number}}</span>
              </div>
              <div class="top-name">{{item.goods_name}}</div>
              <div class="top-desc">{{getDesc(item)}}</div>
            </div>
          </div>

          <div class="bottom">
            <div class="startTime">
              <span style="color: #999; margin-right: 2vw">下单时间:</span>
              <span>{{item.order_add_time}}</span>
            </div>

            <div class="shareBtn">
              <span>分享拼团</span>
            </div>
          </div>
        </div>

        <div class="warn-wrapper" v-show="showWarn">
          <span class="iconfont">&#xe605;</span>
          <span class="warn-text">您没有拼团的商品</span>
        </div>

      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import { getShareSpellGroup } from '../../../utils/axios/request'
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  name: "MineGroup",
  data(){
    return {
      mineGroupList: [],
      showWarn: false
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    initMineGroupScroll(){
      let el = this.$refs.mineGroupList
      this.mineGroupScroll = new Bscroll(el,{
        bounce: {
          top: false
        },
        // pullUpLoad: {
        //   threshold: 10,
        //   stop: 0
        // },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.groupScroll.on('beforeScrollStart',()=>{
        this.groupScroll.refresh()
      })

      // this.groupScroll.on('pullingUp',()=>{
      //   this.getGroupListData()
      // })
    },  
    getMineGroupData(){
      let postData = {
        user_id: this.userData.id
      }

      getShareSpellGroup(postData)
        .then((res)=>{
          console.log('getShareSpellGroup',res.data)
          if(res.data.code == 1){
            this.mineGroupList = res.data.data
            if(!this.mineGroupList.length){
              this.showWarn = true
            }
          }else{
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        })
        .catch((err)=>{
          console.log('getShareSpellGroup err',err)
        })
    },
    getDesc(data){
      if(data){
        let attr1 = ''
        let attr2 = ''
        let attr3 = ''

        if(data.attr1_name){
          attr1 = data.attr1_name + ':' + data.attr1_value + ' '
        }
        if(data.attr2_name){
          attr2 = data.attr2_name + ':' + data.attr2_value + ' '
        }
        if(data.attr3_name){
          attr3 = data.attr3_name + ':' + data.attr3_value + ' '
        }

        return attr1 + attr2 + attr3
      }
    },
    handleToShareGroup(item){
      // console.log(item.group)
      this.$router.push({
        path: '/groupOrderDesc',
        query: {
          team_id: item.group
        }
      })
    }
  },
  created(){
    this.getMineGroupData()
  }
}
</script>

<style lang="stylus" scoped>
  .mineGroup-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .mineGroup-wrapper >>> .van-nav-bar__title
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
    color: #000
  
  .mineGroup-wrapper 
    width: 100%
    height: 100%
    color: #000
    .mineGroupList
      position: absolute 
      top: 46px
      bottom: 0
      left: 0
      right: 0
      background-color: #f6f7fb

      .mineGroupItem
        width: 94%
        margin: 3vw auto 
        background-color: #fff
        border-radius: 4vw
        font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
        font-weight: bold
        .top
          display: flex
          flex-direction: row
          align-items: center
          .top-img
            margin: 3vw
          .top-right
            max-width: 70%
            padding-right: 2vw
            box-sizing: border-box
            .top-order
              margin-bottom: 2vw
              font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
              font-weight: bold
              font-size: 3.8vw
            .top-name
              font-size: 3.6vw
              line-height: 5vw
              color: #222
              margin-bottom: 1vw
            .top-desc
              color: #999
              font-size: 3.3vw

        .bottom
          width: 100%
          display: flex
          flex-direction: row
          justify-content: space-between
          align-items: center
          padding: 1vw 3vw 3vw 3vw
          box-sizing: border-box
          // .startTime 
          .shareBtn
            background-color: #FF5756
            color: #fff
            padding: 2vw 4vw
            border-radius: 4vw
      
      .warn-wrapper
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        padding: 10vw 0
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
        .iconfont
          font-size: 8vw
          color: #bbb
        .warn-text
          margin-top: 5vw
          font-size: 5vw
          color: #bbb
</style>