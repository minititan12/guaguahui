<template>
  <div>
    <mescroll-vue :down="down" :up="up" @init="init">
      <div class="cart-items">

        <ShoppingWarn></ShoppingWarn>

        <div class="cart-item" v-for="item of cart" v-if="showCartList" ref="cartItems">

          <div class="item-shop" @click="handleToShop(item.user_id_to)">
            <van-icon size="20px" class="shopIcon" color="#FF5756" name="wap-home"/>
            <span class="shopName">{{item.shop}}</span>
            <van-icon name="arrow" />
          </div>

          <div class="item-top">
            <input type="checkbox" :id="item.id" :value="item.id" v-model="checkedNames" v-show="false">

            <div @click="handleSelect(item.id)" class="item-input" :class="getStatusOfItem(item.id) ? 'active': 'unactive'">
              <span class="iconfont">&#xe615;</span>
            </div>

            <div class="item-img" @click="handleToProduct(item.goods_id)">
              <van-image
                width="22vw"
                height="22vw"
                fit="contain"
                :src="item.imgUrl"
                style="-webkit-touch-callout: none"
              />
            </div>

            <div class="item-right" @click="handleToProduct(item.goods_id)">
              <span class="item-title">{{item.title}}</span>
              <span class="item-desc">{{getDesc(item)}}</span>
            </div>
          </div>

          <div class="item-bottom">
            <span class="item-del" @click="handleDel(item.id)">删除</span>

            <span class="item-price">￥{{item.price}}</span>

            <div class="item-number">
              <div class="number-minus" @click="handleNumberMinus(item.id)">
                <span class="iconfont">&#xe606;</span>
              </div>
              <span class="number-text">{{item.number}}</span>
              <div class="number-add" @click="handleNumberAdd(item.id)">
                <span class="iconfont">&#xe608;</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import ShoppingWarn from './shoppingWarn'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { mapState , mapMutations} from 'vuex'
import { delCart } from '../../../../utils/axios/request'
export default {
  name: "CartItems",
  components:{
    ShoppingWarn,
    MescrollVue
  },
  data(){
    return {
      checkedNames: [],
      down:{
        htmlContent:'<div class="droping"><p class="downwarp-progress"></p><p class="downwarp-tip"></p></div><div class="refreshing"><p class="loading"></p><img class="loading-img" src="/public/uploads/home/load.png" alt=""><span>加载中...</span></div>',
        inited:(mescroll, downwarp)=>{
          mescroll.droping = downwarp.querySelector('.droping');
          mescroll.refreshing = downwarp.querySelector('.refreshing');
        },
        inOffset:(mescroll)=>{
          mescroll.droping.style.display="block";
          mescroll.refreshing.style.display="none";
          mescroll.droping.querySelector('.downwarp-tip').innerText = "下拉刷新";
        },
        outOffset:(mescroll)=>{
          mescroll.droping.querySelector('.downwarp-tip').innerText = "释放刷新";
        },
        onMoving(mescroll, rate, downHight){
          let deg = 0;
          deg = parseInt(downHight)*4.5;
          mescroll.droping.querySelector('.downwarp-progress').style.transform = "rotate("+ deg +"deg)";
        },
        showLoading:(mescroll)=>{
          mescroll.droping.style.display="none";
          mescroll.refreshing.style.display="block";
        },
        auto:false,
        callback:(mescroll)=>{
          this.updateCartRefreshStatus(true)
        }
      },

      up:{
        use: false
      }
    }
  },
  computed: {
    ...mapState(['cart','selectedAll','userData','cartRefresh']),
    showCartList(){
      if(this.cart.length > 0){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['editCommodity','changeSelectedID','updateSelectedList','updateSelectedAll','updateCartRefreshStatus']),
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },
    //获取描述
    getDesc(item){
      let attr1Desc = item.attr1_name.length > 0 ? (item.attr1_name + ":" + item.attr1_value + " ") : ""
      let attr2Desc = item.attr2_name.length > 0 ? (item.attr2_name + ":" + item.attr2_value + " ") : ""
      let attr3Desc = item.attr3_name.length > 0 ? (item.attr3_name + ":" + item.attr3_value): ""
      let desc = attr1Desc + attr2Desc + attr3Desc
      return desc
    },
    //处理购物车商品的选择
    handleSelect(value){
      console.log('handleselect',value)
      for(let i = 0; i < this.checkedNames.length; i++){
        if(this.checkedNames[i] == value){
          this.checkedNames.splice(i,1)
          return 
        }
      }
      this.checkedNames.push(value)
    },
    //判断这个item是否选中
    getStatusOfItem(id){
      let match = false
      for(let item of this.checkedNames){
        if(item == id){
          match = true
        }
      }
      return match
    },
    //处理数量减少
    handleNumberMinus(id){
      let cart = JSON.parse(JSON.stringify(this.cart))
      for(let item of cart){
        if(item.id == id){
          if(item.number > 1){
            item.number--
          }
        }
      }
      //更改购物车列表
      this.editCommodity(cart)
      //更新选中要购买的列表
      this.updateSelectedList()
    },
    //处理数量增多
    handleNumberAdd(id){
      let cart = [...this.cart]
      for(let item of cart){
        if(item.id == id){
          item.number++
        }
      }
      this.editCommodity(cart)
      this.updateSelectedList()
    },
    //处理删除商品
    handleDel(id){
      this.$dialog.alert({
        title: '删除商品',
        message: '确定删除该商品',
        showCancelButton: true   
      })
        .then(()=>{
          this.$toast({
            type: "loading",
            message: "删除中...",
            duration: 3000
          })
          let postData = {
            id: id,
            user_id: this.userData.id
          }
          delCart(postData)
            .then((res)=>{
              console.log(res.data)
              if(res.data.code == 1){
                this.$emit('delItemToRefresh')
                this.$toast.clear()
                //清除选择的商品id
                this.checkedNames = []
                this.changeSelectedID(this.checkedNames)
                //更新选择的商品列表
                this.updateSelectedList()
              }else{
                this.$toast({
                  type: "fail",
                  message: "删除失败",
                  duration: 1200
                })
              }
            })
            .catch((err)=>{
              console.log('post delcart err',err)
            })
        })
        .catch(()=>{
        })
    },
    handleToProduct(id){
      this.$router.push({
        path: "/product",
        query: {
          id: id
        }
      })
    },
    handleToShop(id){
      setTimeout(()=>{
        this.$router.push({
          path: '/shop',
          query: {
            shopID: id
          }
        })
      },250)
    }
  },
  mounted(){
    this.checkedNames = []
  },
  activated(){
    console.log(1)
    this.checkedNames = []
  },
  watch: {
    cartRefresh(){
      if(!this.cartRefresh){
        setTimeout(()=>{
          this.mescroll.endSuccess()
        },300)
      }
    },
    //监听选中的商品的id号
    checkedNames(){
      console.log('checkedNames',this.checkedNames)
      this.changeSelectedID(this.checkedNames)
      this.updateSelectedList()
      if(this.cart.length > 0 && this.checkedNames.length == this.cart.length){
        this.updateSelectedAll(true)
      }else{
        this.updateSelectedAll(false)
      }
    },
    selectedAll(){
      if(this.selectedAll){
        this.$nextTick(()=>{
          let cartList = JSON.parse(JSON.stringify(this.cart))
          let result = []
          for(let item of cartList){
            result.push(item.id)
          }
          this.checkedNames = result
        })
      }else{
        if(this.checkedNames.length == this.cart.length){
          console.log(this.checkedNames.length)
          console.log(this.cart.length)
          this.checkedNames = []
        }
      }
    }

  }
}
</script>

