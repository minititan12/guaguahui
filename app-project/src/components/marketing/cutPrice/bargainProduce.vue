<template>
  <div class="wrapper">
    <div @click="goBargainProduct" class="info">
      <van-image 
        width="32vw" 
        height="36vw" 
        fit="contain"
        :src="productDetails.cover_img"
      />
      <div class="content">
        <div class="details">{{productDetails.goods_name}}</div>
        <div>
          <div class="reserve-price">￥<span>{{bargainDetails.low_price}}</span>底价</div>
          <div class="related">
            <div class="price">原价:{{productDetails.price}}元</div>
            <div class="take">{{bargainDetails.low_buyer_num}}人已{{bargainDetails.low_price}}元拿</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户 -->
    <div v-if="bargainDetails.help === 0">
      <!-- 已砍到低价 -->
      <div v-if="bargainDetails.is_complete === 1">
        <div class="success-tip">恭喜你,砍价成功!</div>
        <div class="people">
          <div class="num" :class="item<=bargainDetails.have_bargin_num?'active':''" v-for="(item,index) in bargainDetails.bargin_num" :key="index">
            <van-image
              v-if="item<=bargainDetails.have_bargin_num" 
              fit="contain"
              src="/public/static/bargin/person_icon_2.png"
            />
            <van-image 
              v-else
              fit="contain"
              src="/public/static/bargin/person_icon_1.png"
            />
          </div>
        </div>
        <div class="operate complete">
          <div @click="order" class="order">马上下单</div>
        </div>
      </div>
      <!-- 未砍到低价 -->
      <div v-else>
        <div class="tip">砍<span class="num">{{bargainDetails.bargin_num}}</span>刀,<span class="low-price">{{bargainDetails.low_price}}</span>元得该商品,马上发起砍价吧!</div>
        <div class="people">
          <div class="num" :class="item<=bargainDetails.have_bargin_num?'active':''" v-for="(item,index) in bargainDetails.bargin_num" :key="index">
            <van-image
              v-if="item<=bargainDetails.have_bargin_num" 
              fit="contain"
              src="/public/static/bargin/person_icon_2.png"
            />
            <van-image 
              v-else
              fit="contain"
              src="/public/static/bargin/person_icon_1.png"
            />
          </div>
        </div>
        <!-- 首次用户自己砍价 -->
        <div @click="bargain" v-if="bargainDetails.have_bargin===0" class="self">先自砍一刀</div>
        <!-- 首次用户砍完价后 -->
        <div class="operate" v-if="bargainDetails.have_bargin===1">
          <div v-if="is_app()" class="share" @click="share">喊好友帮你砍一刀</div>
          <div @click="order" class="order">马上下单</div>
        </div>
      </div>
    </div>
    <!-- 好友 -->
    <div v-else>
      <!-- 已帮好友砍价 -->
      <div v-if="bargainDetails.have_help_bargin === 1">
        <div class="success-tip">恭喜你,帮好友砍价成功!</div>
        <div class="operate">
          <div @click="examine" class="examine">查看更多砍价活动</div>
        </div>
      </div>
      <!-- 未帮好友砍价 -->
      <div v-else>
        <!-- 已砍到底价 -->
        <div v-if="bargainDetails.is_complete === 1">
          <div class="success-tip">好友砍价已完成!</div>
          <div class="operate">
            <div @click="examine" class="examine">查看更多砍价活动</div>
          </div>
        </div>
        <!-- 未砍到底价 -->
        <div v-else>
          <div class="tip">砍<span class="num">{{bargainDetails.bargin_num}}</span>刀,<span class="low-price">{{bargainDetails.low_price}}</span>元得该商品,马上发起砍价吧!</div>
          <div class="people">
            <div class="num" :class="item<=bargainDetails.have_bargin_num?'active':''" v-for="(item,index) in bargainDetails.bargin_num" :key="index">
              <van-image
                v-if="item<=bargainDetails.have_bargin_num" 
                fit="contain"
                src="/public/static/bargin/person_icon_2.png"
              />
              <van-image 
                v-else
                fit="contain"
                src="/public/static/bargin/person_icon_1.png"
              />
            </div>
          </div>
          <div class="operate">
            <div @click="bargain" class="help-bargain">点击帮好友砍价</div>
          </div>
        </div>
      </div>
    </div>
    <BargainPop :bargin_item_id="bargainDetails.bargin_item_id" :productDetails="productDetails" :bargainInfo="bargainInfo" v-model="showPop"></BargainPop>
    <SharePop :goods_id="productDetails.id" :bargin_item_id="bargainDetails.bargin_item_id" v-model="sharePop"></SharePop>
  </div>
