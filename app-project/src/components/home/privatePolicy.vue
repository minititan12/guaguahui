<template>
  <div class="policy-wrapper">
    <div class="content">
      <div class="top">
        <span class="title">服务协议和隐私政策</span>
        <span>请您务必审慎阅读、充分理解"服务协议"和"隐私政策"各条款,包括但不限于:为了向你提供即时通讯、内容分享等服务,我们需要收集你的设备信息、操作日志等个人信息。你可以在"设置"中查看、变更、删除个人信息并管理你的授权。</span>
        <div>
          <span>你可阅读</span>
          <span class="link" @click="handleToPolicy">服务协议和隐私政策</span>
          <span>了解详细信息.如你同意,请点击"同意"开始接受我们的服务</span>
        </div>
      </div>
      <div class="bottom" @click="handleAgree">
        <span>同意</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'PrivatePolicy',
  methods: {
    ...mapMutations(['changeShowPolicy']),
    handleToPolicy(){
      this.$router.push({
        path: '/setPage',
        query: {
          type: 2
        }
      })
    },
    handleAgree(){
      this.changeShowPolicy(false)
    },
  }
}
</script>

<style lang="stylus" scoped>
  .policy-wrapper
    width: 100%
    height: 100%
    position: absolute 
    top: 0
    left: 0
    z-index: 999
    background-color: rgba(0,0,0,0.5)
    display: flex
    align-items: center
    justify-content: center
    .content
      width: 70vw
      height: 60vw
      border-radius: 4vw 
      background-color: #fff
      position: relative
      .top
        display: flex
        justify-content: center
        flex-direction: column
        align-items: center
        padding: 0 2vw
        color: #000
        font-size: 3.5vw
        line-height: 4.5vw
        .title
          font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
          font-weight: bold
          margin: 2vw 0
          font-size: 4vw
        .link
          color: #1E90FF
          text-decoration: underline 
      .bottom
        position: absolute 
        bottom: 0
        left: 0
        font-size: 4vw
        width: 100%
        text-align: center
        font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
        font-weight: bold
        border-top: 1px solid #eee
        color: 	#ff5756
        padding: 3vw 0
</style>