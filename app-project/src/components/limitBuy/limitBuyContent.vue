<template>
  <div class="limitBuy-content" >
    <van-sticky>
      <van-tabs v-model="active" v-if="timeList.length > 0">
        <van-tab v-for="timeItem of timeList">
          <div slot="title">
            <span>{{timeItem.times + ":00"}}</span>
            <span class="miniTitle">{{getStatus(timeItem.status)}}</span>
          </div>
        </van-tab>
      </van-tabs>
    </van-sticky>

    <div class="product-items" v-if="limitBuyData.length > 0">
      <ProductItem class="product-item" v-for="item of currentData" @productItemClick="productItemClick(item.goods_id)" :showCancel="true" :data="item"></ProductItem>
    </div>

    <div class="warn-wrapper" v-if="showWarn">
      <span class="iconfont">&#xe605;</span>
      <span class="warn-text">抱歉,没有处于抢购中的商品</span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import axios from 'axios'
import ProductItem from '../miniComponents/productItem'
export default {
  name: "LimitBuyContent",
  components: {
    ProductItem
  },
  data(){
    return {
      active: 0,
      timeList: [],
      limitBuyData: [],
      showWarn: false
    }
  },
  computed:{
    currentData(){
      if(this.limitBuyData.length){
        let time = this.timeList[this.active].times
        let result = []
        for(let item of this.limitBuyData){
          if(item.times == time){
            result.push(item)
          }
        }
        return result
      }else{
        return []
      }
    }
  },
  methods: {
    getStatus(code){
      if(code == 0){
        return '活动中'
      }else if(code == 1){
        return '已结束'
      }else{
        return '即将开始'
      }
    },
    getTimeList(data){
      let list = JSON.parse(JSON.stringify(data))
      let times = []
      let result = []

      //循环获取单一的时间数组
      for(let i = 0; i < list.length; i++){
        if(i){
          let match =  times.indexOf(list[i].times) >= 0 ? true : false
          if(!match){
            times.push(list[i].times)
            result.push({
              times: list[i].times,
              status: list[i].status
            })
          }
        }else{
          times.push(list[i].times)
          result.push({
            times: list[i].times,
            status: list[i].status
          })
        }
      }

      console.log(result)
      return result
    },
    initLimitBuyData(){
      axios.get('api/method/morespike')
        .then((res)=>{
          console.log(res.data)
          if(res.data.code == 1){
            this.timeList = this.getTimeList(res.data.data)
            this.limitBuyData = res.data.data
          }
        })
        .catch((err)=>{
          console.log('get limitBuyData err' + err)
        })
    },
    productItemClick(id){
      this.$router.push('/product?id='+ id)
    }
  },
  mounted(){
    this.initLimitBuyData()
  },
  watch:{
    limitBuyData(){
      if(this.limitBuyData.length){
        return false
      }else{
        return true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .limitBuy-content >>> .van-tab--active
    color: #E31436
  .limitBuy-content >>> .miniTitle
    display: block
    position: absolute 
    bottom: 30%
    width: 90%
    font-size: .15rem
  .limitBuy-content
    background-color: #eee
    min-height: calc(100vh - 46px)
    .product-items
      width: 100%
      padding: .2rem
      box-sizing: border-box
      display: flex
      flex-direction: row
      flex-wrap: wrap
      justify-content: space-between
    .warn-wrapper
      width: 100%
      display: flex
      flex-direction: column
      align-items: center
      padding-top: 1rem
      .iconfont
        color: #666
        font-size: .8rem
        margin-bottom: .3rem
      .warn-text
        font-size: .35rem
</style>