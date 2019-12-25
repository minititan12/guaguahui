<template>
  <div class="item-wrapper" @click="handleToProduct(itemData.id)">
    <van-image width="100%" height="40vw" :src="itemData.goods_cover" />
    <div class="title">
      <span class="text">{{itemData.goods_name}}</span>
    </div>
    <div class="item-bottom">
      <div class="bottom-left">
        <span class="score">{{parseInt(itemData.price)}}积分</span>
        <span class="num">已兑{{itemData.sale_num}}件</span>
      </div>

      <div class="btn">立即兑换</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntegralGoodItem',
  props: {
    itemData: Object
  },
  methods: {
    handleToProduct(id){
      this.$router.push({
        path: '/integralProduct',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .item-wrapper
    width: 43vw
    border: 1px solid #dcdcdc
    border-radius: 2vw
    box-sizing: border-box
    overflow: hidden
    margin-bottom: 2vw
    .title
      width: 100%
      padding: 2vw
      box-sizing: border-box
      .text
        width: 100%
        height: 5vw
        font-size: 4vw
        font-family: PFH
        line-height: 5vw
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 1
        -webkit-box-orient: vertical
        overflow: hidden
    .item-bottom
      padding: 0 2vw
      padding-bottom: 3vw
      box-sizing: border-box
      font-family: PFB
      font-size: 3vw
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      .bottom-left
        display: flex
        flex-direction: column
        .score
          color: #ff5756
          margin-bottom: 1vw
          font-size: 4vw
        .num
          color: #ccc
      .btn
        background-color: #ff5756
        color: #fff
        font-size: 3.6vw
        padding: 2vw
        border-radius: 4vw
</style>