</template>
<script>
import BargainPop from './popup/bargainPop'
import SharePop from './popup/sharePop'
import axios from 'axios'
import { mapState,mapMutations } from 'vuex'
export default {
  props:{
    productDetails:Object,
    bargainDetails:Object,
  },
  data(){
    return {
      // 是否显示砍价成功
      // showPop:false,
      showPop:false,
      // 是否显示分享弹窗
      sharePop:false,
      // 砍价信息
      bargainInfo:{},
      // 砍价的活动ID,避免用户首次自己砍一刀后分享给别人后无此ID
      bargin_item_id:"",
    }
  },
  computed: {
    ...mapState(['userData','login'])
  },
  components:{
    BargainPop,SharePop
  },
  methods:{
    ...mapMutations(['openPopup','changeTab','changeCurrentBuyDetail','changeCurrentProductPopUpStock','changeProductPopUpImg','updatedConfirmData']),
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      return false;
    },
    goBargainProduct(){
      this.$router.push(`/bargainProduct?goods_id=${this.productDetails.id}`);
    },
    // 查看更多砍价活动
    examine(){
      this.$router.push("/cutPrice");
    },
    // 点击砍价
    bargain(){
      if(!this.login){
        this.$router.push('/login');
        return;
      }
      axios.post('/api/method/doBargin',{
        goods_id: this.productDetails.id,
        bargin_item_id: this.bargainDetails.bargin_item_id,
        user_id: this.userData.id,
      }).then(res=>{
        if(res.data.code != 1){
          return;
        }
        this.showPop = true;
        this.bargainInfo = res.data.data;
        this.bargin_item_id = res.data.data.bargin_item_id;
        this.$emit('reload',this.bargin_item_id);
      }).catch(res=>{
        console.log('bargain err')
      })
    },
    // 点击分享
    share(){
      this.sharePop = true;
    },
    // 点击下单
    order(){
      if(!this.login){
        this.$router.push('/login');
        return;
      }

      this.changeCurrentProductPopUpStock('0')
      this.changeCurrentBuyDetail(null)
      this.changeProductPopUpImg('')
      this.openPopup()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .wrapper
    background-color white
    width 92vw
    margin 0 auto
    padding 3vw 2vw
    border-radius:2vw
    .info
      background-color #f6f7fb
      padding 2vw 1vw
      display flex
      justify-content space-between
      .content
        margin-left 2vw
        flex 1
        display flex
        width 0
        word-break break-all 
        justify-content space-between
        flex-direction column
        .details
          font-family PFH
          font-size: 4.5vw
          letter-spacing: 0.2vw
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          line-height: 6vw;
        .reserve-price
          color #fe4236
          font-size 3vw
          line-height 8vw
          font-family PFH
          span 
           font-family hgzt
           font-size 6vw
        .related
          display flex
          justify-content space-between
          font-size 3.4vw
          color #929292
          line-height 5vw
          .price
           text-decoration line-through
    .tip
      text-align center
      font-size 3.6vw
      padding 4vw
      line-height 5vw
      .num
        font-family hgzt
        font-size 5vw
        color #fe4236
      .low-price
        font-family hgzt
        font-size 4vw      
        color #fe4236
    .self
      width 60vw
      height 12vw
      line-height 12vw
      margin 4vw auto 2vw
      text-align center
      background #ff4133
      font-family PFM
      border-radius 6vw
      color white
    .operate
      display flex
      justify-content center
      align-items center
      .share
        width 40vw
        height 12vw
        line-height 12vw
        text-align center
        background #ff4133
        font-family PFM
        border-radius 6vw
        color white   
        margin-right 4vw
      .help-bargain,.examine
        width 40vw
        height 12vw
        line-height 12vw
        text-align center
        background #ff4133
        font-family PFM
        border-radius 6vw
        color white     
      .help-bargain
        margin 4vw auto 2vw      
    .people
      display flex
      justify-content flex-start
      height 4vw
      padding 2vw 0.5vw 0 0
      margin-bottom 2vw
      .num
        flex 1
        height 2vw
        border-radius 1vw
        width 100%
        background #ffe7e7
        position relative
        &.active
          background #ff4133
        .van-image
          width 5vw
          position absolute
          right 0
          top -1.5vw
          z-index 1
    .success-tip
      color #ff4133
      font-family PFH
      text-align center
      font-size 5.6vw
      line-height 10vw
      padding 3vw 0
    .order  
      width 32vw
      height 12vw
      line-height 12vw
      text-align center
      background #ff4133
      font-family PFM
      border-radius 6vw
      color white     
      &.complete
        margin 4vw auto 2vw
</style>