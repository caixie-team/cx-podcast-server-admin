<template>
  <file-upload
    :name="name"
    :post-action="uploadAction"
    v-model="files"
    :multiple="multiple"
    @input-file="inputFile"
    @input-filter="inputFilter"
    :accept="accept"
    :size="maxSize || size"
    :headers="requestHeader"
    ref="upload">
    <slot />
  </file-upload>
</template>
<script>
  import FileUpload from 'vue-upload-component/src'

  export default {
    components: {
      FileUpload
    },
    props: {
      action: {
        type: String
      },
      headers: {
        type: Object,
        default () {
          return {}
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: 'file'
      },
      accept: {
        type: String
      },
      maxSize: {
        type: Number
      },
      onUpload: {
        type: Function,
        default () {
          return {}
        }
      },
      onProgress: {
        type: Function,
        default () {
          return {}
        }
      },
      onSuccess: {
        type: Function,
        default () {
          return {}
        }
      },
      onPreview: {
        type: Function,
        default () {
          return {}
        }
      },
      onError: {
        type: Function,
        default () {
          return {}
        }
      },
      onRemove: {
        type: Function,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        files: [],
        progress: 'success',
        uploadProgress: '',
        size: 1024 * 1024 * 20,
        list: [],
      }
    },
    mounted () {
      console.log('Upload component mounted')
      // console.log(this.uploadAction)
    },
    computed: {
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$auth.token}
      },
      uploadAction () {
        if (!this.action) {
          const appId = this.$store.getters.appId
          const baseURL = process.env.baseURL
          const action = `${baseURL}/apps/${appId}/file`
          return action
        }

        return this.action
      }
    },
    watch: {
      files (val) {
        this.$emit('receive-files', val)
      }
    },
    methods: {
      remove (item) {
        this.$refs.upload.remove(item)
      },
      inputFile (newFile, oldFile) {
        if (newFile && !oldFile) {
          console.log('add file')
          // 添加文件
          this.$emit('add-file')
        }
        if (newFile && oldFile) {
          // 更新文件
          // 开始上传
          if (newFile.active !== oldFile.active) {
            console.log('on load start')
            // console.log('Start upload', newFile.active, newFile)
            // console.log(newFile.size + 'xxlxlxllxlx')
            // 限定最小字节
            // if (newFile.size >= 0 && newFile.size < 100 * 1024) {
            //   newFile = this.$refs.upload.update(newFile, {error: 'size'})
            // }
            this.onUpload(newFile.active, newFile)
          }

          // 上传进度
          if (newFile.progress !== oldFile.progress) {
            console.log('progress', newFile.progress, newFile)
            this.onProgress(newFile.progress, newFile)
            console.log(newFile.progress)
          }

          // 上传错误
          if (newFile.error !== oldFile.error) {
            console.log('error', newFile.error, newFile)
            this.onError(newFile.error, newFile)
          }

          // 上传成功
          if (newFile.success !== oldFile.success) {
            console.log(newFile.success)
            // console.log('success', newFile.success, newFile)
            console.log('input file....')

            this.onSuccess(newFile.success, newFile, this.$refs.upload)
          }
        }

        if (!newFile && oldFile) {
          // 删除文件

          // 自动删除 服务器上的文件
          if (oldFile.success && oldFile.response.id) {
            this.onRemove(oldFile.response.id)
            // $.ajax({
            //   type: 'DELETE',
            //   url: '/file/delete?id=' + oldFile.response.id,
            // });
          }
        }
        // 自动开始
        // if (newFile && !oldFile && !this.$refs.upload.active) {
        //   this.$refs.upload.active = true
        // }
        // 自动上传
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
        }
      },
      inputFilter (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          // 过滤系疼文件 or 隐藏文件
          if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            return prevent()
          }
          // 过滤 php html js 文件
          if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
          }
          // 创建 blob 字段
          newFile.blob = ''
          const URL = window.URL || window.webkitURL
          if (URL && URL.createObjectURL) {
            newFile.blob = URL.createObjectURL(newFile.file)
            this.onPreview(newFile.blob)
            // console.log(newFile.blob)
          }
        }
      },
      format (file) {
        const format = file.name.split('.').pop().toLocaleLowerCase() || '';
        let type = 'document';
        if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
          type = 'image';
        }
        if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
          type = 'ios-film';
        }
        if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
          type = 'ios-musical-notes';
        }
        if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(format) > -1) {
          type = 'document-text';
        }
        if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
          type = 'stats-bars';
        }
        if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
          type = 'ios-videocam';
        }
        return type;
      }
    }
  }
</script>
