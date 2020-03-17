<template>
  <div>
    <mescroll-vue :down="down" :up="up" @init="init">
      <div class="serviceContent-content">
        <ProductDesc v-if="showDesc" :data="descData" @enter="enter"></ProductDesc>
        <News v-if="answer.length > 0" v-for="item of answer" :data="item" :key="item.key"></News>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import News from './news'
import { mapState, mapMutations } from 'vuex'
import ProductDesc from './productDesc'
import { getcontent } from '../../utils/axios/request'
export default {
  name:"ServiceContent",
  components: {
    News,
    ProductDesc,
    MescrollVue
  },
  data(){
    return {
      refresh: false,
      refreshTime: 0,
      down:{
        htmlContent:'<div class="droping"><p class="downwarp-progress"></p><p class="downwarp-tip"></p></div><div class="refreshing"><p class="loading"></p><img class="loading-img" src="/public/uploads/home/load.png" alt=""><span>加载中...</span></div>',
        inited:(mescroll, downwarp)=>{
          mescroll.droping = downwarp.querySelector('.droping');
          mescroll.refreshing = downwarp.querySelector('.refreshing');
        },
        inOffset:(mescroll)=>{
          mescroll.droping.style.display="block";
          mescroll.refreshing.style.display="none";
          mescroll.droping.querySelector('.downwarp-tip').innerText = "下拉刷新";
        },
        outOffset:(mescroll)=>{
          mescroll.droping.querySelector('.downwarp-tip').innerText = "释放刷新";
        },
        onMoving(mescroll, rate, downHight){
          let deg = 0;
          deg = parseInt(downHight)*4.5;
          mescroll.droping.querySelector('.downwarp-progress').style.transform = "rotate("+ deg +"deg)";
        },
        showLoading:(mescroll)=>{
          mescroll.droping.style.display="none";
          mescroll.refreshing.style.display="block";
        },
        auto:false,
        callback:(mescroll)=>{
          if(this.answer.length > 0){
            let timestrap = this.answer[0].timetamp
            this.getHistoryMessage(timestrap)
          }else{
            this.getHistoryMessage(0)
          }
        }
      },
      up: {
        use: false
      }
    }
  },
  computed: {
    ...mapState(['answer','userData']),
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
  },
  methods: {
    ...mapMutations(['getHistoryAnswer','updateAnswer']),
    // mescroll组件初始化的回调,可获取到mescroll对象
    init(mescroll){
      this.mescroll = mescroll;
    },

    //输入触发滚动到最低
    enter(){
      this.mescroll.scrollTo(999999,100)
    },

    //获取类型
    getType(item){
      if(item.messageType == 'RichContentMessage'){
        return 2
      }

      return 1
    },
    //获取css方向
    getCss(item){
      if(item.senderUserId == item.targetId){
        return 'left'
      }

      return 'right'
    },
    //获取图片
    getImg(item){
      if(item.content.hasOwnProperty('imageUri')){
        return item.content.imageUri
      }
      return ''
    },
    //获取url
    getUrl(item){
      if(item.content.hasOwnProperty('url')){
        return item.content.url
      }
      return ''
    },

    //获取历史消息
    getHistoryMessage(timestrap){
      console.log(timestrap)
      let status = RongIMClient.getInstance().getCurrentConnectionStatus()
      let that = this

      if(status == 0){
        let conversationType = RongIMLib.ConversationType.PRIVATE
        let targetId = this.$route.query.id + ''
        let count = 5
        let that = this
        
        RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
          onSuccess: function(list, hasMsg) {
            console.log('获取历史消息成功', list);

            let result = []
            list.forEach((item)=>{
              result.push({
                type: that.getType(item),
                css: that.getCss(item),
                text: item.content.content,
                message: item,
                shop_user_id: item.targetId,
                id: that.userData.id,
                key: item.messageUId,
                timetamp: item.sentTime,
                img: that.getImg(item),
                url: that.getUrl(item)
              })
            })

            result = [...result,...that.answer]
            that.updateAnswer(result)
            // if(!hasMsg){
            //   that.$toast({
            //     message: '已经没有聊天信息了',
            //     duration: 1200
            //   })
            // }

            setTimeout(()=>{
              that.mescroll.endSuccess()
            },300)
          },
          onError: function(error) {
            // 请排查：单群聊消息云存储是否开通
            console.log('获取历史消息失败', error);
            setTimeout(()=>{
              that.mescroll.endSuccess()
            },300)
          }
        })
      }else{
        setTimeout(()=>{
          this.mescroll.endSuccess()
        },300)
        console.log('融云连接失败')
      }
    },
  },
  created(){
    this.getHistoryMessage(0)
  },
}
</script>

<style lang="stylus" scoped>
  .mescroll
    position: fixed
    top: 46px
    left: 0
    background-color: #F6F6F8
    height: calc(100% - 46px - 14vw)
    padding-top: 2vw
    padding-bottom: 2vw
  >>> .mescroll-upwarp
        padding: 0

  >>> .droping
      .downwarp-tip
        color #FF5756
      .downwarp-progress
        border-color #FF5756
        border-bottom-color: transparent;
  >>> .refreshing
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        color #FF5756
        .loading
          display inline-block
          width 4.2vw
          height 4.2vw
          margin-right 2vw
          border-radius 50%
          border 1px solid #FF5756
          border-bottom-color transparent
          vertical-align middle
          animation mescrollRotate .8s linear infinite
        .loading-img
          width: 6vw
          height: 5vw
          margin-right: 2vw
</style>