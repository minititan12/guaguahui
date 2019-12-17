<template>
  <div class="compaintDesc-wrapper">
    <van-nav-bar
      title="我的投诉举报"
      left-arrow
      @click-left="handleBack"
    />

    <div class="compaintDesc-content">
      <!-- <div class="compaintType">
        <div class="typeItem">
          <span class="iconfont">&#xe86d;</span>
          <span class="title">发货问题</span>
          <span class="text">卖家延期发货</span>
          <span class="text">影响使用</span>
        </div>

        <div class="typeItem">
          <span class="iconfont">&#xe86d;</span>
          <span class="title">承诺未履行</span>
          <span class="text">正品/换货/物流</span>
          <span class="text">等未履行</span>
        </div>

        <div class="typeItem">
          <span class="iconfont">&#xe86d;</span>
          <span class="title">骚扰他人</span>
          <span class="text">频繁骚扰他人</span>
          <span class="text">辱骂/诅咒/威胁</span>
        </div>
      </div> -->

      <div class="contentItem">
        <van-cell @click="handleShowMainReason" title="投诉原因" is-link :value="mainReason" />
        <van-cell @click="handleShowSpecificReason" title="具体原因" is-link :value="specificReason" />
        <div class="explain">
          <span>投诉说明</span>
          <input class="input" type="text" v-model="explainText" placeholder="请描述具体情况,有利于投诉快速处理">
        </div>

        <div class="uploader">
          <div class="title">上传凭证</div>
          <van-uploader v-model="fileList" multiple :max-count="4"/>
        </div>

        <div class="phone">
          <span>联系电话</span>
          <input class="input" type="text" v-model="phone" placeholder="请输入正确的联系电话,方便客服联系">
        </div>
      </div>

      <div class="btn">
        <span>提交申请</span>
      </div>

      <van-action-sheet
        v-model="showMainReason"
        :actions="MainActions"
        cancel-text="取消"
        @cancel="onMainCancel"
        @select="handleMainSelect"
      />

      <van-action-sheet
        v-model="showSpecificReason"
        :actions="specificActions"
        cancel-text="取消"
        @cancel="onSpecificCancel"
        @select="handleSpecificSelect"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ComplaintDesc",
  data(){
    return {
      mainReason: '请选择',
      showMainReason: false,
      MainActions: [{
        name: '1'
      },{
        name: '2'
      }],
      specificReason: '请选择',
      showSpecificReason: false,
      specificActions: [{
        name: '3'
      },{
        name: '4'
      }],
      explainText: '',
      phone: '',
      fileList: []
    }
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    //处理显示主要原因弹出框
    handleShowMainReason(){
      this.showMainReason = true
    },
    //处理主要原因弹出框取消
    onMainCancel(){
      this.showMainReason = false
    },
    //处理主要原因选择
    handleMainSelect(item,index){
      this.mainReason = item.name
      this.showMainReason = false
    },
    //处理显示具体原因弹出框
    handleShowSpecificReason(){
      this.showSpecificReason = true
    },
    //处理具体原因弹出框取消
    onSpecificCancel(){
      this.showSpecificReason = false
    },
    //处理具体原因选择
    handleSpecificSelect(item,index){
      this.specificReason = item.name
      this.showSpecificReason = false
    },
  }
}
</script>

<style lang="stylus" scoped>
  .compaintDesc-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .compaintDesc-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .compaintDesc-wrapper
    width: 100%
    .compaintDesc-content
      position: absolute 
      top: 46px
      left: 0
      right: 0
      bottom: 0
      background-color: #f5f7fa
      overflow: scroll
      .contentItem
        width: 94vw
        margin: 3vw auto
        border-radius: 3vw
        overflow: hidden
        font-family: PFH
        background-color: #fff
        .explain
          padding: 10px 16px
          display: flex
          flex-direction: row
          align-items: center
          .input
            width: 70%
            margin-left: 5vw
            font-family: PFM
            color: #000
            &::placeholder
              color: #d5d5d5
        
        .uploader
          padding: 10px 16px
          .title
            margin-bottom: 2vw

        .phone
          padding: 10px 16px
          display: flex
          flex-direction: row
          align-items: center
          .input
            width: 70%
            margin-left: 5vw
            font-family: PFM
            color: #000
            &::placeholder
              color: #d5d5d5
      .btn
        width: 65vw
        text-align: center
        margin: 10vw auto 
        font-size: 4vw
        font-family: PFB
        padding: 3.5vw 0
        color: #fff
        border-radius: 5vw
        background-color: #ff5756
            
      // .compaintType
      //   width: 100%
      //   display: flex
      //   flex-direction: row
      //   justify-content: space-around
      //   padding: 3vw 0
      //   font-family: PFB
      //   .typeItem
      //     width: 30%
      //     padding: 3vw 0
      //     background-color: #fff
      //     display: flex
      //     flex-direction: column
      //     align-items: center
      //     color: #ff5756
      //     .iconfont
      //       font-size: 7vw
      //     .title 
      //       font-size: 4vw
      //       margin: 2vw 0
      //     .text
      //       font-size: 3vw
      //       line-height: 4vw
</style>