<template>
  <div class="attr-wrapper">
    <ProDetailItem
      @selected="handleSelected" 
      @changePopUpImg="handleSelectedImg"
      :data="getDetailData(val,name)" 
      v-for="(val,name) in skuData"
    />
    <div class="select-number">
      <div class="number-title">选择数量</div>
      <div class="number">
        <span class="btn" @click="minusNumber">-</span>
        <span class="btn">{{number}}</span>
        <span class="btn" @click="addNumber">+</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ProDetailItem from './proDetailItem'
export default {
  name: 'ProPopUpAttr',
  data(){
    return {
      selectedData: {},
      number: 1
    }
  },
  components: {
    ProDetailItem
  },
  computed: {
    ...mapState(['currentCreditGoodDetail','integralProBuyDetail']),
    //计算属性数据
    skuData(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.base.goods_sku
      }else{
        return {}
      }
    },
    skuList(){
      if(this.currentCreditGoodDetail){
        return this.currentCreditGoodDetail.sku_list
      }else{
        return []
      }
    }
  },
  methods: {
    ...mapMutations(['changeProPopUpImg','updateIntegralProBuyDetail']),
    //整合获取到的属性数据
    getDetailData(val,name){
      return {
        name: name,
        attrList: val
      }
    },
    //获取选择的积分商品信息
    getSelectedProData(){
      let match = true
      for(let key in this.skuData){
        if(!this.selectedData.hasOwnProperty(key)){
          match = false
        }
      }

      if(match){
        for(let item of this.skuList){
          let skuData = JSON.parse(item.sku_key)
          let skuMatch = true
          for(let skuKey in skuData){
            if(skuData[skuKey] != this.selectedData[skuKey]){
              skuMatch = false
              break
            }
          }

          if(skuMatch){
            let detail = {
              number: this.number,
              good_id: this.$route.query.id,
              ...item
            }
            this.updateIntegralProBuyDetail(detail)
            return
          }
        }
      }else{
        console.log('属性还没选择完全')
      }
    },
    //处理选中属性
    handleSelected(obj){
      // console.log(obj)
      if(this.selectedData.hasOwnProperty(obj.name)){
        this.selectedData[obj.name] = obj.val
      }else{
        let rightObj = {}
        rightObj[obj.name] = obj.val
        this.selectedData = {
          ...this.selectedData,
          ...rightObj
        }
      }

      this.getSelectedProData()
    },
    //处理选中图片
    handleSelectedImg(img){
      this.changeProPopUpImg(img)
      console.log(img)
    },
    minusNumber(){
      if(this.number > 1){
        if(this.integralProBuyDetail){
          this.number--
          let obj = JSON.parse(JSON.stringify(this.integralProBuyDetail))
          obj.number = this.number
          this.updateIntegralProBuyDetail(obj)
        }
      }else{
        this.$toast({
          message:'数量不能少于1件',
          duration: 1200
        })
      }
    },
    addNumber(){
      if(this.integralProBuyDetail){
        let obj = JSON.parse(JSON.stringify(this.integralProBuyDetail))
        if(this.number < obj.store){
          this.number++
          obj.number = this.number
          this.updateIntegralProBuyDetail(obj)
        }else{
          this.$toast({
            message:'数量不能超过库存',
            duration: 1200
          })
        }
      }else{
        this.$toast({
          message:'请先选择产品属性',
          duration: 1200
        })
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .attr-wrapper
    position: absolute
    top: 30vw
    bottom: 12vw
    left: 0
    right: 0
    padding: 0 3vw
    box-sizing: border-box
    overflow: scroll
    .select-number
      width: 100%
      height: 10vw
      .number-title
        display: inline-block
        line-height: 10vw
        vertical-align: middle
        font-size: 4vw
        font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
        font-weight: bold
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
</style>