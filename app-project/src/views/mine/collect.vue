<template>
  <div class="collect-wrapper">
    <van-nav-bar
      title="收藏"
      left-arrow
      @click-left="handleBack"
    >
      <div slot="right">
        <van-icon name="setting-o"/>
        <span class='right-text'>管理</span>
      </div>
    </van-nav-bar>

    <van-sticky>
      <van-tabs @change="handleActiveChange" v-model="active" title-active-color="#FF5756">
        <van-tab title="商品"></van-tab>
        <van-tab title="店铺"></van-tab>
      </van-tabs>
    </van-sticky>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: "Collect",
  data(){
    return {
      active: 0,
      flag: 1,
      collectList: [],
      page: 1
    }
  },
  computed: {
    ...mapState(['userData']),
  },
  methods: {
    handleBack(){
      this.$router.go(-1)
    },
    //获取收藏列表
    getCollectList(){
      let postData = {
        page: this.page,
        flag: this.flag,
        user_id: this.userData.id
      }

      axios.post('api/method/getCollects',postData)
        .then((res)=>{
          console.log('getCollects',res.data)
        })
        .catch((err)=>{
          console.log('getCollects err',err)
        })
    },
    handleActiveChange(name,title){
      console.log(name,title)
      this.flag = name + 1
    }
  },
  created(){
    this.getCollectList()
  }
}
</script>

<style lang="stylus" scoped>
  .collect-wrapper >>> .van-icon-arrow-left
    color: #FF5756
    font-size: 5vw
  
  .collect-wrapper >>> .van-nav-bar__title
    color: #000
    font-size: 4vw
    font-family: PFH

  .collect-wrapper >>> .van-icon-setting-o
    color: #666
    font-size: 5vw

  .collect-wrapper >>> .right-text
    color: #666
    margin-left: 1vw

  .collect-wrapper >>> .van-tabs__line
    background-color: #FF5756 

  .collect-wrapper >>> .van-tab
    font-size: 3.5vw
    color: #000
    font-family: PFB
</style>