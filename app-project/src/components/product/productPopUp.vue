<template>
  <div class="popup-wrapper" v-if="showPopUp">
    <div class="masking" @click="closePopUpInitData"></div>
    <div class="popup-content">
      <div class="popup-close" @click="closePopUpInitData"><span>X</span></div>
      <PoPUpHeader/>
      <PoPUpContent/>
      <PoPUpFooter/>
    </div>
  </div>
</template>

<script>
import PoPUpFooter from './popup/popUpFooter'
import PoPUpHeader from './popup/popUpHeader'
import PoPUpContent from './popup/popUpContent'
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: "ProductPopUp",
  components: {
    PoPUpFooter,
    PoPUpHeader,
    PoPUpContent
  },
  computed: {
    ...mapState(['showPopUp'])
  },
  methods: {
    ...mapMutations(['closePopup','changeCurrentBuyDetail']),
    closePopUpInitData(){
      this.changeCurrentBuyDetail(null)
      this.closePopup()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .masking
    position: absolute 
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: rgba(0,0,0,0.7)
    z-index: 2
  .popup-close
    width: .5rem
    height: .5rem
    font-size: .3rem
    line-height: .5rem
    text-align: center
    position: absolute
    right: .4rem
    top: .4rem
    border-radius: .4rem
    border: .01rem solid #888
  .popup-content
    position: absolute
    bottom: 0
    width: 100%
    height: 70vh
    background-color: white
    border-top-left-radius:.15rem
    border-top-right-radius: .15rem
    overflow: hidden
    z-index: 3
</style>



