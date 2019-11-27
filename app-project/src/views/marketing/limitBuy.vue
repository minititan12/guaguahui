<template>
  <div class="limitBuy-wrapper">
    <LimitBuyHeader></LimitBuyHeader>
    <LimitBuyContent></LimitBuyContent>
  </div>
</template>

<script>
import LimitBuyContent from '../../components/limitBuy/limitBuyContent'
import LimitBuyHeader from '../../components/limitBuy/limitBuyHeader'
export default {
  name: "LimitBuy",
  components: {
    LimitBuyContent,
    LimitBuyHeader
  }
}
</script>

<style lang="stylus" scoped>

</style>