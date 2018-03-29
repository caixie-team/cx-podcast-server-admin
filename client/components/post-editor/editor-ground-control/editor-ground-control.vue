<template>
  <div class="c-card c-editor-ground-control">
    <button class="c-button c-editor-ground-control__back is-borderless"
            type="button"
            @click="handleBack">
      关闭
    </button>
    <div class="c-app is-compact">
      <a class="c-app__content" :title="curApp.name">

        <div class="c-app-icon">
          <img class="c-app-icon__img c-image"
               :src="curApp.logo_url"
               v-if="curApp.logo_url">
          <svg class="gridicon gridicons-globe" height="11" width="11"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24" v-else>
            <g>
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
            </g>
          </svg>
        </div>

        <div class="c-app__info">
          <div class="c-app__title">{{curApp.name}}</div>
          <div class="c-app__domain">{{curApp.type}}</div>
        </div>
      </a>
    </div>
    <!--<div>-->
    <!--<button class="c-button c-masterbar__toggle-drafts is-compact is-borderless" title="最新草稿" type="button">-->
    <!--<span class="c-count">8</span>-->
    <!--</button>-->
    <!--</div>-->
    <quick-save-button :post="detail" :isSaving="isSaving"/>

    <div class="c-editor-ground-control__action-buttons">
      <div class="c-editor-ground-control__preview-button">
        <toggle @change="handleToggleChange"
                v-model="isSticky"
                :disabled="!(detail.status === 'publish')"
                compact>推荐
        </toggle>
      </div>
      <!--
      <button class="c-button c-editor-ground-control__toggle-sidebar is-borderless is-disabled"
              type="button"
              @click="toggleSidebar" disabled>
        <svgicon name="gridicons-cog" class="gridicon gridicons-cog" width="24" height="24"/>
      </button>
      -->
      <!--<button class="button editor-ground-control__preview-button" tabindex="4" type="button"><span-->
      <!--class="editor-ground-control__button-label">预览</span></button>-->
      <publish-button v-model="detail.status"
                      @publish="handlePublish"
                      @menu-action="handlePublishMenuAction"/>
    </div>
  </div>
</template>

<script>
  import PublishButton from './publish-button'
  import Toggle from '~/components/form-toggle'
  import QuickSaveButton from './quick-save-button'

  import '~/icons/gridicons-cog'

  export default {
    name: 'EditorGroundControl',
    components: {
      PublishButton,
      Toggle,
      QuickSaveButton
    },
    props: {
      value: {
        type: Object
      },
      isSaving: Boolean
    },
    data () {
      return {
        detail: this.value,
        isSticky: !!this.value.sticky
      }
    },
    computed: {
      isSidebarFocus () {
        return this.$store.state.options.layoutFocus === 'focus-sidebar'
      },
      curApp () {
        return this.$store.state.org.currentApp
      }
    },
    methods: {
      handlePublish () {
        this.$emit('publish')
      },
      handlePublishMenuAction (action) {
        this.$emit('menu-action', action)
      },
      handleBack () {
        this.$emit('close-back')
        this.$router.push(this.$store.getters.backHref)
      },
      //
      // Toggle Handle
      //
      handleToggleChange (checked) {
        this.$emit('toggle-sticky', checked)
        // this.$store.dispatch('savePostDetail', {
        //   form: {
        //     id: this.form.id,
        //     author: this.form.author,
        //     sticky: checked
        //   }
        // })
      },
      toggleSetting () {
        this.isToggleSetting = !this.isToggleSetting
      },
      toggleSidebar () {
        if (!this.isSidebarFocus) {
          this.$store.commit('options/SET_LAYOUT_FOCUS', 'sidebar')
        } else {
          this.$store.commit('options/SET_LAYOUT_FOCUS', 'content')
        }
      }
    },
    watch: {
      value (val) {
        this.detail = val
      }
    }
  }
</script>
