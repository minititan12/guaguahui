<template>
  <div v-show="value">
    <div @click="closePop" class="popup">
      <div @click.stop="stopSpread" class="content">
        <van-image 
          width="40vw" 
          fit="contain"
          src="/public/static/bargin/bargin_ok.png"
        />
        <div class="already">你已砍了<span class="price">{{bargainInfo.bargin_price}}</span>元</div>
        <div class="note">仅差{{bargainInfo.need_bargin_num}}刀，拿{{bargainInfo.low_price}}元商品</div>
        <div v-if="is_app()" @click="share" class="help">喊好友帮你砍一刀</div>
      </div>
    </div>
    <SharePop :bargin_item_id="bargin_item_id" v-model="sharePop"></SharePop>
  </div>
</template>
<script>
import SharePop from './sharePop'
export default {
  props:{
    value:Boolean,
    bargainInfo:Object,
    bargin_item_id:{},
  },
  data(){
    return {
      sharePop:false
    }
  },
  components:{
    SharePop
  },
  methods:{
    closePop(){
      this.$emit('input',false);
    },
    is_app(){
      if(typeof(plus) == 'object'){
        return true;
      }
      return false;
    },
    // 点击分享
    share(){
      this.sharePop = true;
    },
    stopSpread(){

    }
  }
}
</script>
<style lang="stylus" scoped>
  .popup
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    background-color rgba(0,0,0,0.5)
    z-index 3
    .content
      margin 50vw auto 0
      width 68vw
      position relative
      border-radius 4vw
      background-color white
      padding 4vw
      text-align center
      .van-image
        position absolute
        left calc(50% - 20vw)
        top -16vw
      .already
        font-family PFH
        font-size 5vw
        line-height 8vw
        padding 3vw 0 2vw
        .price
         color #ff4133
         font-family hgzt
      .note
        font-size 3vw
        line-height 5vw
        padding 1vw 0
        color #c7c8ca
      .help
        width 44vw
        height  10vw
        background #ff4133
        margin 4vw auto 2vw
        font-size 4vw
        line-height 10vw
        border-radius 5vw
        color white
</style>