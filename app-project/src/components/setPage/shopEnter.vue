<template>
  <div class="shopEnter-wrapper">
    
    <!-- <van-image
      width="100vw"
      fit="contain"
      src="/images/shrz.png"
      style="-webkit-touch-callout: none"
    /> -->

    <div class="information">
      <van-field 
        clearable 
        label="姓名" 
        v-model="name" 
        left-icon="contact"
        placeholder="请输入姓名" 
      />

      <van-field 
        clearable 
        label="手机" 
        v-model="phone" 
        left-icon="phone-o"
        placeholder="请输入手机" 
      />

      <van-field 
        clearable 
        label="QQ" 
        v-model="qqnumber" 
        left-icon="user-circle-o"
        placeholder="请输入您的QQ" 
      />

      <van-field 
        clearable 
        label="邮箱" 
        v-model="email" 
        left-icon="envelop-o"
        placeholder="请输入邮箱" 
      />

      <van-field 
        clearable 
        label="公司名称" 
        v-model="company_name" 
        left-icon="hotel-o"
        placeholder="请输入公司名称" 
      />

      <van-cell 
        title="分类" 
        :value="class_name" 
        icon="qr" 
        @click="handleToShowClass"
        is-link
      />

      <van-cell 
        title="品牌" 
        :value="brand_name" 
        icon="award-o" 
        @click="handleToShowBrand"
        is-link
      />
    </div>

    <van-action-sheet 
      v-model="showClass"
      close-on-click-action 
      :actions="classActions" 
      cancel-text="取消"
      @cancel="onClassCancel"
      @select="onClassSelect"
    />

    <van-action-sheet 
      v-model="showBrand"
      close-on-click-action 
      :actions="brandActions" 
      cancel-text="取消"
      @cancel="onBrandCancel"
      @select="onBrandSelect"
    />

    <van-button 
      class="commit-btn"
      type="primary" 
      color="#FF5756"
      round
      @click="handleShopEnter"
    >
      商家入驻
    </van-button>

    <div class="siteEnter">
      <div class="text">商户入驻电脑端网址</div>
      <div class="site">
        {{site}}
        <button class="site-copy" :data-clipboard-text="site">复制</button>
      </div>
    </div>

    <div class="copyRight">
      <span>Copyright©2019</span>
      <span>呱呱汇gghbuy.com 版权所有</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Clipboard from 'clipboard'
