<template>
  <div class="guaguahui-wrapper">
    <img class="app-icon" src="/images/app-icon.png" alt="">
    <div class="app-desc">
      呱呱汇是一个品牌特卖电商app，区别于品牌特卖，以日常销售的形式集聚品质、特色、口碑的店铺。
    </div>

    <div class="app-actions">
      <div class="action" v-for="item of actions">
        <span>{{item}}</span>
      </div>
    </div>

    <div class="desc-item">
      <h3>特点</h3>
      <span>希望通过我们的坚守与努力打造出信任的新零售服务平台，为千万家庭带来便捷更优质的服务</span>
    </div>

    <div class="desc-item">
      <h3>服务宗旨</h3>
      <span>用更低的价格买到更好的东西，全程配送到家，我们为您挑选商品时，就像您自己亲自一样精挑细选，体会更多实惠</span>
    </div>

    <div class="desc-item">
      <h3>购物车</h3>
      <span>挑选您最喜爱的商品放入购物车，以便下单。</span>
    </div>

    <div class="desc-item">
      <h3>我的</h3>
      <span>用户中心，查看订单进度，查看付款情况等综合查询中心。</span>
    </div>

    <div class="desc-item">
      <h3>联系我们</h3>
      <span>444120532@qq.com</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GuaGuaHui",
  data(){
    return {
      actions: ['运动户外','国际运动','服装配饰','潮牌服饰','鞋靴箱包','钟表珠宝','生活家居','数码家电','食品超市','美妆个护','母婴童装']
    }
  },
}
</script>

<style lang="stylus" scoped>
  .guaguahui-wrapper >>> p
    margin: .2rem 0

  .guaguahui-wrapper 
    width: 100%
    height: calc(100% - 46px)
    padding: 2vw 4vw
    box-sizing: border-box
    display: flex
    flex-direction: column
    align-items: center
    .app-icon
      width: 15vw
    .app-desc
      margin-top: 2vw
      font-size: 3.5vw
      line-height: 6vw
      color: #000
      font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
      font-weight: bold
    .app-actions
      margin-top: 5vw
      .action
        float: left 
        display: inline-block
        background-color: #FFF1F1
        color: #FF5756
        border: 1px solid #FF5756
        width: 20vw
        height: 8vw
        font-size: 3.5vw
        line-height: 8vw
        text-align: center
        margin-right: 3vw
        margin-bottom: 2vw
        box-sizing: border-box
        border-radius: 2vw
    .desc-item
      width: 100%
      margin-top: 5vw
      h3
        font-size: 3.8vw
        font-family: 'PingFangSC-Medium','Microsoft YaHei',sans-serif
        font-weight: bold
        color: #000
        margin-bottom: 2vw
      span
        color: #666
</style>