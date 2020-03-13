<template>
  <div class="message-items">
    <div 
      class="shopItem" 
      v-for="item of shopItems"
      @click="handleToService(item.shop_user_id,item.company,item.shop_img)"
    >
      <van-swipe-cell style="width: 100%">
        <div class="item-left">
          <van-image
            class="left-img"
            fit="cover"
            width=".8rem"
            height=".8rem"
            :src="'public' + item.shop_img"
          />
          <span class="text">{{item.company}}</span>
        </div>
        
        <span class="num" v-if="getMessageNum(item.shop_user_id)">{{getMessageNum(item.shop_user_id)}}</span>
        <template slot="right">
          <van-button @click="handleDel(item.shop_user_id)" square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getuserchat,userDetails,deleteshat } from '../../../../utils/axios/request'
export default {
  name: "MessageItems",
  data(){
    return {
      shopItems: []
    }
  },
  computed:{
    ...mapState(['userData','answer','newAnswer']),
    shopIds(){
      let shopIds = []
      if(this.newAnswer){
        for(let key in this.newAnswer){
          shopIds.push(key)
        }
        return shopIds
      }
    }
  },
  methods: {
    ...mapMutations(['addNewAnswerToAnswer','updatedMessageNum','updateNewAnswer','delNewAnswer']),
    initMessageData(){
      let postData = {
        user_id: this.userData.id
      }
      getuserchat(postData)
        .then((res)=>{
          console.log('getuserchat',res.data)
          if(res.data.code == 1){
            let result = []
            for(let item of res.data.data){
              result.push({
                company: item.company[0].company,
                shop_img: item.company[0].shop_img,
                shop_user_id: item.shop_user_id
              })
            }
            this.shopItems = result
            this.updateNewAnswer(res.data.data)
          }
        })
        .catch((err)=>{
          console.log('getuserchat err',err)
        })
    },
    updateMessage(){
      if(this.shopIds.length){
        let postData = {
          user_id: this.shopIds
        }
        userDetails(postData)
          .then((res)=>{
            console.log('userDetails',res.data)
            if(res.data.code == 1){
              let result = []
              for(let item of res.data.data){
                result.push({
                  company: item.company,
                  shop_img: item.shop_img,
                  shop_user_id: item.user_id
                })
              }
              this.shopItems = result
            }
          })
          .catch((err)=>{
            console.log('userDetails err:',err)
          })
      }
    },
    handleToService(id,shopName,shop_img){
      this.addNewAnswerToAnswer(id)
      this.updatedMessageNum()
      this.$router.push({
        path: '/service',
        query: {
          id: id,
          shopName: shopName,
          shop_img: shop_img,
        }
      })
    },
    getMessageNum(id){
      for(let key in this.newAnswer){
        if(key == id){
          return this.newAnswer[key].length
        }
      }
      return false
    },
    handleDel(shop_user_id){
      console.log(shop_user_id)
      let postData = {
        shop_user_id: shop_user_id,
        user_id: this.userData.id
      }

      deleteshat(postData)
        .then((res)=>{
          console.log('deleteshat',res.data)
          if(res.data.code == 1){
            this.delNewAnswer(shop_user_id)
            this.initMessageData()
          }
        })
        .catch((err)=>{
          console.log('deleteshat',err)
        })
    }
  },
  watch: {
    newAnswer(){
      this.updateMessage()
    }
  },
  mounted(){
    this.initMessageData()
    // this.initMessage()
  }
}
</script>

<style lang="stylus" scoped>
  .message-items
    width: 100vw
    .shopItem
      width: 95vw
      margin: .2rem auto
      height: 15vw
      background-color: #fff
      border-radius: .2rem
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      padding: 0 .2rem 
      box-sizing: border-box
      .item-left
        display: flex
        flex-direction: row
        align-items: center
        .left-img
          margin-right: .2rem
      .num
        position: absolute 
        right: 0
        top: 2vw
        margin-right: 2vw
        display: block
        background-color: #FD4140
        width: 6vw
        height: 6vw
        line-height: 6vw
        text-align: center
        border-radius: 3vw
        color: #fff
</style>