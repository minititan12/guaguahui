<template>
  <div class="footer-wrapper">
    <div class="footer-left">
      <div class="footer-item">
        <span class="iconfont store" @click="handleToShop">&#xe708;</span>
        <span class="title" @click="handleToShop">店铺</span>
      </div>
      <div class="footer-item">
        <span class="iconfont" @click="handleToService">&#xe62e;</span>
        <span class="title" @click="handleToService">客服</span>
      </div>
      <div class="footer-item">
        <span class="iconfont" @click="handleToCart">&#xe631;</span>
        <span class="title" @click="handleToCart">购物车</span>
      </div>
    </div>
    
    <div class="btn">
      <div class="btn-left" @click="addCart">
        <span class="btn-title">加入拼团</span>
      </div>
      <div class="btn-right" @click="limitedBuy">
        <span class="btn-title">发起拼团</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'GroupFooter',
  computed: {
    ...mapState(['login','currentProductData','currentBuyDetail','userData'])
  },
  methods: {
    ...mapMutations(['openPopup','changeTab','changeCurrentBuyDetail','changeCurrentProductPopUpStock','changeProductPopUpImg','addToConfirmList','countConfirmTotalPrice']),

    //点击商店按钮
    handleToShop(){
      let id = this.currentProductData.user_id
      if(this.login){
        this.$router.push({
          path: '/shop',
          query: {
            shopID: id
          }
        })
      }else{
        this.$router.push('/login')
      }
    },

    //点击购物车按钮
    handleToCart(){
      this.changeTab(4)
      this.$router.push('/')
    },

    //点击客服按钮
    handleToService(){
      let id = this.currentProductData.user_id
      let shopName = this.currentProductData.shop.company
      let shop_img = this.currentProductData.shop.shop_img
      let product_img = this.currentProductData.cover_img
      let goods_name = this.currentProductData.goods_name
      let goods_id = this.currentProductData.id
      if(this.login){
        // this.$router.push('/service?id=' + id)
        this.$router.push({
          path: '/service',
          query: {
            id: id,
            shopName: shopName,
            shop_img: shop_img,
            product_img: product_img,
            goods_name: goods_name,
            goods_id: goods_id
          }
        })
      }else{
        this.$router.push('/login')
      }
    },

    //获取确认订单的数据
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

    //初始化popup数据
    handleOpenPopup(){
      this.changeCurrentProductPopUpStock('0')
      this.changeCurrentBuyDetail(null)
      this.changeProductPopUpImg('')
      this.openPopup()
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
        this.$router.push('/pay')
      }
    },

    //点击加入购物车按钮
    addCart(){
      console.log('addcart')
      if(this.login){
        console.log('login')
        if(this.currentBuyDetail){
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
        }else{
          console.log('openpopup')
          this.handleOpenPopup()
        }
      }else{
        this.$router.push('/login')
      }
    },
    
    //点击立即购买按钮
    limitedBuy(){
      if(this.login){
        if(this.currentBuyDetail){
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
        }else{
          this.handleOpenPopup()
        }
      }else{
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer-wrapper
    width: 100%
    height: 12vw
    background-color: #fff
    position: fixed
    bottom: 0
    z-index: 10
    display: flex
    flex-direction: row
    align-items: center
    .footer-left
      width: 45%
      height: 100%
      display: flex
      flex-direction: row
      justify-content: space-around
      align-items: center
      .footer-item
        display: flex
        width: 33%
        flex-direction: column
        align-items: center
        font-family: PFB
        .iconfont
          font-size: 5vw
          color: #FF5756
        .title
          color: #000
          font-size: 3.5vw
          margin-top: 1vw
    .btn
      height: 10vw
      width: 55%
      display: flex
      flex-direction: row
      justify-content: space-around
      align-items: center
      font-family: PFB
      font-size: 3.5vw
      line-height: 10vw
      letter-spacing: .1vw
      .btn-left
        display: inline-block
        color: #000
        border-radius: 5vw
        padding: 0 4vw
        // background: linear-gradient(to right, #FEC903, #FF9506);
        background-color: #FFCF27
      .btn-right
        display: inline-block
        color: #fff
        border-radius: 5vw
        padding: 0 4vw
        // background: linear-gradient(to right, #FEC903, #FF9506);
        background-color: #FF5756
</style>


