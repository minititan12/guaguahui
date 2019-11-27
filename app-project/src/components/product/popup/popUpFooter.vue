<template>
  <div class="popup-footer">
    <span class="btn-left" @click="postCart">加入购物车</span>
    <span class="btn-right" @click="immediatePay">立即购买</span>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'
export default {
  name: "PoPUpFooter",
  computed: {
    ...mapState(['currentBuyDetail','userData','currentProductData'])
  },
  methods: {
    ...mapMutations(['addToConfirmList','countConfirmTotalPrice','closePopup']),
    getConfirmDetailData(){
      if(this.currentProductData.attributes_amount.length > 0){
        let totalPrice = parseInt(this.currentBuyDetail.number) * parseFloat(this.currentBuyDetail.price)
        return {
          attr1_name: this.currentBuyDetail.attr1_name,
          attr1_value: this.currentBuyDetail.attr1_value,
          attr2_name: this.currentBuyDetail.attr2_name,
          attr2_value: this.currentBuyDetail.attr2_value,
          attr3_name: this.currentBuyDetail.attr3_name,
          attr3_value: this.currentBuyDetail.attr3_value,
          goods_attr_id: this.currentBuyDetail.id,
          goods_id: this.currentBuyDetail.goods_id,
          imgUrl: this.currentBuyDetail.photo,
          number: this.currentBuyDetail.number,
          price: this.currentBuyDetail.price,
          shop: this.currentProductData.shop.company,
          title: this.currentProductData.goods_name,
          totalPrice: totalPrice.toFixed(2),
          user_id_to: this.currentProductData.user_id
        }

      }else{
        let totalPrice = parseInt(this.currentBuyDetail.number) * parseFloat(this.currentBuyDetail.price)
        return {
          goods_id: this.currentBuyDetail.goods_id,
          imgUrl: this.currentBuyDetail.photo,
          number: this.currentBuyDetail.number,
          price: this.currentBuyDetail.price,
          shop: this.currentProductData.shop.company,
          title: this.currentProductData.goods_name,
          totalPrice: totalPrice.toFixed(2),
          user_id_to: this.currentProductData.user_id
        }
      }
    },
    //post的操作
    postHandle(type){
      //如果点击的是加入购物车
      if(type == 'cart'){
        let goods_attr_id = this.currentBuyDetail.hasOwnProperty('id') ? this.currentBuyDetail.id : ''
        let postData = {
          user_id: this.userData.id,
          goods_id: this.currentBuyDetail.goods_id,
          goods_attr_id: goods_attr_id,
          number: this.currentBuyDetail.number,
          price: this.currentBuyDetail.price,
          user_id_to: this.currentProductData.user_id
        }
        console.log('postData',postData)
        axios.post('api/method/addCart',postData)
          .then((res)=>{
            console.log('addCart:',res.data)
            if(res.data.code == 1){
              this.$toast({
                message: '加入购物车成功',
                type: "success",
                duration: 1200
              })
            }else{
              this.$toast({
                message: '加入购物车失败',
                type: "fail",
                duration: 1200
              })
            }
          })
          .catch((err)=>{
            console.log('post addCart err',err)
          })
      }else{
        let detail = this.getConfirmDetailData()
        this.addToConfirmList(detail)
        this.countConfirmTotalPrice()
        this.closePopup()
        this.$router.push('/pay')
      }
    },
    postCart(){
      if(!this.currentBuyDetail){
        this.$toast({
          message: '请先选择商品属性',
          duration: 1200
        })
      }else{
        let stock = parseFloat(this.currentBuyDetail.stock)
        if(this.currentBuyDetail.stock && this.currentBuyDetail.stock > 0){
          stock = this.currentBuyDetail.stock
        }else{
          stock = 0
        }
        if(stock == 0){
          this.$toast({
            message: '该商品属性没有库存',
            type: "fail",
            duration: 1200
          })
          return 
        }
        this.postHandle('cart')
      }
    },
    immediatePay(){
      if(!this.currentBuyDetail){
        this.$toast({
          message: '请先选择商品属性',
          duration: 1200
        })
      }else{
        let stock = parseFloat(this.currentBuyDetail.stock)
        if(this.currentBuyDetail.stock && this.currentBuyDetail.stock > 0){
          stock = this.currentBuyDetail.stock
        }else{
          stock = 0
        }
        if(stock == 0){
          this.$toast({
            message: '该商品属性没有库存',
            type: "fail",
            duration: 1200
          })
          return 
        }
        this.postHandle('confirm')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .popup-footer
      position: absolute 
      bottom: 0
      border-top: .01rem solid #999
      box-sizing: border-box
      width: 100%
      height: 1rem
      text-align: center
      .btn-left
        display: inline-block
        width: 45%
        height: 80%
        margin-top: .08rem
        line-height: .8rem
        color: #fff
        background: linear-gradient(to right, #FEC903, #FF9506);
        border-top-left-radius: .45rem
        border-bottom-left-radius: .45rem
      .btn-right
        display: inline-block
        width: 45%
        height: 80%
        line-height: .8rem
        margin-top: .08rem
        color: #fff
        background: linear-gradient(to right, #FE7503, #FE4C02);
        border-top-right-radius: .45rem
        border-bottom-right-radius: .45rem
      .warn
        width: 2.5rem 
        height: .8rem
        line-height: .8rem
        position: absolute 
        bottom: 40vh
        border-radius: .2rem
        left: calc(50% - 1.25rem)
        background-color: rgba(0,0,0,0.5)
        color: #fff
</style>


