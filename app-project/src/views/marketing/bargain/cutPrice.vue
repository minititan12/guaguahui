<template>
  <div class="CutPrice-wrapper">
    <van-nav-bar
      title="疯狂砍价"
      left-arrow
      @click-left="handleBack"
    />
    <div  class="bg">
      <div class="cut-price" ref="cutPrice">
        <div>
          <div class="head-img">
            <van-image
              width="100%"
              src="/public/static/bargin/bargin_banner.png"
            />
            <van-image
              @click="goMyBargain"
              class="my_bargin_button"
              src="/public/static/bargin/my_bargin_button.png"
            />
          </div>

          <cutPriceList :cutPriceList="cutPriceList"></cutPriceList>

          <div class="group-loading" v-show="showLoading && cutPriceList.length > 10">
            <van-loading color="#fff" size="24px">
              <span>加载中...</span>
            </van-loading>
          </div>

          <div class="no-more" v-show="!showLoading && cutPriceList.length > 10">
            <span>没有更多了</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { barginlist } from '../../../utils/axios/request'
import Bscroll from 'better-scroll'
import cutPriceList from '../../../components/marketing/cutPrice/cutPriceList'
import { mapState } from 'vuex'
export default {
  name: "CutPrice",
  data(){
    return {
      showLoading: true,
      page: 1,
      cutPriceList:[],
    }
  },
  components: {
    cutPriceList
  },
  computed: {
    ...mapState(['login'])
  },
  created(){
    this.getCutpriceData();
  },
  mounted(){
    this.initGroupScroll();
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    // 跳转到我的砍价列表
    goMyBargain(){
      if(!this.login){
        this.$router.push('/login');
        return;
      }
      this.$router.push('/myBargain');
    },
    //获取疯狂砍价列表数据
    getCutpriceData(){
      let postData = {
        page: this.page
      }
      barginlist(postData)
        .then(res=>{
          if(res.data.code != 1){
            return;
          }
          if(res.data.data.length == 0){
            this.showLoading = false;
            this.cutPriceScroll.closePullUp();
            return;
          }
          if(this.page == 0 && res.data.data.length < 10 && this.cutPriceScroll){
            this.cutPriceScroll.closePullUp();
          }
          this.page = this.page + 1;
          this.cutPriceList = [...this.cutPriceList,...res.data.data,];
        }).catch((err)=>{
          console.log('getSpellGroupGoods err')
        })
    },
    //初始化疯狂砍价滚动条
    initGroupScroll(){
      let el = this.$refs.cutPrice;
      this.cutPriceScroll = new Bscroll(el,{
        bounce: {
          top: false
        },
        pullUpLoad: {
          threshold: 10,
          stop: 0
        },
        click: true,
        eventPassthrough: 'horizontal'
      })

      this.cutPriceScroll.on('beforeScrollStart',()=>{
        this.cutPriceScroll.refresh()
      })

      this.cutPriceScroll.on('pullingUp',()=>{
        this.getCutpriceData()
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
  .CutPrice-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .CutPrice-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold

  .bg
    background-image: url('/public/static/bargin/bargin_bg.png');
    width:100%;
    height:calc(100% - 46px)
    .cut-price
      position: absolute;
      top: 46px
      left: 0
      right: 0
      bottom: 0
      overflow: hidden;
      .head-img
        position: relative
        .my_bargin_button
          width:20vw
          position: absolute
          right: 0
          top: 2vw

  //加载模块
  .group-loading
    width: 100%
    padding-bottom: 4vw
    display: flex
    justify-content: center
    align-items: center
    .loading-img
      width: 6vw
      height: 5vw
      margin-right: 2vw
    >>> .van-loading__text
      color:white
  
  //没有更多模块
  .no-more
    width: 100%
    padding-bottom: 4vw
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold
    font-size: 4vw
    color:white
</style>