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

        <div class="warn">
          商品售完时未能付款视为失败
        </div>

        <div class="top-bottom">
          <div class="bottom-left">
            <!-- 产品价格 -->
            <div class="price">
              <span class="price-icon">￥</span>
              <span class="price-text">{{price}}</span>
              <span class="price-cancel">原价: {{originPrice}}</span>
            </div>
          </div>

          <div class="bottom-right">

          </div>
        </div>
        

      </div>

      <ProductProps />

      <TitleShop />

      <Serve/>

      <ProductComment/>

      <BackHome v-if="!is_app()" />
    
    </van-skeleton>
  </div>
</template>

<script>
import axios from 'axios'

import ProductProps from './title/productProps'
import TitleShop from './title/titleShop'
import Serve from './title/serve'
import ProductComment from './title/productComment'
import BackHome from './title/backHome'

import { mapMutations, mapState } from 'vuex'
export default {
  name: "SeckillProductTitle",
  components: {
    ProductProps,
    TitleShop,
    Serve,
    ProductComment,
    BackHome
  },

  data(){
    return {
      loading: true,
      seckillData: null
    }
  },

  computed:{
    ...mapState(['currentProductData']),
    //产品价格
    price(){
      if(this.seckillData){
        return this.seckillData.seckill_price
      }
    },

    //是否显示产品原价
    originPrice(){
      if(this.currentProductData){
        return this.currentProductData.price
      }
    },

    //限购数量
    limitNum(){
      if(this.seckillData){
        return this.seckillData.limits
      }
    },

    //销量
    clinch_count(){
      if(this.currentProductData){
        return this.currentProductData.clinch_count
      }
    },

    //产品的标题
    title(){
      if(this.currentProductData){
        return this.currentProductData.goods_name
      }
    }
  },

  methods:{
    ...mapMutations(['updatedGroupGoodsDes']),
    //是不是在app中
    is_app(){
      if(typeof(plus) == 'object'){
        return true
      }
      
      return false
    },
    getSeckillData(){
      let postData = {
        goods_id: this.$route.query.id,
        seckill_id: this.$route.query.seckill_id
      }

      axios.post('api/method/getSeckillGoodsDes',postData)
        .then((res)=>{
          console.log('getSeckillGoodsDes',res.data)
          if(res.data.code == 1){
            this.seckillData = res.data.data
          }
        })
        .catch((err)=>{
          console.log('getSeckillGoodsDes err',err)
        })
    }
  },

  watch: {
    currentProductData(){
      if(this.currentProductData){
        this.loading = false
      }
    }
  },

  created(){
    this.getSeckillData()
  },

  mounted(){
    if(this.currentProductData){
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
        width: 100%
        height: 12vw
        padding: 0 4vw
        margin-bottom: 2vw
        box-sizing: border-box
        font-family: PFH
        font-size: 4.5vw
        letter-spacing: .2vw
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        line-height: 6vw

      .price
        color: #FF4D51
        margin: 0 4vw 2vw 4vw
        .price-icon
          font-size: 3.5vw
          font-family: hgzt
        .price-text
          font-size: 5vw
          font-family: hgzt
        .price-cancel
          color: #aaa
          font-family: PFM
          margin-left: 4vw
</style>


