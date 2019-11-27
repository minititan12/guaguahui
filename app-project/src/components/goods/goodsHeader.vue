<template>
  <div class="goods-header">
    <div class="header-wrapper">
      <div class="header-left" @click="handlBack">
        <van-icon class="icon"  slot="" name="arrow-left" />
      </div>
      <div class="header-right">
        <van-search 
          placeholder="请输入搜索关键词" 
          v-model="value" 
          @search="handleSearch"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "GoodsHeader",
  data(){
    return {
      value: ''
    }
  },
  computed:{
    title(){
      return this.$route.query.brand_name
    }
  },
  methods: {
    ...mapMutations(['changeTab','updateCurrentGoodsInputValue']),
    handlBack(){
      this.value = ''
      this.$router.go(-1)
    },
    handleSearch(){
      this.updateCurrentGoodsInputValue(this.value)
    }
  },
  watch:{
    value(){
      if(this.value.length == 0){
        this.updateCurrentGoodsInputValue('')
      }
    },
    '$route'(to,from){
      // console.log(to,from)
      if(from.name == 'goods' && to.name == 'home'){
        this.value = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .goods-header
    width: 100vw
    background-color: #fff
    position: fixed
    top: 0
    left: 0
    // overflow: hidden
    .header-wrapper
      width: 100vw
      display: flex
      flex-direction: row
      align-items: center
      .header-left
        width: 10vw
        text-align: center
        .icon
          font-size: 5vw
      .header-right
        width: 90vw

  .goods-header >>> .van-icon
    color: #FF5756
    font-size: 4vw
  
  .goods-header >>> .van-field__control
    font-size: 4vw
    &::placeholder
      font-size: 4vw
</style>