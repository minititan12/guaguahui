<template>
  <div class="list-items-wrapper">
    <div class="list-item" :key="item.AddressID" v-if="addressList.length > 0" v-for="(item,index) of addressList">
      <div class="item-header" @click="handleEditAddress(item.id)">
        <img class="header-img" src="/images/dz.png" alt="">
        <span>{{item.real_name}}</span>
        <span class="header-phone">{{handlePhone(item.phone)}}</span>
      </div>
      <div class="item-middle" @click="handleEditAddress(item.id)">
        <span class="middle-desc">{{item.province + item.city + item.county + item.address}}</span>
      </div>
      <div class="item-bottom">
        <div class="bottom-left">
          <!-- <input type="radio" :value="item.id" v-model="defaultID"> -->
          <van-radio style="margin-right: .15rem" :name="item.id" checked-color="#FF5756"  v-model="defaultID"></van-radio>
          <span>默认地址</span>
        </div>
        <div>
          <div class="bottom-edit" @click="handleEditAddress(item.id)">
            <van-icon name="edit" />
            <span>编辑</span>
          </div>
          <div class="bottom-del" @click="handleDel(item.id)">
            <van-icon name="delete" />
            <span>删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="warn" v-if="addressList.length == 0">
      <span class="iconfont">&#xe611;</span>
      <span class="warn-text">您还没有设置收货地址</span>
    </div>
    <div class="addNewAddress" @click="handleAddAddress">
      <span class="add-text">添加新地址</span>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import { setAddressDefault,delAddress,getAddress} from '../../utils/axios/request'
export default {
  name: "AddressListItems",
  data(){
    return {
      defaultID: ""
    }
  },
  computed: {
    ...mapState(['addressList','userData'])
  },
  watch: {
    addressList(){
      if(this.addressList.length > 0 ){
        for(let item of this.addressList){
          if(item.status == 1){
            this.defaultID = item.id
          }
        }
      }
    },
    defaultID(){
      let postData = {
        id: this.defaultID,
        status: 1,
        user_id: this.userData.id
      }
      setAddressDefault(postData)
        .then((res)=>{
          console.log(res.data)
          if(res.data.code != 1){
            this.$toast({
              message: res.data.message,
              type: 'fail',
              duration: 1500
            })
          }
        }).catch((err)=>{})
    }
  },
  methods: {
    //更新地址列表
    ...mapMutations(['updateAddressList']),
    //跳转添加地址页面
    handleAddAddress(){
      this.$router.push('/newAddress')
    },
    //处理手机号码
    handlePhone(str){
      let s = str + ''
      let result = str.substr(0,3) + "****" + str.substr(7)

      return result
    },
    //处理删除地址
    handleDel(id){
      this.$dialog.alert({
        title: '删除地址',
        message: '确定删除该地址',
        showCancelButton: true   
      })
        .then(()=>{
          this.$toast({
            type: "loading",
            message: "删除中...",
            duration: 3000
          })
          let postData = {
            id: id,
            user_id: this.userData.id
          }
          console.log(postData)
          delAddress(postData)
            .then((res)=>{
              console.log(res.data)
              if(res.data.code == 1){
                this.initAddressList()
                this.$toast.clear()
                this.$toast({
                  type: "success",
                  message: "删除成功",
                  duration: 1500
                })
              }else{
                this.$toast.clear()
                this.$toast({
                  type: "fail",
                  message: "删除失败",
                  duration: 1500
                })
              }
            })
            .catch((err)=>{})
        })
        .catch(()=>{
        })
    },
    //初始化获取地址列表
    initAddressList(){
      let postData = {
        user_id: this.userData.id
      }
      getAddress(postData)
        .then((res)=>{
          console.log('getAddress',res.data)
          this.updateAddressList(res.data.data)
          this.$toast.clear()
        })
        .catch((err)=>{})
    },
    handleEditAddress(id){
      this.$router.push('/newAddress?id=' + id)
    }
  },
  mounted(){
    this.initAddressList()
  }
}
</script>

<style lang="stylus" scoped>
  .list-items-wrapper
    width: 100%
    .list-item
      display: flex
      flex-direction: column
      width: 95%
      background-color: #fff
      margin: 3vw auto
      padding: 2vw 3vw
      box-sizing: border-box
      .item-header
        display: flex
        flex-direction: row
        align-items: center
        font-family: PFH
        padding: 2vw 0
        font-size: 4vw
        .header-img
          width: 5vw
          margin-right: 2vw
        .header-phone
          margin-left: 3vw
          // font-weight: bold
      .item-middle
        font-size: 3.5vw
        font-family: PFM
        color: #999
        vertical-align: middle
        line-height: 6vw
        padding-left: 7vw
          
      .item-bottom
        display: flex
        font-family: PFB
        flex-direction: row
        justify-content: space-between
        align-items: center
        height: 10vw
        border-top: .1vw solid #aaa
        margin-top: 4vw
        .bottom-edit
          display: inline-block
          height: 6vw
          width: 15vw
          text-align: center
          line-height: 6vw
          border-radius: 3vw
          color: #fff
          background-color: #FF5756
          margin-right: 2vw
          .van-icon-edit
            font-size: 4vw
            vertical-align: middle
          span 
            vertical-align: middle
        .bottom-del
          display: inline-block
          height: 6vw
          width: 15vw
          text-align: center
          line-height: 6vw
          border-radius: 3vw
          color: #fff
          background-color: #FF5756
          .van-icon-delete
            font-size: 4vw
            vertical-align: middle
          span 
            vertical-align: middle
        .bottom-left
          display: flex
          flex-direction: row
          align-items: center
    .addNewAddress
      width: 60%
      height: 12vw
      background-color: #FF5756
      border-radius: 6vw
      text-align: center
      line-height: 12vw
      font-size: 4vw
      font-family: PFH
      color: #fff
      margin: 5vw auto
    .warn
      width: 100%
      margin: 3vw 0
      display: flex
      flex-direction: column
      align-items: center
      .iconfont
        width: 1rem
        height: 1rem
        font-size: .8rem
        padding: .2rem 0
        padding-bottom: 0
        text-align: center
      .warn-text
        font-size: .3rem
        padding: .2rem 0
</style>