<template>
  <div class="serviceFooter-wrapper">
    <input v-model="inputValue" class="serviceFooter-input" type="text" placeholder="说出你的问题吧" @keyup="handleSendKeyUp($event)"/>
    <!-- <van-uploader :after-read="afterRead">
      <button class="imgBtn">
        <van-icon name="photo"/>
      </button>
    </van-uploader> -->
    <button class="btn-send" @click="handleSendClick">发送</button>
    <img src="" alt="">
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { storagecontent } from '../../utils/axios/request'
export default {
  name: "ServiceFooter",
  data(){
    return {
      inputValue: "",
      productImg_base64: "",
      imgBase64: '',
      rongYunConnect: false
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    ...mapMutations(['addAnswer']),
    //图片加载读取成功
    afterRead(file,detail){
      console.log('file:',file)
      console.log('detail',detail)
    },

    //把url转为base64
    getBase64(url,callback){
      let xhr = new XMLHttpRequest();
      xhr.onload = function() {
          let reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    },

    //服务器出错提醒
    serveErrorWarn(msg,time){
      if(!msg){
        msg = '服务器出错'
      }
      this.$toast({
        message: msg,
        duration: time
      })
    },
    
    //保存文本
    keepText(text){
      let timetamp = Date.parse(new Date())
      let postData = {
        user_id: this.userData.id,
        shop_user_id: this.$route.query.id,
        content: {
          content: text
        },
        attribute: 'right',
        timetamp: timetamp,
        message_type: 1
      }
      console.log(postData)

      storagecontent(postData)
        .then((res)=>{
          console.log(res.data)
        })
        .catch((err)=>{
          console.log('storagecontent err',err)
        })
    },

    //缓存新窗口消息
    keepLocal(msg){
      let obj = {
        nickname: this.$route.query.shopName,
        avatar: this.$route.query.shop_img,
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

    //重新连接融云
    reconnectRongYun(){
      let status = RongIMClient.getInstance().getCurrentConnectionStatus()
      let that = this

      let config = {
        auto: true,
        url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js?d=' + Date.now(),
        rate: [100, 1000, 3000, 6000, 10000]
      }

      let callback = {
        onSuccess: function(userId) {
          console.log('reconnect success. ' + userId);
        },
        onTokenIncorrect: function() {
          console.log('token 无效');
          let msg = 'token 无效,尝试重新连接'
          that.serveErrorWarn(msg,2000)
        },
        onError: function(errorCode) {
          console.log(errorcode);
          let msg = '连接出错' + errorcode + '，尝试重新连接'
          that.serveErrorWarn(msg,2000)
        }
      }

      if(status != 0){
        RongIMClient.reconnect(callback,config)
      }else{
        console.log('融云连接成功')
      }
    },

    //发送文本
    sendText(text){
      //在本地保存发送的内容
      this.keepText(text)

      let that = this
      let msg = new RongIMLib.TextMessage({ content: text, extra: {
        userName: this.userData.nickname
      } });
      let conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊类型
      let targetId = this.$route.query.id + ''//必须为string

      console.log('targetId:',targetId)

      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
              console.log('SendText successfully',message,message.content.content);
              that.keepLocal(message)
              let timetamp = Date.parse(new Date())
              let say = {
                type:1,
                css:'right',
                text: message.content.content,
                id: message.senderUserId,
                shop_user_id: message.targetId,
                key: message.messageUId,
                goods_id: that.$route.query.goods_id,
                message: message,
                timetamp: timetamp
              }
              that.addAnswer(say)
              that.inputValue = ""
              that.$nextTick(()=>{
                that.$emit('enter')
              })
          },
          onError: function (errorCode, message) {
              let info = '';
              that.serveErrorWarn('发送失败',1200)
              switch (errorCode) {
                  case RongIMLib.ErrorCode.TIMEOUT:
                      info = '超时';
                      break;
                  case RongIMLib.ErrorCode.UNKNOWN:
                      info = '未知错误';
                      break;
                  case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                      info = '在黑名单中，无法向对方发送消息';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                      info = '不在讨论组中';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_GROUP:
                      info = '不在群组中';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                      info = '不在聊天室中';
                      break;
              }
              console.log('发送失败: ' + info + errorCode);
          }
      });
    },


    //发送富文本消息
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
        url: url
      });

      let conversationType = RongIMLib.ConversationType.PRIVATE;// 单聊类型
      let targetId = this.$route.query.id + ''//必须为string

      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          console.log('发送富文本消息成功', message);
        },
        onError: function (errorCode) {
          console.log('发送富文本消息失败', errorCode);
        }
      });
    },

    //发送融云图片
    sendImg(base64,imageurl){
      let that = this
      let base64Str = base64;
      let imageUri = process.env.VUE_APP_REQUEST_HOST + '/' + imageurl; // 上传到自己服务器的 URL。
      console.log(base64Str)
      console.log(imageUri)
      let msg = new RongIMLib.ImageMessage({content: base64Str, imageUri: imageUri});
      let conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的会话类型即可
      let targetId = this.$route.query.id + ''; // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
              // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
              console.log(message)
              console.log('SendImg successfully');
              let timetamp = Date.parse(new Date())
              let say = {
                type: 2,
                css:'right',
                img:message.content.imageUri,
                id: message.senderUserId,
                shop_user_id: message.targetId,
                goods_id: that.$route.query.goods_id,
                message: message,
                timetamp: timetamp
              }
              that.addAnswer(say)
              that.inputValue = ""
          },
          onError: function (errorCode, message) {
              let info = '';
              that.$toast({
                message: '发送失败',
                duration: 1200
              })
              switch (errorCode) {
                  case RongIMLib.ErrorCode.TIMEOUT:
                      info = '超时';
                      break;
                  case RongIMLib.ErrorCode.UNKNOWN:
                      info = '未知错误';
                      break;
                  case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                      info = '在黑名单中，无法向对方发送消息';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                      info = '不在讨论组中';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_GROUP:
                      info = '不在群组中';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                      info = '不在聊天室中';
                      break;
              }
              console.log('发送失败:' + info + errorCode);
          }
      })
    },

    //点击发送按钮
    handleSendClick(){
      if(this.inputValue.length){
        let status = RongIMClient.getInstance().getCurrentConnectionStatus()
        if(status == 0){
          this.sendText(this.inputValue)
        }else{
          this.serveErrorWarn(null,1500)
        }
      }
    },

    //输入发送按钮
    handleSendKeyUp(e){
      if(e.keyCode == 13 && this.inputValue.length){
        if(status == 0){
          this.sendText(this.inputValue)
        }else{
          this.serveErrorWarn(null,1500)
        }
      }
    }
  },
  created(){
    // 重新判断融云连接状态并重连
    this.reconnectRongYun()
  }
}
</script>

<style lang="stylus" scoped>
  .serviceFooter-wrapper
    width: 100%
    height: 12vw
    position: fixed 
    left: 0
    bottom: 0
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-around
    border-top: 1px solid #ddd
    background-color: #fff
    .van-uploader
      // width: 5vw
    .serviceFooter-input
      width: 70%
      height: 9vw
      font-size: 4vw
      background-color: #F6F6F8
      padding: 0 4vw
      border-radius: 5vw
      color: #A5A2B7
      // background-color: green
      &::placeholder
        color: #A5A2B7
    .imgBtn
      width: 8vw
      height: 8vw
      background-color: #07c160
      color: #fff
      margin-right: -2vw
    .btn-send
      width: 15%
      height: 60%
      border-radius: 4vw
      background-color: #07c160
      color: #fff
</style>