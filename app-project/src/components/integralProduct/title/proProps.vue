<template>
  <div class="productProps-wrapper" v-show="skuData">
    <van-cell 
      v-for="(val,name) in skuData"
      :value="getValDesc(val)"
      :title="name"
      is-link
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "ProProps",
  data(){
    return {
    }
  },
  computed: {
    ...mapState(['currentCreditGoodDetail','login']),
    skuData(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.base.goods_sku
      }else{
        return null
      }
    }
  },
  methods: {
    ...mapMutations(['changeCurrentProductPopUpStock','changeCurrentBuyDetail','changeProductPopUpImg','openPopup']),
    //获取属性描述
    getValDesc(val){
      let str = ''
      for(let item of val){
        if(str.length > 0){
          str = str + ',' + item.attr
        }else{
          str = item.attr
        }
      }

      return str
    }
    //初始化弹出框
    // showPopUp(){
    //   if(this.login){
    //     this.changeCurrentProductPopUpStock('0')
    //     this.changeCurrentBuyDetail(null)
    //     this.changeProductPopUpImg('')
    //     this.openPopup()
    //   }else{
    //     this.$router.push({
    //       path: '/login'
    //     })
    //   }
    // }
  },
}
</script>

<style lang="stylus" scoped>
  .productProps-wrapper
    width: 94%
    margin: 2vw auto
    border-radius: 3vw
    font-family: PFH
    font-size: 4vw
    overflow: hidden
  .productProps-wrapper >>>  .van-cell
    align-items: center 
    color: #000

  .productProps-wrapper >>> .van-cell__value
    text-align: left
    word-wrap: break-word
    overflow: hidden
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    // span 
    //   width: 100%
</style>