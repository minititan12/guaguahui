<template>
  <div class="popup-wrapper" v-if="showPopUp">
    <div class="masking" @click="closePopUpInitData"></div>
    <div class="popup-content">
      <div class="popup-close" @click="closePopUpInitData">
        <van-icon name="cross" />
      </div>
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
    ...mapMutations(['closePopup','updatedGroupBuyID','changeCurrentBuyDetail']),
    closePopUpInitData(){
      this.changeCurrentBuyDetail(null)
      this.updatedGroupBuyID(-1)
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
    z-index: 4

  .popup-close
    width: 8vw
    height: 8vw
    font-size: 5vw
    line-height: 8vw
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    right: 5vw
    top: 5vw
    border-radius: 4vw
    background-color: #e3dee4
    color: #727071
    
  .popup-content
    position: absolute
    bottom: 0
    width: 100%
    height: 70vh
    background-color: white
    border-top-left-radius: 3vw
    border-top-right-radius: 3vw
    overflow: hidden
    z-index: 5
</style>



