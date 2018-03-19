<template>
  <div class="c-card c-editor-ground-control">
    <button class="c-button c-editor-ground-control__back is-borderless" type="button" @click="handleBack">
      关闭
    </button>
    <div class="c-editor-ground-control__action-buttons">
      <button class="c-button c-editor-ground-control__toggle-sidebar is-borderless" type="button" @click="toggleSidebar">
        <svg class="gridicon gridicons-cog" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M20 12c0-.568-.06-1.122-.174-1.656l1.834-1.612-2-3.464-2.322.786c-.82-.736-1.787-1.308-2.86-1.657L14 2h-4l-.48 2.396c-1.07.35-2.04.92-2.858 1.657L4.34 5.268l-2 3.464 1.834 1.612C4.06 10.878 4 11.432 4 12s.06 1.122.174 1.656L2.34 15.268l2 3.464 2.322-.786c.82.736 1.787 1.308 2.86 1.657L10 22h4l.48-2.396c1.07-.35 2.038-.92 2.858-1.657l2.322.786 2-3.464-1.834-1.613c.113-.535.174-1.09.174-1.657zm-8 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
          </g>
        </svg>
      </button>
      <!--<button class="button editor-ground-control__preview-button" tabindex="4" type="button"><span-->
      <!--class="editor-ground-control__button-label">预览</span></button>-->
      <div class="c-editor-ground-control__publish-button">
        <button class="c-button c-editor-publish-button is-primary"
                tabindex="5"
                type="button">
          更新
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditorGroundControl',
    computed: {
      isSidebarFocus () {
        return this.$store.state.options.layoutFocus === 'focus-sidebar'
      }
    },
    methods: {
      handleBack () {
        this.$router.push(this.$store.getters.backHref)
      },
      toggleSidebar () {
        if (!this.isSidebarFocus) {
          this.$store.commit('options/SET_LAYOUT_FOCUS', 'sidebar')
        } else {
          this.$store.commit('options/SET_LAYOUT_FOCUS', 'content')
        }
      }
    }
  }
</script>
