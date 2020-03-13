<template>
  <div class="serviceFooter-wrapper">
    <!-- <van-uploader>
      <van-button icon="photo" type="primary">上传文件</van-button>
    </van-uploader> -->
    <input v-model="inputValue" class="serviceFooter-input" type="text" placeholder="说出你的问题吧" @keyup="handleSendKeyUp($event)"/>
    <button class="btn-send" @click="handleSendClick">发送</button>
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
      productImg_base64: ""
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    ...mapMutations(['addAnswer']),
    keepText(text){
      let timetamp = Date.parse(new Date())
      let postData = {
        user_id: this.userData.id,
        shop_user_id: this.$route.query.id,
        content: text,
        attribute: 'right',
        timetamp: timetamp
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
    handleSendText(text){
      this.keepText(text)
      let that = this
      let msg = new RongIMLib.TextMessage({ content: text, extra: {
        userName: this.userData.nickname
      } });
      let conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的消息类型即可
      let targetId = this.$route.query.id + ''
      console.log(targetId)

      // console.log('method:',RongIMClient.getInstance().sendMessage)
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
              // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
              console.log('SendText successfully',message,message.content.content);
              let timetamp = Date.parse(new Date())
              let say = {
                type:1,
                css:'right',
                text: message.content.content,
                id: message.senderUserId,
                shop_user_id: message.targetId,
                goods_id: that.$route.query.goods_id,
                message: message,
                timetamp: timetamp
              }
              that.addAnswer(say)
              that.inputValue = ""
              that.$emit('enter')
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
              console.log('发送失败: ' + info + errorCode);
          }
      });
    },
    sendRongYunText(text) {
      let that = this
      //如果融云没有成功链接
      if(localStorage.hasOwnProperty('rongYunStatus') && localStorage.rongYunStatus == 'false'){
      RongIMClient.reconnect({
          onSuccess: function(userId) {
            console.log('reconnect success. ' + userId);
            that.handleSendText(text)
          },
          onTokenIncorrect: function() {
            console.log('token 无效');
          },
          onError: function(errorCode) {
            console.log(errorcode);
          }
        })
      }else{
        that.handleSendText(text)
      }
    },
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
    sendImg(base64,imageurl){
            /*
      图片转为可以使用 HTML5 的 FileReader 或者 canvas 也可以上传到后台进行转换。

      注意事项：
          1、缩略图必须是 base64 码的 jpg 图。
          2、不带前缀。
          3、大小建议不超过 100 K。
      */
      let that = this
      let base64Str = base64;
      let imageUri = imageurl; // 上传到自己服务器的 URL。
      let msg = new RongIMLib.ImageMessage({content: base64Str, imageUri: imageUri});
      let conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的会话类型即可
      let targetId = this.$route.query.id; // 目标 Id
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
    handleSendClick(){
      if(this.inputValue.length){
        this.sendRongYunText(this.inputValue)
      }
    },
    handleSendKeyUp(e){
      if(e.keyCode == 13 && this.inputValue.length){
        this.sendRongYunText(this.inputValue)
      }
    }
  },
  created(){
    let url = this.$route.query.product_img
    this.getBase64(url,(base64)=>{
      this.productImg_base64 = base64
    })
  },
  mounted(){
    // this.sendImg(this.productImg_base64,this.$route.query.product_img,true)
    // this.sendText(this.$route.query.goods_name,true)
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
    justify-content: center
    border-top: 1px solid #ddd
    .serviceFooter-input
      width: 70%
      height: 60%
      background-color: #F6F6F8
      padding: 0 .3rem
      border-radius: .4rem
      color: #A5A2B7
      &::placeholder
        color: #A5A2B7
    .btn-send
      width: 15%
      height: 60%
      margin-left: .3rem
      border-radius: .3rem
      background-color: #7232dd
      color: #fff
</style>