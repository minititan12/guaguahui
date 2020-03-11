<template>
  <div class="wrapper">
    <div class="activity-item" v-for="chunk of activityList" :key="chunk.id">
      <img class="activity-img" @click="clickToClass(chunk.id)" v-lazy="chunk.activityImg"/>

      <div class="activity-content">
        <div class="content-item" @click="clickToBrand(item.id,item.brand_name)" v-for="item of chunk.contentList" :key="item.id">
          <van-image
            width="100%"
            lazy-load
            :src="item.thumb"
            style="-webkit-touch-callout: none"
          />
          <span class="content-title">{{item.brand_name}}</span>
        </div>
      </div>

      <div class="show-more" @click="handleToActivity">
        <span>活动详情</span>
        <span class="iconfont">&#xe619;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'MainActivity',
  props: {
    activityList: Array
  },
  methods: {
    ...mapMutations(['changeTab']),
    //点击跳转到分类
    clickToClass(id){
      this.changeTab(2)
    },
    //点击跳转到品牌(goods)页面
    clickToBrand(id,name){
      this.$router.push({
        path:"/goods",
        query:{
          goodsID: id,
          brand_name: name
        }
      })
    },
    handleToActivity(){
      console.log('handleToActivity')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    width: 100vw
    min-height: 50vw
    .activity-item
      width: 100%
      height: 75vw
      position: relative
      .activity-img
        display: block
        width: 93vw
        margin: 0 auto
        border-radius: 4vw
        -webkit-touch-callout: none
      .show-more
        position: absolute 
        top: 4vw
        right: 6vw
        color: #fff
        font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
        font-size: 3.5vw
        .iconfont
          margin-left: 1vw
          font-size: 4vw
          vertical-align: middle
      .activity-content
        position: absolute
        top: 30vw
        left: 4vw
        width: 92vw
        display: flex
        flex-direction: row
        justify-content: space-around
        // height: 35vw
        // border-radius: .2rem
        // box-shadow: 0 0 3px #aaa
        // overflow: hidden
        .content-item
          width: 24vw
          background-color: #fff
          padding: 3vw 2vw
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          border-radius: 3vw
          .content-title
            font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
            font-size: 3.5vw
            margin-top: 4vw
</style>


