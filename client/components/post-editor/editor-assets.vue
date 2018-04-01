<style lang="scss">
  .c-upload__task-icon {
    top: 13px;
    background: #4ab866;
    border-color: #4ab866;
  }

  .c-upload__task-icon {
    display: block;
    position: absolute;
    top: 18px;
    left: 24px;
    width: 16px;
    height: 16px;
    border: 2px solid #c8d7e1;
    border-radius: 16px;
    background: #fff;
    cursor: pointer;
    &.is-completed {
      top: 13px;
      background: #4ab866;
      border-color: #4ab866;
    }
  }

  .c-upload-item__header {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 600;
    font-size: 13px;
  }
</style>
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
        <!--<span v-if="file.success">-->
        <!--</span>-->
        <div class="c-upload-item u-flex  u-align-items-center u-justify-center">
          <div class="c-upload-item__header u-width-50">
            {{file.name}}
          </div>
          <div class="c-upload-item__content u-width-25 u-flex"
               style="font-size: 14px; flex-direction: column; text-align: center;">
            <div class="c-progress-bar is-compact is-pulsing"
                 v-if="(file.active || file.progress !== '0.00') && !file.success">
              <div class="c-progress-bar__progress" :style="{width: file.progress + '%'}"></div>
            </div>

            <span class="u-flex  u-align-items-center u-justify-center" v-else-if="file.success"
                  style="font-size: 12px; color: #4ab866;">
              <svgicon name="gridicons-checkmark" class="gridicon gridicons-checkmark u-mr-small" color="none #4ab866"
                       height="18" width="18"/>
              {{file.size | formatSize}}
            </span>
            <span class="u-text-mute" v-else>队列</span>
            <span v-if="file.error" class="u-text-danger" style="font-size: 13px;">
              <svgicon name="gridicons-notice" color="none #ed4d4d" height="16" width="16"/>
              {{file.error | formatError}}
            </span>
          </div>
          <div class="c-upload-item__progress u-width-25  u-flex u-align-items-center u-justify-end"
               style="font-size: 13px;">
            <button class="c-button is-compact u-mr-small"
                    @click="removeErrorFile(file)">取消
            </button>
            <button class="c-button is-compact is-primary"
                    v-if="file.success"
                    @click="handleConfirm(file)">确定</button>
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
  import '~/icons/gridicons-checkmark'

  export default {
    components: {
      Upload,
      EmptyContent,
      CompactCard
    },
    props: {
      count: {
        type: Number
      },
      confirm: {
        type: Function,
        default () {
          return {}
        }
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
      handleConfirm (file) {
        if (!Object.is(file.response.data, undefined)) {
          // this.$emit('confirm', file.response.data)
          this.confirm(this.$refs.uploader, file)
        } else {
          // this.confirm(this.$refs.uploader, file)
          return
        }
        // const {data} = await this.$axios.post(`/apps/${this.getters.appId}/posts/${form.id}`, form)
      },
      // 内容添加成功的处理
      handleSuccess (success, data) {
        // this.$emit('uploaded', data)
        // this.$refs.uploader.remove(data)

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
