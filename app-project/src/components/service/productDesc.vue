<template>
  <div class="productDesc-wrapper">
    <van-image
      class="left-img"
      fit="cover"
      width="1.5rem"
      height="1.5rem"
      :src="data.img"
      @click="handleToProduct"
    />
    <div>
      <span class="title" @click="handleToProduct">{{data.title}}</span>
      <!-- <van-button color="#7232dd" size="small">发送链接</van-button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDesc",
  props: {
    data: Object
  },
  methods: {
    handleToProduct(){
      this.$router.push({
        path: '/product',
        query: {
          id: this.data.goods_id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .productDesc-wrapper
    width: 90vw
    margin: 0 auto
    padding: .2rem 
    box-sizing: border-box 
    display: flex
    flex-direction: row
    align-items: center
    border-radius: .2rem
    border: 1px solid #999
    .left-img
      flex-shrink: 0
      margin-right: .2rem
    .title
      display: block
      margin-bottom: .2rem
      font-size: .3rem
      line-height: .4rem
      font-weight: bold
</style>