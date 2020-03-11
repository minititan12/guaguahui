<template>
  <div class="to-home">
    <van-cell @click="handleToHome" title="呱呱汇首页" is-link/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "BackHome",
  methods: {
    ...mapMutations(['changeTab']),
    handleToHome(){
      this.changeTab(1)
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .to-home
    width: 94%
    margin: 2vw auto
    border-radius: 3vw
    overflow: hidden
    .van-cell__title
      font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
      font-weight: bold
      font-size: 3.5vw
</style>