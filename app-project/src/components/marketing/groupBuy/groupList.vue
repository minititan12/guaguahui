<template>
  <div class="groupList-wrapper">
    <div class="groupList-item" v-for="item of groupList" @click="handleToProduct(item)">
      <div class="item-left">
        <van-image 
          width="100%" 
          height="25vw" 
          fit="contain"
          :src="item.cover_img"
        />
      </div>

      <div class="item-right">
        <div class="right-top">
          <span>{{item.goods_name}}</span>
        </div>

        <div class="right-middle">
          <span class="middle-price">￥{{item.group_price}}</span>
          <span class="middle-originPrice">原价:{{item.price}}元</span>
        </div>

        <div class="right-bottom">
          <span class="bottom-left">{{item.group_num}}人团</span>
          <span class="bottom-right">去开团</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupList",
  props: {
    groupList: Array
  },
  methods: {
    handleToProduct(item){
      this.$router.push({
        path: '/product',
        query:{
          id: item.goods_id,
          groupId: item.id,
          shop_id: item.user_id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .groupList-wrapper
    width: 94%
    margin: 4vw auto 
    background-color: #fff
    border-radius: 2vw
    .groupList-item
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      padding: 2vw
      box-sizing: border-box
      .item-left
        width: 35%
        padding-right: 2vw
      .item-right
        color: #000
        font-family: PFB
        letter-spacing: .1vw
        .right-top
          font-size: 4vw
          line-height: 5vw
        .right-middle
          padding: 2vw 0
          line-height: 5vw
          .middle-price
            color: #FC4E4D
            font-size: 4vw
            margin-right: 2vw
            vertical-align: middle
          .middle-originPrice
            color: #999
            font-size: 3vw
            vertical-align: middle
        .right-bottom
          display: flex
          flex-direction: row
          justify-content: space-between
          align-items: center
          .bottom-left
            background: linear-gradient(to right,#FFD297,#FF8F05)
            color: #fff
            font-size: 3vw
            padding: 0 2vw
            line-height: 5vw
            border-radius: 1vw
          .bottom-right
            background-color: #FF3C36
            color: #fff
            font-size: 4vw
            font-family: PFM
            padding: 1vw 3vw
            line-height: 6vw
            border-radius: 4vw
</style>