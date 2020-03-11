<template>
  <div>
    <div @click="goBargain(item)" class=item v-for="item of cutPriceList" :key="item.goods_id">
      <div class="item-left">
        <van-image 
          width="30vw" 
          height="36vw" 
          fit="contain"
          :src="item.cover_img"
        />
      </div>
      <div class="item-right">
        <div class="name">{{item.goods_name}}</div>
        <div class="participate">
          <div v-if="item.join_head_img.length>0" class="head_list">
            <div v-for="(head_img,index) in item.join_head_img" :key="index" class="bargain-avatar">
              <van-image 
                width="6vw" 
                height="6vw" 
                fit="contain"
                style="border-radius:50%;overflow: hidden;" 
                :src="head_img"
              />
            </div>
          </div>
          <span>{{item.join_num}}人参加</span>
        </div>
        <div class="price"> 
          <span>原价:{{item.price}}元</span>
        </div>
        <div class="take">砍价{{item.low_price}}元拿</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cutPriceList",
  props: {
    cutPriceList: Array
  },
  methods:{
    goBargain(item){
      this.$router.push(`/bargain?goods_id=${item.goods_id}`);
    },
  }  
}
</script>
<style lang="stylus" scoped>
  .item
    width:88vw;
    margin: 3vw auto;
    background: white;
    border-radius:2vw;
    padding:3vw;
    font-family: 'PingFangSC-Semibold','Microsoft YaHei',sans-serif
    font-weight: bold;
    display: flex;
    .item-right
      margin-left:3vw;
      .name
        font-size:4.2vw;
        height: 10vw;
        line-height:5vw;
        color:#333;
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        /*! autoprefixer: off */
        -webkit-box-orient: vertical
        overflow: hidden
        margin-bottom: 1vw
      .participate
        display:flex;
        padding:1vw 0;
        font-size:3vw;
        color: #aaa;
        .head_list
          padding-right:4vw;
          display:flex
          .bargain-avatar
            width:4vw;
            justify-content: flex-start;
            align-items: center;
        span
          font-family: hgzt;
          display: flex;
          align-items: center;
      .price
        color:#666;
        font-family: 'PingFangSC-Regular','Microsoft YaHei',sans-serif;
        text-decoration:line-through;
        color: #aaa;
        font-size: 3.6vw;
        line-height: 7vw;
      .take
        background: url('/public/static/bargin/go_bargin.png');
        background-repeat: no-repeat;
        width:50vw;
        height:9vw;
        background-size:100% 100%;
        color:white;
        line-height:9vw;
        padding-left:5vw;

</style>