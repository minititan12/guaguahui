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
              <span class="price-cancel">{{originPrice}}</span>
            </div>
            <div class="num">
              <span>限购{{limitNum}}件</span>
            </div>
          </div>

          <div class="bottom-right">
            <span class="text">距结束还剩</span>

            <van-count-down :time="time">
              <template v-slot="timeData">
                <span class="item">{{ getTwoNumber(timeData.hours) }}</span>
                <span class="item-middle">:</span>
                <span class="item">{{ getTwoNumber(timeData.minutes) }}</span>
                <span class="item-middle">:</span>
                <span class="item">{{ getTwoNumber(timeData.seconds) }}</span>
              </template>
            </van-count-down>
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
import { getSeckillGoodsDes } from '../../../utils/axios/request'
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
      time: 30000
    }
  },

  computed:{
    ...mapState(['currentProductData','seckillData']),
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
    ...mapMutations(['updatedSeckillData']),
    //是不是在app中
    is_app(){
      if(typeof(plus) == 'object'){
        return true
      }
      
      return false
    },
    //获取倒计时
    getTime(){
      if(this.seckillData){
        let t = new Date()
        let hour = t.getHours()
        console.log(hour)
        if(hour == this.seckillData.times){
          console.log('1')
          let minutes = 60 - t.getMinutes()
          this.time = minutes*60*1000
        }else{
          console.log('2')
          this.time = 0
        }
      }
    },
    //获取秒杀数据
    getSeckillData(){
      let postData = {
        goods_id: this.$route.query.id,
        seckill_id: this.$route.query.seckill_id
      }

      getSeckillGoodsDes(postData)
        .then((res)=>{
          console.log('getSeckillGoodsDes',res.data)
          if(res.data.code == 1){
            // this.seckillData = res.data.data
            this.updatedSeckillData(res.data.data)
            this.getTime()
          }
        })
        .catch((err)=>{
          console.log('getSeckillGoodsDes err',err)
        })
    },
    //获取两位数的时间表示
    getTwoNumber(num){
      if(num < 10){
        return '0' + num
      }else{ 
        return num
      }
    },
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
        min-height: 6vw
        max-height: 12vw
        margin: 0 3vw 2vw 3vw
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
        font-size: 4.5vw
        line-height: 6vw
        letter-spacing: .2vw
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden
      
      .warn
        padding: 0 4vw
        box-sizing: border-box
        font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
        margin-bottom: 3vw
        color: #999

      .top-bottom
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        padding: 0 4vw
        box-sizing: border-box
        .bottom-left
          .price
            color: #FF4D51
            .price-icon
              font-size: 4.5vw
              font-family: hgzt
            .price-text
              font-size: 6vw
              font-family: hgzt
            .price-cancel
              color: #aaa
              font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
              margin-left: 3vw
          .num
            margin-top: 2vw
            font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
        .bottom-right
          .text
            display: inline-block
            margin-bottom: 1vw
            font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
          .van-count-down
            .item
              display: inline-block
              width: 6vw
              height: 6vw
              line-height: 6vw
              background-color: #ff5756
              text-align: center
              color: #fff
              border-radius: 1vw
            .item-middle
              margin: 0 1vw
              font-size: 5vw
              color: #ff5756
</style>


