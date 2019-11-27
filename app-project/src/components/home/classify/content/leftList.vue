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
    // border-right: .01rem solid #999
    color: #000
    background-image: url('/public/uploads/bglogo.jpg')
    background-size: 100vw auto
    background-position: 0 -11vw
    background-repeat: no-repeat
    .classifyList
      padding: .1rem 0
      .left-item
        width: 86%
        height: .6rem
        line-height: .6rem
        margin: .3rem 0
        border-radius: .3rem
        box-sizing: border-box
        text-align: center
        margin-left: 7%
        font-weight: bold
      .activeItem
        // background: linear-gradient(to right, #FD0305, #FD4140)
        background-color: #FD4140
        color: #eee
        border: .01rem solid #FD4140
      .unActiveItem
        color: #000
</style>


