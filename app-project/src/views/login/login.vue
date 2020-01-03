<template>
  <LoginContent></LoginContent>
</template>

<script>
import LoginContent from '../../components/login/loginContent1027'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "Login",
  components: {
    LoginContent
  },
  computed: {
    ...mapState(['login'])
  },
  // methods:{
  //   ...mapMutations(['updateUserData'])
  // },
  mounted(){
    if(this.login){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>