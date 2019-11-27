<template>
  <div class="productProps-wrapper">
    <van-cell 
      v-if="attr1" 
      @click="showPopUp" 
      :value="attr1_desc"
      :title="attr1"
      is-link
    />
    <van-cell 
      v-if="attr2" 
      @click="showPopUp" 
      :value="attr2_desc"
      :title="attr2"
      is-link
    />
    <van-cell 
      v-if="attr3" 
      @click="showPopUp" 
      :value="attr3_desc"
      :title="attr3"
      is-link
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "ProductProps",
  computed: {
    ...mapState(['currentProductData']),
    attr1(){
      if(this.currentProductData){
        let name = this.currentProductData.attributes_amount[0].attr1_name

        if(name.length > 0){
          return name
        }else{
          return false
        }
      }else{
        return false
      }
    },
    attr1_desc(){
      if(this.currentProductData){
        let name = this.currentProductData.attributes_amount[0].attr1_name
        let attributes = this.currentProductData.attributes_amount

        if(name.length > 0){
          let result = []
          for(let item of attributes){
            if(result.indexOf(item.attr1_value) == -1){
              result.push(item.attr1_value)
            }
          }

          // let str = result.join()
          // if(str.length > 20){
          //   result = result.slice(0,1)
          //   str = result.join() + '...'
          // }

          return result.join(', ')
        }else{
          return ''
        }
      }
    },
    attr2(){
      if(this.currentProductData){
        let name = this.currentProductData.attributes_amount[0].attr2_name

        if(name.length > 0){
          return name
        }else{
          return false
        }
      }else{
        return false
      }
    },
    attr2_desc(){
      if(this.currentProductData){
        let name = this.currentProductData.attributes_amount[0].attr1_name
        let attributes = this.currentProductData.attributes_amount

        if(name.length > 0){
          let result = []
          for(let item of attributes){
            if(result.indexOf(item.attr2_value) == -1){
              result.push(item.attr2_value)
            }
          }

          // let str = result.join()
          // if(str.length > 20){
          //   result = result.slice(0,1)
          //   str = result.join() + '...'
          // }

          return result.join(', ')
        }else{
          return ''
        }
      }
    },
    attr3(){
      if(this.currentProductData){
        let name = this.currentProductData.attributes_amount[0].attr3_name

        if(name.length > 0){
          return name
        }else{
          return false
        }
      }else{
        return false
      }
    },
    attr3_desc(){
      if(this.currentProductData){
        let name = this.currentProductData.attributes_amount[0].attr1_name
        let attributes = this.currentProductData.attributes_amount

        if(name.length > 0){
          let result = []
          for(let item of attributes){
            if(result.indexOf(item.attr3_value) == -1){
              result.push(item.attr3_value)
            }
          }

          // let str = result.join()
          // if(str.length > 20){
          //   result = result.slice(0,1)
          //   str = result.join() + '...'
          // }

          return result.join(', ')
        }else{
          return ''
        }
      }
    }
  },
  methods: {
    ...mapMutations(['changeCurrentProductPopUpStock','changeCurrentBuyDetail','changeProductPopUpImg','openPopup']),
    //初始化弹出框
    showPopUp(){
      this.changeCurrentProductPopUpStock('0')
      this.changeCurrentBuyDetail(null)
      this.changeProductPopUpImg('')
      this.openPopup()
    }
  }
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