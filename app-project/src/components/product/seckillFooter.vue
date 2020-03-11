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
export default {
  name: 'SeckillFooter',
  computed: {
    ...mapState(['login','currentProductData','currentBuyDetail','seckillData'])
  },
  methods: {
    ...mapMutations(['openPopup','changeTab','changeCurrentBuyDetail','changeCurrentProductPopUpStock','changeProductPopUpImg','updatedConfirmData']),
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

    //初始化popup数据
    handleOpenPopup(){
      this.changeCurrentProductPopUpStock('0')
      this.changeCurrentBuyDetail(null)
      this.changeProductPopUpImg('')
      this.openPopup()
    },

    //点击加入购物车按钮
    addCart(){
      if(this.login){//已登录 
        let t = new Date()
        let hour = t.getHours()
        let times = this.seckillData.times
        if(times == hour){
          setTimeout(()=>{
            this.handleOpenPopup()
          },200)  
        }else{
          this.$toast({
            message: "未在活动时间内",
            type: "fail",
            duration: 1200
          })
        }   
      }else{  //未登录
        this.$router.push('/login')
      }
    },

    //点击立即购买按钮
    limitedBuy(){
      if(this.login){//已登录  
        let t = new Date()
        let hour = t.getHours()
        let times = this.seckillData.times
        
        if(times == hour){
          setTimeout(()=>{
            this.handleOpenPopup()
          },200)  
        }else{
          this.$toast({
            message: "未在活动时间内",
            type: "fail",
            duration: 1200
          })
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
    z-index: 2
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
        font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
        font-weight: bold
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
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
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


