<template>
  <div class="commentContent-wrapper">
    <van-nav-bar title="评价" left-arrow @click-left="handleBackClick"/>

    <van-cell-group>

      <van-cell>
        <div class="good_desc">
          <van-image
            width="1.8rem"
            height="1.8rem"
            fit="contain"
            :src="photo"
          />
          <div class="desc-text">
            <span class="text-title">{{title}}</span>
            <span class="desc">{{descText}}</span>
          </div>
        </div>
      </van-cell>

      <van-cell>
        <div style="margin-bottom: .2rem">整体评分</div>
        <van-rate allow-half v-model="value" />
      </van-cell>

      <van-cell>
        <div style="margin-bottom: .2rem">请上传评价图片</div>
        <van-uploader v-model="fileList" multiple />
      </van-cell>

      <van-field
        v-model="message"
        rows="4"
        autosize
        label="评价"
        type="textarea"
        placeholder="宝贝满足你的期待吗？说说它的优点和缺点吧"
      />

      <van-cell>
        <van-button @click="handlePostComment" type="primary" round>提交评价</van-button>
      </van-cell>

    </van-cell-group>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: "CommentContent",
  data(){
    return {
      value: 0,
      fileList: [],
      message: '',
      descText: '',
      title: '',
      photo: ''
    }
  },
  computed:{
    ...mapState(['userData'])
  },
  methods: {
    handleBackClick(){
      this.$router.go(-1)
    },
    getBase64List(){
      if(this.fileList.length > 0){
        let result = []
        for(let item of this.fileList){
          result.push(item.content)
        }
        return result
      }else{
        return []
      }
    },
    handlePostComment(){
      if(this.value == 0){
        this.$toast({
          message: '请选择评分(>0)',
          duration: 1200
        })
        return 
      }

      if(this.message.length == 0){
        this.$toast({
          message: '请输入评价',
          duration: 1200
        })
        return
      }
      let postData = {
        goods_id: this.$route.query.goods_id,
        user_id: this.userData.id,
        user_id_to: this.$route.query.shop_id,
        order_number: this.$route.params.orderNumber,
        content: this.message,
        value: this.value,
        nickname: this.userData.nickname,
        head_img: this.userData.head_img,
        file_list: this.getBase64List()
      }
      axios.post('api/method/showComment',postData)
        .then((res)=>{
          console.log('showComment',res.data)
          if(res.data.code == 1){
            this.$toast({
              type: 'success',
              message: "已评价",
              duration: 1200
            })
            setTimeout(()=>{
              this.$router.go(-1)
            },1200)
          }else{
            this.$toast({
              type: 'fail',
              message: "评价失败",
              duration: 1200
            })
          }
        })
        .catch((err)=>{
          this.$toast({
            type: 'fail',
            message: "评价失败",
            duration: 1200
          })
          console.log('showComment err',err)
        })
    }
  },
  mounted(){
    // console.log(this.$route.params)
    if(this.$route.params){
      this.descText = this.$route.params.descText
      this.title = this.$route.params.title
      this.photo = this.$route.params.photo
    }
  }
}
</script>

<style lang="stylus" scoped>
  .commentContent-wrapper >>> .van-icon
    color: #E31436
    font-size: 20px

  .commentContent-wrapper >>> .good_desc
    display: flex
    flex-direction: row
    .desc-text
      margin-left: .2rem
      display: flex
      flex-direction: column
      .text-title
        display: block
        font-size: .3rem
        font-weight: bold
        line-height: .4rem
        margin-bottom: .1rem
        padding: .1rem
      .desc
        display: block
        line-height: .4rem
        padding: 0 .1rem
</style>