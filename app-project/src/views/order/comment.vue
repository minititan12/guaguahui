<template>
  <div class="comment-wrapper">
    <van-sticky>
      <van-nav-bar title="评价" left-arrow @click-left="handleBackClick"/>
    </van-sticky>

    <div class="comment-warn" v-if="showWarn">
      <span class="iconfont">&#xe605;</span>
      <span class="warn-text">您没有可评论的订单</span>
    </div>

    <PayItem 
      style="margin-top: .2rem" 
      :data="item" 
      :showComment="true" 
      v-for="item of list"
      @comment="handleCommentClick(item)"
      @imgClick= "handleGoodClick(item.goods_id)"
      @titleClick= "handleGoodClick(item.goods_id)"
      @shopClick= "handleShopClick(item.user_id_to)"
    />
  </div>
</template>

<script>
import PayItem from '../../components/miniComponents/payItem'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: "Comment",
  components: {
    PayItem
  },
  data(){
    return {
      orderList: [],
      showWarn: false
    }
  },
  computed:{
    ...mapState(['userData']),
    list(){
      if(this.orderList.length > 0){
        let result = []
        for(let item of this.orderList){
          result.push({
            originData: item,
            attr1_name: item.attr1_name,
            attr1_value: item.attr1_value,
            attr2_name: item.attr2_name,
            attr2_value: item.attr2_value,
            attr3_name: item.attr3_name,
            attr3_value: item.attr3_value,
            imgUrl: item.photo.photo,
            price: item.price,
            totalPrice: item.amount,
            shop: item.shop.company,
            number: item.number,
            title: item.title.goods_name,
            orderNumber: item.order_number,
            goods_id: item.goods_id,
            goods_attr_id: item.goods_attr_id,
            user_id: item.user_id,
            user_id_to: item.user_id_to,
            status: item.status
          })
        }

        return result
      }
    }
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    handleCommentClick(data){
      let attr1_desc = data.attr1_name.length > 0 ? (data.attr1_name + ':'+ data.attr1_value + " ") : ""
      let attr2_desc = data.attr2_name.length > 0 ? (data.attr2_name + ':'+ data.attr2_value + " ") : ""
      let attr3_desc = data.attr3_name.length > 0 ? (data.attr3_name + ':'+ data.attr3_value + " ") : ""

      let descText = attr1_desc + attr2_desc + attr3_desc
      this.$router.push({
        path: "/commentContent",
        name: "commentContent",
        query: {
          goods_id: data.goods_id,
          shop_id: data.user_id_to
        },
        params: {
          photo: data.imgUrl,
          title: data.title,
          orderNumber: data.orderNumber,
          descText: descText,
        }
      })
    },
    getCommentData(){
      let postData = {
        user_id: this.userData.id,
        status: 1
      }
      console.log(postData)
      axios.post('api/method/getMyOrder',postData)
        .then((res)=>{
          console.log('commentdata',res.data)
          this.orderList = res.data.data
          if(this.orderList.length > 0){
            this.showWarn = false
          }else{
            this.showWarn = true
          }
        })
        .catch((err)=>{
          this.showWarn = true
          console.log('commentdata',err)
        })
    },
    handleGoodClick(goods_id){
      this.$router.push({
        path: '/product',
        query: {
          id: goods_id
        }
      })
    },

    handleShopClick(user_id_to){
      this.$router.push({
        path: '/shop',
        query: {
          shopID: user_id_to
        }
      })
    }
  },
  created(){
    this.getCommentData()
  }
}
</script>

<style lang="stylus" scoped>
  .comment-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  .comment-wrapper >>> .van-nav-bar__title
    font-size: 4vw
    font-family: PFH
    color: #000

  .comment-wrapper
    width: 100vw
    min-height: 100vh
    padding-bottom: .4rem
    background-color: #eee
    .comment-warn
      width: 100%
      margin: .5rem 0
      display: flex
      flex-direction: column
      align-items: center
      .iconfont
        font-size: .8rem
      .warn-text
        margin-top: .2rem
        font-size: .4rem
</style>