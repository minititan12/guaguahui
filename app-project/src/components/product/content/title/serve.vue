<template>
  <div class="serve">

    <van-cell @click="showServePopUp" is-link>
      <template slot="title">
        <span class="custom-title">服务</span>
        <div class="serve-item">
          <van-icon color="red" name="passed" />
          <span>全场包邮</span>
        </div>
        <div class="serve-item">
          <van-icon color="red" name="passed" />
          <span>极速发货</span>
        </div>
        <div class="serve-item">
          <van-icon color="red" name="passed" />
          <span>售后保障</span>
        </div>
        <div class="serve-item">
          <van-icon color="red" name="passed" />
          <span>七天无理由</span>
        </div>
        
      </template>
    </van-cell>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "Serve",
  methods: {
    ...mapMutations(['updateServePopUp']),
    //显示服务弹出框
    showServePopUp(){
      setTimeout(()=>{
        this.updateServePopUp(true)
      },200)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .serve
    width: 94%
    margin: 2vw auto
    border-radius: 3vw
    overflow: hidden
    .van-cell
      align-items: center
      font-family: PFB
      .van-cell__title
        display: flex
        align-items: center
        font-size: 3.2vw
        .custom-title
          margin-right: 1vw
        .serve-item
          display: inline-flex
          align-items: center
          padding-top: 1vw
          margin-right: 1vw
          .van-icon
            font-size: 3.5vw
          span
            color: #aaa
</style>