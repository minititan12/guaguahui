<template>
  <div class="message-content">
    <van-sticky>
      <MessageHeader></MessageHeader>
    </van-sticky>
    <MessageContent></MessageContent>
  </div>
</template>

<script>
import MessageHeader from './content/messageHeader'
import MessageContent from './content/MessageContent'
export default {
  components: {
    MessageHeader,
    MessageContent,
  }
}
</script>

<style lang="stylus" scoped>
  .message-content
    position: fixed
    overflow: hidden
    top: 0
    bottom: 1rem
    left: 0
    right: 0
    background-color: #eee
</style>