<template>
  <div class="header-wrapper" v-if="showHeader">
    <span class="iconfont left-icon" @click="handleToHome">&#xe708;</span>
    <input @focus="handleInputFocus" v-model="searchText" type="text" class="header-input"/>
    <span class="iconfont right-icon">&#xe60e;</span>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: "HomeHeader",
  data(){
    return {
      searchText: ""
    }
  },
  computed:{
    ...mapState(['showSearch','currentTab','currentTab']),
    showHeader(){
      if(this.currentTab == 1 || this.currentTab == 2){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    searchText(){
      let beforeValue = this.searchText
      setTimeout(()=>{
        if(beforeValue == this.searchText){
          this.changeSearchText(this.searchText)
        }
      },400)
      if(this.searchText.length > 0){
        if(!this.showSearch){
          this.changeShowSearch(true)
        }
      }else{
        if(this.showSearch){
          this.changeShowSearch(false)
        }
      }
    }
  },
  methods: {
    ...mapMutations(['changeShowSearch','changeSearchText','changeTab','updatedToTop']),
    handleToHome(){
      this.searchText = ""
      this.changeShowSearch(false)
      this.changeTab(1)
      if(this.currentTab == 1){
        this.updatedToTop(true)
      }
    },
    handleInputFocus(){
      console.log('focus')
      this.changeSearchText(this.searchText)
      if(this.searchText){
        this.changeShowSearch(true)
      }
    }
  },
  mounted(){
    this.searchText = ''
  }
};
</script>

<style lang='stylus' scoped>
  .header-wrapper
    position: fixed
    top: 0
    z-index: 3
    width: 100%
    height: .8rem
    // background: linear-gradient(to right, #F13939, #F76132);
    background-color: #FD4140
    display: flex
    justify-content: space-between
    align-items: center
    .left-icon
      color: #fff
      font-size: .45rem
      margin-left: .3rem
    .header-input 
      line-height: .4rem
      color: #000
      caret-color: red
      padding: .05rem .2rem
      width: 70%
      // border: .02rem solid red
      border-radius: .5rem
      box-sizing: border-box
      -webkit-appearance : none
      -moz-appearance: none 
      box-sizing: border-box
    .right-icon
      color: #fff
      font-size: .45rem
      margin-right: .3rem
</style>