<style lang="stylus" scoped>
  >>> .mescroll
      position absolute
      left 0
      top 0
      height calc( 100% - 12vw) 
      overflow-x hidden
  >>> .mescroll-upwarp
      padding: 0

  >>> .droping
        .downwarp-tip
          color #FF5756
        .downwarp-progress
          border-color #FF5756
          border-bottom-color: transparent
  >>> .refreshing
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        color #FF5756
        .loading
          display inline-block
          width 4.2vw
          height 4.2vw
          margin-right 2vw
          border-radius 50%
          border 1px solid #FF5756
          border-bottom-color transparent
          vertical-align middle
          animation mescrollRotate .8s linear infinite
        .loading-img
          width: 6vw
          height: 5vw
          margin-right: 2vw

  >>> .cart-items
        .cart-item
          width: 94%
          margin: 3vw auto
          background-color: #fff
          display: flex
          flex-direction: column
          border-radius: 3vw

          .item-shop
            width: 100%
            height: 10vw
            display: flex
            align-items: center
            font-family: PFH
            font-size: 4vw
            padding-left: 11vw
            color: #000
            .shopName
              margin: 0 1vw

          .item-top
            width: 100%
            height: 25vw
            display: flex
            flex-direction: row
            align-items: center
            .item-input
              display: block
              width: 6vw
              height: 6vw
              margin: 0 2vw
              line-height: 6vw
              text-align: center
              box-sizing: border-box
              border: .01rem solid #ddd
              border-radius: 3vw
              background-color: #fff
              .iconfont
                color: #fff
                font-size: 4vw
            .active
              background-color: #FF5756
              border: .01rem solid #FF5756
            .unactive
              background-color: #fff
              border: .01rem solid #ddd

            .item-img
              width: 22vw
              height: 22vw
              border-radius: 2vw
              overflow: hidden
              box-shadow: 0 0 .2rem .1rem #eee
            .item-right
              width: 55%
              display: flex
              flex-direction: column
              margin-left: 4vw
              .item-title
                margin-bottom: 2vw
                font-size: 3.8vw
                font-family: PFB
                line-height: 4.5vw
                letter-spacing: .8vw
                color: #222
              .item-desc
                font-size: 3.5vw
                font-family: PFM
                color: #989898
            
          .item-bottom
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            margin: 3vw 0
            .item-del
              width: 14vw
              height: 6vw
              line-height: 6vw
              margin-left: 11vw
              color: #fff
              font-family: PFH
              background-color: #FF5756
              text-align: center
              border-radius: 3vw
            .item-price
              font-family: hgzt
              font-size: 4vw
              color: #FF5756
              margin-left: 6vw
            .item-number
              margin-right: 6vw
              display: flex
              flex-direction: row
              align-items: center
              font-size: 4vw
              background-color: #F2F2F2
              border-radius: 4vw
              .number-minus
                width: 7vw
                height: 7vw
                border-radius: 4vw
                display: flex
                align-items: center
                justify-content: center
                border: 1px solid #EDEDED
                box-sizing: border-box
                background-color: #fff
              .number-text
                margin: 0 2vw
                font-family: PFH
              .number-add
                width: 7vw
                height: 7vw
                border-radius: 4vw
                display: flex
                align-items: center
                justify-content: center
                color: #fff
                background-color: #FF5756
</style>


