<template>
  <div class="left-wrapper" ref="leftClassify">
    <div>
      <div class="classifyList" ref="classifyList">
        <div class="left-item" 
        :class="currentClassifySort == item.sort ? 'activeItem' : 'unActiveItem'" @click="handleClassifyClick(item.sort)" 
        v-for="item of classifyList" 
        :key="item.id"
        >
          <span>{{item.class_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState,mapMutations } from 'vuex'
export default {
  name: "LeftList",
  computed: {
    ...mapState(['classifyList','currentClassifySort'])
  },
  methods: {
    ...mapMutations(['changeCurrentClassifySort']),
    //初始化左边滚动条组件
    initLeftScroll(){
      this.$nextTick(()=>{
        let el = this.$refs.leftClassify
        
        this.leftClassifyScroll = new Bscroll(el,{
          click: true,
          tap: true,
          eventPassthrough: 'horizontal',
          bounce:{
            top: false
          }
        })

        let that = this
        this.leftClassifyScroll.on('beforeScrollStart',function(){
          that.leftClassifyScroll.refresh()
        })
      })
    },
    //处理大类点击
    handleClassifyClick(sort){
      this.changeCurrentClassifySort(sort)
    }
  },
  mounted(){
    this.initLeftScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .left-wrapper
    position: absolute 
    right: 75%
    top: 0
    bottom: 0
    left: 0
    overflow: hidden
    box-sizing: border-box
    color: #000
    background-image: url('/public/uploads/bglogo.jpg')
    background-size: 100vw auto
    background-position: 0 -11vw
    background-repeat: no-repeat
    .classifyList
      padding: 2vw 0
      .left-item
        width: 90%
        height: 8vw
        line-height: 8vw
        margin: 5vw 0
        border-top-right-radius: 5vw
        border-bottom-right-radius: 5vw
        text-align: center
        font-family: PFM
        letter-spacing: .2vw
        font-size: 3.8vw
      .activeItem
        background-color: #ff5756
        color: #eee
      .unActiveItem
        color: #000
</style>


