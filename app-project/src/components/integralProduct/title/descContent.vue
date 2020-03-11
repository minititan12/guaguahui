<template>
  <div class="descContent-wrapper" v-show="spuData">
    <div class="title">
      <span>产品详情</span>
    </div>

    <div class="spuDesc" v-for="(val,name) in spuData">
      <span class="desc_title">{{name + ':'}}</span>
      <span class="text">{{val}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'DescContent',
  computed:{
    ...mapState(['currentCreditGoodDetail']),
    spuData(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.base.goods_spu
      }else{
        return null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .descContent-wrapper
    width: 94%
    margin: 2vw auto
    border-radius: 3vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
    font-size: 4vw
    background-color: #fff
    padding: 2vw 4vw
    box-sizing: border-box
    overflow: hidden
    .title
      margin: 2vw 0 3vw 0
    .spuDesc
      margin-bottom: 2vw
      .desc_title
        font-size: 3.8vw
        margin-right: 4vw
        color: #bbb
      .text
        font-size: 3.5vw
        color: #000
</style>