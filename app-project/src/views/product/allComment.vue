<template>
  <div class="allComment-wrapper">
    <van-nav-bar title="全部评价" left-arrow @click-left="handleBackClick"/>

    <div class="comment-list" ref="commentList">
      <div>
        <div class="br"></div>
        <CommentItem :data="item" v-for="item of commentList"/>
        <div class="br"></div>
      </div>
    </div>

  </div>
</template>

<script>
import CommentItem from '../../components/miniComponents/commentItem'
import Bscroll from 'better-scroll'
import { showCommentList } from '../../utils/axios/request'
export default {
  name:"AllComment",
  data(){
    return {
      commentList: [],
      page: 1
    }
  },
  components: {
    CommentItem
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    getCommentData(){
      let postData = {
        goods_id: this.$route.query.goods_id,
        page: this.page
      }
      showCommentList(postData)
        .then((res)=>{
          console.log('showCommentList',res.data)
          if(res.data.code == 1){
            this.commentList = [...this.commentList,...res.data.data]
            this.page += 1
            this.$nextTick(()=>{
              if(this.commentScroll){
                if(!res.data.data.length){
                  this.commentScroll.off('pullingUp',this.onPullingUp)
                }
                this.commentScroll.finishPullUp()
                this.commentScroll.refresh()
              }
            })
          }
        })
        .catch((err)=>{
          console.log('showCommentList err',err)
        })
    },
    onPullingUp(){
      console.log('pullingup')
      this.getCommentData()
    },
    //初始化评论滚动条
    initCommentScroll(){
      let el = this.$refs.commentList
      this.commentScroll = new Bscroll(el,{
        pullUpLoad: {
          threshold: 100
        },
        click: true,
        eventPassthrough: 'horizontal'
      })
      this.commentScroll.on('pullingUp',this.onPullingUp)
    }
  },
  created(){
    this.getCommentData()
  },
  mounted(){
    this.initCommentScroll()
  },
  watch:{
    commentList(){
      if(this.commentScroll){
        this.commentScroll.refresh()
      }
    }
  }
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
    .comment-list
      position: absolute
      top: 50px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      background-color: #eee
      .br
        width: 100%
        height: .3rem
</style>