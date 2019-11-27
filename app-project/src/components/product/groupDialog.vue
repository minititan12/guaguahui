<template>
  <div class="groupDialog-wrapper" v-if="showGroupDialog.value">

    <div class="masking" @click="handleClose">
    </div>

    <div class="content">
      <div class="content-items" v-if="showGroupDialog.type == 'more'">
        <div class="title">
          <span>正在拼单</span>
        </div>
        <div class="content-item" v-for="item of allSpellGroups">
          <van-image 
            round 
            width="10vw" 
            height="10vw" 
            :src="item.head_img" 
          />

          <div class="item-middle">
            <span class="item-name">{{getName(item.nickname)}}</span>
            <span class="item-num">还差{{item.all_group_num - item.com_group_num}}人</span>
          </div>

          <span class="item-icon">去拼单</span>
        </div>
      </div>

      <div class="content-group" v-if="showGroupDialog.type == 'group'">
        <div class="group-title">
          <span>参与</span>
          <span class="nickname">{{currentGroupData.nickname}}</span>
          <span>的拼单</span>
        </div>

        <div class="group-desc">
          <span class="group-num">仅剩</span>
          <span style="color: #FF4D51; font-size: 4vw">{{currentGroupData.all_group_num - currentGroupData.com_group_num}}</span>
          <span>个名额</span>
          <van-count-down :time="getTime(currentGroupData.group_end_time)" />
          <span>结束</span>
        </div>

        <div class="group-img">
          <van-image  width="12vw" height="12vw" round :src="currentGroupData.head_img"></van-image>
          <div class="img-icon">
            <span>拼主</span>
          </div>
        </div>

        <div class="group-btn">
          <span>参与拼单</span>
        </div>
      </div>

      <div class="close" @click="handleClose">
        <van-icon name="cross" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "GroupDialog",
  data(){
    return {
    }
  },
  computed: {
    ...mapState(['showGroupDialog','allSpellGroups','groupBuyID']),
    currentGroupData(){
      if(this.allSpellGroups && this.groupBuyID > -1){
        for(let item of this.allSpellGroups){
          if(item.id == this.groupBuyID){
            return item
          }
        }

        return {}
      }else{
        return {}
      }
    }
  },
  methods: {
    ...mapMutations(['changeGroupDialogState']),
    getName(name){
      if(name.length > 6){
        let result = name.substring(0,6)
        return result + '...'
      }else{
        return name
      }
    },
    getTime(time){
      let t = new Date(time).getTime()
      let now = new Date().getTime()

      return t-now
    },
    handleClose(){
      this.changeGroupDialogState({
        value: false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

  .groupDialog-wrapper >>> .van-count-down
    color: #FF4D51
    margin: 0 2vw

  .groupDialog-wrapper
    position: absolute 
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 99
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    .masking
      width: 100%
      height: 100%
      position: absolute 
      top: 0
      background-color: rgba(0,0,0,.3)

    .content
      width: 80%
      background-color: #fff
      border-radius: 3vw
      position: relative
      .content-items
        width: 100%
        height: 40vw
        overflow: scroll
        .title
          width: 100%
          text-align: center
          padding: 3vw 0
          font-size: 4vw
          font-family: PFH

        .content-item
          display: flex
          flex-direction: row
          padding: 2vw 3vw
          align-items: center
          justify-content: space-between
          border-top: 1px solid #eee
          font-size: 3.5vw
          .item-middle
            max-width: 40vw
            display: flex
            flex-direction: row
            .item-name
              font-family: PFH
              margin-right: 2vw

          .item-icon
            min-width: 12vw
            background-color: #FF4D51
            padding: 2vw 3vw
            border-radius: 3vw
            text-align: center
            color: #fff

      .content-group
        width: 100%
        height: 100%
        font-family: PFH
        display: flex
        flex-direction: column
        align-items: center
        padding: 3vw
        box-sizing: border-box
        letter-spacing: .1vw
        font-size: 3.5vw
        .group-title
          padding: 3vw
          font-size: 4vw
          .nickname
            color: #FF4D51
        .group-desc
          display: flex
          flex-direction: row
          align-items: center
          // .group-num
          //   margin-right: 2vw
        .group-img
          margin: 2vw 0
          position: relative
          .img-icon
            position: absolute
            top: -2vw
            right: -5vw
            background-color: #F99F25
            color: #fff
            padding: 1vw 2vw
            border-radius: 3vw
        .group-btn
          width: 70%
          padding: 3vw 0 
          background-color: #FF4D51
          text-align: center
          color: #fff
          border-radius: 5vw

      .close
        width: 8vw
        height: 8vw
        position: absolute
        top: -4vw
        right: -4vw 
        background-color: #E3DEE4
        border-radius: 4vw
        display: flex
        justify-content: center
        align-items: center
        font-size: 5vw
        color: #727071
</style>