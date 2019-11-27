<template>
  <div class="limitShopping-wrapper">
    <div class="wrapper">
      <div class="limit-title">
        <span class="title-big">限时秒杀</span>
        <span class="title-small">限时好货 手慢无</span>
      </div>
      <div class="top">

        <div class="top-wrapper" ref="top">
          <div class="top-content" ref="topContent">
            <div class="top-item" v-if="timeList.length > 0" v-for="(item,index) of timeList" :class="topItem == index ? 'active' : 'unActive'" @click="handleLimitClick(index)">
              <span class="top-time">{{item.times}}:00</span>
              <span class="top-title">{{getStatus(item.status)}}</span>
            </div>
            <!-- <div class="top-item" :class="topItem == -1 ? 'active' : 'unActive'" @click="handleLimitClick(-1)">
              <span class="top-more">查看更多</span>
            </div> -->
          </div>
        </div>

      </div>
      <div class="bottom">

        <div class="bottom-wrapper" ref="bottom">
          <div class="bottom-content" ref="bottomContent">
            <div class="bottom-item" v-for="item of list" v-if="list.length > 0 && Object.keys(item).length > 0"
              @click="handleBottomItemClick(item.goods_id)">
              <div class="bottom-img-wrapper">
                <img class="bottom-img" v-lazy="item.cover_img"/>
              </div>
              <div class="bottom-text">
                <span class="price">{{item.price}}</span>
                <span class="cancel">{{item.second_price}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import { mapState } from 'vuex';
export default {
  name: 'LimitShopping',
  data(){
    return {
      topItem: 0,
      timeList: [],
      goodsList: []
    }
  },
  computed:{
    ...mapState(['refresh']),
    list(){
      // if(this.topItem == -1){
      //   return []
      // }
      if(this.goodsList.length){
        let time = this.timeList[this.topItem].times
        let result = []
        for(let item of this.goodsList){
          if(item.times == time){
            result.push(item)
          }
        }
        return result
      }else{
        return []
      }
    },
    name(){
      return this.$route.name
    }
  },
  methods:{
    getStatus(num){
      if(num == 0){
        return '抢购中'
      }else if(num == 1){
        return '已结束'
      }else{
        return '即将开始'
      }
    },
    handleLimitClick(index){
      this.topItem = index
    },
    initTopItem(){
      for(let i = 0; i < this.timeList.length; i++){
        if(this.timeList[i].status == 0){
          this.topItem = i
        }
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
    //初始化上端宽度
    initTopWidth(){
      let num = 0
      if(this.timeList.length > 0){
        num = this.timeList.length
      }
      if(num > 0){
        let width = num + 1 + (num * 0.5)
        this.$refs.topContent.style.width = width + "rem"
      }else{
        this.$refs.topContent.style.width = '96vw'
      }
    },
    //初始化下端宽度
    initBottomWidth(){
      let num = 0
      if(this.goodsList.length > 0){
        num = this.list.length
      }
      if(num > 0){
        let width = num * 24
        this.$refs.bottomContent.style.width = width + "vw"
      }else{
        this.$refs.bottomContent.style.width = "96vw"
      }
    },
    //初始化时间数据
    initTimeData(){
      axios.get('/api/method/spike')
        .then((res)=>{
          console.log('spike',res.data)
          if(res.data.code == 1){
            this.timeList = this.getTimeList(res.data.data)
            // console.log(this.timeList)
            this.goodsList = res.data.data
            this.initTopItem()
            this.$nextTick(()=>{
              this.initTopWidth()
              this.initBottomWidth()
            })
          }
        })
        .catch((err)=>{
          console.log('get spike err:'+ err)
        })
    },
    initTopScroll(){
      this.$nextTick(()=>{
        if(!this.topScroll){
          this.topScroll = new BScroll(this.$refs.top,{
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          })
        }else{
          this.topScroll.refresh()
        }
      })
    },
    initBottomScroll(){
      this.$nextTick(()=>{
        if(!this.bottomScroll){
          this.bottomScroll = new BScroll(this.$refs.bottom,{
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          })
        }else{
          this.bottomScroll.refresh()
        }
      })
    },
    handleBottomItemClick(id){
      this.$router.push('/product?id='+ id)
    }
  },
  watch: {
    refresh(){
      if(this.refresh){
        this.initTimeData()
        this.initTopWidth()
        this.initBottomWidth()
        this.topScroll.refresh()
        this.bottomScroll.refresh()
      }
    },
    topItem(){
      this.initBottomWidth()
      this.bottomScroll.refresh()
    },
    name(){
      if(this.name == 'home'){
        this.initTopWidth()
        this.initBottomWidth()
        this.topScroll.refresh()
        this.bottomScroll.refresh()
      }
    }
  },
  mounted(){
    this.initTimeData()
    this.initTopScroll()
    this.initBottomScroll()
  },
  activated(){
    if(this.topScroll){
      this.initTopWidth()
      this.topScroll.refresh()
    }
    if(this.bottomScroll){
      this.initBottomWidth()
      this.bottomScroll.refresh()
    }
  },
  updated(){
    this.$nextTick(()=>{
      this.initBottomWidth()
      this.topScroll.refresh()
      this.bottomScroll.refresh()
    })
  }
}
</script>

<style lang='stylus' scoped>
  .limitShopping-wrapper
    width: 100vw
    padding-bottom: 3vw
    .wrapper
      width: 93vw
      min-height: 50vw
      background-color: #fff
      margin: 0 auto
      border-radius: .1rem
      overflow: hidden
      .limit-title
        width: 100%
        height: .8rem
        border-bottom: .01rem solid #ddd
        display: flex
        align-items: center
        .title-big
          font-family: monospace
          font-size: .3rem
          font-weight: 700
          margin-left: .2rem
        .title-small
          font-size: .2rem
          margin-left: .2rem
          color: #999
      .top
        .top-wrapper
          width: 100%
          .top-content
            display: flex
            flex-direction: row
            justify-content: space-around
            .top-item
              width: 1rem
              display: flex
              flex-direction: column
              justify-content: center
              text-align: center
              padding: .1rem 0
              border-bottom: 1.5px solid #fff
              box-sizing: border-box
              .top-title
                margin-top: .05rem 
                font-size: .17rem
                color: #999
              .top-time
                font-family: hgzt
                font-size: .3rem
                line-height: .3rem
                font-weight: bold
                vertical-align: middle
              // .top-more
              //   font-size: .23rem
              //   line-height: .3rem
              //   font-weight: bold
              //   vertical-align: middle
            .active
              border-bottom: 1.5px solid red
            .unActive
              border-bottom: 1.5px solid #fff
      .bottom
        width: 100%
        .bottom-wrapper
          width: 100%
          .bottom-content
            display: flex
            flex-direction: row
            .bottom-item
              width: 23.75vw
              padding-top: .1rem
              display: flex
              flex-direction: column
              align-items: center
              .bottom-img-wrapper
                width: 22.5vw
                height: 22.5vw
                display: flex
                align-items: center
                .bottom-img
                  width: 100%
                  -webkit-touch-callout: none
              .bottom-text
                display: flex
                flex-direction: column
                justify-content: center
                align-items: center
                .price
                  color: #FD4140
                  font-family: hgzt
                  font-size: .32rem
                  font-weight: bold
                  margin-top: .1rem
                .cancel
                  font-size: .24rem
                  font-family: hgzt
                  margin-top: .05rem
                  margin-bottom: .1rem
                  text-decoration: line-through
                  color: #777
      .limitMore
        width: 100vw
        img 
          width: 100%
</style>


