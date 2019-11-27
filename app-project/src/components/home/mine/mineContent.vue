<template>
  <div class="mine-wrapper">
    <div class="mine-bgcolor">
    </div>
    <MineHeader></MineHeader>
    <MineMarkeTing></MineMarkeTing>
    <MineOrder></MineOrder>
    <MineWallet></MineWallet>
    <MineAction></MineAction>
    <!-- <div class="copyRight">
      <span>Copyright©2019</span>
      <span>呱呱汇gghbuy.com 版权所有</span>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MineHeader from './content/mineHeader'
import MineOrder from './content/mineOrder'
import MineMarkeTing from './content/mineMarkeTing'
import MineWallet from './content/mineWallet'
import MineAction from './content/mineAction'
export default {
  name: "MineContent",
  components: {
    MineHeader,
    MineOrder,
    MineMarkeTing,
    MineWallet,
    MineAction
  },
  data(){
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mine-wrapper
    position: fixed 
    top: 0
    left: 0
    right: 0
    bottom: 12vw
    background-color: #F6F7FB
    // background-color: #999
    z-index: 1
    overflow-y: scroll
    .mine-bgcolor
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100vw
      height: 55vw
      background-color: #FF5756
    .copyRight
      width: 90vw
      margin: 0 auto
      display: flex
      flex-direction: column
      align-items: center
      text-align: center
      color: #999
      span 
        margin-top: 1vw
</style>


