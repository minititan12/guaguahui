<template>
  <div class="detailItem-wrapper" v-if="data">
    <div class="detailItem-title">
      <span>{{data.attr_name}}</span>
      <span style="color: #FF5756; margin-left: .2rem">{{attr}}</span>
    </div>

    <div class="detailItems">
      <div class="detailItem-content" v-if="showColor()" v-for="item of data.attr_value">
        <input v-model="attr" type="radio" :id="item.text" :value="item.text" v-show="false"/>
        <label :class="attr == item.text ? 'content-item-active' : 'content-item'" :for="item.text">
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

      <div class="detailItem-content" v-if="!showColor()" v-for="item of data.attr_value">
        <input v-model="attr" type="radio" :id="item" :value="item" v-show="false"/>
        <label :class="attr == item ? 'content-item-active' : 'content-item'" :for="item">
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
    data: Object
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
        for(let item of this.data.attr_value){
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
  .detailItem-wrapper
    width: 100%
    padding: 2vw 0
    .detailItem-title
      font-family: PFH
      font-size: 3.8vw
      margin-bottom: 4vw
    .detailItems
      display: flex
      flex-direction: row
      flex-wrap: wrap
      .detailItem-content
        width: 23vw
        margin: 1vw 0
        .content-item
          padding: 1vw 2vw
          margin-right: 3vw
          border: 1.5px solid #F6F6F6
          border-radius: 1vw
          background-color: #F6F6F6
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          overflow: hidden
          .item-img
            margin-bottom: 2vw
          .item-text
            width: 100%
            vertical-align: middle
            font-size: 3.5vw
            font-family: PFB
            line-height: 5.5vw
            text-align: center
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            overflow: hidden
        .content-item-active
          padding: 1vw 2vw
          margin-right: 3vw
          border: 1.5px solid #FF5756
          color: #FF5756
          border-radius: 1vw
          background-color: #F6F6F6
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          overflow: hidden
          .item-img
            margin-bottom: 2vw
          .item-text
            width: 100%
            vertical-align: middle
            font-size: 3.5vw
            font-family: PFB
            line-height: 5.5vw
            text-overflow: ellipsis
            text-align: center
            display: -webkit-box
            -webkit-line-clamp: 1
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            overflow: hidden
</style>