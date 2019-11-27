<template>
  <div v-html="apply">
  </div>
</template>

<script>
export default {
  name: "Apply",
  computed:{
    apply(){
      return this.$route.query.htmls
    }
  },
  mounted(){
    // this.$nextTick(()=>{
    //   console.log('forms:',document.forms)
    //   document.forms['alipaysubmit'].submit()
    // })
  }
}
</script>

<style>

</style>