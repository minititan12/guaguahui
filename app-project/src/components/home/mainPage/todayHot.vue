<template>
  <div class="todayHot-wrapper">
    <div class="todayHot-content">
      <div class="todayHot-title">
        <van-image
          width="5vw"
          class="hot-icon"
          fit="contain"
          src="/public/uploads/home/hot.png"
          style="-webkit-touch-callout: none"
        />
        <span class="title-big">今日热销榜</span>
        <span class="title-small">热销品牌</span>
      </div>
      <div class="todayHotItems" v-if="todayHotList">
        <div 
          class="todayHotItem" 
          v-for="item of todayHotList" 
          @click="handleImgClick(item.linkurl)"
        >
          <van-image
            width="29vw"
            fit="contain"
            :src="item.photo"
            style="-webkit-touch-callout: none"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"TodayHot",
  props:{
    todayHotList: Array
  },
  methods:{
    //处理图片点击跳转
    handleImgClick(linkurl){
      this.$router.push(linkurl)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .todayHot-wrapper
    width: 100vw
    .todayHot-content
      width: 93vw
      min-height: 40vw
      margin: 0 auto
      .todayHot-title
        width: 100%
        height: 10vw
        display: flex
        align-items: center
        .hot-icon
          margin: 0 1vw
        .title-big
          font-family: PFH
          font-size: 5vw
        .title-small
          font-size: 3vw
          font-family: PFM
          margin-left: .2rem
          color: #999
      .todayHotItems
        width: 100%
        display: flex 
        flex-direction: row
        justify-content: space-between
</style>