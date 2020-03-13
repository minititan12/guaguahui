<template>
  <div class="service-wrapper">
    <ServiceHeader></ServiceHeader>
    <ServiceContent ref="serviceContent"></ServiceContent>
    <ServiceFooter @enter="handleEnter"></ServiceFooter>
  </div>
</template>

<script>
import ServiceHeader from '../../components/service/serviceHeader'
import ServiceFooter from '../../components/service/serviceFooter'
import ServiceContent from '../../components/service/serviceContent'
import { mapMutations } from 'vuex'
export default {
  name: "Service",
  components: {
    ServiceHeader,
    ServiceFooter,
    ServiceContent
  },
  methods: {
    ...mapMutations(['updateAnswer']),
    handleEnter(){
      this.$refs.serviceContent.enter()
    }
  },
  mounted(){
    if(localStorage.hasOwnProperty('rongYunStatus') && localStorage.rongYunStatus == 'false'){
      RongIMClient.reconnect({
        onSuccess: function(userId) {
          console.log('reconnect success. ' + userId);
        },
        onTokenIncorrect: function() {
          console.log('token 无效');
        },
        onError: function(errorCode) {
          console.log(errorcode);
        }
      })
    }
  },
  created(){
    this.updateAnswer([])
  }
}
</script>

<style lang="stylus" scoped>
  .service-wrapper
    width: 100%
</style>