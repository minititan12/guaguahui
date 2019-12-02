<template>
  <div class="popup-content-wrapper" ref="popUpWrapper">
    <div>

      <DetailItem 
        v-if="productDetailData.attr1.attr_name.length > 0" 
        :data="productDetailData.attr1" 
        @selected="handleAttr1Selected" @changePopUpImg="handleChangeImg"
      />

      <DetailItem 
        v-if="productDetailData.attr2.attr_name.length > 0" 
        :data="productDetailData.attr2" 
        @selected="handleAttr2Selected" @changePopUpImg="handleChangeImg"
      />

      <DetailItem 
        v-if="productDetailData.attr3.attr_name.length > 0" 
        :data="productDetailData.attr3" 
        @selected="handleAttr3Selected" @changePopUpImg="handleChangeImg"
      />

      <div class="select-number">
        <div class="number-title">选择数量</div>
        <div class="number">
          <span v-if="type != 4" class="btn" @click="minusNumber">-</span>
          <span class="btn">{{number}}</span>
          <span v-if="type != 4" class="btn" @click="addNumber">+</span>
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
      productDetailData: null,
      selectedAttr1: '',
      selectedAttr2: '',
      selectedAttr3: ''
    }
  },
  computed: {
    ...mapState(['currentProductData']),
    type(){
      if(this.currentProductData){
        return this.currentProductData.flag
      }
    },
  },
  methods: {
    ...mapMutations(['changeProductPopUpImg','changeCurrentProductPopUpStock','changeCurrentBuyDetail']),
    //颜色属性获取图片
    getPhoto(attr,name){
      let attributes_amount = this.currentProductData.attributes_amount
      let val = []

      for(let attrItem of attr.attr_value){
        for(let item of attributes_amount){
          if(item[name] == attrItem){
            val.push({
              text: attrItem,
              photo: item.photo
            })
            break
          }
        }
      }

      return val
    },

    //获取产品细节属性数据
    getProductDetailData(){
      let attributes_amount = this.currentProductData.attributes_amount
      let attr = JSON.parse(JSON.stringify(this.currentProductData.attr))

      if(/颜色/.test(attr.attr1.attr_name)){
        attr.attr1.is_color = true

        let val = this.getPhoto(attr.attr1,'attr1_value')
        attr.attr1.attr_value = val
      }

      if(/颜色/.test(attr.attr2.attr_name)){
        attr.attr2.is_color = true

        let val = this.getPhoto(attr.attr2,'attr2_value')
        attr.attr2.attr_value = val
      }

      if(/颜色/.test(attr.attr3.attr_name)){
        attr.attr3.is_color = true

        let val = this.getPhoto(attr.attr3,'attr1_value')
        attr.attr3.attr_value = val
      }
      
      this.productDetailData = attr
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

      if(this.productDetailData.attr1.attr_name.length > 0){
        if(this.selectedAttr1.length > 0){
          attr1 = this.selectedAttr1
        }
      }

      if(this.productDetailData.attr2.attr_name.length > 0){
        if(this.selectedAttr2.length > 0){
          attr2 = this.selectedAttr2
        }
      }

      if(this.productDetailData.attr3.attr_name.length > 0){
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

      if(this.productDetailData.attr1.attr_name.length > 0){
        if(this.selectedAttr1.length > 0){
          attr1 = this.selectedAttr1
        }
      }

      if(this.productDetailData.attr2.attr_name.length > 0){
        if(this.selectedAttr2.length > 0){
          attr2 = this.selectedAttr2
        }
      }

      if(this.productDetailData.attr3.attr_name.length > 0){
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
          break
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

      this.popUpScroll.on('beforeScrollStart',()=>{
        this.popUpScroll.refresh()
      })
    },

    //数量增加
    addNumber(){
      this.number++
    },
    //数量减少
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
    }else{
      let stock = this.currentProductData.amount + ''
      this.changeCurrentProductPopUpStock(stock)
      this.getNoAttrBuyDetail()
    }
  },
  mounted(){
    this.initPoPUpScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .popup-content-wrapper
    position: absolute 
    top: 30vw
    bottom: 12vw
    left: 0
    right: 0
    overflow: hidden
    padding: 0 3vw
    .select-number
      width: 100%
      height: 10vw
      .number-title
        display: inline-block
        line-height: 10vw
        vertical-align: middle
        font-size: 3.6vw
        font-family: PFB
      .number
        display: inline-block
        line-height: 10vw
        float: right
        margin-right: 2vw
        span 
          vertical-align: middle
        .btn
          font-size: 4.3vw
          color: #444
          display: inline-block
          text-align: center
          margin-right: 2vw
          width: 7vw
          height: 7vw
          line-height: 7vw
          background-color: #F5F5F5
    .blank
      width: 100%
      height: 2vw
</style>


