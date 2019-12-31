<template>
  <div class="desc-wrapper">
    <div class="desc-title">图文详情</div>
    <van-skeleton
      title
      :row="10"
      :loading="loading"
    >
      <div class="desc-item" v-html="descHtml"></div>
    </van-skeleton>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProDesc',
  data(){
    return {
      descList: [],
      loading: true
    }
  },
  computed:{
    ...mapState(['currentCreditGoodDetail']),
    descHtml(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.base.introduce
      }else{
        return null
      }
    }
  },
  watch:{
    currentCreditGoodDetail(){
      if(this.currentCreditGoodDetail){
        this.loading = false
      }
    }
  },
  mounted(){
    this.loading = false
  }
}
</script>

<style lang="stylus" scoped>
  .desc-wrapper
    width: 94%
    margin: 2vw auto
    border-radius: 3vw
    background-color: #fff
    overflow: hidden
    .desc-title
      margin: 2vw 3vw
      font-family: PFH
      line-height: 6vw
      font-size: 4vw
    .desc-item
        width: 100%
    .desc-item >>> img
      width: 100%
      // min-height: 100vw
</style>


