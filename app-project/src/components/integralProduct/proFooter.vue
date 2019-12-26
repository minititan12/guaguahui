<template>
  <div class="footer-wrapper" @click="openPopUp">
    立即兑换
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name:'ProFooter',
  methods:{
    ...mapMutations(['changeShowProPopUp']),
    openPopUp(){
      this.changeShowProPopUp(true)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer-wrapper
    position: absolute 
    bottom: 0
    left: 0
    width: 100%
    height: 12vw
    background-color: #ff5756
    color: #fff
    font-family: PFH
    font-size: 4vw
    line-height: 12vw
    text-align: center
</style>