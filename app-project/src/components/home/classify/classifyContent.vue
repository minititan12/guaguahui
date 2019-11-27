<template>
  <div class="classify-content">
    <LeftList></LeftList>
    <RightContent></RightContent>
  </div>
</template>

<script>
// import LeftList from './content/leftList'
// import RightContent from './content/rightContent'
import { mapState,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: "ClassifyContent",
  components: {
    'LeftList': () => import('./content/leftList'),
    'RightContent': () => import('./content/rightContent')
  },
  methods: {
    ...mapMutations(['initClassifyList']),
    //获取分类的数据
    getClassifyData(){
      axios.get('/api/method/getbrand')
        .then((res)=>{
          if(res.data.code == 1){
            console.log('getbrand:',res.data.data)
            this.initClassifyList(res.data.data)
          }
        })
    }
  },
  mounted(){
    this.getClassifyData()
  }
}
</script>

<style lang="stylus" scoped>
  .classify-content
    position: fixed
    top: 11vw
    bottom: 12vw
    left: 0
    right: 0
    background-color: #fff
</style>


