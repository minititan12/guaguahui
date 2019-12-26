<template>
  <div class="popup-wrapper" v-if="showProPopUp">
    <div class="masking" @click="closePopUp"></div>
    <div class="popup-content">
      <div class="popup-close" @click="closePopUp">
        <van-icon name="cross" />
      </div>

      <ProPopUpHeader />
      <ProPopUpAttr />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import ProPopUpHeader from './popUp/proPopUpHeader'
import ProPopUpAttr from './popUp/proPopUpAttr'
export default {
  name: "ProPopUp",
  components: {
    ProPopUpHeader,
    ProPopUpAttr
  },
  computed: {
    ...mapState(['showProPopUp'])
  },
  methods: {
    ...mapMutations(['changeShowProPopUp']),
    closePopUp(){
      this.changeShowProPopUp(false)
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