export default {
  name: "ShopEnter",
  data(){
    return {
      site: "http://www.gghbuy.com/index/upgrade/checkCode",
      name: '',
      phone: '',
      qqnumber: '',
      email: '',
      company_name: '',
      brand_name: '请选择品牌',
      showClass: false,
      showBrand: false,
      class_name: '请选择分类',
      allData: null,
      classActions: [],
      brandActions: [],
      class_id: null,
      brand_id: null,
      shop_img: "/public/uploads/moveinto.jpg"
    }
  },
  methods: {
    onClassCancel(){
      this.showClass = false
    },
    onClassSelect(item){
      // console.log(item.name)
      this.class_name = item.name
    },

    onBrandCancel(){
      this.showBrand = false
    },
    onBrandSelect(item){
      this.brand_name = item.name
    },

    handleToShowClass(){
      this.showClass = true
    },
    handleToShowBrand(){
      this.showBrand = true
    },
    getAllBrandData(){
      axios.get('api/method/getbrand')
        .then((res)=>{
          if(res.data.code == 1){
            console.log('getbrand',res.data)
            this.allData = res.data.data
          }
        })
        .catch((err)=>{
          console.log('getbrand',err)
        })
    },
    postToServer(){
      let postData = {
        name: this.name,
        phone: this.phone,
        qq: this.qqnumber,
        email: this.email,
        companyname: this.company_name,
        class_id: this.class_id,
        brand_id: this.brand_id
      }
      let that = this
      axios.post('api/method/application',postData)
        .then((res)=>{
          console.log('application',res.data)
          if(res.data.code == '-1'){
            this.$toast({
              type: 'fail',
              message: '您申请的手机号码已注册',
              duration: 1200
            })
          }
          if(res.data.code == '-3'){
            this.$toast({
              type: 'fail',
              message: '请输入正确的手机号码',
              duration: 1200
            })
          }
          if(res.data.code == 1){
            this.$dialog.alert({
              title: '申请成功',
              message: '您所提交的商户入驻申请成功',
              showCancelButton: true   
            })
              .then(()=>{
                console.log('申请成功点击确定')
                this.$router.go(-1)
              })
              .catch(()=>{
                
              })
          }
        })
        .catch((err)=>{
          console.log('post application err',err)
        })
    },
    handleShopEnter(){
      if(!this.name.length){
        this.$toast({
          message: "请填写姓名",
          duration: 1200
        })
        return
      }
      if(this.phone.length != 11){
        this.$toast({
          message: "请填写正确的手机号码",
          duration: 1200
        })
        return
      }
      if(!this.qqnumber.length){
        this.$toast({
          message: "请填写QQ",
          duration: 1200
        })
        return
      }
      if(!this.email.length){
        this.$toast({
          message: "请填写邮箱",
          duration: 1200
        })
        return
      }
      if(!this.company_name.length){
        this.$toast({
          message: "请填写公司名称",
          duration: 1200
        })
        return
      }
      if(!this.class_name.length){
        this.$toast({
          message: "请选择分类",
          duration: 1200
        })
        return
      }
      if(!this.brand_name.length){
        this.$toast({
          message: "请选择品牌",
          duration: 1200
        })
        return
      }
      
      this.postToServer()
    }
  },
  created(){
    var clipboardSite = new Clipboard('.site-copy');
    let that = this
    clipboardSite.on('success',function(e){
      console.log(e)
      that.$toast({
        message: '复制成功',
        type: 'success',
        duration: 1000
      })
    })

    clipboardSite.on('error',function(e){
      that.$toast({
        message: '复制失败',
        type: 'fail',
        duration: 1000
      })
    })
  },
  mounted(){
    this.getAllBrandData()
  },
  watch: {
    allData(){
      console.log('get alldata')
      if(this.allData){
        let result = []

        for(let item of this.allData){
          result.push({
            name: item.class_name
          })
        }

        this.classActions = result
      }else{
        return null
      }
    },
    class_name(){
      this.brand_name = "请选择品牌"
      this.brandActions = []
      let result = []
      if(this.class_name.length){
        let brandList = []
        for(let item of this.allData){
          if(this.class_name == item.class_name){
            brandList = item.contentList
          }
        }
        for(let item of brandList){
          result.push({
            name: item.brand_name
          })
        }

        this.brandActions = result
      }
    },
    brand_name(){
      if(this.brand_name.length){
        for(let classItem of this.allData){
          if(classItem.class_name == this.class_name){
            for(let brandItem of classItem.contentList){
              if(this.brand_name == brandItem.brand_name){
                this.class_id = brandItem.class_id
                this.brand_id = brandItem.id
              }
            }
          }
        }
      }else{
        this.class_id = null
        this.brand_id = null
      }
    }

  }
}
</script>

<style lang="stylus" scoped>
  .shopEnter-wrapper >>> .van-icon
    font-size: 5vw
    margin-right: 2vw
  
  .shopEnter-wrapper >>> .van-cell__title
    font-size: 3.6vw

  .shopEnter-wrapper >>> .van-field__control
    font-size: 3.6vw
    &::placeholder
      font-size: 3.6vw
      color: #aaa

  .shopEnter-wrapper
    width: 100%
    min-height: calc(100% - 46px)
    display: flex
    flex-direction: column
    background-color: #F6F7FB
    background-image: url('/images/shrz.png')
    background-size: 100vw
    background-repeat: no-repeat
    .information
      margin: 25vw auto 2vw auto
      width: 90%
      border-radius: 3vw
      overflow: hidden
    .commit-btn
      width: 80%
      margin: 2vw auto
      .van-button__text
        font-size: 4vw
    .message
      width: 93vw
      margin: 2vw auto
      font-weight: bold
    .siteEnter
      width: 100%
      margin-top: 3vw
      font-family: PFM
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .text
        font-size: 4vw 
        color: #999
      .site
        font-size: 3.2vw
        color: #FF5756
        margin-top: 2vw
        -webkit-user-select:auto; /*webkit浏览器*/
        -khtml-user-select:auto; /*早期浏览器*/
        -moz-user-select:auto;/*火狐*/
        -ms-user-select:auto; /*IE10*/
        user-select:auto;
        .site-copy
          width: 15vw
          background-color: rgba(0,0,0,0)
          border-radius: 3vw
          border: 1px solid #FF5756
          font-size: 4vw
          font-family: PFM
          line-height: 6vw
          text-align: center
          color: #FF5756
    .copyRight
      width: 100vw
      margin: 2vw auto
      position: absolute 
      bottom: 0
      font-family: PFM
      display: flex
      flex-direction: column
      align-items: center
      text-align: center
      color: #999
      span 
        margin-top: 1vw
</style>