<template>
  <div>

    <header-cake title="添加新成员"></header-cake>
    <div class="c-card c-section-header is-compact">
      <div class="c-section-header__label">
        <span class="c-section-header__label-text">成员资料</span></div>
      <div class="c-section-header__actions"></div>
    </div>
    <div class="c-card c-me-profile-settings">
      <div class="c-edit-gravatar">
        <upload
          class="file-picker"
          :accept="accept"
          :max-size="size"
          :on-preview="handlePreview"
          :on-progress="handleProgress"
          :on-success="handleSuccess">
          <div data-tip-target="c-edit-gravatar"
               class="c-edit-gravatar__image-container">
            <div class="drop-zone">
              <div class="drop-zone__content">
                <div>
                    <span class="drop-zone__content-icon">
                      <svgicon name="gridicons-cloud-upload" class="gridicon" style="width: 48px; height: 48px;"/>
                    </span>
                  <span class="drop-zone__content-text">拖放以上传个人资料照片</span>
                </div>
              </div>
            </div>

            <img alt="头像"
                 class="gravatar"
                 :src="form.avatar"
                 height="100%"
                 v-if="form.avatar">
            <svgicon class="gravatar"
                     name="gridicons-user-circle" color="none #008be8" scale="9.375" v-else/>

            <div class="c-edit-gravatar__label-container">

              <svgicon name="gridicons-cloud-upload" class="gridicon" scale="2.25"/>
              <span class="c-edit-gravatar__label">点击上传头像</span>

            </div>

          </div>
        </upload>

      </div>
      <form>
        <fieldset class="c-form-fieldset">
          <label for="first_name" class="c-form-label">用户名</label>
          <input type="text"
                 id="first_name"
                 name="first_name"
                 value="fdf"
                 class="c-form-text-input">
        </fieldset>
        <fieldset class="c-form-fieldset">
          <label for="last_name" class="c-form-label">密码</label>
          <input type="text"
                 id="last_name"
                 name="last_name"
                 value="fdfdfdfdf"
                 class="c-form-text-input">
        </fieldset>
        <fieldset class="c-form-fieldset">
          <label for="display_name"
                 class="c-form-label">
            公开显示的名称
          </label>
          <input type="text"
                 id="display_name"
                 name="display_name"
                 value="bluepxdf"
                 class="c-form-text-input">
        </fieldset>
        <fieldset class="c-form-fieldset">
          <label for="role" class="c-form-label">身份</label>
          <select id="role" name="role"
                  class="c-form-select">
            <option value="administrator">管理员</option>
            <option value="editor">编辑</option>
            <option value="author">作者</option>
            <!--<option value="contributor">贡献者</option>-->
            <!--<option value="follower">粉丝</option>-->
          </select>
          <p class="c-form-setting-explanation">
            <a target="_blank"
               rel="noopener noreferrer"
               href="http://en.support.wordpress.com/user-roles/">
              了解更多关于角色的信息</a>
          </p>
        </fieldset>
        <fieldset class="c-form-fieldset">
          <label for="description" class="c-form-label">简介</label>
          <textarea
            id="description"
            name="description"
            class="c-form-textarea">sdfsadf</textarea>
        </fieldset>
        <p>
          <button type="submit" class="c-button c-form-button is-primary">添加</button>
        </p>
      </form>
    </div>
    <div>
      <div class="c-card c-section-header is-compact">
        <div class="c-section-header__label"><span class="c-section-header__label-text">个人资料链接</span></div>
        <div class="c-section-header__actions">
          <div>
            <button class="c-button c-popover-icon is-compact" type="button">
              <svg class="gridicon gridicons-add-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path>
                </g>
              </svg>
              添加
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import HeaderCake from '~/components/header-cake'
  import Upload from '~/components/upload'
  import Spinner from '~/components/spinner'
  import FormInputValidation from '~/components/forms/form-input-validation'

  import '~/icons/gridicons-cloud-upload'
  import '~/icons/gridicons-user-circle'

  export default {
    components: {
      HeaderCake,
      Spinner,
      FormInputValidation,
      Upload
    },
    data () {
      return {
        size: 1024 * 1024 * 10,
        accept: 'image/png,image/gif,image/jpeg',
        uploading: false,
        form: {
          avatar: '',
          name: '',
          description: '',
          term_id: '',
          term_taxonomy_id: ''
        },
        isVisible: false
      }
    },
    computed: {
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      },
      user () {
        return this.$auth.state.user
        // return this.$store.state.user
      },
      org () {
        return this.$store.state.org.detail.data
      }
    },
    methods: {
      handlePreview (url) {
        this.form.avatar = url
      },
      handleProgress (progress) {
        this.uploading = true
      },
      handleSuccess (success, data) {
        this.uploading = false
        // console.log(success)
        // console.log(data + 'xx--x-x-x')
        this.form.avatar = data.url + '?imageMogr2/thumbnail/300x300/q/90/format/jpg/interlace/1'
          // `${form.avatar}?imageMogr2/thumbnail/150x150/q/90/format/jpg/interlace/1`
        // this.form.meta = {
        //   '_thumbnail_id': data.id
        // }
      }
    }
  }
</script>
<style scoped>
  .gravatar {
    width: 150px;
    height: 150px;
  }
  .file-uploads {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
</style>
