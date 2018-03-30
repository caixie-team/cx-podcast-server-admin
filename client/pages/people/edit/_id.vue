<template>
  <div>
    <header-cake :title="detail.user_nicename"/>
    <div class="c-card c-section-header is-compact">
      <div class="c-section-header__label">
        <span class="c-section-header__label-text">{{detail.user_nicename}} 的资料</span></div>
      <div class="c-section-header__actions"></div>
    </div>
    <div class="c-card c-me-profile-settings" v-if="!isSubscriber">
      <div class="c-edit-gravatar">
        <upload
          :action="uploadAction"
          class="file-picker"
          :accept="accept"
          :max-size="size"
          :on-preview="handlePreview"
          :on-progress="handleProgress"
          :on-success="handleSuccess">
          <div data-tip-target="c-edit-gravatar"
               class="c-edit-gravatar__image-container">
            <img alt="头像"
                 class="gravatar"
                 :src="detail.avatarUrl"
                 v-if="detail.avatarUrl" height="100%">
            <svgicon class="gravatar"
                     name="gridicons-user-circle" color="none #FFF" scale="9.375" v-else/>

            <div class="c-edit-gravatar__label-container">

              <svgicon name="gridicons-cloud-upload" class="gridicon" scale="2.25"/>
              <span class="c-edit-gravatar__label">
                {{uploadLabel}}
              </span>

            </div>

          </div>
        </upload>

      </div>
      <form @submit.prevent="handleSubmit">
        <fieldset class="c-form-fieldset">
          <label for="usernameOrEmail" class="c-form-label">用户邮箱</label>
          <input id="usernameOrEmail" name="user_email" class="c-form-text-input"
                 v-model="detail.user_email"
                 v-validate="'required|email'"
                 :class="{'c-input': true, 'is-error': errors.has('user_email') }"
                 type="email"
                 placeholder="用户名" disabled>
        </fieldset>
        <fieldset class="c-form-fieldset">
          <label for="user_pass" class="c-form-label">密码</label>
          <input type="text"
                 id="user_pass"
                 name="last_name"
                 value="abcd1234"
                 class="c-form-text-input" disabled>
          <p class="c-form-setting-explanation">
            默认登录密码
            <nuxt-link to="/settings">重置?</nuxt-link>
          </p>
        </fieldset>
        <fieldset class="c-form-fieldset">
          <label for="user_nicename"
                 class="c-form-label">
            公开显示的名字
          </label>
          <input type="text"
                 id="user_nicename"
                 name="user_nicename"
                 v-model="detail.user_nicename"
                 placeholder="对外展示的昵称"
                 class="c-form-text-input">
        </fieldset>
        <fieldset class="c-form-fieldset">
          <label for="role" class="c-form-label">身份</label>
          <select id="role"
                  name="role"
                  class="c-form-select"
                  v-model="detail.role">
            <option value="author">作者</option>
            <option value="editor">编辑</option>
            <option value="administrator">管理员</option>
            <!--<option value="contributor">贡献者</option>-->
            <!--<option value="follower">粉丝</option>-->
          </select>
          <p class="c-form-setting-explanation">角色管理</p>
        </fieldset>
        <fieldset class="c-form-fieldset" v-if="detail.resume">
          <label for="summary" class="c-form-label">简介</label>
          <textarea
            id="summary"
            name="summary"
            placeholder="成员个人介绍"
            class="c-form-textarea" :value="detail.resume.summary"></textarea>
        </fieldset>
        <p>
          <button type="submit"
                  class="c-button c-form-button is-primary"
                  disabled="isChange">更新成员信息
          </button>
        </p>
      </form>
    </div>
    <div v-else>
      <div class="c-card c-section-header is-compact">
        <div class="c-section-header__label">
          <span class="c-section-header__label-text"></span>
        </div>
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
    async fetch ({store, params}) {
      if (params.id && !Object.is(Number(params.id), NaN)) {
        await store.dispatch('getUser', params.id)
      }
    },
    data () {
      return {
        size: 1024 * 1024 * 10,
        accept: 'image/png,image/gif,image/jpeg',
        uploading: false,
        isChange: false,
        form: {
          id: '',
          approach: 'pc',
          meta: {
            avatar: ''
          },
          // user_login: '',
          user_pass: 'abcd1234',
          user_nicename: '',
          user_email: '',
          // user_phone: '',
          role: 'author',
          summary: ''
        },
        isVisible: false,
        isSaving: false
      }
    },
    mounted () {
      this.form = Object.assign({}, this.form, this.detail)
    },
    computed: {
      isSubscriber () {
        return this.detail.role.toString() === 'subscriber'
      },
      uploadAction () {
        const baseURL = process.env.baseURL
        return baseURL + '/file'
      },
      detail () {
        return this.$store.state.user.detail.data
      },
      uploadLabel () {
        return this.form.avatar ? '点击替换头像' : '点击上传头像'
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      },
      user () {
        return this.$auth.state.user
      },
      newUser () {
        return this.$store.state.user.detail
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
        this.form.avatarUrl = data.response.data.url + '?imageMogr2/thumbnail/300x300/q/90/format/jpg/interlace/1'
        this.form.meta.avatar = data.response.id
        this.isChange = true
      },
      async handleSubmit () {
        const that = this
        that.isSaving = true
        await this.$validator.validateAll()
          .then(async (result) => {
            if (result) {
              const res = await this.$store.dispatch('updateUser', {form: this.form})
              if (!res) {
                this.$router.replace('/people/team')
              }
              that.isSaving = that.detail.saving
            }
          })
      }
    }
  }
</script>
<style scoped>
  .gravatar {
    width: 150px;
    height: 150px;
    max-width: 100%;
    max-height: 100%;
  }

  .file-uploads {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
</style>
