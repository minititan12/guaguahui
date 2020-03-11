<template>
  <div class="comment-item">
    <div class="comment-top">
      <span>商品评价{{count}}</span>
      <span>{{sales}}</span>
      <span>{{favorableRate}}</span>
    </div>

    <div class="comment-middle" v-if="showComment">
      <div class="middle-top">
        <div class="top-left">
          <van-image
            width=".5rem"
            height=".5rem"
            fit="contain"
            :src="commentImg"
          />
          <span class="comment-name">{{commentName}}</span>
        </div>
        <van-rate v-model="value" disabled/>
      </div>

      <div class="middle-text">
        <span>{{commentText}}</span>
      </div>

      <div class="middle-bottom">
        <span class="bottom-text">{{time}}</span>
      </div>
    </div>

    <div class="warn" v-if="!showComment">
      <span>暂无评价</span>
    </div>

    <div class="comment-bottom" v-if="showComment">
      <van-button round plain color="red" @click="handleToAllComment">查看全部评论</van-button>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "ProductComment",
  data(){
    return {
      showComment: true,
      count: 0,
      value: 0,
      commentText: '',
      time: '',
      commentImg: '',
      commentName: '',
    }
  },
  computed:{
    ...mapState(['currentProductData']),
    sales(){
      if(this.currentProductData){
        let clinch_count = this.currentProductData.clinch_count ? this.currentProductData.clinch_count : '0'
        let value = '销量' + clinch_count + '件'
        return value
      }else{
        return 0
      }
    },
    favorableRate(){
      if(this.currentProductData){
        let favorablerate = this.currentProductData.favorablerate ? this.currentProductData.favorablerate : '100'
        let value = '好评率' + favorablerate + '%'
        return value
      }else{
        return 0
      }
    }
  },
  methods:{
    getData(){
      if(this.currentProductData&&this.currentProductData.hasOwnProperty('comment')){
        if(this.currentProductData.comment.count > 0){
          let comment = this.currentProductData.comment
          this.count = comment.count
          this.value = parseFloat(comment.pf)
          this.commentText = comment.nr
          this.time = comment.sj
          this.commentImg = comment.tx
          this.commentName = comment.nc
        }else{
          this.showComment = false
        }
      }else{
        this.showComment = false
      }
    },
    handleToAllComment(){
      let goods_id = this.currentProductData.id
      this.$router.push({
        path: "allComment",
        query: {
          goods_id: goods_id
        }
      })
    }
  },
  mounted(){
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
  .comment-item
    width: 94%
    margin: 0 auto 
    background-color: #fff
    padding: 3vw
    box-sizing: border-box
    border-radius: 3vw
    .comment-top
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
      display: flex
      flex-direction: row
      justify-content: space-between
    .comment-middle
      display: flex
      flex-direction: column
      margin-top: .3rem
      .middle-top
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        .top-left
          display: flex
          flex-direction: row
          align-items: center
          .comment-name
            margin-left: .2rem
            font-weight: bold
      .middle-text
        margin: .2rem 0
        font-size: .32rem
      .middle-bottom
        margin-bottom: .2rem
        .bottom-text
          font-size: .25rem
    .warn
      color: #aaa
      margin-top: 3vw
      padding-top: 3vw
      font-size: 4vw
      font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
      border-top: .01vw solid #eee
    .comment-bottom
      display: flex
      flex-direction: row
      justify-content: center
</style>