<template>
  <div class="payment-wrapper">
    <van-nav-bar class="payment-header" title="订单信息"/>
    <div class="payment-desc">
      <!-- <div class="payment-ordernumber">
        <span class="text">订单号:</span>
        <span>{{orderNumber}}</span>
      </div> -->
      <div class="payment-amount">
        <span class="text">总金额:</span>
        <span class="amount">￥{{amount}}</span>
      </div>
    </div>

    <van-radio-group v-model="radio" v-if="showPaySelect()">
      <div class="zhifubao" @click="handlezfbClick">
        <div class="left">
          <span class="iconfont">&#xe601;</span>
          <span class="text">支付宝</span>
        </div>
        <van-radio class="right" name="1" checked-color="#07c160"/>
      </div>

      <div class="weixin" @click="handleWxClick">
        <div class="left">
          <span class="iconfont">&#xe600;</span>
          <span class="text">微信</span>
        </div>
        <van-radio class="right" name="2" checked-color="#07c160"/>
      </div>
    </van-radio-group>

    <div class="pay-btn">
      <van-button color="#07c160" type="primary" size="large" @click="handlePayOrder">{{getpayName()}}</van-button>
    </div>

    <div>{{err}}</div>

    <div v-html="aliExternalPayHtml"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "Payment",
  data(){
    return {
      aliExternalPayHtml: '',
      checked: false,
      wchecked: false,
      radio: '1',
      type:'', //app APP环境   wxWeb微信浏览器  aliPayWeb支付宝浏览器  h5系统或其他浏览器
      err: null
    }
  },
  computed:{
    ...mapState(['payOrderData','userData']),
    orderNumber(){
      if(this.payOrderData){
        let result = []
        for(let item of this.payOrderData.order_no){
          result.push(item.order_no)
        }

        return result.join('|')
      }
    },
    amount(){
      if(this.payOrderData){
        let result = parseFloat(this.payOrderData.total_amount)
        return result.toFixed(2)
      }
    },
    userId(){
      if(this.userData){
        return this.userData.id
      }
    }
  },
  methods: {
    ...mapMutations(['changeTab']),
    handlezfbClick(){
      this.radio = '1'
    },
    handleWxClick(){
      this.radio = '2'
    },
    //微信web
    is_wxWebPay(){
      if(/MicroMessenger/.test(window.navigator.userAgent)){
        return true;
      }
      return false;	
    },
    //支付宝web
    is_aliWebPay(){
      if(/AlipayClient/.test(window.navigator.userAgent)){
        return true;
      }
      return false;	
    },
    //app运行环境
    is_app(){
      //localStorage.plusReady == 'true' 
      if(typeof(plus) == 'object'){
        return true;
      }
      return false;
    },
    //h5web
    is_h5Web(){
      if(this.is_wxWebPay()){
        return false;
      }
      if(this.is_aliWebPay()){
        return false;
      }
      return true;
    },
    //获取运行环境类型
    getRunTimeType(){
      if(this.is_app()){
        this.type='app'
      }else if(this.is_wxWebPay()){
        this.type='wxWeb'
      }else if(this.is_aliWebPay()){
        this.type='aliWeb'
      }else{
        this.type='h5'
      }
    },
    showPaySelect(){
      if(this.type == 'app' || this.type == 'h5'){
        return true
      }else{
        return false
      }
    },
    //获取支付按钮的名称
    getpayName(){
      if(this.is_app()){
        if(this.radio == '1'){
          return '支付宝支付'
        }else{
          return '微信支付'
        }
      }else if(this.is_wxWebPay()){
        return '微信支付'
      }else if(this.is_aliWebPay()){
        return '支付宝支付'
      }else{
        if(this.radio == '1'){
          return '支付宝支付'
        }else{
          return '微信支付'
        }
      }
    },
    aliWebPay(){
      //支付宝内部网页支付
      let payData = {
        pay_type: 4,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userId
      }
      var _this=this
      
      axios.post('api/method/pay', payData)
        .then((res) => {
          
        console.log('alipay', res.data)
        
        ap.tradePay({
          orderStr: res.data.data.order
        }, function(res){
            let payCode=res.resultCode
            
            /*
            处理支付状态
            9000	订单支付成功
            8000	正在处理中
            4000	订单支付失败
            6001	用户中途取消
            6002	网络连接出错
            99	用户点击忘记密码导致快捷界面退出(only iOS) 
            */
            
            //_this.alipayres=res
              if(payCode == '9000'){
                _this.$router.push({
                  path: "/orderPage",
                  query: {
                    orderID: 1
                  }
                })
              }
            });
        })
        .catch((err) => {
          console.log('pay err', err)
        })
    },

    aliExternalPay(){
      //支付宝外部网页支付
      let payData = {
        pay_type: 1,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userId,
      }
      
      var _this=this
      
      axios.post('api/method/doPay', payData)
        .then((res) => {
          console.log('aliExternalPay',res)
          _this.aliExternalPayHtml = res.data;
          _this.$nextTick(()=>{
            var alipaysubmit = document.getElementById('alipaysubmit');
            alipaysubmit.submit();

            _this.$router.push({
              path: "/orderPage",
              query: {
                orderID: 1
              }
            })
          })
        })
        .catch((err) => {
          console.log('pay err', err)
        })
	  },

    //微信内部网页支付操作
    postPay(openid){
      //post到pay方法上的参数
      let payData = {
        pay_type: 6,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userId,
        openid: openid
      }
      
      var _this=this
      
      axios.post('api/method/pay', payData)
        .then((res) => {
          console.log('wxWebPay',res)
          // alert(JSON.stringify(res.data.data))
          
          wx.chooseWXPay({
            timestamp: res.data.data.order.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.data.data.order.nonceStr, // 支付签名随机串，不长于 32 位
            package: res.data.data.order.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType:  res.data.data.order.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.data.data.order.sign, // 支付签名
            success: function (res) {
              // alert(JSON.stringify(res))
                // 支付成功后的回调函数
              
              _this.$router.push({
                path: "/orderPage",
                query: {
                  orderID: 1
                }
              })
            }
          });
		     
		  })
		  .catch((err) => {
		    console.log('wxWebPay err', err)
		  })
    },
    
    wxWebPay(){
      //微信内部网页支付

      let openid = this.$store.state.openid;

      // alert('wxweb inside pay')

      if(!this.$store.state.openid){
        //获取openid  一般情况是不用获取的 首页的时候已经获取到
        // window.location.href='/index/index/index2'
        // axios.get('/index/index/index2')
        // .then((res)=>{
        //   this.err = res.data
        //   // let string = JSON.stringify(res.data)
        //   // alert(string)
        //   openid = res.data.openid
        //   this.postPay(openid)
        // })
        // .catch((err)=>{
        //   this.err = err
        //   // let string = JSON.stringify(err)
        //   // alert(string)
        //   console.log('getOpenid err',err)
        // })
        alert('not has openid')
      }

      this.postPay(openid)
    },

    wxExternalPay(){
      //H5 网页支付
      let payData = {
        pay_type: 5,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userId
      }
      
      var _this=this
      
      axios.post('api/method/pay', payData)
        .then((res) => {
          var mweb_url=res.data.data.order.mweb_url
        
          if(mweb_url){
            window.location.href = mweb_url
            _this.$router.push({
              path: "/orderPage",
              query: {
                orderID: 1
              }
            })
          }else{
            console.log('微信H5支付失败：',res.data)
          }

        })
        .catch((err) => {
          console.log('wxExternalPay err', err)
        })
    },

    appPay(){
      //app支付
      let payType = parseInt(this.radio)

      //提交的支付信息
      let payData = {
        pay_type: payType,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userId
      }
      // console.log('payData177',payData)
      let a = JSON.stringify(payData)
      alert(a)
      
      var _this = this
      var channel = null
      var payID = payType == 1 ? 'alipay' : 'wxpay'
    
      //获取支付通道
      if(plus){
        plus.payment.getChannels(function(channels){
          for(let item of channels){
            if(item.id == payID){
              channel = item
            }
          }
        },function(e){  
          // alert("获取支付通道失败："+e.message) 
          console.log('获取支付通道失败')
        });  
      }
    
      //提交支付
      axios.post('api/method/pay', payData)
        .then((res) => {
          
          console.log('pay', res.data.data.pay_type)
          let string = JSON.stringify(res.data)
          alert(string)
        
          plus.payment.request(channel,res.data.data.order, function(result) {  //支付成功回调函数

            _this.$toast({
              message: "支付成功",
              type: "success",
              duration: 1200
            })

            if(_this.$route.params.team_id){
              let params = JSON.parse(JSON.stringify(_this.$route.params))
              setTimeout(()=>{
                _this.$router.push({
                  path: "/groupPaySuccess",
                  name: 'groupPaySuccess',
                  query: {
                    ...params,
                    order_number: _this.orderNumber
                  }
                })
              },1200)
            }else{
              setTimeout(()=>{
                _this.$router.push({
                  path: "/orderPage",
                  query:{
                    orderID: 1
                  }
                })
              },1200)
            }

          }, function(e) {  //支付失败回调函数
            _this.$toast({
              message: "支付失败",
              type: "fail",
              duration: 1200
            })

            setTimeout(()=>{
              _this.$router.push({
                path: "/orderPage",
                query:{
                  orderID: 0
                }
              })
            },1200)
          })

        })
        .catch((err) => {
          console.log('pay err', err)
        })
    },

    //处理支付订单的操作
    handlePayOrder() {

      if(this.type == 'aliWeb'){  //支付宝内部支付
        // alert('aliWeb pay')
        this.aliWebPay()
        return
      }

      if(this.type == 'wxWeb'){ //微信内部支付
        // alert('wxweb pay')
        this.wxWebPay()
        return
      }

      if(this.type == 'app'){ //app支付
        // alert('app pay')
        this.appPay()
        return
      }

      if(this.type == 'h5'){  //h5网页支付
        // alert('h5 pay')
        if(this.radio == '1'){
          this.aliExternalPay()
        }else{
          this.wxExternalPay()
        }
      }

      // alert(window.navigator.userAgent)
	  }
  },
  beforeRouteEnter(to,from,next){
    console.log(to,from)
    let fromPay = from.name == 'pay' ? true: false
    let fromOrderPage = to.query.type == "payFromOrder" ? true : false
    
    if(fromPay || fromOrderPage){
      next()
    }else{
      this.changeTab(5)
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted(){
    // console.log(this.$route)
    console.log(1)
    this.getRunTimeType()
  }
}
</script>

<style lang="stylus" scoped>
  .payment-wrapper >>> .van-icon
    color: #fff
    font-size: 20px
  .payment-wrapper >>> .van-nav-bar__title
    color: #fff

  .payment-wrapper
    background-color: #f2f2f2
    width: 100vw
    height: 100vh
    .payment-header
      background-color: #07c160
      font-family: PFB
    .payment-desc
      height: 15vw
      background-color: #fff
      display: flex
      flex-direction: column
      justify-content: center
      padding: 0 4vw
      box-sizing: border-box
      // .payment-ordernumber
      //   margin-bottom: .2rem
      //   .text
      //     font-size: .3rem
      //     font-weight: bold
      //     margin-right: .2rem
      .payment-amount
        .text
          font-size: 4vw
          font-family: PFH
          margin-right: 3vw
        .amount
          font-family: hgzt
          color: #FF5756
    .zhifubao
      background-color: #fff
      height: 15vw
      width: 100%
      margin-top: .2rem
      display: flex
      flex-direction: row
      justify-content: space-between
      .left
        height: 100%
        display: flex
        flex-direction: row
        align-items: center
        margin-left: .3rem
        .iconfont
          font-size: .6rem
          color: #1296DB
          margin-right: .2rem
        .text
          font-weight: bold
      .right
        margin-right: .5rem
    .weixin
      background-color: #fff
      height: 15vw
      width: 100%
      margin-top: .2rem
      display: flex
      flex-direction: row
      justify-content: space-between
      .left
        height: 100%
        display: flex
        flex-direction: row
        align-items: center
        margin-left: .3rem
        .iconfont
          font-size: .6rem
          color: #427E43
          margin-right: .2rem
        .text
          font-weight: bold
      .right
        margin-right: .5rem
    .pay-btn
      margin-top: .4rem
</style>