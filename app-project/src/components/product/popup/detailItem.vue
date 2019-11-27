<template>
  <div :class="showBorder ? 'detailItem-wrapper-border' : 'detailItem-wrapper'" v-if="data">
    <div class="detailItem-title">
      <span>{{data.name}}</span>
      <span style="color: #f13a39; margin-left: .2rem">{{attr}}</span>
    </div>
    <div class="detailItems">
      <div class="detailItem-content" v-if="showColor()" v-for="item of data.value">
        <input v-model="attr" type="radio" :id="popUp ? (item.text + 'popUp') : item.text" :value="item.text" v-show="false"/>
        <label :class="attr == item.text ? 'content-item-active' : 'content-item'" :for="popUp ? (item.text + 'popUp') : item.text">
          <van-image
            class="item-img"
            width="15vw"
            height="15vw"
            fit="contain"
            :src="item.photo"
          />
          <span class="item-text">{{item.text}}</span>
        </label>
      </div>

      <div class="detailItem-content" v-if="!showColor()" v-for="item of data.value">
        <input v-model="attr" type="radio" :id="popUp ? (item + 'popUp') : item" :value="item" v-show="false"/>
        <label :class="attr == item ? 'content-item-active' : 'content-item'" :for="popUp ? (item + 'popUp') : item">
          <span class="item-text">{{item}}</span>
        </label>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "DetailItem",
  props: {
    data: Object,
    showBorder: Boolean,
    popUp: Boolean
  },
  data(){
    return {
      attr: ""
    }
  },
  methods:{
    showColor(){
      if(this.data){
        if(this.data.hasOwnProperty('is_color')){
          return true
        }else{
          return false
        }
      }
    }
  },
  watch: {
    attr(){
      if(this.attr.length > 0){
        this.$emit('selected',this.attr)
      }
      if(this.data && this.data.hasOwnProperty('is_color')){
        let img = ""
        for(let item of this.data.value){
          if(item.text == this.attr){
            img = item.photo
          }
        }

        this.$emit('changePopUpImg',img)
      }
    }
  },
  mounted(){
    // console.log(this.data)
  }
}
</script>

<style lang="stylus" scoped>
  .detailItem-wrapper-border
    width: 100%
    padding: .2rem 0
    border-bottom: .01rem solid #999
  .detailItem-wrapper
    width: 100%
    padding: .2rem 0
    .detailItem-title
      margin-bottom: .2rem
    .detailItems
      display: flex
      flex-direction: row
      flex-wrap: wrap
      .detailItem-content
        width: 23vw
        margin: .1rem 0
        .content-item
          padding: .1rem
          margin-right: .3rem
          border: .03rem solid #F6F6F6
          border-radius: .1rem
          background-color: #F6F6F6
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          .item-img
            margin-bottom: .1rem
          .item-text
            vertical-align: middle
            font-size: .3rem
            line-height: .32rem
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            overflow: hidden
        .content-item-active
          padding: .1rem
          margin-right: .3rem
          border: .03rem solid #FF5103
          color: #FF5103
          border-radius: .1rem
          background-color: #F6F6F6
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          .item-img
            margin-bottom: .1rem
          .item-text
            vertical-align: middle
            font-size: .3rem
            line-height: .32rem
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            overflow: hidden
</style>