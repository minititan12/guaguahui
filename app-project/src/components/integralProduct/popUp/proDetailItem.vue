<template>
  <div class="detailItem-wrapper" v-if="data">
    <div class="detailItem-title">
      <span>{{data.name}}</span>
      <span style="color: #FF5756; margin-left: .2rem">{{attr}}</span>
    </div>

    <div class="detailItems">
      <div class="detailItem-content" v-for="item of data.attrList">
        <input v-model="attr" type="radio" :id="item.attr" :value="item.attr" v-show="false"/>
        <label :class="attr == item.attr ? 'content-item-active' : 'content-item'" :for="item.attr">
          <van-image
            class="item-img"
            width="15vw"
            height="15vw"
            fit="contain"
            :src="item.image"
            v-if="showImg()"
          />
          <span class="item-text">{{item.attr}}</span>
        </label>
      </div>

      <!-- <div class="detailItem-content" v-if="!showImg()" v-for="item of data.attrList">
        <input v-model="attr" type="radio" :id="item.attr" :value="item" v-show="false"/>
        <label :class="attr == item ? 'content-item-active' : 'content-item'" :for="item">
          <span class="item-text">{{item}}</span>
        </label>
      </div> -->

    </div>
  </div>
</template>

<script>
export default {
  name: "ProDetailItem",
  props: {
    data: Object
  },
  data(){
    return {
      attr: ""
    }
  },
  methods:{
    showImg(){
      if(this.data){
        if(this.data.attrList[0].hasOwnProperty('image')){
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
        let selectedObj = {
          name: this.data.name,
          val: this.attr
        }
        this.$emit('selected',selectedObj)
      }
      if(this.data && this.showImg()){
        let img = ""
        for(let item of this.data.attrList){
          if(item.attr == this.attr){
            img = item.image
          }
        }

        this.$emit('changePopUpImg',img)
      }
    }
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