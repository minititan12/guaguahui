<template>
  <div>
    <mescroll-vue :down="down" :up="up" @init="init">
      <div class="mine-bgcolor">
      </div>
      <MineHeader></MineHeader>
      <MineMarkeTing></MineMarkeTing>
      <MineOrder></MineOrder>
      <!-- <MineWallet></MineWallet> -->
      <MineAction></MineAction>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { mapState,mapMutations } from 'vuex'
import { count } from '../../../utils/axios/request'
import MineHeader from './content/mineHeader'
import MineOrder from './content/mineOrder'
import MineMarkeTing from './content/mineMarkeTing'
import MineWallet from './content/mineWallet'
import MineAction from './content/mineAction'
export default {
  name: "MineContent",
  components: {
    MescrollVue,
    MineHeader,
    MineOrder,
    MineMarkeTing,
    MineWallet,
    MineAction
  },
  data(){
    return {
      scrollTop: 0,
      down: {
        use: false
      },
      up: {
        use: false,
      }
    }
  },
  computed: {
    ...mapState(['userData','currentTab'])
  },
  methods: {
    ...mapMutations(['updateAllCount']),
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },
    initCount(){
      let postData = {
        user_id: this.userData.id
      }
      count(postData)
        .then((res)=>{
          console.log('count',res.data)
          if(res.data.code == 1){
            this.updateAllCount(res.data.data)
          }else{
            this.$toast({
              message: data.message,
              type: 'fail',
              duration: 1500
            })
          }
        })
        .catch((err)=>{
          console.log('count err',err)
        })
    }
  },
  mounted(){
    this.initCount()
  },
  activated(){
    this.initCount()
  }
}
</script>

<style lang="stylus" scoped>
  .mescroll
    position: fixed 
    top: 0
    left: 0
    height: 100%
    padding-bottom: 12vw
    background-color: #F6F7FB
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


