<template>
  <div class="homeTop-wrapper">
    <div class="home-title">
      <div class="icon-left">
        <span class="iconfont">&#xe626;</span>
      </div>
      <input 
        class="searchInput iconfont" 
        type="search" 
        v-model="searchText"
        :placeholder="icon" 
        @focus="handleFocus" 
        @blur="handleBlur"
        @keydown="handleSearch($event)"
      >
      <span class="iconfont icon-right">&#xe64d;</span>
    </div>
    <LittleTitle></LittleTitle>
  </div>
</template>

<script>
import LittleTitle from './mainPage/littleTitle'
import { mapMutations, mapState } from 'vuex'
export default {
  name: "HomeTop",
  components: {
    LittleTitle
  },
  data(){
    return {
      icon:'\ue60e搜索商品',
      searchText: ''
    }
  },
  computed:{
    ...mapState(['currentTab'])
  },
  methods: {
    ...mapMutations(['changeSearchText','changeShowSearch','']),
    handleFocus(){
      console.log('focus')
      this.icon = ''
    },
    handleBlur(){
      this.icon = '\ue60e搜索商品'
    },
    handleSearch(e){
      if(e.keyCode == 13){
        this.changeSearchText(this.searchText)
        if(this.searchText){
          this.changeShowSearch(true)
        }
      }
    }
  },
  watch:{
    searchText(){
      if(this.searchText.length == 0){
        this.changeShowSearch(false)
      }
    },
    currentTab(){
      if(this.currentTab != 1 && this.currentTab != 2){
        this.searchText = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .homeTop-wrapper
    width: 100%
    background-color: #fff
    background-image: url('/public/uploads/bglogo.jpg')
    background-size: 100vw auto
    padding-top: 1vw
    .home-title
      width: 100%
      height: 10vw
      line-height: 10vw
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      .icon-left
        width: 8vw
        height: 8vw
        margin-left: 4vw
        background-color: rgba(237,28,36,0.8)
        border-radius: 4vw
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        .iconfont
          color: #fff
          font-size: 5vw
      .searchInput
        width: 72%
        height: 8vw
        background-color: rgba(245,245,245,0.8)
        text-align: center
        border-radius: 4vw
        font-size: 4vw
        &::placeholder
          color: #A8A8A8
          text-align: center
          font-size: 4vw
        &::-webkit-search-cancel-button
          -webkit-appearance: none;
      .icon-right
        line-height: 10vw
        margin-right: 4vw
        font-size: 6vw
        color: #000
</style>