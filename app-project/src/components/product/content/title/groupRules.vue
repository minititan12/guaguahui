<template>
  <div class="groupBuy-rules">
    <span class="title">拼团规则</span>
    <span class="text">拼团时间24小时,过期没有成团,自动作废,支付金额退回到余额</span>
  </div>
</template>

<script>
export default {
  name: "GroupRules"
}
</script>

<style lang="stylus" scoped>
  .groupBuy-rules
    width: 94%
    margin: 2vw auto
    background-color: #fff
    display: flex
    flex-direction: column
    padding: 3vw
    box-sizing: border-box
    letter-spacing: .3vw
    font-family: PFM
    border-radius: 3vw
    .title
      font-size: 3.8vw
      font-family: PFB
      margin-bottom: 2vw
    .text
      color: #999
      font-size: 3.5vw
</style>