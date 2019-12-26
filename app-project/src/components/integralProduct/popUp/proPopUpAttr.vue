<template>
  <div class="attr-wrapper">
    <ProDetailItem
      @selected="handleSelected" 
      @changePopUpImg="handleSelectedImg"
      :data="getDetailData(val,name)" 
      v-for="(val,name) in skuData"
    />
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
    }
  },
  components: {
    ProDetailItem
  },
  computed: {
    ...mapState(['currentCreditGoodDetail']),
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
            this.updateIntegralProBuyDetail(item)
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
    }
  },
}
</script>

<style lang="stylus" scoped>
  .attr-wrapper
    width: 100%
    padding: 0 3vw
    box-sizing: border-box
</style>