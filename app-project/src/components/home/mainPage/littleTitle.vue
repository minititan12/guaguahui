<template>
  <div class="littleTitle-wrapper">
    <div class="littleTitle-left">
      <span>推荐</span>
    </div>
    <div class="littleTitle-right" ref="right">
      <div class="right-content" ref="rightContent">
        <span @click="clickToBrand(item.id,item.brand_name)" v-for="item of recommendList">
          {{item.brand_name}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { recommend } from '../../../utils/axios/request'
import { mapMutations, mapState } from 'vuex'
export default {
  name:"LittleTitle",
  data(){
    return{
      recommendList: []
    }
  },
  computed:{
    ...mapState(['currentTab'])
  },
  methods: {
    //获取推荐数据
    getRecommendData(){
      recommend()
        .then((res)=>{
          console.log('recommend data:',res.data)
          if(res.data.code == 1){
            this.recommendList = res.data.data
          }
        })
        .catch((err)=>{
          console.log('get recommend err' + err)
        })
    },
    //更新右边滚动条宽度
    initRightWidth(){
      let num = 0
      if(this.recommendList.length > 0){
        num = this.recommendList.length
      }
      if(num > 0){
        let width = num * 16
        this.$refs.rightContent.style.width = width + "vw"
      }else{
        this.$refs.rightContent.style.width = '82vw'
      }
    },
    //初始化右边滚动条
    initRightScroll(){
      this.$nextTick(()=>{
        this.rightScroll = new BScroll(this.$refs.right,{
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical"
        })

        let that = this

        that.rightScroll.on('beforeScrollStart',function(){
          that.initRightWidth()
          that.rightScroll.refresh()
        })
      })
    },
    //点击跳转品牌(goods)页面
    clickToBrand(id,name){
      setTimeout(()=>{
        this.$router.push({
          path: '/goods',
          query: {
            goodsID: id,
            brand_name: name
          }
        })
      },300)
    }
  },
  created(){
    this.getRecommendData()
  },
  mounted(){
    this.initRightScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .littleTitle-wrapper
    width: 100vw
    height: 5vw
    padding: 1vw 0
    // background: linear-gradient(to right, #F13939, #F76132)
    // background-color: #FD4140
    display: flex
    flex-direction: row
    align-items: center
    font-size: 3.8vw
    font-family: PFM
    .littleTitle-left
      width: 10vw
      height: 100%
      margin-left: 4vw
      color: #000
      line-height: 5vw
      span 
        font-family: PFB
        color: #FF5754
        // border-bottom: 2px solid #FF5754
    .littleTitle-right
      width: 82vw
      height: 100%
      overflow: hidden
      .right-content
        height: 100%
        display: flex
        flex-direction: row
        align-items: center
        // min-width: 70vw
        span 
          color: #000
          white-space: nowrap
          line-height: 5vw
          margin-left: 2vw
          margin-right: 2vw
</style>