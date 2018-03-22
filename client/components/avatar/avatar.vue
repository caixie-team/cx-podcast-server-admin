<template>
  <div>
    <span class="gravatar is-placeholder" :style="style" v-if="!user"></span>
    <span class="gravatar is-missing" v-else-if="failedToLoad"></span>
    <img :alt="altText"
         :title="title"
         :src="avatarURL"
         class="gravatar"
         :style="style"
         @error="onError" v-else>
  </div>
</template>
<script>
  export default  {
    props: {
      user: {
        type: Object
      },
      imgSize: {
        type: Number,
        default: 96
      },
      tempImage: {
        type: String
      },
      size: {
        type: Number,
        default: 26
      },
      alt: {
        type: String
      },
      title: {
        type: String
      }
    },
    data () {
      return {
        failedToLoad: false
      }
    },
    computed: {
      altText () {
        if (this.user) {
          return this.user.user_nicename
        }
        return this.alt
      },
      avatarURL () {
        if (this.user && !Object.is(this.user.avatarUrl, undefined)) {
          return this.getResizedImageURL(this.user.avatarUrl)
        }
        // return this.tempImage
      },
      style () {
        return {
          width: this.size + 'px',
          height: this.size + 'px'
        }
      }
    },
    methods: {
      onError () {
        this.failedToLoad = true
      },
      getResizedImageURL (imageURL) {
        const imgSize = this.imgSize
        return `${imageURL}?imageMogr2/thumbnail/${imgSize}x${imgSize}/q/95/format/jpg/interlace/1`
          // ?imageMogr2/thumbnail/96x96/q/95/format/jpg/interlace/1
        // 从七牛取的时候处理图片大小
      }
    }
  }
</script>
