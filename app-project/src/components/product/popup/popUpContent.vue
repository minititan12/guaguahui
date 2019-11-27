<template>
  <div class="popup-content-wrapper" ref="popUpWrapper">
    <div>

      <DetailItem 
        v-if="productDetailData.attr1" 
        :data="productDetailData.attr1" 
        :popUp="true" 
        @selected="handleAttr1Selected" @changePopUpImg="handleChangeImg"
      />

      <DetailItem 
        v-if="productDetailData.attr2" 
        :data="productDetailData.attr2" 
        :popUp="true" 
        @selected="handleAttr2Selected" @changePopUpImg="handleChangeImg"
      />

      <DetailItem 
        v-if="productDetailData.attr3" 
        :data="productDetailData.attr3" 
        :popUp="true" 
        @selected="handleAttr3Selected" @changePopUpImg="handleChangeImg"
      />

      <div class="select-number">
        <div class="number-title">选择数量</div>
        <div class="number">
          <span class="btn" @click="minusNumber">-</span>
          <span class="btn">{{number}}</span>
          <span class="btn" @click="addNumber">+</span>
        </div>
      </div>
      <div class="blank"></div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import DetailItem from './detailItem'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "PoPUpContent",
  components:{
    DetailItem
  },
  data(){
    return {
      number: 1,
      productDetailData: {},
      selectedAttr1: '',
      selectedAttr2: '',
      selectedAttr3: ''
    }
  },
  computed: {
    ...mapState(['currentProductData'])
  },
  methods: {
    ...mapMutations(['changeProductPopUpImg','changeCurrentProductPopUpStock','changeCurrentBuyDetail']),
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

    //改变弹出框的主图
    handleChangeImg(img){
      this.changeProductPopUpImg(img)
    },

    //获取库存
    getStock(){
      let attr1 = ""
      let attr2 = ""
      let attr3 = ""
      let stock = '0'
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
          if(item.stock){
            stock = item.stock + ''
          }
        }
      }

      this.changeCurrentProductPopUpStock(stock)
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

    //获取没有属性的购买信息
    getNoAttrBuyDetail(){
      let buyDetail = {
        goods_id: this.currentProductData.id,
        photo: this.currentProductData.cover_img,
        price: this.currentProductData.price,
        number: this.number,
        stock: this.currentProductData.amount
      }

      this.changeCurrentBuyDetail(buyDetail)
    },

    //初始化弹出框滚动
    initPoPUpScroll(){
      let el = this.$refs.popUpWrapper
      this.popUpScroll = new Bscroll(el,{
        click: true,
        tap: true,
        eventPassthrough: 'horizontal',
        bounce:{
          top: false
        }
      })
    },

    addNumber(){
      this.number++
    },
    minusNumber(){
      if(this.number > 1){
        this.number--
      }
    }
  },
  watch: {
    selectedAttr1(){
      this.getStock()
      this.getBuyDetail()
    },
    selectedAttr2(){
      this.getStock()
      this.getBuyDetail()
    },
    selectedAttr3(){
      this.getStock()
      this.getBuyDetail()
    },
    number(){
      if(this.currentProductData.attributes_amount.length > 0){
        this.getBuyDetail()
      }else{
        this.getNoAttrBuyDetail()
      }
    }
  },
  created(){
    if(this.currentProductData && this.currentProductData.attributes_amount.length > 0){
      this.getProductDetailData()
      this.optimizeProductDetailData()
    }else{
      let stock = this.currentProductData.amount + ''
      this.changeCurrentProductPopUpStock(stock)
      this.getNoAttrBuyDetail()
    }
  },
  mounted(){
    this.initPoPUpScroll()
  },
  updated(){
    this.popUpScroll.refresh()
  }
}
</script>

<style lang="stylus" scoped>
  .popup-content-wrapper
    position: absolute 
    top: 30vw
    bottom: 1rem
    left: 0
    right: 0
    overflow: hidden
    padding: 0 .2rem
    .select-number
      width: 100%
      height: .8rem
      .number-title
        display: inline-block
        line-height: .8rem
        vertical-align: middle
      .number
        display: inline-block
        line-height: .8rem
        float: right
        margin-right: .2rem
        span 
          vertical-align: middle
        .btn
          font-size: .3rem
          color: #787878
          display: inline-block
          text-align: center
          margin-right: .1rem
          width: .5rem
          height: .5rem
          line-height: .5rem
          background-color: #F5F5F5
    .blank
      width: 100%
      height: .5rem
</style>


