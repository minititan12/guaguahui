<template>
  <div class="content-group">
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

    <div class="group-btn" @click="handleToGroup">
      <span>参与拼单</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "ConfirmGroup",
  computed: {
    ...mapState(['allSpellGroups','groupBuyID']),
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
    ...mapMutations(['openPopup','changeGroupDialogState']),
    //获取时间
    getTime(time){
      let t = new Date(time).getTime()
      let now = new Date().getTime()

      return t-now
    },
    handleToGroup(){
      this.changeGroupDialogState({
        value: false
      })
      this.openPopup()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content-group
    width: 100%
    height: 100%
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
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
</style>