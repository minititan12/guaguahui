<template>
  <div class="serviceContent-wrapper" ref="serviceContent">
    <div class="serviceContent-content">
      <transition name="fade">
        <div class="content-refresh" v-show="refresh">
          <van-loading color="#E83755" size="24px">加载中...</van-loading>
        </div>
      </transition>
      <div class="blank"></div>
      <ProductDesc v-if="showDesc" :data="descData"></ProductDesc>
      <News v-if="currentAnswer" v-for="item of currentAnswer" :data="item" :key="item.text + item.timetamp"></News>
      <div class="blank"></div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import News from './news'
import { mapState, mapMutations } from 'vuex'
import ProductDesc from './productDesc'
import { getcontent } from '../../utils/axios/request'
export default {
  name:"ServiceContent",
  components: {
    News,
    ProductDesc
  },
  data(){
    return {
      refresh: false,
      refreshTime: 0
    }
  },
  computed: {
    ...mapState(['answer','userData','serviceFirstLoad']),
    showDesc(){
      if(this.$route.query.hasOwnProperty('goods_id')){
        return true
      }else{
        return false
      }
    },
    descData(){
      if(this.$route.query.hasOwnProperty('goods_id')){
        return {
          img: this.$route.query.product_img,
          title: this.$route.query.goods_name,
          goods_id: this.$route.query.goods_id
        }
      }
    },
    currentAnswer(){
      if(this.answer){
        let targetId = this.$route.query.id + ''
        if(this.answer.hasOwnProperty(targetId)){
          return this.answer[targetId]
        }else{
          return []
        }
      }else{
        return []
      }
    }
  },
  methods: {
    ...mapMutations(['getHistoryAnswer','addToServiceFirstLoad']),
    handlePullingDown(){
      let shop_id = this.$route.query.id + ''
      let timetamp = 0
      if(this.answer.hasOwnProperty(shop_id) && this.answer[shop_id].length > 0){
        timetamp = this.answer[shop_id][0].timetamp
      }
      
      let postData = {
        user_id: this.userData.id + '',
        shop_user_id: shop_id,
        timetamp: timetamp
      }
      getcontent(postData)
        .then((res)=>{
          setTimeout(()=>{
            this.refresh = false
          },500)
          this.serviceScroll.finishPullDown()
          console.log('getcontent:',res.data)
          if(res.data.code == 1){
            let data = {
              historyData: res.data.data,
              id: shop_id
            }
            console.log(data)
            this.getHistoryAnswer(data)
            console.log(2)
            this.$nextTick(()=>{
              this.serviceScroll.refresh()
            })
          }
        })
        .catch((err)=>{
          setTimeout(()=>{
            this.refresh = false
          },500)
          this.serviceScroll.finishPullDown()
          console.log('getcontent err',err)
        })
    },
    initServiceScroll(){
      let el = this.$refs.serviceContent
      this.serviceScroll = new Bscroll(el,{
        click: true,
        eventPassthrough: 'horizontal',
        pullDownRefresh: {
          threshold: 50,
          stop: 20
        }
      })

      this.serviceScroll.on('pullingDown',()=>{
        this.refresh = true
        this.handlePullingDown()
      })
    },
    enter(){
      console.log('enter')
      this.serviceScroll.refresh()
      this.$nextTick(()=>{
        this.serviceScroll.scrollTo(0,this.serviceScroll.maxScrollY)
      })
    }
  },
  created(){
    let shopID = this.$route.query.id
    if(this.serviceFirstLoad.indexOf(shopID) == -1){
      this.handlePullingDown()
      this.addToServiceFirstLoad(shopID)
    }
  },
  mounted(){
    console.log(this.$route)
    this.initServiceScroll()
    // console.log(this.serviceScroll)
    // this.serviceScroll.scrollTo(0,this.serviceScroll.maxScrollY)
    this.serviceScroll.refresh()
  },
  updated(){
    this.serviceScroll.refresh()
  },
  // watch: {
  //   answer(){
  //     console.log('answer change')
  //     this.$nextTick(()=>{
  //       this.serviceScroll.scrollTo(0,this.serviceScroll.maxScrollY)
  //     })
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
  .fade-enter
    opacity: 0
    height: 0
  .fade-enter-active
    transition: all .5s linear
  // .fade-leave-active
  //   transition: all .5s linear
  .fade-leave-to
    opacity: 0
    height: 0

  .serviceContent-wrapper >>> .blank
    width: 100vw
    height: .2rem
  .serviceContent-wrapper
    position: fixed 
    top: calc(46px + .01rem)
    bottom: calc(1rem + .01rem)
    left: 0
    right: 0
    background-color: #F6F6F8
    overflow: hidden
    .serviceContent-content
      width: 100%
      min-height: 88vh
      .content-refresh
        width: 100%
        height: 40px
        display: flex
        justify-content: center
        align-items: center
        color: red
</style>