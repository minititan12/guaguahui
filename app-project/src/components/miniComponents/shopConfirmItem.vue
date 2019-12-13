<template>
  <div class="shopItem" v-if="data">
    <!-- 商店标题 -->
    <div class="shopItem-shop">
      <van-icon color="#B9B9B9" name="shop-o" />
      <span class="shop-name" @click="handleShopClick">{{data.shop_name}}</span>
    </div>

    <!-- 商店订单列表内容 -->
    <div class="shopItem-content">

      <div class="goodItem" v-for="item of data.good_list">
        <div class="goodItem-img" @click= "handleImgClick">
          <van-image
            width="25vw"
            height="25vw"
            fit="contain"
            :src="item.photo"
            style="-webkit-touch-callout: none"
          />
        </div>

        <div class="goodItem-middle">
          <span class="goodItem-title" @click= "handleTitleClick">{{item.goods_name}}</span>
          <span class="goodItem-desc">{{getDesc(item)}}</span>
        </div>

        <div class="goodItem-right">
          <div>
            <span class="right-icon">￥</span>
            <span class="right-price">{{item.price}}</span>
          </div>
          <span class="right-number">x{{item.number}}</span>
        </div>
      </div>

    </div>

    <!-- <van-divider /> -->

    <van-cell 
      title="优惠劵" 
      is-link icon="coupon" 
      :value="getCouponVal()"
      @click="handleToAccessCoupon(data)"
      v-show="showCoupon"
    />

    <!-- 底下价格数量描述 -->
    <div class="shopItem-bottom">
      <span class="bottom-number">共 {{getAllNumber(data.good_list)}} 件</span>
      <span class="bottom-text">小计:</span>
      <span class="bottom-icon">￥</span>
      <span class="bottom-price">{{getTotalPrice(data.good_list)}}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: "ShopConfirmItem",
  props: {
    data: Object
  },
  data(){
    return {
      couponVal: '',
      couponData: null,
      showCoupon: true
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    handleImgClick(){
      this.$emit('imgClick')
    },
    handleTitleClick(){
      this.$emit('titleClick')
    },
    handleShopClick(){
      this.$emit('shopClick')
    },

    //获取总数量
    getAllNumber(list){
      let result = 0
      for(let item of list){
        result = result + item.number
      }

      return result
    },

    //获取总价格
    getTotalPrice(list){
      let result = 0
      for(let item of list){
        let total = parseInt(item.number) * parseFloat(item.price)
        result = result + total
      }
      if(this.data.hasOwnProperty('coupon')){
        result = result - this.data.coupon.value
      }

      return result.toFixed(2)
    },

    //获取描述
    getDesc(data){
      let attr1Desc = ''
      let attr2Desc = ''
      let attr3Desc = ''
      if(data.hasOwnProperty('attr1_name') && data.attr1_value.length > 0 ){
        attr1Desc = data.attr1_name + ':' + data.attr1_value + " "
      }

      if(data.hasOwnProperty('attr2_name') && data.attr2_value.length > 0 ){
        attr2Desc = data.attr2_name + ':' + data.attr2_value + " "
      }

      if(data.hasOwnProperty('attr3_name') && data.attr3_value.length > 0 ){
        attr3Desc = data.attr3_name + ':' + data.attr3_value + " "
      }
      
      let desc = attr1Desc + attr2Desc + attr3Desc
      return desc
    },

    //获取优惠劵描述
    getCouponVal(){
      if(this.couponData){
        if(this.data.hasOwnProperty('coupon')){
          let result = '-￥' + this.data.coupon.value

          return result
        }else{
          let num = this.couponData.list.length
          let result = '可用' + num + '张'
          
          return result
        }
      }
    },

    //进入获取优惠劵页面
    handleToAccessCoupon(){
      let data = {
        ...this.couponData,
        shop_id: this.data.shop_id
      }

      let s = JSON.stringify(data)
      this.$router.push({
        path: "/accessCoupon",
        name: 'accessCoupon',
        params: {
          data: s
        }
      })
    },

    //获取strs属性
    getStrs(){
      let result = []
      for(let item of this.data.good_list){
        result.push({
          goods_attr_id: item.id,
          num: item.number
        })
      }

      return result
    },

    //获取goods_id属性
    getGoodsID(){
      let result = []
      for(let item of this.data.good_list){
        result.push(item.goods_id)
      }

      return result.join(',')
    },

    //获取可用优惠劵信息
    getAccessCouponData(){
      let postData = {
        user_id: this.userData.id,
        company_id: this.data.good_list[0].shop_id,
        strs: this.getStrs(),
        goods_id: this.getGoodsID()
      }
      axios.post('api/method/getShopCoupons',postData)
        .then((res)=>{
          console.log('getShopCoupons',res.data)
          if(res.data.code == 1){
            if(res.data.data.list.length > 0){
              this.couponData = res.data.data
            }else{
              this.showCoupon = false
            }
          }
        })
        .catch((err)=>{
          console.log('getShopCoupons err',err)
        })
    }
  },
  created(){
    if(this.data){
      this.getAccessCouponData()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopItem
    width: 94%
    font-family: PFB
    margin: .2rem auto
    color: #000
    background-color: #fff
    border-radius: .2rem
    padding: 0 .3rem
    box-sizing: border-box
    .shopItem-shop
      width: 100%
      line-height: 10vw
      display: flex
      align-items: center
      .van-icon-shop-o
        font-size: 5vw
        margin-right: 1vw
      .shop-name
        font-size: 4vw
      .shop-status
        float: right
        color: #E41436


    .shopItem-content
      width: 100%
      .goodItem
        width: 100%
        display: flex
        flex-direction: row
        justify-content: space-around
        margin-bottom: 3vw
        .goodItem-img
          width: 25vw
          height: 25vw
          border-radius: 3vw
          overflow: hidden
          box-shadow: 0 0 2vw 1vw #eee
        .goodItem-middle
          width: 50%
          font-size: 3.3vw
          display: flex
          margin-left: 2vw
          flex-direction: column
          align-items: flex-start
          .goodItem-title
            margin: 1vw 0
            color: #444
          .goodItem-desc
            font-family: PFM
            color: #B9B9B9
            margin-top: 3vw
        .goodItem-right
          display: flex
          flex-direction: column
          align-items: flex-end
          .right-icon
            font-size: 3vw
          .right-price
            font-size: 3.5vw
            font-family: hgzt
          .right-number
            color: #B9B9B9
            font-family: PFM

    .van-divider
      margin: 1vw 0 0 0

    .van-cell
      padding: 2vw 3vw
      font-size: 3.5vw
      color: #000
      .van-icon-coupon
        font-size: 5vw
        color: #FE5655
      .van-cell__value
        color: #000
        


    .shopItem-bottom
      width: 100%
      height: 10vw
      display: flex
      flex-direction: row
      justify-content: flex-end
      align-items: center
      .bottom-number
        font-size: 3vw
        margin-right: 2vw
      .bottom-icon
        font-size: 3vw
        padding-top: 1vw
        margin-left: 1vw
        color: #FE5655
      .bottom-price
        font-size: 4vw
        font-family: hgzt
        color: #FE5655
</style>