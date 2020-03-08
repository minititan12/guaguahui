<template>
  <div class="allComment-wrapper">
    <van-nav-bar title="全部评价" left-arrow @click-left="handleBackClick"/>

    <mescroll-vue :down="down" :up="up" @init="init">
      <div class="comment-list">
        <CommentItem :data="item" v-for="item of commentList"/>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import CommentItem from '../../components/miniComponents/commentItem'
import { showCommentList } from '../../utils/axios/request'
export default {
  name:"AllComment",
  components: {
    CommentItem,
    MescrollVue
  },
  data(){
    return {
      commentList: [],
      scrollTop: 0,
      down: {
        use: false
      },
      up:{
        isBounce: false,
        htmlNodata: '<div class="pullUpLoading"><div class="no-more"><img class="loading-img" src="/public/uploads/home/load.png" alt=""><span>没有更多了</span></div></div>',
        htmlLoading: '<div class="pullUpLoading"><p class="loading"></p><img class="loading-img" src="/public/uploads/home/load.png" alt=""><span>加载中...</span></div>',
        auto:true,
        callback:this.handlePullingUp,
        onScroll:(mescroll, y, isUp)=>{
          this.scrollTop = y;
        }
      },
    }
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },
    handleBackClick(){
      this.$router.go(-1)
    },
    //获取消息数据
    getCommentData(page){
      let postData = {
        goods_id: this.$route.query.goods_id,
        page: page
      }
      showCommentList(postData)
        .then((res)=>{
          console.log('showCommentList',res.data)
          let data = res.data
          if(page == 1){
            setTimeout(()=>{
              this.mescroll.endSuccess(data.data.length,data.data.length>=10)
            },1000);
          }else{
            this.mescroll.endSuccess(data.data.length,data.data.length>=10)
          }

          if(data.code == 1){
            if(page == 1){
              this.commentList = [...data.data]
            }else{
              this.commentList = [...this.commentList,...data.data]
            }
          }else{
            this.$toast({
              message: data.message,
              type: 'fail',
              duration: 1500
            })
          }
        })
        .catch((err)=>{
          this.mescroll.endErr();
          console.log('showCommentList err',err)
        })
    },
    // 处理上拉加载
    handlePullingUp(page){
      if(this.mescroll){
        console.log('pullingup')
        this.getCommentData(page.num)
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .allComment-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw 
  .allComment-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .allComment-wrapper
    width: 100vw

  
  >>> .mescroll
        position: absolute
        top: 50px
        left: 0
        background-color: #eee
        height: calc(100% - 50px)

  >>> .pullUpLoading
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        color #FF5756
        height 15vw
        .loading
          display inline-block
          width 4.2vw
          height 4.2vw
          margin-right 2vw
          border-radius 50%
          border 1px solid #FF5756
          border-bottom-color transparent
          vertical-align middle
          animation mescrollRotate .8s linear infinite
        .loading-img
          width: 6vw
          height: 5vw
          margin-right: 2vw
        .no-more
          line-height: 15vw
          font-size: 4vw
</style>