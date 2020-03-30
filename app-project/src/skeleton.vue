<template>
  <div class="skeleton-wrapper">
    <content-loader
      width=375
      height=812
      speed=2
      primaryColor="#f9f9f9"
      secondaryColor="#ecebeb"
    >
      <circle cx="27" cy="27" r="17" /> 
      <rect x="57" y="11" rx="15" ry="15" width="262" height="30" /> 
      <rect x="10" y="73" rx="2" ry="2" width="350" height="160" /> 
      <rect x="330" y="9" rx="0" ry="0" width="29" height="31" /> 
      <rect x="9" y="47" rx="0" ry="0" width="350" height="18" /> 
      <rect x="24" y="245" rx="15" ry="15" width="60" height="60" /> 
      <rect x="108" y="245" rx="15" ry="15" width="60" height="60" /> 
      <rect x="280" y="320" rx="15" ry="15" width="60" height="60" /> 
      <rect x="24" y="320" rx="15" ry="15" width="60" height="60" /> 
      <rect x="108" y="320" rx="15" ry="15" width="60" height="60" /> 
      <rect x="195" y="320" rx="15" ry="15" width="60" height="60" /> 
      <rect x="195" y="245" rx="15" ry="15" width="60" height="60" /> 
      <rect x="280" y="245" rx="15" ry="15" width="60" height="60" /> 
      <rect x="10" y="395" rx="0" ry="0" width="170" height="110" /> 
      <rect x="190" y="395" rx="0" ry="0" width="170" height="110" /> 
      <rect x="10" y="515" rx="0" ry="0" width="150" height="30" /> 
      <rect x="173" y="659" rx="0" ry="0" width="1" height="0" /> 
      <rect x="10" y="560" rx="0" ry="0" width="110" height="140" /> 
      <rect x="66" y="674" rx="0" ry="0" width="6" height="2" /> 
      <rect x="130" y="560" rx="0" ry="0" width="110" height="140" /> 
      <rect x="250" y="560" rx="0" ry="0" width="110" height="140" /> 
      <rect x="10" y="715" rx="0" ry="0" width="350" height="80" /> 
      <rect x="196" y="776" rx="0" ry="0" width="1" height="6" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader"

export default {
  name: 'Skeleton',
  components: { 
    ContentLoader 
  },
}
</script>

<style lang="stylus" scoped>
  // .skeleton-wrapper
  //   background-color: red
</style>