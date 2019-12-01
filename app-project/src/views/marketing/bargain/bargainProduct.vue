<template>
  <div class="wrapper">
    <div class="back" @click="back">
      <span class="iconfont">&#xe624;</span>
    </div>

    <TitleShop />
    <van-image
      width="94vw"
      style="padding:0 3vw;margin-bottom:2vw"
      src="/public/static/bargin/bargin_icon_1.png"
    />
    <ProductComment></ProductComment>
    <ProductDesc></ProductDesc>
  </div>
</template>
<script>
import ProductDesc from '../../../components/product/content/productDesc'
import TitleShop from '../../../components/product/content/title/titleShop'
import ProductComment from '../../../components/product/content/title/productComment'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  components:{
    ProductDesc,TitleShop,ProductComment
  },
  created(){
    this.getProductData();
  },
  methods:{
    ...mapMutations(['changeCurrentProductData']),
    back(){
      this.$router.go(-1);   
    },
    getProductData(){
      let id = this.$route.query.goods_id ? this.$route.query.goods_id : 286
      axios.get('/api/method/getGoodsInfo?id=' + id)
        .then((res)=>{
          if(res.data.code == 1){
            this.changeCurrentProductData(res.data.data)
          }
        })
        .catch((err)=>{
          console.log('get product err')
        })
    },
  }
}
</script>
<style lang="stylus" scoped>
  .back
    width: 8vw
    height: 8vw
    background-color: rgba(60,60,60,.5)
    position: absolute 
    top: 3vw
    left: 3vw
    z-index: 3
    text-align: center
    overflow: hidden
    border-radius: 8vw
    .iconfont
      color: #fff
      font-size: 5vw
      line-height: 8vw

  .wrapper
    background-color: #f6f7fb;
</style>