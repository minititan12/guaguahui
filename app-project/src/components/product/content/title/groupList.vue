<template>
  <div class="groupList-wrapper" v-if="showGroupList">
    <div class="list-top">
      <span>{{list.length}}人在拼单,可直接参与</span>
      <div class="more" @click="handleShowMore">
        <span>更多</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="list-content">
      <div class="list-item" v-for="item of list">
        <div class="item-left">
          <van-image round width="12vw" height="12vw" :src="item.head_img"/>
          <span class="left-text">{{item.nickname}}</span>
        </div>
        <div class="item-right">
          <div>还差<span class="right-red">{{item.all_group_num - item.com_group_num}}人</span>拼成</div>
          <span class="right-icon" @click="handleToGroup(item.id)">去拼单</span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getAllSpellGroups } from '../../../../utils/axios/request'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "GroupList",
  data(){
    return {
      list: []
    }
  },
  computed: {
    ...mapState(['userData']),
    showGroupList(){
      if(this.list.length > 0 && !this.$route.query.team_id){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['updatedGroupBuyID','openPopup','updateAllSpellGroups','changeGroupDialogState']),
    //获取可拼单列表
    getList(data){
      let result = []
      let d = JSON.parse(JSON.stringify(data))

      for(let item of d){
        if(item.user_id != this.userData.id){
          result.push(item)
        }
      }

      this.updateAllSpellGroups(result)
      this.list = result.slice(0,2)
    },
    getGroupListData(){
      let merchant_id = this.$route.query.shop_id
      let activity_spell_group_id = this.$route.query.group_id
      let goods_id = this.$route.query.id
      let postData = {
        merchant_id: merchant_id,
        activity_spell_group_id: activity_spell_group_id,
        goods_id: goods_id
      }
      getAllSpellGroups(postData)
        .then((res)=>{
          console.log('getAllSpellGroups:',res.data)
          if(res.data.code == 1){
            this.getList(res.data.data)
          }
        })
        .catch((err)=>{
          console.log('getAllSpellGroups err',err)
        })
    },
    //点击打开更多拼单dialog
    handleShowMore(){
      setTimeout(()=>{
        this.changeGroupDialogState({
          value: true,
          type: 'more'
        })
      },300)
    },
    //点击打开拼单dialog
    handleToGroup(id){
      this.updatedGroupBuyID(id)
      setTimeout(()=>{
        this.changeGroupDialogState({
          value: true,
          type: 'group'
        })
      },300)
    }
  },
  created(){
    this.getGroupListData()
  }
}
</script>

<style lang="stylus" scoped>
  .groupList-wrapper
    width: 94%
    margin: 2vw auto
    background-color: #fff
    border-radius: 3vw
    padding: 3vw
    box-sizing: border-box
    .list-top
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      color: #999
      padding-bottom: 2vw
      font-size: 3.6vw
      .more
        display: flex
        flex-direction: row
        align-items: center

    .list-content
      width: 100%
      .list-item
        border-top: 1px solid #ccc
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        padding: 1vw 0
        .item-left
          display: flex
          flex-direction: row
          align-items: center
          .left-text
            max-width: 25vw
            font-size: 3.5vw
            font-family: PFH
            margin-left: 2vw
            overflow: hidden
            text-overflow: ellipsis
        .item-right
          display: flex
          flex-direction: row
          align-items: center
          font-family: PFM
          font-size: 3.5vw
          .right-icon
            min-width: 12vw
            text-align: center
            background-color: #FF4D51
            padding: 2vw 3vw
            border-radius: 4vw
            color: #fff
            margin-left: 3vw
          .right-red
            color: #FF4D51
</style>