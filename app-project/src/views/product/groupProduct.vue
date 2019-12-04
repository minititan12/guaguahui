<template>
  <div class="GroupProduct-wrapper">
    <GroupProductContent></GroupProductContent>
    <GroupFooter v-if="!showJoinFooter"></GroupFooter>
    <JoinGroupFooter v-if="showJoinFooter"></JoinGroupFooter>
  </div>
</template>

<script>
import GroupProductContent from '../../components/product/groupProductContent'
import GroupFooter from '../../components/product/groupFooter'
import JoinGroupFooter from '../../components/product/joinGroupFooter'
export default {
  name: "GroupProduct",
  components: {
    GroupProductContent,
    GroupFooter,
    JoinGroupFooter
  },
  computed: {
    showJoinFooter(){
      if(this.$route.query.team_id){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .GroupProduct-wrapper
    width: 100%
    height: 100%
</style>


