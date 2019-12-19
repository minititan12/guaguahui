<template>
  <div class="complaint-wrapper">
    <van-nav-bar
      title="投诉/举报"
      left-arrow
      @click-left="handleBack"
    />

    <div class="complaintItems" ref="complaintItems">
      <div>
        <div class="complaintItem" v-for="item of orderList">
          <div class="item-top">
            <span class="top-desc">订单号:</span>
            <span class="top-num">{{item.order_number}}</span>
          </div>

          <div class="item-middle">
            <van-image :src="item.attrlist.photo" width="25vw" height="25vw"/>
            <div class="middle-right">
              <span class="title">{{item.goods_name}}</span>
              <span class="desc">{{getDesc(item.attrlist)}}</span>
              <span class="num">{{'x' + item.number}}</span>
            </div>
          </div>

          <div class="btn" >
            <span @click="handleToComplaintDesc(item.id)">我要投诉</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getcomplainedorders } from '../../utils/axios/request'
import { mapState } from 'vuex'
export default {
  name: "Complaint",
  data(){
    return {
      orderList: []
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    //获取属性描述
    getDesc(data){
      let attr1Desc = ''
      let attr2Desc = ''
      let attr3Desc = ''
      if(data.hasOwnProperty('attr1_name') && data.attr1_value.length > 0 ){
        attr1Desc = data.attr1_name + ':' + data.attr1_value + " "
      }

      if(data.hasOwnProperty('attr2_name') && data.attr2_value.length > 0 ){
        attr2Desc = data.attr2_name + ':' + data.attr2_value + " "
      }

      if(data.hasOwnProperty('attr3_name') && data.attr3_value.length > 0 ){
        attr3Desc = data.attr3_name + ':' + data.attr3_value + " "
      }
      
      let desc = attr1Desc + attr2Desc + attr3Desc
      return desc
    },
    getAccessOrder(data){
      let result = []
      for(let item of data){
        if(item.status == 1){
          result.push(item)
        }
      }

      return result
    },
    //获取可以投诉的订单
    getComplaintOrder(){
      let postData = {
        user_id: this.userData.id
      }
      getcomplainedorders(postData)
        .then((res)=>{
          console.log('getcomplainedorders',res.data)
          this.orderList = this.getAccessOrder(res.data.data)
        })
        .catch((err)=>{
        })
    },
    //跳转到投诉填写页面
    handleToComplaintDesc(id){
      this.$router.push({
        path:'/complaintDesc',
        query: {
          complaintOrderID: id
        }
      })
    }
  },
  created(){
    this.getComplaintOrder()
  }
}
</script>

<style lang="stylus" scoped>
  .complaint-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .complaint-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .complaintItems
    position: absolute 
    top: 46px
    left: 0
    right: 0
    bottom: 0
    overflow: scroll
    background-color: #f5f7fa
    .complaintItem
      width: 94vw
      margin: 3vw auto 
      background-color: #fff
      font-family: PFM
      color: #000
      padding: 3vw
      border-radius: 3vw
      box-sizing: border-box

      .item-top
        margin-bottom: 2vw
        font-size: 3.5vw
        .top-desc
          color: #ff5756
          font-family: PFH
          margin-right: 2vw
        .top-num
          letter-spacing: .1vw
          font-family: hgzt

      .item-middle
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        .middle-right
          width: 60vw
          display: flex
          flex-direction: column
          .title
            font-family: PFB
            margin-bottom: 3vw
            font-size: 3.5vw
            letter-spacing: .2vw
            line-height: 5vw
          .desc
            margin-bottom: 2vw
            color: #acacac
          .num
            // font-family: hgzt 
            color: #acacac
      
      .btn
        display: flex
        justify-content: flex-end
        color: #fff
        span 
          background-color: #ff5756
          display: block
          padding: 0 3vw
          font-size: 3.5vw
          line-height: 6vw
          border-radius: 3vw
</style>