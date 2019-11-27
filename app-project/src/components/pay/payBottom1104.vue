<template>
  <div class="payBottom-wrapper">
    <div class="pay-right">
      <span class="pay-number">共{{numberCount}}件,</span>
      <span class="pay-text">合计:</span>
      <span class="pay-total">￥{{confirmListTotalPrice}}</span>
      <div class="pay-btn" @click="handleCommitOrder">支付订单</div>
    </div>
    <div v-html="aliExternalPayHtml"></div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: "PayBottom1104",
  data(){
    return {
      orderNumber: null,
      amount: null,
      aliExternalPayHtml: ''
    }
  },
  computed: {
    ...mapState(['confirmListTotalPrice','confirmList','userData','defaultAddress','payRadio']),
    numberCount(){
      if(this.confirmList.length > 0){
        let count = 0
        for(let item of this.confirmList){
          count = count + parseInt(item.number)
        }
        return count
      }
    },
    commitData(){
      let hasConfirmList = this.confirmList.length > 0 ? true : false
      let hasUserData = Object.keys(this.userData).length > 0 ? true : false
      let hasConfirmListTotalPrice = parseFloat(this.confirmListTotalPrice) > 0 ? true : false
      let hasDefaultAddress = this.defaultAddress.code == 1 ? true : false

      if(hasConfirmList && hasConfirmListTotalPrice && hasUserData && hasDefaultAddress){
        let result = []
        for(let item of this.confirmList){
          result.push({
            goods_id: item.goods_id,
            number: item.number,
            user_id: this.userData.id,
            amount: item.totalPrice,
            goods_attr_id: item.hasOwnProperty('goods_attr_id') ? item.goods_attr_id : '',
            buyer_address: this.defaultAddress.data,
            user_id_to: item.user_id_to,
            attr1_name: item.hasOwnProperty('attr1_name') ? item.attr1_name : '',
            attr1_value: item.hasOwnProperty('attr1_value') ? item.attr1_value : '',
            attr2_name: item.hasOwnProperty('attr2_name') ? item.attr2_name : '',
            attr2_value: item.hasOwnProperty('attr2_value') ? item.attr2_value : '',
            attr3_name: item.hasOwnProperty('attr3_name') ? item.attr3_name : '',
            attr3_value: item.hasOwnProperty('attr3_value') ? item.attr3_value : '',
            price: item.price,
            goods_name: item.title
          })
        }

        return result
      }
    }
  },
  methods: {
    ...mapMutations(['countConfirmTotalPrice','addWaitPayList','updateWaitPayList','initConfirmList','initComfirmTotalPrice','clearCart','clearSelectedID','updateSelectedList']),
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
      if(this.is_app()){
        return false;
      }
      if(this.is_wxWebPay()){
        return false;
      }
      if(this.is_aliWebPay()){
        return false;
      }
      return true;
    },
    //删除上传到未支付的商品
    delSuccessOrder(){
      if(this.confirmList[0].hasOwnProperty('id')){
        let id = []
        for(let item of this.confirmList){
          id.push(item.id)
        }
        let delObject = {
          user_id: this.userData.id,
          id: id
        }
        console.log(delObject)
        axios.post('api/method/delCart',delObject)
          .then((res)=>{
            console.log('delcart:',res.data)
            //删除之后,对一些数据的初始化
            // this.commitHandle()
          })
          .catch((err)=>{
            console.log('post delcart err',err)
          })
      }else{
        // this.commitHandle()
      }
    },
    aliWebPay(){
      //支付宝内部网页支付
      let payData = {
        pay_type: 4,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userData.id
      }
      let _this=this
      
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
                _this.$toast({
                  message: "支付成功",
                  type: "success",
                  duration: 1200
                })

                setTimeout(()=>{
                  _this.$router.push({
                    path: "/orderPage",
                    query:{
                      orderID: 1
                    }
                  })
                },1200)
              }else{
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
              }
            });
        })
        .catch((err) => {
          _this.$toast({
            message: "请求支付失败",
            type: "fail",
            duration: 1200
          })
          console.log('pay err', err)
        })
    },

    aliExternalPay(){
      //支付宝外部网页支付
      let payData = {
        pay_type: 1,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userData.id,
      }
      
      let _this=this
      
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
        user_id: this.userData.id,
        openid: openid
      }
      
      let _this=this
      
      axios.post('api/method/pay', payData)
        .then((res) => {
          console.log('wxWebPay',res)
          // alert(JSON.stringify(res.data.data))
          // let string = JSON.stringify(res.data)
          // alert(string)
          
          wx.chooseWXPay({
            timestamp: res.data.data.order.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.data.data.order.nonceStr, // 支付签名随机串，不长于 32 位
            package: res.data.data.order.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType:  res.data.data.order.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.data.data.order.sign, // 支付签名
            success: function (res) {
              // alert(JSON.stringify(res))
                // 支付成功后的回调函数
              
              _this.$toast({
                message: "支付成功",
                type: "success",
                duration: 1200
              })

              setTimeout(()=>{
                _this.$router.push({
                  path: "/orderPage",
                  query:{
                    orderID: 1
                  }
                })
              },1200)
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
      //微信外部 H5 网页支付
      let payData = {
        pay_type: 5,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userData.id
      }
      
      let _this=this
      
      axios.post('api/method/pay', payData)
        .then((res) => {
          let mweb_url=res.data.data.order.mweb_url;
        
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
      // alert('app pay')
      let payType = parseInt(this.payRadio)

      let payData = {
        pay_type: payType,
        order_number: this.orderNumber,
        amount: this.amount,
        user_id: this.userData.id
      }
      console.log('payData177',payData)
      
      let _this = this
      let channel = null
      let payID = payType == 1 ? 'alipay' : 'wxpay'
      // alert(payID)
		
      if(true){
        plus.payment.getChannels(function(channels){
          for(let item of channels){
            if(item.id == payID){
              channel = item
            }
          }
        },function(e){  
          // alert("获取支付通道失败："+e.message) 
          console.log('获取支付通道失败')
        })
      }

      // alert('get channel success')
		
      axios.post('api/method/pay', payData)
        .then((res) => {
          // console.log('pay', res.data.data.pay_type)
        
          plus.payment.request(channel,res.data.data.order, function(result) {
            _this.$toast({
              message: "支付成功",
              type: "success",
              duration: 1200
            })

            setTimeout(()=>{
              _this.$router.push({
                path: "/orderPage",
                query:{
                  orderID: 1
                }
              })
            },1200)

          }, function(e) {
            // let string = JSON.stringify(e)
            // alert(string)
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
            
            // _this.data3=e;
          })

        })
        .catch((err) => {
          _this.$toast({
            message: "网络请求失败",
            type: "fail",
            duration: 1200
          })
          console.log('pay err', err)
        })
    },
    //判断支付操作
    handlePayOrder() {
      // alert('handlepayorder')

      if(this.is_aliWebPay()){
        // alert('aliWeb pay')
        this.aliWebPay()
        return
      }

      if(this.is_wxWebPay()){
        // alert('wxweb pay')
        this.wxWebPay()
        return
      }

      if(this.is_app()){
        // alert('app pay')
        this.appPay()
        return
      }

      if(this.payRadio == '1'){
        this.aliExternalPay()
      }else{
        this.wxExternalPay()
      }

      // alert(window.navigator.userAgent)
	  },
    handleCommitOrder(){
      // alert('pay click')
      if(!this.confirmList.length){
        this.$toast({
          message: "请先添加商品",
          type: "fail",
          duration: 1500
        })
        return 
      }
      if(!Object.keys(this.userData).length){
        this.$toast({
          message: "请先登录",
          type: "fail",
          duration: 1500
        })
        return
      }
      if(this.defaultAddress.code != 1){
        this.$toast({
          message: "请先填写默认地址",
          type: "fail",
          duration: 1500
        })
        return
      }
      //把商品上传到服务器获取订单号
      let commitObject = {
        wait_pay_order: this.commitData
      }
      console.log(commitObject)

      //获取订单号
      axios.post('api/method/waitPay',commitObject)
        .then((res)=>{
          console.log('waitpay:',res.data)
          if(res.data.code == 1){
            // alert('get waitPay')
            //删除上传到未支付的商品
            this.delSuccessOrder()
            
            //整合获取的订单号生成新的支付信息
            let data = res.data.data.data
            let order_number = ""
            let amount = 0
            if(data.length > 1){
              for(let i = 0; i < data.length; i++){
                if(i > 0){
                  order_number = order_number + "|" + data[i].ordernumber.order_number
                }else{
                  order_number = data[i].ordernumber.order_number
                }
                amount = amount + parseFloat(data[i].amount)
              }
            }else{
              order_number = data[0].ordernumber.order_number
              amount = parseFloat(data[0].amount)
            }

            this.orderNumber = order_number
            this.amount = amount

            this.handlePayOrder()

            // this.$router.push({
            //   path: '/payment',
            //   name: 'payment',
            //   params: {
            //     order_number: order_number,
            //     amount: amount,
            //     user_id: data[0].user_id,
            //   }
            // })
          }
        })
        .catch((err)=>{
          console.log('commit data err',err)
        })
    }
  },
  mounted(){
    this.countConfirmTotalPrice()
  }
}
</script>

<style lang="stylus" scoped>
  .payBottom-wrapper
    position: fixed
    bottom: 0
    width: 100%
    height: 1rem
    background-color: #fff
    overflow: hidden
    .pay-right
      float: right
      display: flex
      height: 100%
      flex-direction: row
      align-items: center
      .pay-number
        color: #979797
        font-size: .24rem
        margin-right: .1rem
      .pay-total
        color: #E41436
        font-family: hgzt
      .pay-btn
        text-align: center
        padding: .25rem .35rem
        background: linear-gradient(to right, #EE3E5C, #E41436);
        border-radius: .4rem
        margin: 0 .2rem
        color: #FAC0CA
</style>
