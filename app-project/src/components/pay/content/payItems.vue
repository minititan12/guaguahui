<template>
  <div class="payItems-wrapper" v-if="showConfirmItems">
    <PayItem v-if="confirmList.length > 0" v-for="item of confirmList" :data="item" :noShow="true" :showDel="false" :key="item.id"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PayItem from '../../miniComponents/payItem'
export default {
  name: "PayItems",
  components: {
    PayItem
  },
  computed: {
    ...mapState(['confirmList']),
    showConfirmItems(){
      if(this.confirmList.length > 0){
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
