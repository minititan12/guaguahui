<template>
  <div class="add-bankCard-wrapper">
    <van-nav-bar
      title="添加银行卡"
      left-arrow
      @click-left="handleBack"
    />
    <div>
      <div class="tip">请绑定持卡人本人的银行卡</div>
      <van-field 
        clearable 
        label="持卡人" 
        v-model="bank_name"
        maxlength="4" 
        placeholder="请输入持卡人" 
      />
      <van-field 
        clearable 
        label="卡号" 
        v-model="bank_no" 
        maxlength="19"
        type="number" 
        placeholder="请输入持卡号" 
      />
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>银行</span>
        </div>
        <div @click="showBankList=true" class="van-cell__value">
          <div class="van-field__body chose">
            <span>{{choseBank.name}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <van-field 
        clearable 
        label="手机号" 
        v-model="phone" 
        maxlength="11"
        type="number"
        placeholder="请输入银行预留手机号" 
      />
      <!-- <div class="agree">
        <van-checkbox icon-size="12" checked-color="#ff5756" v-model="agree" shape="square">同意《快捷支付服务协议》</van-checkbox>
      </div> -->
      <div class="bind" @click="bind">验证并绑卡</div>
      <van-action-sheet 
        v-model="showBankList"
        close-on-click-action 
        :actions="bankList" 
        cancel-text="取消"
        @cancel="onBankCancel"
        @select="onBankSelect"
      />
    </div>
  </div>
</template>
<script>
import {bankList,bindBank} from '@/utils/axios/request'
export default {
  data(){
    return {
      // 是否同意协议
      // agree:true,
      // 持卡人
      bank_name:"",
      // bank_no
      bank_no:"",
      // phone
      phone:"",
      // 银行卡列表
      bankList:[],
      // 选中的银行卡
      choseBank:{
        bank_id:0,
        name:"选择银行"
      },
      // 显示银行列表
      showBankList:false,
    }
  },
  created(){
    bankList().then(res=>{
      if(res.data.code != 1){
        this.$toast(res.data.message);
        return;
      }
      let result = []
      for(let item in res.data.data){
        result.push({
          bank_id:res.data.data[item].id,
          name: res.data.data[item].bank_name
        })
      }
      this.bankList = result;
    });
  },
  methods:{
    handleBack(){
      this.$router.go(-1)
    }, 
    onBankSelect(item){
      this.choseBank = item;
    },  
    onBankCancel(item){
      this.showBankList = false;
    },
    bind(){
      // if(!this.agree){
      //   this.$toast({
      //     message: "请同意支付协议",
      //     duration: 1200
      //   })
      //   return
      // }
      if(!this.bank_name.length){
        this.$toast({
          message: "请填写持卡人姓名",
          duration: 1200
        })
        return
      }
      if(!this.bank_no.length){
        this.$toast({
          message: "请填写卡号",
          duration: 1200
        })
        return
      }
      if(!this.choseBank.bank_id){
        this.$toast({
          message: "请选择银行",
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
      bindBank({
        bank_name:this.bank_name,
        bank_no:this.bank_no,
        bank_id:this.choseBank.bank_id,
        phone:this.phone
      }).then(res=>{
        if(res.data.code != 1){
          this.$toast(res.data.message);
          return;
        }
        this.$toast("添加成功");
        this.handleBack();
      }).catch(res=>{
      
      });
    },
  }
}
</script>
<style lang="stylus" scoped>
  .add-bankCard-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .add-bankCard-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .add-bankCard-wrapper
    >>>.van-field__label
      font-family PFH
    .tip
      padding 14px 16px
      color #868686
      font-size 3vw
    .chose
      justify-content space-between
      color black
    .agree
      padding 10px 16px
    .bind
      background-color #ff5756
      width 70vw
      height 12vw
      line-height 12vw
      border-radius 6vw
      font-size 3.8vw
      text-align center
      font-family: PFM
      color white
      margin 8vw auto
</style>