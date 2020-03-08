<template>
  <div class="mine-wrapper" id="mineWrapper">
    <div class="mine-bgcolor">
    </div>
    <MineHeader></MineHeader>
    <MineMarkeTing></MineMarkeTing>
    <MineOrder></MineOrder>
    <!-- <MineWallet></MineWallet> -->
    <MineAction></MineAction>
  </div>
</template>

<script>
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
    MineHeader,
    MineOrder,
    MineMarkeTing,
    MineWallet,
    MineAction
  },
  data(){
    return {
      scrollY: 0
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    ...mapMutations(['updateAllCount']),
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
  watch:{
    '$route'(to,from){
      console.log(to,from)
      if(from.name == 'home'){
        let d = document.getElementById('mineWrapper')
        this.scrollY = d.scrollTop
      }
    }
  },
  mounted(){
    this.initCount()
  },
  activated(){
    this.initCount()
    if(this.scrollY != 0){
      let d = document.getElementById('mineWrapper')
      d.scrollTo(0,this.scrollY)
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


