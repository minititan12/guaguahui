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
      <div class="btn-left" @click="addGroup">
        <span class="btn-title">加入拼团</span>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import { getShareSpellGroup } from '../../utils/axios/request'
export default {
  name: 'JoinGroupFooter',
  data(){
    return {
      hasGroup: false
    }
  },
  computed: {
    ...mapState(['login','currentProductData','currentBuyDetail'])
  },
  methods: {
    ...mapMutations(['openPopup','changeTab','changeCurrentBuyDetail','changeCurrentProductPopUpStock','changeProductPopUpImg']),

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

    //加入拼团
    addGroup(){
      if(this.login){
        if(this.hasGroup){
          this.$toast({
            message: "该商品您正在拼团",
            type: "fail",
            duration: 1200
          })
          return 
        }
        this.handleOpenPopup()
      }else{
        this.$router.push('/login')
      }
    },

    //确认该商品是否拼团
    confirmHasGroup(list){
      if(this.currentProductData){
        for(let item of list){
          if(item.goods_id == this.currentProductData.id){
            this.hasGroup = true
            return
          }
        }
      }
    },

    //获取我的所有拼团信息
    getMineGroupData(){
      let postData = {
        user_id: this.userData.id
      }

      getShareSpellGroup(postData)
        .then((res)=>{
          console.log('getShareSpellGroup',res.data)
          if(res.data.code == 1){
            // this.mineGroupList = res.data.data
            this.confirmHasGroup(res.data.data)
          }
        })
        .catch((err)=>{
          console.log('getShareSpellGroup err',err)
        })
    }
  },
  created(){
    this.getMineGroupData()
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
    justify-content: space-around
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
      justify-content: center
      align-items: center
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
      font-size: 3.5vw
      line-height: 10vw
      letter-spacing: .1vw
      .btn-left
        width: 80%
        display: inline-block
        text-align: center
        color: #000
        border-radius: 5vw
        background-color: #FFCF27
</style>


