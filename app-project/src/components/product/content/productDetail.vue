<template>
  <div class="productDetail-wrapper" v-if="showDetail">
    <DetailItem v-show="productDetailData.attr1" :data="productDetailData.attr1" :showBorder= "false" @selected="handleAttr1Selected"></DetailItem>

    <DetailItem v-show="productDetailData.attr2" :data="productDetailData.attr2" :showBorder= "false"  @selected="handleAttr2Selected"></DetailItem>

    <DetailItem v-show="productDetailData.attr3" :data="productDetailData.attr3" :showBorder= "false"  @selected="handleAttr3Selected"></DetailItem>

    <div class="productDetail-number">
      <span class="number-text">选择数量</span>
      <van-stepper v-model="number" />
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DetailItem from '../popup/detailItem'
export default {
  name: "ProductDetail",
  components: {
    DetailItem
  },
  data(){
    return {
      productDetailData: {},
      selectedAttr1: '',
      selectedAttr2: '',
      selectedAttr3: '',
      number: 1
    }
  },
  computed: {
    ...mapState(['currentProductData']),
    showDetail(){
      if(this.currentProductData){
        if(this.currentProductData.hasOwnProperty('attributes_amount') && this.currentProductData.attributes_amount.length > 0){
          return true
        }else{
          return false
        }
      }else{
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['changeCurrentBuyDetail']),
    //获取产品细节属性数据
    getProductDetailData(){
      let attributes = this.currentProductData.attributes_amount

      let attr1 = {}
      let attr2 = {}
      let attr3 = {}
      //先判断有没有属性1，2，3,初始化name属性
      if(attributes[0].attr1_name.length > 0){
        attr1.name = attributes[0].attr1_name
        attr1.value = []
        if(/颜色/.test(attr1.name)){
          attr1.is_color = true
        }
      }else{
        attr1 = null
      }
      if(attributes[0].attr2_name.length > 0){
        attr2.name = attributes[0].attr2_name
        attr2.value = []
        if(/颜色/.test(attr2.name)){
          attr2.is_color = true
        }
      }else{
        attr2 = null
      }
      if(attributes[0].attr3_name.length > 0){
        attr3.name = attributes[0].attr3_name
        attr3.value = []
        if(/颜色/.test(attr3.name)){
          attr3.is_color = true
        }
      }else{
        attr3 = null
      }

      //再丰富属性里面的值
      for(let item of attributes){
        //属性1赋值
        if(attr1){
          if(attr1.hasOwnProperty('is_color')){
            attr1.value.push({
              text: item.attr1_value,
              photo: item.photo
            })
          }else{
            attr1.value.push(item.attr1_value)
          }
        }

        //属性2赋值
        if(attr2){
          if(attr2.hasOwnProperty('is_color')){
            attr2.value.push({
              text: item.attr2_value,
              photo: item.photo
            })
          }else{
            attr2.value.push(item.attr2_value)
          }
        }

        //属性3赋值
        if(attr3){
          let is_color = /颜色/.test(attr3.name)
          if(attr3.hasOwnProperty('is_color')){
            attr3.value.push({
              text: item.attr3_value,
              photo: item.photo
            })
          }else{
            attr3.value.push(item.attr3_value)
          }
        }
      }

      let result = {
        attr1: attr1,
        attr2: attr2,
        attr3: attr3
      }
      
      this.productDetailData = result
    },
    //去重函数
    clearTheSame(data){
      let result = []

      if(data.hasOwnProperty('is_color')){
        let colrList = []
        for(let item of data.value){
          if(colrList.indexOf(item.text) == -1){
            colrList.push(item.text)
            result.push(item)
          }
        }
      }else{
        for(let item of data.value){
          if(result.indexOf(item) == -1){
            result.push(item)
          }
        }
      }

      return result
    },

    //优化产品细节属性数据
    optimizeProductDetailData(){
      let result = {}
      //有属性1
      if(this.productDetailData.attr1){
        let newAttr1 = {} 
        if(this.productDetailData.attr1.hasOwnProperty('is_color')){
          newAttr1.is_color = true
        }
        newAttr1.name = this.productDetailData.attr1.name
        newAttr1.value = this.clearTheSame(this.productDetailData.attr1)
        result.attr1 = newAttr1
      }else{
        result.attr1 = null
      }

      //有属性2
      if(this.productDetailData.attr2){
        let newAttr2 = {}
        if(this.productDetailData.attr2.hasOwnProperty('is_color')){
          newAttr2.is_color = true
        }
        newAttr2.name = this.productDetailData.attr2.name
        newAttr2.value = this.clearTheSame(this.productDetailData.attr2)
        result.attr2 = newAttr2
      }else{
        result.attr2 = null
      }

      //有属性3
      if(this.productDetailData.attr3){
        let newAttr3 = {}
        if(this.productDetailData.attr3.hasOwnProperty('is_color')){
          newAttr3.is_color = true
        }
        newAttr3.name = this.productDetailData.attr3.name
        newAttr3.value = this.clearTheSame(this.productDetailData.attr3)
        result.attr3 = newAttr3
      }else{
        result.attr3 = null
      }

      this.productDetailData = result
    },

    //attr1选择
    handleAttr1Selected(attr){
      this.selectedAttr1 = attr
    },

    //attr2选择
    handleAttr2Selected(attr){
      this.selectedAttr2 = attr
    },

    //attr3选择
    handleAttr3Selected(attr){
      this.selectedAttr3 = attr
    },

    //获取购买信息
    getBuyDetail(){
      let attr1 = ""
      let attr2 = ""
      let attr3 = ""
      let buyDetail = null
      let attributes = this.currentProductData.attributes_amount

      if(this.productDetailData.attr1){
        if(this.selectedAttr1.length > 0){
          attr1 = this.selectedAttr1
        }
      }

      if(this.productDetailData.attr2){
        if(this.selectedAttr2.length > 0){
          attr2 = this.selectedAttr2
        }
      }

      if(this.productDetailData.attr3){
        if(this.selectedAttr3.length > 0){
          attr3 = this.selectedAttr3
        }
      }

      for(let item of attributes){
        let matchAttr1 = item.attr1_value == attr1 ? true : false
        let matchAttr2 = item.attr2_value == attr2 ? true : false
        let matchAttr3 = item.attr3_value == attr3 ? true : false
        if(matchAttr1 && matchAttr2 && matchAttr3){
          let detail = JSON.parse(JSON.stringify(item))
          buyDetail = {
            number: this.number,
            ...detail
          }
        }
      }

      this.changeCurrentBuyDetail(buyDetail)
    },
  },
  watch: {
    currentProductData(){
      if(this.currentProductData){
        if(this.currentProductData.hasOwnProperty('attributes_amount') && this.currentProductData.attributes_amount.length > 0){
          this.getProductDetailData()
          this.optimizeProductDetailData()
        }
      }
    },
    number(){
      this.getBuyDetail()
    },
    selectedAttr1(){
      this.getBuyDetail()
    },
    selectedAttr2(){
      this.getBuyDetail()
    },
    selectedAttr3(){
      this.getBuyDetail()
    },
  },
  mounted(){
    if(this.currentProductData){
      if(this.currentProductData.hasOwnProperty('attributes_amount') && this.currentProductData.attributes_amount.length > 0){
        this.getProductDetailData()
        this.optimizeProductDetailData()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .productDetail-wrapper
    width: 100%
    padding: 0 4vw
    box-sizing: border-box
    .productDetail-number
      padding: .2rem 0
      .number-text
        display: block
        margin-bottom: .2rem
</style>