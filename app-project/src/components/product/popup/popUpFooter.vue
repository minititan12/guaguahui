<template>
  <div class="popup-footer">
    <span v-if="type == 1 || type == 3" class="btn-left" @click="postCart">加入购物车</span>
    <span v-if="type == 1 || type == 3" class="btn-right" @click="immediatePay">立即购买</span>
    <span v-if="type == 2" class="btn-confirm" @click="groupConfirm">确认</span>
    <span v-if="type == 4" class="btn-confirm" @click="immediatePay">立即购买</span>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { addCart,comfirmOrder } from '../../../utils/axios/request'
export default {
  name: "PoPUpFooter",
  computed: {
    ...mapState(['currentBuyDetail','userData','currentProductData','groupBuyID']),
    type(){
      if(this.currentProductData){
        return this.currentProductData.flag
      }
    }
  },
  methods: {
    ...mapMutations(['updatedConfirmData','updateGroupBuyData']),
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

        addCart(postData)
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
        comfirmOrder(postData)
          .then((res)=>{
            console.log('comfirmOrder:',res.data)
            if(res.data.code == 1){
              this.updatedConfirmData(res.data.data)
              this.$nextTick(()=>{
                this.$router.push({
                  path: '/pay',
                  query: {
                    is_cart: 2
                  }
                })
              })
            }else{
              this.$toast({
                message: '购买失败',
                type: 'fail',
                duration: 1000
              })
            }
          })
          .catch((err)=>{
            console.log('comfirmOrder err',err)
          })
      }
    },

    //加入购物车
    postCart(){
      if(!this.currentBuyDetail){
        this.$toast({
          message: '请先选择商品属性',
          duration: 1200
        })
        return
      }
      
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
    },

    //立即购买
    immediatePay(){
      if(!this.currentBuyDetail){
        this.$toast({
          message: '请先选择商品属性',
          duration: 1200
        })
        return
      }

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
    },

    //拼团确认
    groupConfirm(){
      if(!this.currentBuyDetail){
        this.$toast({
          message: '请先选择商品属性',
          duration: 1200
        })
        return
      }

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

      let postData = {
        user_id: this.userData.id,
        goods_list:[{
          goods_attr_id: this.currentBuyDetail.id,
          number: this.currentBuyDetail.number
        }]
      }

      console.log('limitBuy postData:',postData)
      comfirmOrder(postData)
        .then((res)=>{
          console.log('comfirmOrder:',res.data)
          if(res.data.code == 1){
            this.updatedConfirmData(res.data.data)
            this.$nextTick(()=>{

              let team_id = this.$route.query.team_id ? this.$route.query.team_id : this.groupBuyID
              this.$router.push({
                path: '/pay',
                name: 'pay',
                query: {
                  is_cart: 2
                },
                params: {
                  team_id: team_id,
                  goods_id: this.$route.query.id,
                  group_id: this.$route.query.group_id
                }
              })
            })
          }else{
            this.$toast({
              message: '获取订单失败',
              type: 'fail',
              duration: 1000
            })
          }
        })
        .catch((err)=>{
          console.log('comfirmOrder err',err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .popup-footer
    position: absolute 
    bottom: 0
    box-sizing: border-box
    width: 100%
    height: 12vw
    text-align: center
    font-size: 4vw
    font-family: PFB

    .btn-left
      display: inline-block
      width: 45%
      height: 10vw
      margin-top: 1vw
      line-height: 10vw
      color: #000
      background-color: #ffcf27
      border-top-left-radius: 5vw
      border-bottom-left-radius: 5vw

    .btn-right
      display: inline-block
      width: 45%
      height: 10vw
      line-height: 10vw
      margin-top: 1vw
      color: #fff
      // background: linear-gradient(to right, #FE7503, #FE4C02);
      background-color: #FF5756
      border-top-right-radius: 5vw
      border-bottom-right-radius: 5vw
    
    .btn-confirm
      display: inline-block
      width: 100%
      height: 100%
      line-height: 12vw
      font-family: PFH
      font-size: 4vw
      color: #fff
      background-color: #FF5756
</style>


