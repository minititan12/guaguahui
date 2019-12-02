<template>
  <div>
    <div @click="goBargainProduct(item)" class="item" v-for="(item,index) in cutPriceList" :key="index">
      <van-image 
        width="30vw" 
        height="36vw" 
        fit="contain"
        :src="item.cover_img"
      />
      <div class="info">
        <div class="name">{{item.goods_name}}</div>
        <div class="people">
          <div class="num" :class="peopel<=item.have_bargin_num?'active':''" v-for="(peopel,index) in item.bargin_num" :key="index">
            <van-image
              v-if="peopel<=item.have_bargin_num" 
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
        <div class="price">原价:{{item.price}}元</div>
        <div class="operate">
          <div @click.stop="order(item)" class="order">立即下单</div>
          <div v-if="is_app()" @click.stop="share(item)" class="share"></div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>

import { mapState } from 'vuex'
export default {
  props:{
    cutPriceList:Array
  },
  computed: {
    ...mapState(['login'])
  },
  methods:{
    is_app(){
      // if(typeof(plus) == 'object'){
      //   return true;
      // }
      // return false;
      return true;
    },
    // 点击分享
    share(item){
      this.$emit("share",item);
    },
    goBargainProduct(item){
      this.$router.push(`/bargainProduct?goods_id=${item.goods_id}`);
    },
    // 点击下单
    order(item){
      if(!this.login){
        this.$router.push('/login');
        return;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .item
    background white
    display flex
    justify-content flex-start
    margin 3vw
    padding 2vw
    .info
      flex 1
      width 0
      margin-left 2vw
      .name
        font-size 4.2vw
        height 10vw
        font-family PFH
        font-size 4.5vw
        letter-spacing 0.2vw
        overflow:hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
        line-height 5vw
      .people
        display flex
        justify-content flex-start
        height 4vw
        padding 2vw 0.5vw 2vw 0
        margin-bottom 2vw
        .num
          flex 1
          height 1vw
          border-radius 1vw
          width 100%
          background #ffe7e7
          position relative
          &.active
            background #ff4133
          .van-image
            width 4vw
            position absolute
            right 0
            top -1.5vw
            z-index 1
      .price
        font-size 3.4vw
        color #929292
        line-height 5vw
        text-decoration line-through
        padding 2vw 0
      .operate
        display flex
        justify-content flex-start
        align-items center
        .order
          width 25vw
          height 8vw
          border-radius 4vw
          line-height 8vw
          text-align center
          color #eb1f07
          border 1px solid #eb1f07
          font-family PFH
          font-size 4vw
          margin 2vw
        .share
          width 28vw
          height 8vw
          background-size 100% 100%
          background-image: url('/public/static/bargin/bargin_share.png');
</style>