<template>
  <div class="groupDialog-wrapper" v-if="showGroupDialog.value">

    <div class="masking" @click="handleClose">
    </div>

    <div class="content">
      <MoreGroup v-if="showGroupDialog.type == 'more'" />

      <ConfirmGroup v-if="showGroupDialog.type == 'group'" />

      <div class="close" @click="handleClose">
        <van-icon name="cross" />
      </div>
    </div>

  </div>
</template>

<script>
import MoreGroup from './dialog/moreGroup'
import ConfirmGroup from './dialog/confirmGroup'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "GroupDialog",
  components: {
    MoreGroup,
    ConfirmGroup
  },
  data(){
    return {
    }
  },
  computed: {
    ...mapState(['showGroupDialog'])
  },
  methods: {
    ...mapMutations(['changeGroupDialogState']),
    handleClose(){
      this.changeGroupDialogState({
        value: false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

  .groupDialog-wrapper >>> .van-count-down
    color: #FF4D51
    margin: 0 2vw

  .groupDialog-wrapper
    position: absolute 
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 99
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    .masking
      width: 100%
      height: 100%
      position: absolute 
      top: 0
      background-color: rgba(0,0,0,.3)

    .content
      width: 80%
      background-color: #fff
      border-radius: 3vw
      position: relative

      .close
        width: 8vw
        height: 8vw
        position: absolute
        top: -4vw
        right: -4vw 
        background-color: #E3DEE4
        border-radius: 4vw
        display: flex
        justify-content: center
        align-items: center
        font-size: 5vw
        color: #727071
</style>