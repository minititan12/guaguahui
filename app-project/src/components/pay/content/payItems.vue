<template>
  <div class="payItems-wrapper" v-if="showConfirmItems">
    <ShopConfirmItem v-for="item of confirmData" :data="item" :key="item.shop_id"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShopConfirmItem from '../../miniComponents/shopConfirmItem'
export default {
  name: "PayItems",
  components: {
    ShopConfirmItem
  },
  computed: {
    ...mapState(['confirmData']),
    showConfirmItems(){
      if(this.confirmData.length > 0){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
