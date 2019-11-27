<template>
  <div class="icon-wrapper">

    <!-- <div class="wrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(page,index) of pages" :key="index">
          <div class="page-item">
            <div class="img-item" v-for="item of page">
              <van-image
                width="15vw"
                height="15vw"
                fit="contain"
                :src="item.ico_url"
                style="-webkit-touch-callout: none"
                @click="handleToClass(item.sort)"
              />
              <span>{{item.class_name}}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div> -->

    <div class="wrapper">
      <div class="img-item" v-for="item of list">
        <van-image
          width="15vw"
          height="15vw"
          fit="contain"
          :src="item.ico_url"
          style="-webkit-touch-callout: none"
          @click="handleToClass(item.sort)"
        />
        <span>{{item.class_name}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'MainIcons',
  data(){
    return {
      // swiperOption: {}
    }
  },
  props:{
    iconsList: Array
  },
  computed:{
    // pages(){
    //   let pages = []
    //   this.iconsList.forEach((item,index)=>{
    //     let page = Math.floor(index / 10)
    //     if(!pages[page]){
    //       pages[page] = []
    //     }
    //     pages[page].push(item)
    //   })
    //   return pages
    // }
    list(){
      if(this.iconsList && this.iconsList.length >= 8){
        let result = []
        for(let i = 0; i < 8; i++){
          result.push(this.iconsList[i])
        }
        return result
      }else{
        return []
      }
    }
  },
  methods:{
    ...mapMutations(['changeCurrentClassifySort','changeTab']),
    //处理点击跳转分类页面
    handleToClass(sort){
      this.changeTab(2)
      this.changeCurrentClassifySort(sort)
    }
  }
}
</script>

<style lang='stylus' scoped>
  .icon-wrapper
    width: 100vw
    padding: 3vw 0 1vw 0
    .wrapper
      width: 93vw
      min-height: 40vw
      margin: 0 auto
      // background-color: #fff
      // overflow: hidden
      display: flex
      flex-direction: row
      flex-wrap: wrap
      justify-content: space-between
      align-items: center
      .img-item
        width: 25%
        text-align: center
        display: flex
        flex-direction: column
        align-items: center
        margin-bottom: 2vw
        span 
          margin-top: 2vw
          font-family: PFB
          font-size: 3.5vw
      // .page-item
      //   width: 100%
      //   height: 40vw
      //   .img-item
      //     width: 20%
      //     height: 20vw
      //     float: left
      //     text-align: center
      //     span 
      //       display: block
      //       font-size: .25rem
      //       color: #888
      //   .swiper-img
      //     width: 88%
      //     height: 75%
</style>


