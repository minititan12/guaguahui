<template>
  <div class="comment-wrapper">
    <van-sticky>
      <van-nav-bar title="评价" left-arrow @click-left="handleBackClick"/>
    </van-sticky>

    <div class="comment-warn" v-if="showWarn">
      <span class="iconfont">&#xe605;</span>
      <span class="warn-text">您没有可评论的订单</span>
    </div>

    <OrderItem 
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
import OrderItem from '../../components/miniComponents/orderItem'
import { getMyOrder } from '../../utils/axios/request'
import { mapState } from 'vuex'
export default {
  name: "Comment",
  components: {
    OrderItem
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
      let result = []

      if(this.orderList && Object.keys(this.orderList).length > 0){
        for(let key in this.orderList){
          result.push({
            orderNumber: key,
            goodsList: this.orderList[key]
          })
        }
      }
      return result
    }
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    handleCommentClick(data){
      this.$router.push({
        path: "/commentContent",
        name: "commentContent",
        query: {
          order_number: data.orderNumber,
        },
      })
    },
    getCommentData(){
      let postData = {
        user_id: this.userData.id,
        status: 1
      }
      console.log(postData)
      getMyOrder(postData)
        .then((res)=>{
          console.log('commentdata',res.data)
          this.orderList = res.data.data;
          if(Object.keys(this.orderList).length > 0){
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