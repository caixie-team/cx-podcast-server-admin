<template>
  <div>
    <div class="c-posts-browser-list" >
      <div class="c-card c-section-header is-compact">
        <div class="c-section-header__label">
          <span class="c-section-header__label-text">
            {{title}}
          </span>
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
      <div class="c-card c-posts-browser-list__elements"  v-if="myList.length > 0">
        <post-browser-item
          :id="item.id"
          v-for="(item, index) in myList"
          :key="index"
          :title="item.title"
          :link="`/post/${item.id}`"
          :icon="`${item.featured_image}?imageMogr2/thumbnail/100x100/q/90/format/jpg/interlace/1`"
          :isPlaceholder="!item.id"
          :date="$moment(item.modified).locale('zh-cn').format('LL')"
          :author="item.author.user_nicename" v-if="item.id"/>

        <div class="c-posts-browser-item is-empty" v-else></div>
        <!--<post-browser-item :isPlaceholder="true" v-for="i in 6" v-show="showPlaceholders" :key="i"/>-->
      </div>
      <div class="c-card c-posts-browser-list__elements" v-else>
        <!--<div class="c-posts-browser-item is-empty"></div>-->
        <empty-content />
        <!--这里是 empty 组件。。。。-->
        <post-browser-item :isPlaceholder="true" v-for="i in 6" v-show="showPlaceholders" :key="i"/>
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
      title: {
        type: String
      },
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
        default: false
      }
    },
    data () {
      return {
        files: [],
        transient: false,
        form: {},
        isChange: false
        // isPlaceholder: this.showPlaceholders
      }
    },
    mounted () {
    },
    beforeUpdate () {
      // this.isPlaceholder = true
    },
    // updated () {
    // },
    computed: {
      myList () {
        if (this.list.length > 0) {
          return this.list
        }
        return this.$store.state.posts.shortLists.data[this.category.slug]
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
    methods: {}
  }
</script>
