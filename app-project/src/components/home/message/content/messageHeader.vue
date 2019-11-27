<template>
  <div class="message-header">
    <span>消息中心</span>
  </div>
</template>

<script>
export default {
  name: "MessageHeader"
}
</script>

<style lang="stylus" scoped>
  .message-header
    width: 100%
    height: 12vw
    // background: linear-gradient(to right, #F13939, #F76132)
    background-color: #fff
    text-align: center
    line-height: 12vw
    font-size: 4vw
    font-family: PFH
    color: #000
    font-weight: 400
    border-bottom: .01rem solid #999
    box-sizing: border-box
</style>