<template>
  <div class="intergral-details-wrapper">
    <van-nav-bar
      title="积分明细"
      left-arrow
      @click-left="handleBack"
    />
    <div class="details">
      <div class="title">
        <div class="month">本月</div>
        <div>
          <span>获取 <span class="income">300 </span></span>
          <span>使用 <span>300</span></span>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div>
            <div class="type">登录账号</div>
            <div class="time">2019-11-23  10:20:30</div>
          </div>
          <div class="data">+5</div>
        </div>
        <div class="item">
          <div>
            <div class="type">登录账号</div>
            <div class="time">2019-11-23  10:20:30</div>
          </div>
          <div class="data">+5</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntergralDetails",
  methods: {
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .intergral-details-wrapper
    background #f5f7fa
    .van-nav-bar
      .van-icon
        color #FF5756
        font-size 5vw
      .van-nav-bar__title
        color #000
        font-size 4vw
        font-family PFH
    .title
      display flex
      justify-content space-between
      align-items center
      padding 0 4vw
      height 10vw
      line-height 10vw
      font-size 3vw
      font-family PFH
      .income
        color #ff5756
    .list
      background white  
      margin 0 3vw
      border-radius 3vw
      padding 0 2vw
      .item
        display flex
        justify-content space-between
        align-items center
        height 17vw
        border-bottom 1px solid #eee
        font-size 4vw
        .type
          font-family PFH
          line-height 6vw
        .time
          color #7c7c7c
          font-size 3vw
        .data
          color #ff5756
          font-family PFH
</style>