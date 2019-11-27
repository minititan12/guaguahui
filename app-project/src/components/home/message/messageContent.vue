<template>
  <div class="message-content">
    <van-sticky>
      <MessageHeader></MessageHeader>
    </van-sticky>
    <MessageIcons></MessageIcons>
    <MessageItems></MessageItems>
  </div>
</template>

<script>
import MessageHeader from './content/messageHeader'
import MessageItems from './content/messageItems'
import MessageIcons from './content/messageIcons'
export default {
  name: "MessageContent",
  components: {
    MessageHeader,
    MessageItems,
    MessageIcons
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