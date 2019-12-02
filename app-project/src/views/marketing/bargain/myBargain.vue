<template>
  <div class="myBargain-wrapper">
    <van-nav-bar
      title="我的砍价"
      left-arrow
      @click-left="handleBack"
    />
    <div class="cut-price" ref="cutPrice">
      <div>
        <MyBargainList @share="share" :cutPriceList="cutPriceList"></MyBargainList>
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
    <SharePop :goods_id="shareInfo.goods_id" :bargin_item_id="shareInfo.bargin_item_id" v-model="sharePop"></SharePop>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Bscroll from 'better-scroll'
import MyBargainList from '../../../components/marketing/cutPrice/myBargainList'
import SharePop from '../../../components/marketing/cutPrice/popup/sharePop'
export default {
  data(){
    return {
      showLoading: true,
      page: 1,
      cutPriceList:[],
      sharePop:false,
      // 分享需要的参数  商品ID  活动ID
      shareInfo:{},
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  components:{
    MyBargainList,SharePop
  },
  created(){
    this.getMyBargain();
  },
  mounted(){
    this.initGroupScroll();
  },
  methods:{
    handleBack(){
      this.$router.go(-1)
    },
    share(item){
      this.shareInfo = item;
      this.sharePop = true;
    },
    // 获取我的砍价列表
    getMyBargain(){
      axios.get(`api/method/myBarginList?page=${this.page}&&user_id=${this.userData.id}`).then(res=>{
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
        console.log('getMyBargain err')
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
        this.getMyBargain()
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
  .myBargain-wrapper >>> .van-icon
    color: #FF5756
    font-size: 5vw
  
  .myBargain-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .cut-price
    position absolute
    top 46px
    left 0
    right 0
    bottom 0
    overflow hidden
    background #f6f7fb
</style>