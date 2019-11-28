<template>
  <div class="more-items">
    <div class="title">
      <span>正在拼单</span>
    </div>

    <div class="more-item" v-for="item of allSpellGroups">
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

      <span class="item-icon" @click="handleToGroup(item.id)">去拼单</span>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "MoreGroup",
  computed: {
    ...mapState(['allSpellGroups','groupBuyID']),
  },
  methods: {
    ...mapMutations(['changeGroupDialogState','updatedGroupBuyID']),
    //获取名字
    getName(name){
      if(name.length > 6){
        let result = name.substring(0,6)
        return result + '...'
      }else{
        return name
      }
    },

    //去拼单
    handleToGroup(id){
      this.changeGroupDialogState({
        value: false
      })
      this.updatedGroupBuyID(id)
      setTimeout(()=>{
        this.changeGroupDialogState({
          value: true,
          type: 'group'
        })
      },200)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .more-items
    width: 100%
    height: 40vw
    overflow: scroll
    .title
      width: 100%
      text-align: center
      padding: 3vw 0
      font-size: 4vw
      font-family: PFH

    .more-item
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
</style>