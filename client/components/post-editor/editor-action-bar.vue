<template>
  <div class="c-editor-action-bar">
    <div class="c-editor-action-bar__cell is-left">
      <editor-status-label :post="detail"/>
    </div>
    <div class="c-editor-action-bar__cell is-center">
      <div class="c-async-load__placeholder" v-if="isUsersFetching"></div>
      <editor-author
        @change-author="handleChangeAuthor"
        :post="detail" v-else/>
    </div>
    <div class="c-editor-action-bar__cell is-right">
<!--      <button class="c-button c-editor-sticky is-sticky is-borderless" type="button">
        <svg class="gridicon gridicons-bookmark" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path d="M17 3H7c-1.105 0-2 .896-2 2v16l7-4 7 4V5c0-1.104-.896-2-2-2z"></path>
          </g>
        </svg>
      </button>-->
    </div>
  </div>
</template>

<script>
  import EditorStatusLabel from './editor-status-label'
  import EditorAuthor from './editor-author'
  export default {
    name: 'PostEditorActionBar',
    components: {
      EditorStatusLabel,
      EditorAuthor
    },
    props: {
      value: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        detail: this.value
      }
    },
    methods: {
      handleChangeAuthor (author) {
        this.$emit('change-author', author)
      }
    },
    computed: {
      isUsersFetching () {
        return this.$store.state.users.list.fetching
      }
    },
    watch: {
      value (val) {
        this.detail = val
      }
    }
  }
</script>
