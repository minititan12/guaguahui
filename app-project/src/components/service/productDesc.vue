<template>
  <div class="productDesc-wrapper">
    <van-image
      class="left-img"
      fit="cover"
      width="1.5rem"
      height="1.5rem"
      :src="data.img"
      @click="handleToProduct"
    />
    <div>
      <span class="title" @click="handleToProduct">{{data.title}}</span>
      <van-button color="#7232dd" size="small" @click="sendGoods">发送商品</van-button>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: "ProductDesc",
  props: {
    data: Object
  },
  computed:{
    ...mapState(['userData'])
  },
  methods: {
    ...mapMutations(['addAnswer']),
    handleToProduct(){
      this.$router.push({
        path: '/product',
        query: {
          id: this.data.goods_id
        }
      })
    },
    //缓存新窗口消息
    keepLocal(msg){
      let obj = {
        nickname: this.$route.query.shopName,
        avatar: '/public'+ this.$route.query.shop_img,
        timestamp: msg.sentTime
      }
      //用来存储的id也是存储对象的key
      let id = this.$route.query.id

      //如果本地有存储msgMap
      if(localStorage.msgMap){
        let map = JSON.parse(localStorage.msgMap)
        let match = false
        for(let key in map){
          if(key == id){
            match = true
            map[key] = obj
          }
        }

        if(!match){
          map[id] = obj
        }

        localStorage.msgMap = JSON.stringify(map)
      }else{//如果本地没有存储msgMap
        let map = {}
        map[id] = obj
        localStorage.msgMap = JSON.stringify(map)
      }
    },
    //服务器错误提醒
    serveErrorWarn(msg,time){
      this.$toast({
        message: msg,
        duration: time
      })
    },
    //发送富文本
    sendRichContent(text){
      let title = text.title  // 图文标题
      let content = text.content  // 图文内容
      let imageUri = text.imageUri  // 上传到自己服务器的 url
      let url = text.url  // 富文本消息点击后打开的 URL

      console.log('richMsg:',text)
      let msg = new RongIMLib.RichContentMessage({
        title: title,
        content: content,
        imageUri: imageUri,
        url: url,
        extra: {
          userName: this.userData.nickname
        }
      });

      let conversationType = RongIMLib.ConversationType.PRIVATE;// 单聊类型
      let targetId = this.$route.query.id + ''//必须为string
      let that = this

      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          console.log('发送富文本消息成功', message);
          that.keepLocal(message)
          let msg = {
            type: 2,
            css: 'right',
            text: message.content.content,
            message: message,
            shop_user_id: message.targetId,
            id: message.senderUserId,
            key: message.messageUId,
            timetamp: message.sentTime,
            img: message.content.imageUri,
            url: message.content.url
          }
          that.addAnswer(msg)
          that.$nextTick(()=>{
            that.$emit('enter')
          })
        },
        onError: function (errorCode) {
          console.log('发送富文本消息失败', errorCode);
          this.serveErrorWarn('发送失败',1300)
        }
      });
    },
    //发送商品富文本
    sendGoods(){
      let status = RongIMClient.getInstance().getCurrentConnectionStatus()
      if(status != 0){
        this.serveErrorWarn('服务器连接出错,发送失败',1500)
      }else{
        let url = process.env.VUE_APP_REQUEST_HOST + '/' + this.$route.query.product_img

        let msgUrl = process.env.VUE_APP_REQUEST_HOST + '/index1.html#/product?id=' + this.$route.query.goods_id

        let msg = {
          title: '呱呱汇商品',
          content: this.$route.query.goods_name,
          imageUri: url,
          url: msgUrl,
        }

        this.sendRichContent(msg)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .productDesc-wrapper
    width: 90vw
    margin: 2vw auto
    padding: .2rem 
    box-sizing: border-box 
    display: flex
    flex-direction: row
    align-items: center
    border-radius: .2rem
    border: 1px solid #999
    .left-img
      flex-shrink: 0
      margin-right: .2rem
    .title
      display: block
      margin-bottom: .2rem
      font-size: .3rem
      line-height: .4rem
      font-weight: bold
</style>