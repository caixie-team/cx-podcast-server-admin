<template>
  <div>
    <!--    <foldable-card class="is-compact">
          <div class=" connected-application-item__header is-p" slot="header">
            &lt;!&ndash;        <div class="plugin-icon  connected-application-icon animate__appear"
                         :class="category.featured_image ? '' : 'site-icon is-blank'">
                      <img
                        class="post-icon__img"
                        :src="category.featured_image" v-if="category.featured_image">
                      <svg class="gridicon gridicons-globe" height="40" width="40" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 24 24" v-else>
                        <g>
                          <path
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                        </g>
                      </svg>
                    </div>&ndash;&gt;
            <h3> {{ category.name }}</h3>
          </div>

          <div slot="summary">
            &lt;!&ndash;<nuxt-link class="button is-compact" style="margin-right: 8px;" :to="`/${category.slug}/post`">&ndash;&gt;
            &lt;!&ndash;<svg class="gridicon gridicons-add-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"&ndash;&gt;
            &lt;!&ndash;viewBox="0 0 24 24">&ndash;&gt;
            &lt;!&ndash;<g>&ndash;&gt;
            &lt;!&ndash;<path&ndash;&gt;
            &lt;!&ndash;d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path>&ndash;&gt;
            &lt;!&ndash;</g>&ndash;&gt;
            &lt;!&ndash;</svg>&ndash;&gt;
            &lt;!&ndash;添加内容&ndash;&gt;
            &lt;!&ndash;</nuxt-link>&ndash;&gt;
            <nuxt-link class="button is-compact is-action" :to="'/posts/term/' + category.slug"
                       v-if="expandedLink && isNotEmpty">
              全部
            </nuxt-link>
          </div>

          <div slot="expandedSummary">
            <button style="margin-left: 5px;" type="submit" class="button is-compact is-empty" @click="save">
              更新
            </button>
          </div>
          <div class="site-settings">
            <div class="site-settings__site-options">
              <div class="site-settings__site-title-tagline">
                <fieldset class="form-fieldset">
                  <label for="termname" class="form-label">
                    分类名称
                  </label>
                  <input type="text" name="name" id="termname"
                         data-tip-target="site-title-input" :value="category.name"
                         class="form-text-input" @change="updateName">
                </fieldset>
                <fieldset class="form-fieldset">
                  <label for="blogdescription" class="form-label">
                    分类描述
                  </label>
                  <input type="text" name="blogdescription" id="blogdescription"
                         data-tip-target="site-tagline-input"
                         :value="category.description"
                         class="form-text-input" @change="updateDescription">
                  <p class="form-setting-explanation">简要描述该分类。</p></fieldset>
              </div>
              <fieldset class="site-icon-setting form-fieldset">
                <label class="site-icon-setting__heading form-label">
                  分类图标
                  <span class="info-popover">
                  <svg
                    class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                    d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
                </span>
                </label>

                <div :class="classes" style="height: 96px; width: 96px; line-height: 96px; font-size: 96px;">
                  <img class="site-icon__img image" :src="category.featured_image"
                       alt="" v-if="category.featured_image">
                  <svg class="gridicon gridicons-globe" height="74" width="74" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 24 24" v-else>
                    <g>
                      <path
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                    </g>
                  </svg>
                  <spinner v-if="transient"></spinner>
                </div>
                <file-upload
                  class="button site-icon-setting__button is-compact"
                  name="file"
                  :post-action="uploadAction"
                  v-model="files"
                  @input-file="input"
                  @input-filter="inputFilter"
                  :accept="accept"
                  :size="filesize || 0"
                  :headers="requestHeader"
                  ref="upload">
                  更改
                </file-upload>

                <button class="button site-icon-setting__button is-compact is-scary" type="button"
                        v-if="category.featured_image">移除
                </button>
              </fieldset>
            </div>
          </div>
        </foldable-card>-->

    <div class="c-posts-browser-list">
      <div class="c-card c-section-header is-compact">
        <div class="c-section-header__label">
          <span class="c-section-header__label-text">{{category.name}}</span>
        </div>
        <div class="c-section-header__actions">
          <nuxt-link class="c-button is-link c-posts-browser-list__select-all" :to="link"
                     v-if="expandedLink && isNotEmpty && isNotDetail">
            <svg class="gridicon gridicons-chevron-right" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
              </g>
            </svg>
            全部
          </nuxt-link>
        </div>
      </div>
      <div class="c-card c-posts-browser-list__elements">
        <post-browser-item :isPlaceholder="true" v-for="i in 6" v-if="!isNotEmpty" :key="i"></post-browser-item>
        <post-browser-item
          v-for="item in myList"
          :key="item.id"
          :title="item.title"
          :link="`/post/${item.id}`"
          :icon="`${item.featured_image}?imageMogr2/thumbnail/100x100/q/90/format/jpg/interlace/1`" :author="item.author.nicename" v-if="item.id"></post-browser-item>
        <div class="c-posts-browser-item is-empty" v-else></div>
      </div>
    </div>
  </div>

</template>

<script>
  /* eslint-disable key-spacing,comma-spacing,no-spaced-func */
  import {Card} from '~/components/card'
  import FoldableCard from '~/components/foldable-card'
  import EmptyContent from '~/components/empty-content'
  import Spinner from '~/components/spinner'
  import PostBrowserItem from '~/components/posts/posts-browser-item'

  export default {
    name: 'PodcastsBrowserList',
    components: {
      Card,
      FoldableCard,
      EmptyContent,
      Spinner,
      PostBrowserItem
    },
    props: {
      link: {
        type: String,
        default: '/'
      },
      expandedLink: {
        type: Boolean,
        default: true
      },
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
      category: {
        type: Object,
        default: {
          name: '',
          slug: ''
        }
      },
      term: {
        type: Object,
      },
      index: {
        type: Number,
        default: 1
      },
      size: {
        type: Number,
        default: 6
      },
      showPlaceholders: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        files: [],
        transient: false,
        form: {},
        isChange: false
      }
    },
    mounted () {
    },
    computed: {
      myList () {
        if (this.list.length > 0) {
          return this.list
        }
        return this.$store.state.posts.shortLists.data[this.category.slug]
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      },
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/apps/${appId}/file`
      },
      classes () {
        return [
          'site-icon',
          {
            'is-blank': !this.featuredImage,
            'is-transient': this.transient
          }
        ]
      },
      isNotEmpty () {
        return this.myList.length > 0
      },
      isNotDetail () {
        return this.link !== '/'
      }
    },
    methods: {
    }
  }
</script>
