<template>
  <!-- v-touch:right="handleToRight" -->
  <div id="app">
    <transition name="slide-left"> 
			<keep-alive>
					<router-view v-if="$route.meta.keepAlive" class="transBox" ></router-view>
			</keep-alive>
		</transition>
			
		<transition name="slide-left"> 
				<router-view v-if="!$route.meta.keepAlive" class="transBox" key="trans2"></router-view>
		</transition>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import {get_user_id,getWxcode,signpackage,storagecontent,getRongYunToken} from './utils/axios/request'
import sha1 from 'sha1'
  export default {
    name:"App",
    data(){
      return {
        token:"",
        startX: 0,
        endX: 0
      }
    },
    computed:{
      ...mapState(['userData','wxTicket','openid']),
      name(){
        return this.$route.name
      }
    },
    methods: {
      ...mapMutations(['addAnswer','getNewAnswer','updatedMessageNum','updateWXTicket','changeLoginStatus','updateUserData','updatedUnReadServiceCount']),
      //更新用户信息
      initUserData(){
        if(localStorage.hasOwnProperty('gghToken')){
          get_user_id()
            .then((res)=>{
              console.log('get_user_id:',res.data)
              if(res.data.code == 1){
                this.updateUserData(res.data.data)
                localStorage.removeItem('userData')
                localStorage.userData = JSON.stringify(res.data.data)
                this.changeLoginStatus(true)
              }else{
                localStorage.removeItem('userData')
                this.changeLoginStatus(false)
              }
            })
            .catch((err)=>[
              console.log('post userid err' + err)
            ])
        }else{
          console.log('localstorage:',localStorage)
          this.changeLoginStatus(false)
        }
      },

      GetQueryString(name){
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
              return unescape(r[2]);
          }
          return null;
      },

      // 微信浏览器里面设置授权
      authorization(){
        if(/MicroMessenger/.test(window.navigator.userAgent)){
          if(!this.openid){
            let pageUrl = window.location.href;
            let str = "#";
            let indexOf = pageUrl.indexOf(str);
            if(indexOf == -1){
              return;
            }
            let path = pageUrl.slice(indexOf+str.length);
            path = path.replace('&','');
            let base64 = btoa(path)
            let postData = {
              url: base64
            }
            console.log('getWxcode:',postData)

            getWxcode(postData)
              .then((res)=>{
                console.log('getOpenid',res.data)
              })
              .catch((err)=>{
                console.log('getOpenid err',err)
              })

            this.$dialog.alert({
              title: '授权',
              message: '是否授权呱呱汇访问微信用户信息',
              showCancelButton: true   
            }).then(()=>{
              window.location.href= '/index/index/index2?url='+ base64;
            }).catch(()=>{
              WeixinJSBridge.call('closeWindow');
            })
          }
        }
      },

      // 判断如果是在微信内部浏览器 获取openid
      getopenid(){
        console.log(this);
        if(/MicroMessenger/.test(window.navigator.userAgent)){
          var openid = this.GetQueryString('openid');
          this.$store.state.openid = openid
          console.log('是在微信 OPENID:', this.$store.state.openid)
          
          let postData = {
            url:window.location.href
          }
          signpackage(postData)
            .then((res) => {
              //加载配置
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp , // 必填，生成签名的时间戳
                nonceStr:  res.data.nonceStr, // 必填，生成签名的随机串
                signature:  res.data.signature,// 必填，签名
                jsApiList: ['chooseWXPay','updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
              });
          
            }).catch((err) => {}) 
        }
      },

      //向右滑动跳转
      handleToRight(){
        console.log(1)
        if(localStorage.system == 'iOS' && localStorage.main == 'false'){
          this.$router.go(-1)
        }
      },

      //缓存聊天信息
      keepText(message){
        let timetamp = Date.parse(new Date())
        let type = message.messageType == 'TextMessage' ? 1 : 2
        let postData = {
          user_id: this.userData.id,
          shop_user_id: message.senderUserId,
          content: {
            content: message.content.content,
          },
          attribute: 'left',
          timetamp: timetamp,
          message_type: type
        }
        console.log(postData)

        storagecontent(postData)
          .then((res)=>{
            console.log(res.data)
            if(res.data.code != 1){
              this.$toast({
                message: '缓存失败',
                duration: 1200
              })
            }
          })
          .catch((err)=>{
            this.$toast({
              message: '缓存失败',
              duration: 1200
            })
            console.log('storagecontent err',err)
          })
      },

      //获取所有会话未读数
      getAllUnReadCount(){
        let that = this
        RongIMClient.getInstance().getTotalUnreadCount({
          onSuccess: function(count) {
            console.log('获取所有会话未读消息数成功', count);
            // localStorage.setItem('unReadCount',count)
            that.updatedUnReadServiceCount(count)
          },
          onError: function(error) {
            console.log('获取所有会话未读消息数失败', error);
          }
        })
      },

      //缓存新窗口消息
      keepLocal(msg){
        let extra = msg.content.extra
        let obj = {
          nickname: extra.nickname,
          avatar: extra.avatar,
          timestamp: msg.receivedTime
        }
        //用来存储的id也是存储对象的key
        let id = msg.senderUserId

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


      beforeIm(){
        let that = this
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
          onChanged: function (status) {
            // status 标识当前连接状态
            switch (status) {
              case RongIMLib.ConnectionStatus.CONNECTED:
                  localStorage.setItem('rongYunStatus','true')
                  console.log('链接成功');
                  break;
              case RongIMLib.ConnectionStatus.CONNECTING:
                  console.log('正在链接');
                  break;
              case RongIMLib.ConnectionStatus.DISCONNECTED:
                  localStorage.setItem('rongYunStatus','false')
                  console.log('断开连接');
                  break;
              case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                  localStorage.setItem('rongYunStatus','false')
                  console.log('其他设备登录');
                  break;
              case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                  localStorage.setItem('rongYunStatus','false')
                  console.log('域名不正确');
                  break;
              case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                  localStorage.setItem('rongYunStatus','false')
                  console.log('网络不可用');
                  break;
              default:
                  localStorage.setItem('rongYunStatus','false')
                  console.log('链接状态为',status)
                  break;
            }
          }
        })

        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
          onReceived: function (message) {
            that.keepLocal(message)
            that.getAllUnReadCount()
            // 判断消息类型
            switch(message.messageType){
              case RongIMClient.MessageType.TextMessage:
                  // message.content.content => 文字内容
                  //----------------------------重要-------把获取的消息存放在store中，全局公用homeIm.vue要使用
                  console.log('8080',message,message.content.content)
                  that.keepText(message)
                  let say = {
                    type: 1,
                    css: 'left',
                    text: message.content.content,
                    message: message,
                    shop_user_id: message.senderUserId,
                    id: that.userData.id + '',
                    key: message.messageUId,
                    timetamp: message.receivedTime
                  }
                  if(that.$route.name == 'service' && that.$route.query.id == message.senderUserId){
                    console.log('in service')
                    that.addAnswer(say)
                  }
                  break;
              case RongIMClient.MessageType.VoiceMessage:
                  // message.content.content => 格式为 AMR 的音频 base64
                  break;
              case RongIMClient.MessageType.ImageMessage:
                  // message.content.content => 图片缩略图 base64
                  // message.content.imageUri => 原图 URL
                  break;
              case RongIMClient.MessageType.LocationMessage:
                  // message.content.latiude => 纬度
                  // message.content.longitude => 经度
                  // message.content.content => 位置图片 base64
                  break;
              case RongIMClient.MessageType.RichContentMessage:
                  // message.content.content => 文本消息内容
                  // message.content.imageUri => 图片 base64
                  // message.content.url => 原图 URL
                  break;
              case RongIMClient.MessageType.InformationNotificationMessage:
                  // do something
                  break;
              case RongIMClient.MessageType.ContactNotificationMessage:
                  // do something
                  break;
              case RongIMClient.MessageType.ProfileNotificationMessage:
                  // do something
                  break;
              case RongIMClient.MessageType.CommandNotificationMessage:
                  // do something
                  break;
              case RongIMClient.MessageType.CommandMessage:
                  // do something
                  break;
              case RongIMClient.MessageType.UnknownMessage:
                  // do something
                  break;
              default:
                  // do something
            }
          }
        })
      },
      nowIm(){
        let that = this
      //连接token
        RongIMClient.connect(that.token, {
          onSuccess: function(userId) {
            console.log('Connect successfully:' + userId);
            that.getAllUnReadCount()
          },
          onTokenIncorrect: function() {
            console.log('token 无效');
          },
          onError: function(errorCode){
            var info = '';
            switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    info = '超时';
                    break;
                case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                    info = '不可接受的协议版本';
                    break;
                case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                    info = 'appkey不正确';
                    break;
                case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                    info = '服务器不可用';
                    break;
            }
            console.log(info);
          }
        });
      },
      //获取融云token
      getToken(){
        let postData = {
          user_id: this.userData.id
        }
        console.log(postData)
        getRongYunToken(postData)
          .then((res)=>{
            console.log('getRongYunToken',res.data)
            let data = res.data
            if(res.data.code == 1){
              this.token = data.data.token
            }
            this.nowIm()
          })
          .catch((err)=>{
            console.log('post get token err:',err)
          })
      }
    },
    created(){
      this.initUserData()
      //融云初始化
      RongIMLib.RongIMClient.init('cpj2xarlch2nn');
      this.beforeIm()   //设置监听，必须先监听，再连接
    },
    mounted(){
      let that = this
      document.addEventListener('touchstart',function(e){
        that.startX = e.changedTouches[0].clientX
      })
      document.addEventListener('touchend',function(e){
        that.endX = e.changedTouches[0].clientX
      })

      this.getopenid();
      this.authorization();
    },
    watch: {
      endX(){
        if(localStorage.plusReady == 'true' && localStorage.system == 'iOS'){
          //屏幕宽度
          let width = window.screen.width
          //滑动的距离
          let swiperDis = this.endX - this.startX
          //开始滑动的x值必须小于这个值
          let maxStartWidth = width/8
          //最小的滑动距离
          let minSwiperDis = width/5
          console.log(width,swiperDis,maxStartWidth,minSwiperDis)
          if(this.startX <= maxStartWidth && swiperDis >= minSwiperDis){
            this.$router.go(-1)
          }
        }
      },
      name(){
        // console.log(0,this.$route.name)
        if(this.name == 'home'){
          // console.log(1,this.$route.name)
          localStorage.setItem('main',true)
        }else{
          // console.log(2,this.$route.name)
          localStorage.setItem('main',false)
        }
      },
      userData(){
        if(this.userData.id){
          this.getToken()     //连接融云
        }
      }
    }
  }
</script>

<style lang="stylus">
  html, body {
		width: 100%;
		height: 100%;
	}

	#app {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.transBox {
	
		position absolute;
		transition: all 0.3s ease;
		width: 100%;
		height: 100%;
	}

	.slide-left-enter,
	 .slide-right-leave-active {
	     opacity: 0;
	    -webkit-transform: translate(100%, 0);
	    transform: translate(100%, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
	     opacity: 0;
	    -webkit-transform: translate(-100%, 0);
	    transform: translate(-100% 0);
	}
</style>
