<template>
  <div class="commentItem-wrapper">
    <div class="commentItem-photos">
      <van-image
        width="2.2rem"
        height="2.2rem"
        fit="contain"
        class="commentItem-photo"
        :src="item"
        v-for="item of data.photo"
        @click="handleToShowImgs(data.photo)"
      />
    </div>

    <div class="commentItem-title">
      <van-image
        width=".6rem"
        height=".6rem"
        fit="contain"
        round
        :src= "data.head_img"
      />
      <span class="title">{{data.nickname}}</span>
      <span class="time">{{data.add_time}}</span>
    </div>
    
    <div class="commentItem-rate">
      <van-rate v-model="value" disabled/>
    </div>

    <div class="commentItem-text">
      <span>{{data.content}}</span>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  name: "CommentItem",
  props: {
    data: Object
  },
  computed:{
    value(){
      return parseFloat(this.data.value)
    }
  },
  methods:{
    handleToShowImgs(photoList){
      ImagePreview(photoList)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .commentItem-wrapper
    width: 95vw
    margin: 0 auto
    margin-top: .2rem
    background-color: #fff
    padding: .2rem
    box-sizing: border-box
    .commentItem-photos
      overflow: hidden
      .commentItem-photo
        -webkit-touch-callout: none
        margin-right: .2rem
        margin-bottom: .2rem
        float: left
    .commentItem-title
      margin: .1rem 0
      display: flex
      flex-direction: row
      align-items: center
      .title 
        margin: 0 .2rem
        font-size: .3rem
        font-weight: bold
      .time
        font-size: .25rem
    .commentItem-rate
      margin: .15rem 0
    .commentItem-text
      letter-spacing: .05rem
      line-height: .35rem
</style>