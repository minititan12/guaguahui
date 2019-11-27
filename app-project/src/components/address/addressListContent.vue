<template>
  <div class="list-content-wrapper">
    <AddressListHeader></AddressListHeader>
    <AddressListItems></AddressListItems>
  </div>
</template>

<script>
import AddressListHeader from './addressListHeader'
import AddressListItems from './addressListItems'
export default {
  name: "AddressListContent",
  components: {
    AddressListHeader,
    AddressListItems
  }
}
</script>

<style lang="stylus" scoped>
  .list-content-wrapper
    width: 100%
    height: 100vh
    background-color: #F2F0F0
</style>