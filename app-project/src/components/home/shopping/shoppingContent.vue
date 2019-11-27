<template>
  <div class="shopping-wrapper">
    <ShoppingHeader></ShoppingHeader>
    <ShoppingCart @delItemToRefresh="delItemToRefresh"></ShoppingCart>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import ShoppingHeader from './content/shoppingHeader'
import ShoppingCart from './content/shoppingCart'
import axios from 'axios'
export default {
  name:"ShoppingContent",
  components: {
    ShoppingHeader,
    ShoppingCart
  },
  computed: {
    ...mapState(['userData','cartRefresh','login'])
  },
  methods: {
    ...mapMutations(['updateSelectedList','clearSelectedID','editCommodity','updateCartRefreshStatus']),
    //转化购物车的数据
    getCart(data){
      let result = []
      for(let item of data){
        result.push({
          attr1_name: item.attr1_name,
          attr1_value: item.attr1_value,
          attr2_name: item.attr2_name,
          attr2_value: item.attr2_value,
          attr3_name: item.attr3_name,
          attr3_value: item.attr3_value,
          id: item.id,
          goods_id: item.goods_id,
          goods_attr_id: item.goods_attr_id,
          number: item.number,
          price: item.price + '',
          imgUrl: item.goods_attr.photo,
          title: item.title.goods_name ? item.title.goods_name : item.title,
          shop: item.company.company,
          user_id_to: item.user_id_to
        })
      }

      return result
    },
    //获取购物车数据
    initCartData(type){
      if(type != 'refresh'){
        this.$toast({
          type: "loading",
          duration: 2000
        })
      }

      let postData = {
        user_id: this.userData.id
      }
      console.log(postData)
      axios.post('api/method/showCart',postData)
        .then((res)=>{
          console.log('showCart',res.data)
          if(res.data.code == 1){
            let cart = this.getCart(res.data.data)
            this.editCommodity(cart)
          }
          this.$toast.clear()
        })
        .catch((err)=>{
          this.$toast.clear()
          console.log('post showCart err',err)
        })
    },
    delItemToRefresh(){
      this.initCartData()
    }
  },
  mounted(){
    // this.clearSelectedID()
    // this.updateSelectedList()
    if(this.login){
      this.initCartData()
    }
  },
  activated(){
    this.initCartData()
    this.clearSelectedID()
    this.updateSelectedList()
  },
  updated(){
    this.clearSelectedID()
    this.updateSelectedList()
  },
  watch: {
    cartRefresh(){
      if(this.cartRefresh){
        this.initCartData('refresh')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopping-wrapper
    position: fixed 
    top: 0
    left: 0
    right: 0
    bottom: 13vw
</style>

