<template>
  <div class="markeTing-wrapper">
    <van-image 
      width="50%" 
      src="/images/jchd.png"
      @click="handleToActivities" 
    />
    <van-image 
      width="50%" 
      src="/images/jfsc.png" 
      @click="handleToIntergralShop"
    />
    <van-image 
      width="50%" 
      src="/images/hlpt.png"
      @click="handleToGroupBuy" 
    />
    <van-image 
      width="50%" 
      src="/images/fkkj.png" 
      @click="handleToCutPrice"
    />
  </div>
</template>

<script>
export default {
  name: "MineMarkeTing",
  methods: {
    handleToGroupBuy(){
      this.$router.push({
        path: "/groupBuy"
      })
    },
    handleToActivities(){
      this.$router.push({
        path: "/Activities"
      })
    },
    handleToIntergralShop(){
      this.$router.push({
        path: "/intergralShop"
      })
    },
    handleToCutPrice(){
      this.$router.push({
        path: "/cutPrice"
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .markeTing-wrapper
    width: 92vw
    min-height: 25vw
    margin: 0 auto
    border-radius: 3vw
    background-color: #fff
</style>