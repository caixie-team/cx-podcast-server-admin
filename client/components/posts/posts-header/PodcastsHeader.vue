<template>
  <!--{{ podcast }}-->
  <!--<header-cake @click="test" @click-title="test" isCompact>-->
  <!--添加内容-->
  <!--</header-cake>-->
  <foldable-card class="is-compact" expanded>
    <div class="connected-application-item__header is-p" slot="header">
      <div class="plugin-icon connected-application-icon">
        <img
          class="plugin-icon__img"
          src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=400&d=mm">
      </div>
      <h3>{{ podcast.title }}</h3>
    </div>
    <div slot="summary">
      <span class="button is-borderless" v-if="podcast.status === 'publish'">
          已上架
      </span>
      <div v-else>
        <button type="button" class="button is-error is-compact is-primary" style="margin-right: 8px;">发布</button>
        <file-upload
          class="button popover-icon is-compact"
          name="file"
          :post-action="uploadAction"
          v-model="files"
          @input-file="input"
          @input-filter="inputFilter"
          :accept="accept"
          :size="size || 0"
          :headers="requestHeader"
          ref="upload">
          <!--Add upload files-->
          <svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
            </g>
          </svg>
          设置封面
        </file-upload>
        <!--<button type="button" class="button is-compact" @click.prevent="changeCover()">换封面</button>-->
      </div>
    </div>
    <div slot="expandedSummary">
      <div>
        <button type="button" class="button is-error is-compact is-scary" style="margin-right: 8px;">下架</button>
        <file-upload
          class="button popover-icon is-compact"
          name="file"
          :post-action="uploadAction"
          v-model="files"
          @input-file="input"
          @input-filter="inputFilter"
          :accept="accept"
          :size="size || 0"
          :headers="requestHeader"
          ref="upload">
          <!--Add upload files-->
          <svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
            </g>
          </svg>
          设置封面
        </file-upload>
        <!--<button type="button" class="button is-compact" @click.prevent="changeCover()">换封面</button>-->
      </div>
    </div>
    <div @click="handleClick"
         :class="classes"
         :style="collapsed ? `background-image: url(${podcast.featured_image});` : ''"
         v-if="podcast.featured_image">
      <button class="button editor-drawer-well__remove is-compact" type="button" @click="onRemove">
        <span class="screen-reader-text">移除</span>
        <svg class="gridicon gridicons-cross editor-drawer-well__remove-icon" height="24" width="24"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path
              d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
          </g>
        </svg>
      </button>
      <img :src="podcast.featured_image" class="post-image__image" v-if="!collapsed"/>
    </div>
    <empty-content title="没有封面图" line="是否要设置封面图？" :illustration="illustration" v-else>
      <button class="media-library__upload-button button button is-primary"
              @click.prevent="insertFile()">
              <span v-if="uploadProgress">
                {{uploadProgress}}
              </span>
        <span v-else>
                设置封面图
              </span>
      </button>
    </empty-content>
  </foldable-card>

</template>

<script>
  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../../foldable-card'
  import EmptyContent from '../../empty-content'

  export default {
    name: 'PodcastHeader',
    props: {
      podcast: {
        type: Object,
        required: true,
        status: ''
      }
    },
    data () {
      return {
        progress: 'success',
        accept: 'image/png,image/gif,image/jpeg,image/webp,audio/mp3',
        files: [],
        uploadProgress: '',
        size: 1024 * 1024 * 10,
        collapsed: true,
        illustration: '/images/media/illustration-media.svg'
      }
    },
    computed: {
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/app/${appId}/file`
      },
      featuredImage () {
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      },
      classes () {
        return [
          'post-image',
          {
            'is-placeholder': !(this.progress === 'success'),
            'is-collapsed': this.collapsed
          }
        ]
      }
    },
    components: {
      FileUpload,
      FoldableCard,
      EmptyContent
    },
    methods: {
      onRemove () {
        // 删除封面图
      },
      changeCover () {
        const input = this.$refs.upload.$el.querySelector('input')
        input.onclick = null
        input.click()
      },
      input (newFile, oldFile) {
        if (newFile && oldFile) {
          if (newFile.active && !oldFile.active) {
            // this.beforeSend(newFile)
            // min size
            if (newFile.size >= 0 && newFile.size < 100 * 1024) {
              // newFile = this.$refs.upload.update(newFile, {error: 'size'})
            }
          }
          if (newFile.progress !== oldFile.progress) {
            this.progress = newFile.progress
          }
          if (newFile.error && !oldFile.error) {
            // this.error(newFile)
          }
          if (newFile.success && !oldFile.success) {
            // this.success(newFile)
            const data = newFile.response.data
            this.podcast.featured_image = data.url
            this.progress = 'success'
            this.podcast.meta = {
              '_thumbnail_id': data.id
            }
            this.$emit('featured_image_upload', this.podcast)
          }
        }
        if (!newFile && oldFile) {
          // this.remove(oldFile)
        }
        // 自动开始
        if (newFile && !oldFile && !this.$refs.upload.active) {
          this.$refs.upload.active = true
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
          }
        }
      },
      handleClick () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>
