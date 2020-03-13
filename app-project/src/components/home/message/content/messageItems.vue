<template>
  <div class="message-items">
    <div 
      class="shopItem" 
      v-for="item of shopItems"
      @click="handleToService(item.id,item.nickname,item.avatar)"
    >
      <van-swipe-cell style="width: 100%">
        <div class="item-left">
          <van-image
            class="left-img"
            fit="cover"
            width=".8rem"
            height=".8rem"
            :src="item.avatar"
          />
          <span class="text">{{item.nickname}}</span>
        </div>
        
        <!-- <span class="num" v-if="getMessageNum(item.shop_user_id)">{{getMessageNum(item.shop_user_id)}}</span> -->
        <template slot="right">
          <van-button @click="handleDel(item.id)" square type="danger" text="删除" />
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
    ...mapState(['userData']),
  },
  methods: {
    //获取用户聊天会话数据
    getAllChatData(){
      let msgs = JSON.parse(localStorage.msgMap)
      let ary = []
      for(let key in msgs){
        ary.push({
          id: key,
          ...msgs[key]
        })
      }
      let result = ary.sort((a,b)=>{
        return b.timestamp - a.timestamp
      })

      this.shopItems = result
    },
    // 删除聊天会话
    handleDel(id){
      this.clearUnRead(id)

      //刷新下界面
      let result = []
      for(let obj of this.shopItems){
        if(obj.id != id){
          result.push(obj)
        }
      }
      this.shopItems = result
      
      //清除localStorage库存
      let msgs = JSON.parse(localStorage.msgMap)
      delete msgs[id]
      let str = JSON.stringify(msgs)
      localStorage.msgMap = str
    },

    //获取所有会话未读数
    getAllUnReadCount(){
      RongIMClient.getInstance().getTotalUnreadCount({
        onSuccess: function(count) {
          console.log('获取所有会话未读消息数成功', count);
          localStorage.setItem('unReadCount',count)
        },
        onError: function(error) {
          console.log('获取所有会话未读消息数失败', error);
        }
      })
    },

    //清除指定会话未读数
    clearUnRead(id){
      var conversationType = RongIMLib.ConversationType.PRIVATE;
      var targetId = id + '';
      RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
        onSuccess: function() {
          console.log('清除指定会话'+ id +'未读消息数成功');
        },
        onError: function(error) {
          console.log('清除指定会话未读消息数失败', error);
        }
      });
      this.getAllUnReadCount()
    },

    //跳转到聊天界面
    handleToService(id,shopName,shop_img){
      this.clearUnRead(id)
      this.$router.push({
        path: '/service',
        query: {
          id: id,
          shopName: shopName,
          shop_img: shop_img,
        }
      })
    },
  },
  created(){
    this.getAllChatData()
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