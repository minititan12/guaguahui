<template>
  <div class="title-wrapper">
    <van-skeleton
      title
      :row="15"
      :loading="loading"
    >

      <div class="top">
        <!-- 标题 -->
        <div class="title">
          {{title}}
        </div>

        <!-- 产品价格 -->
        <div class="price">
          <span class="price-icon">积分:</span>
          <span class="price-text">{{price}}</span>
        </div>
      </div>

      <ProProps />
      <DescContent />
      <ProDesc />
    
    </van-skeleton>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ProProps from './title/proProps'
import DescContent from './title/descContent'
import ProDesc from './title/proDesc'
export default {
  name: "ProTitle",
  components: {
    ProProps,
    DescContent,
    ProDesc
  },

  data(){
    return {
      loading: true
    }
  },

  computed:{
    ...mapState(['currentCreditGoodDetail']),
    //产品价格
    price(){
      if(this.currentCreditGoodDetail){
        let price = this.currentCreditGoodDetail.base.price
        return parseInt(price)
      }
    },

    //产品的标题
    title(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.base.goods_name
      }
    }
  },

  methods:{
    //是不是在app中
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      
      return false;
    },
  },

  watch: {
    currentCreditGoodDetail(){
      if(this.currentCreditGoodDetail){
        this.loading = false
      }
    }
  },

  mounted(){
    if(this.currentCreditGoodDetail){
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>

  .title-wrapper
    width: 100%
    color: #000
    margin-top: 2vw
    position: relative
    z-index: 1
    .top
      width: 94%
      padding: 2vw 0
      background-color: #fff
      margin: 0 auto
      border-radius: 3vw
      .title
        height: 8vw
        line-height: 8vw
        margin: 0 4vw
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
        font-size: 4.5vw
        letter-spacing: .2vw
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
      .price
        color: #FF4D51
        margin: 0 4vw 1vw 4vw
        .price-icon
          font-size: 3.5vw
          font-family: hgzt
          margin-right: 2vw
        .price-text
          font-size: 5vw
          font-family: hgzt
</style>


