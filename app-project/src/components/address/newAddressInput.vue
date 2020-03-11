<template>
  <div class="addressInput-wrapper">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      :address-info="addressInfo" 
      @save="onSave"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import areaList from './area'
import { updateAddress,addAddress,editAddress} from '../../utils/axios/request'
export default {
  name: "NewAddressInput",
  data(){
    return {
      areaList,
      edit: false,
      addressInfo: {}
    }
  },
  computed: {
    ...mapState(['userData']),
  },
  methods: {
    //保存地址
    onSave(content){
      this.$toast({
        type: "loading",
        message: "保存中",
        duration: 0
      })
      
      let addressData = {
        AddressInfo: content,
        status: content.isDefault ? 1 : 0,
        user_id: this.userData.id,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        real_name: content.name,
        phone: content.tel,
        areaCode: content.areaCode,
        postalCode: content.postalCode
      }
      console.log(addressData)
      if(this.edit){  //如果是修改数据
        let id = this.$route.query.id
        let editAddressData = {
          id: id,
          ...addressData
        }
        console.log(editAddressData)
        updateAddress(editAddressData)
          .then((res)=>{
            console.log('updateAddress:',res.data)
            if(res.data.code == 1){
              this.$toast.clear(true)
              this.$router.go(-1)
            }else{
              this.$toast({
                type: "fail",
                message: "保存失败"
              })
            }
          })
          .catch((err)=>{})
      }else{  //如果是添加数据
        addAddress(addressData)
        .then((res)=>{
          console.log('addAddress:',res.data)
          if(res.data.code == 1){
            this.$toast.clear(true)
            this.$router.go(-1)
          }else{
            this.$toast({
              type: "fail",
              message: "保存失败"
            })
          }
        })
        .catch((err)=>{})
      }
    },
    //初始化地址数据，判断是修改还是添加
    initAddressData(){
      let id = ""
      if(this.$route.query.hasOwnProperty('id')){
        id = this.$route.query.id
      }
      if(id.length > 0){
        this.edit = true
        let postData = {
          id: id,
          user_id: this.userData.id
        }
        editAddress(postData)
          .then((res)=>{
            console.log('editAddress:',res.data)
            let data = res.data.data
            let addressInfo = {
              name: data.real_name,
              province: data.province,
              city: data.city,
              county: data.county,
              tel: data.phone,
              id: data.id,
              addressDetail: data.address,
              postalCode: data.postalCode,
              areaCode: data.areaCode,
              isDefault: data.status == 1 ? true : false
            }
            this.addressInfo = addressInfo
          })
          .catch((err)=>{})
      }
    }
  },
  mounted(){
    this.initAddressData()
  }
}
</script>

<style lang="stylus" scoped>
  .addressInput-wrapper
    width: 95%
    margin: 2vw auto
    border-radius: 3vw
    overflow: hidden
    background-color: #fff

  .addressInput-wrapper >>> .van-cell__title
    font-size: 3.6vw
    font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
    font-weight: bold
  .addressInput-wrapper >>> .van-field__control
    font-size: 3.5vw
    font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif
    color: #000
    &::placeholder
      color: #999  
</style>