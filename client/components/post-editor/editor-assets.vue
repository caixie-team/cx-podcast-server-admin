<template>
  <div>

    <div class="c-post-assets__main-header">
          <span class="c-section-header__label">
            <span class="c-section-header__label-text">
                资源列表
              <small class="c-section__subtitle">
                                {{count}} 条
                              </small>
            </span>
            <!--<span class="c-count" v-if="detail.assets">{{detail.assets.length}}</span>-->
          </span>
      <upload :accept="accept"
              :multiple="multiple"
              :on-success="handleSuccess"
              @receive-files="handleFiles"
              ref="uploader">
        <a class="c-button c-post-assets__header-button "
           style="color: #767576; fill: #767576;">
          <svgicon name="gridicons-cloud-upload"
                   class="gridicon gridicons-cloud-upload"
                   style="width: 18px; height: 18px;" color="none #767576;"/>
          <span class="c-header-button__text">上传资源</span>
        </a>
      </upload>

    </div>

    <div class="c-upload-list u-mb-medium" v-if="fileList.length > 0">
      <compact-card v-for="file in fileList"
                    :key="file.id"
                    :class="{'is-highlight is-error' : file.error}" style="background: #FAFAFA;">
        <div class="c-upload-item u-flex">
          <div class="c-upload-item__header u-width-50">
            {{file.name}}
          </div>
          <div class="c-upload-item__content u-width-25 u-flex"
               style="font-size: 14px; flex-direction: column; text-align: center;">
            {{file.size | formatSize}}
            <span v-if="file.error" class="u-text-danger" style="font-size: 13px;">
            <svgicon name="gridicons-notice" color="none #ed4d4d" height="16" width="16"/>
            {{file.error | formatError}}
          </span>
          </div>
          <div class="c-upload-item__progress u-width-25  u-flex u-align-items-center u-justify-end"
               style="font-size: 13px;">
            <button class="c-button is-compact" style="min-width: 98px;" v-if="file.error"
                    @click="removeErrorFile(file)">取消
            </button>

            <div class="c-progress-bar is-compact is-pulsing"
                 v-else-if="(file.active || file.progress !== '0.00') && !file.success">
              <div class="c-progress-bar__progress" :style="{width: file.progress + '%'}"></div>
            </div>
            <span class="u-text-success" v-else-if="file.success">上传成功</span>
            <span class="u-text-mute" v-else>队列</span>
          </div>
        </div>
      </compact-card>
    </div>
    <slot></slot>
    <empty-content title="资源列表为空" v-show="!(count > 0)"/>

  </div>
</template>

<script>
  import {map} from 'lodash'
  import Upload from '~/components/upload'
  import EmptyContent from '~/components/empty-content'
  import {CompactCard} from '~/components/card'

  export default {
    components: {
      Upload,
      EmptyContent,
      CompactCard
    },
    props: {
      count: {
        type: Number
      }
    },
    data () {
      return {
        multiple: true,
        fileList: [],
        accept: 'audio/mp3'
      }
    },
    methods: {
      handleFiles (files) {
        this.fileList = files
      },
      removeErrorFile (file) {
        this.$refs.uploader.remove(file)
      },
      // handleFormUpdate (form) {
      //   this.fullForm = Object.assign({}, this.fullForm, form)
      // },
      // 处理排序
      // handleListChange (list) {
      //   const form = {
      //     id: this.detail.id,
      //     author: this.detail.author,
      //     block: list ? map(list, 'id') : map(this.detail.block, 'id')
      //   }
      //   this.$store.dispatch('savePostDetail', {form: form})
      // },
      // 内容添加成功的处理
      handleSuccess (success, data) {
        this.$emit('uploaded', data)
        this.$refs.uploader.remove(data)

        //   let isNew = true
      //   if (this.detail.block.length > 0) {
      //     isNew = false
      //   }
      //   添加 block 并更新 block
        // this.$store.commit('post/ADD_BLOCK', data.response.data)
        // this.$refs.uploader.remove(data)
        // if (isNew) {
        //   this.handleListChange()
        // }
      }
    }
  }
</script>
