<template>
  <div class="GroupProduct-wrapper">
    <GroupProductContent></GroupProductContent>
    <GroupFooter></GroupFooter>
  </div>
</template>

<script>
import GroupProductContent from '../../components/product/groupProductContent'
import GroupFooter from '../../components/product/groupFooter'
export default {
  name: "GroupProduct",
  components: {
    GroupProductContent,
    GroupFooter
  }
}
</script>

<style lang="stylus" scoped>
  .GroupProduct-wrapper
    width: 100%
    height: 100%
</style>


