<template>
  <div class="content-wrapper">
    <ProSwipe />
    <ProTitle/>
  </div>
</template>

<script>
import ProSwipe from './proSwipe'
import ProTitle from './proTitle'
export default {
  name: 'IntegralProContent',
  components: {
    ProSwipe,
    ProTitle,
  }
}
</script>

<style lang="stylus" scoped>
  .content-wrapper
    position: absolute 
    top: 0
    left: 0
    right: 0
    bottom: 12vw
    background-color: #f6f7fb
</style>