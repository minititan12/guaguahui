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
        <span class="btn-title">加入购物车</span>
      </div>
      <div class="btn-right" @click="limitedBuy">
        <span class="btn-title">立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'ProductFooter',
  computed: {
    ...mapState(['login','currentProductData','currentBuyDetail','userData','showPopUp'])
  },
  methods: {
    ...mapMutations(['openPopup','closePopup','changeTab','changeCurrentBuyDetail','changeCurrentProductPopUpStock','changeProductPopUpImg','addToConfirmList','countConfirmTotalPrice','updatedConfirmData']),
    //点击商店按钮
    handleToShop(){
      this.closePopup()
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
      this.closePopup()
      this.changeTab(4)
      this.$router.push('/')
    },

    //点击客服按钮
    handleToService(){
      this.closePopup()
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

    //初始化popup数据
    handleOpenPopup(){
      this.changeCurrentProductPopUpStock('0')
      this.changeCurrentBuyDetail(null)
      this.changeProductPopUpImg('')
      this.openPopup()
    },

    //post的操作
    postHandle(type){
      //加入购物车操作
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
      }else{//立即购买操作
        let postData = {
          user_id: this.userData.id,
          goods_list:[{
            goods_attr_id: this.currentBuyDetail.id,
            number: this.currentBuyDetail.number
          }]
        }

        console.log('limitBuy postData:',postData)
        axios.post('api/method/comfirmOrder',postData)
          .then((res)=>{
            console.log('comfirmOrder:',res.data)
            if(res.data.code == 1){
              this.updatedConfirmData(res.data.data)
            }
          })
          .catch((err)=>{
            console.log('comfirmOrder err',err)
          })

        setTimeout(()=>{
          this.closePopup()
          this.$router.push('/pay')
        },200)
      }
    },

    //点击加入购物车按钮
    addCart(){
      console.log('addcart')
      if(this.login){//已登录  
        if(this.showPopUp){//商品属性框已弹出   
          if(this.currentBuyDetail){//商品属性已选择  
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
            this.$toast({
              message: '请先选择商品属性',
              type: "fail",
              duration: 1200
            })
          }
        }else{
          this.handleOpenPopup()
        }
        
      }else{  //未登录
        this.$router.push('/login')
      }
    },

    //点击立即购买按钮
    limitedBuy(){
      if(this.login){//已登录  
        if(this.showPopUp){//商品属性框已弹出   
          if(this.currentBuyDetail){//商品属性已选择  
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
            this.postHandle('limitBuy')
          }else{
            this.$toast({
              message: '请先选择商品属性',
              type: "fail",
              duration: 1200
            })
          }
        }else{
          this.handleOpenPopup()
        }
        
      }else{  //未登录
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


