<template>
  <div class="addressContent-wrapper">
    <NewAddressHeader></NewAddressHeader>
    <NewAddressInput></NewAddressInput>
  </div>
</template>

<script>
import NewAddressHeader from './newAddressHeader'
import NewAddressInput from './newAddressInput'
export default {
  name: "NewAddressContent",
  components: {
    NewAddressHeader,
    NewAddressInput
  }
}
</script>

<style lang="stylus" scoped>
  .addressContent-wrapper
    width: 100%
    height: 100vh
    background-color: #F2F0F0
</style>