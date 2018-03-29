<template>
  <div>
    <div class="c-editor-author is-placeholder" v-if="!post && !isNew">
      <avatar :size="26"/>
      <span class="c-editor-author__name"></span>
    </div>
    <div class="c-editor-author" v-else>
      <author-selector :users="users.data" :on-select="handleAuthorSelect">
        <avatar :user="postAuthor"/>
        <span class="c-editor-author__name">
          {{postAuthor.user_nicename}}
        </span>
      </author-selector>
    </div>
  </div>
</template>
<script>
  import Avatar from '~/components/avatar'
  import AuthorSelector from '~/components/author-selector'

  export default {
    name: 'EidtorAuthor',
    components: {
      Avatar,
      AuthorSelector
    },
    props: {
      post: {
        type: Object
      },
      isNew: {
        type: Boolean
      },
      userCanAssignAuthor () {
        // 取当前用户权限判断
        // if user cannot edit others posts
        // if (!app.capabilities)
        // return false
        return true
      }
    },
    computed: {
      postAuthor () {
        return this.post ? this.post.author : this.user
      },
      user () {
        return this.$auth.state.user
      },
      users () {
        return this.$store.state.users.list.data
      }
    },
    methods: {
      async handleAuthorSelect (author) {
        this.$emit('change-author', author)
/*        await this.$store.dispatch('changePostAuthor',
          {id: this.post.id, author: author.id, data: author})*/
      }
    }
  }
</script>
