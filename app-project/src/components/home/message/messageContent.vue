<template>
  <div class="message-content">
    <van-sticky>
      <MessageHeader></MessageHeader>
    </van-sticky>
    <MessageWrapper></MessageWrapper>
  </div>
</template>

<script>
import MessageHeader from './content/messageHeader'
import MessageWrapper from './content/messageWrapper'
export default {
  components: {
    MessageHeader,
    MessageWrapper,
  },
  methods: {
    getAllUnReadCount(){
      RongIMClient.getInstance().getTotalUnreadCount({
        onSuccess: function(count) {
          console.log('获取所有会话未读消息数成功', count);
          localStorage.setItem('unReadCount',count)
        },
        onError: function(error) {
          console.log('获取所有会话未读消息数失败', error);
        }
      });
    }
  },
  mounted(){
    this.getAllUnReadCount()
  }
}
</script>

<style lang="stylus" scoped>
  .message-content
    position: fixed
    overflow: hidden
    top: 0
    bottom: 12vw
    left: 0
    right: 0
    background-color: #eee
</style>