<template>
  <div class="addressList-wrapper">
    <AddressListContent></AddressListContent>
  </div>
</template>

<script>
import AddressListContent from '../../components/address/addressListContent'
export default {
  name: "AddressList",
  components: {
    AddressListContent
  },
  mounted(){
    this.$toast({
      type: "loading",
      duration: 0
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>