<template>
  <div class="bottom-wrapper">
    <div class="select-all">
      <!-- <input type="checkbox" v-model="allChecked"> -->
      <van-checkbox icon-size="6vw" checked-color="#FF5756" v-model="allChecked" />
      <span class="select-text">全选</span>
    </div>
    <div class="all-price">
      <span class="price-text">合计:</span>
      <span class="price-number">￥{{selectedListTotalPrice}}</span>
      <div class="price-btn" @click="handleToConfirmClick">结算</div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: "CartBottom",
  data() {
    return{
      allChecked: false
    }
  },
  computed: {
    ...mapState(['cart','selectedListTotalPrice','userData','selectedList','selectedAll'])
  },
  methods: {
    ...mapMutations(['addConfirmList','changeSelectedID','updateSelectedAll','countConfirmTotalPrice','updatedConfirmData']),
    handleToConfirmClick(){
      if(this.selectedList.length > 0){
        //选择列表转移到待确认列表
        // this.addConfirmList()
        // this.countConfirmTotalPrice()
        let goods_list = []
        for(let item of this.selectedList){
          goods_list.push({
            goods_attr_id: item.goods_attr_id,
            number: item.number
          })
        }

        let postData = {
          user_id: this.userData.id,
          goods_list: goods_list
        }

        console.log('confirm postData:',postData)
        axios.post('api/method/comfirmOrder',postData)
          .then((res)=>{
            console.log('comfirmOrder:',res.data)
            if(res.data.code == 1){
              this.updatedConfirmData(res.data.data)

              this.$nextTick(()=>{
                this.$router.push({
                  path: '/pay',
                  query: {
                    is_cart: 1
                  }
                })
              })
            }
          })
          .catch((err)=>{
            console.log('comfirmOrder err',err)
          })

      }else{
        this.$toast({
          message: "请先选择要支付商品",
          duration: 1200
        })
      }
    }
  },
  watch: {
    allChecked(){
      if(!this.cart.length){
        console.log(this.allChecked)
        this.$toast({
          message: "请添加商品",
          duration: 1200
        });
        if(this.allChecked){
          this.$nextTick(()=>{
            this.allChecked = false
          })
        }
      }else{
        if(this.allChecked){
          this.updateSelectedAll(true)
        }else{
          this.updateSelectedAll(false)
        }
      }
    },
    selectedAll(){
      if(this.selectedAll){
        if(this.allChecked == false){
          this.allChecked = true
        }
      }else{
        if(this.allChecked){
          this.allChecked = false
        }
      }
    }
  },
  activated(){
    this.allChecked = false
    this.updateSelectedAll(false)
  }
}
</script>

<style lang="stylus" scoped>
  .bottom-wrapper
    width: 100%
    height: 12vw
    position: absolute
    bottom: 0
    z-index: 2
    background-color: #fff
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    box-sizing: border-box
    border-top: 1px solid #eee
    .select-all
      display: flex
      flex-direction: row
      margin-left: 6vw
      align-items: center
      .select-text
        color: #AFAFAF
        margin-left: 3vw
        font-family: PFM
    .all-price
      height: 100%
      display: flex
      flex-direction: row
      align-items: center
      font-family: PFB
      .price-number
        font-family: hgzt
        color: #ff5756
      .price-btn
        width: 18vw
        height: 8vw
        font-size: 3.6vw
        font-family: PFB
        text-align: center
        line-height: 8vw
        background-color: #ff5756
        margin: 0 3vw
        border-radius: 4vw
        color: #fff
    .bottom-warn
      position: absolute 
      width: 2rem
      height: .8rem
      font-size: .3rem
      line-height: .8rem
      text-align: center
      color: #eee
      border-radius: .2rem
      top: -40vh
      left: calc(50vw - 1rem)
      background-color: rgba(0,0,0,0.3)
</style>
