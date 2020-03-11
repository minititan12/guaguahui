<template>
  <div v-if="bargainData.bargin_friend_list" class="wrapper">
      <div class="title">帮你砍价的好友</div>
      <div v-if="bargainData.bargin_friend_list.length > 0" class="list">
        <div class="fridens" v-for="(item,index) in bargainData.bargin_friend_list" :key="index">
          <van-image 
            width="10vw" 
            height="10vw" 
            fit="cover"
            :src="item.head_img"
          />
          <div class="content">
            <div class="name">{{item.nickname}}</div>
            <div class="time">{{item.create_at}}</div>
          </div>
          <div class="bargain-price">砍了{{item.bargin_price}}元</div>
        </div>
      </div>
      <div v-else class="empty">
          <div>
            <van-image 
              width="10vw" 
              height="10vw" 
              fit="contain"
              src="/public/static/bargin/bargin_icon.png"
            />
            <div>暂无砍价好友,加油哦</div>
          </div>
      </div>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['bargainData'])
  },  
}
</script>
<style lang="stylus" scoped>
  .wrapper
    width 92vw
    margin 2vw auto
    padding 5vw 2vw
    background #f7e9e6
    border-radius 3vw
    .title
      font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
      font-weight bold
      border-left 1vw solid #000
      padding-left 2vw
      font-size 3.6vw
      line-height 5vw
    .list
      min-height 60vw
      .fridens
        display flex
        justify-content flex-start
        align-items center
        padding 2vw
        .van-image
          border-radius 50%
          overflow hidden
          margin-right 2vw
        .content
          flex 1
          width 0
          .name
            font-size 4vw
            font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
            font-weight bold
            line-height 5vw
          .time
            font-size 3vw
            line-height 5vw
            color #999
        .bargain-price
          font-family 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
          font-weight bold
          font-size 4vw
    .empty
      height 60vw
      display flex
      justify-content center
      align-items center
      color #b48980
      font-family 'PingFangSC-Regular','Microsoft YaHei',sans-serif
      font-size 4vw
      text-align center
      .van-image
        margin-bottom 5vw
</style>