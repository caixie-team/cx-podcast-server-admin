<template>
  <foldable-card expanded>
    <div slot="header">
      <div class="c-async-load__placeholder" v-if="isUsersFetching"></div>
      <editor-author :post="post" v-else/>
    </div>
    <div slot="summary">内容信息</div>

    <div slot="expandedSummary">
      <button class="c-button c-editor-sticky is-sticky is-borderless u-mr-small" type="button">
        <svg class="gridicon gridicons-bookmark" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path d="M17 3H7c-1.105 0-2 .896-2 2v16l7-4 7 4V5c0-1.104-.896-2-2-2z"></path>
          </g>
        </svg>
      </button>
      <a :class="{'c-button is-compact is-borderless c-post-settings__button': true, 'is-focus' : isToggleSetting}"
         @click="toggleSetting">
        <svgicon name="gridicons-cog" class="gridicon"/>
      </a>
      <!--<button class="c-button is-compact u-mr-small">设置封面</button>-->
      <!--<button class="c-button is-compact is-primary">更新</button>-->
      <!--<button class="c-button is-compact is-primary">发布</button>-->
    </div>
    <div class="c-form-fieldset">
      <label class="c-form-label">
        封面图
      </label>

    <div @click.prevent="handleZoom"
         :class="classes"
         :style="collapsed ? `background-image: url(${curFeaturedImage});` : ''"
         v-if="curFeaturedImage">

      <remove-button :on-remove="handleRemove"/>

      <img :src="curFeaturedImage" class="c-post-image__image" v-if="!collapsed"/>
    </div>

      <button class="c-button" v-else>
        <svgicon name="gridicons-add-image"/>
        上传封面图
      </button>

    </div>
    <div :class="{'u-mt-medium': curFeaturedImage }">
      <form>
        <div class="c-form-fieldset">
          <label class="c-form-label">
            标题
          </label>
          <input type="text"
                 :value="post.title"
                 autocomplete="off"
                 placeholder="请输入标题"
                 @change="updateTitle">
        </div>
        <counted-textarea label="内容介绍"
                          v-model="post.content"
                          name="summary"
                          v-if="post.content"/>
        <div class="c-form-buttons-bar">
          <button type="submit" class="c-button c-form-button is-primary" disabled>保存</button>
          <!--<button type="button" class="c-button c-form-button">Secondary Form Button</button>-->
        </div>
      </form>
    </div>
  </foldable-card>

</template>
<script>
  import FoldableCard from '~/components/foldable-card'
  import EditorAuthor from '~/components/post-editor/editor-author'
  import CountedTextarea from '~/components/counted-textarea'
  import RemoveButton from '~/components/remove-button'
  import ConfirmButton from '~/components/confirm-button'

  import '~/icons/gridicons-add-image'

  export default {
    name: 'PostHeader',
    components: {
      FoldableCard,
      RemoveButton,
      ConfirmButton,
      EditorAuthor,
      CountedTextarea
    },
    props: {
      post: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        collapsed: true,
        isToggleSetting: false,
        curFeaturedImage: this.post.featured_image
      }
    },
    computed: {
      isUsersFetching () {
        return this.$store.state.users.list.fetching
      },
      classes () {
        return [
          'c-post-image',
          {
            'is-collapsed': this.collapsed
          }
        ]
      }
    },
    methods: {
      updateTitle (e) {
        this.post.title = e.target.value
      },
      handleZoom () {
        this.collapsed = !this.collapsed
      },
      handleRemove () {
        this.curFeaturedImage = ''

        // 删除封面图
        const form = {
          id: this.podcast.id,
          meta: {
            '_thumbnail_id': -1
          }
        }
        // const data = await this.$store.dispatch('updatePodcast', form)
      },
      toggleSetting () {
        this.isToggleSetting = !this.isToggleSetting
      }
    }
  }
</script>
