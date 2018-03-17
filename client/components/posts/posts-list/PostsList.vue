<template>
  <div>

    <div class="podcasts-browser-list">
      <div class="card podcasts-browser-list__elements" v-if="isNotEmpty">
        <li class="podcasts-browser-item" v-for="item in list" :key="item.id">
          <nuxt-link :to="'/podcast/' + item.id" class="podcasts-browser-item__link">
            <div class="podcasts-browser-item__info">
              <div class="plugin-icon">
                <img class="plugin-icon__img"
                     :src="item.featured_image">
              </div>
              <div class="podcasts-browser-item__title">{{item.title}}</div>
              <div class="podcasts-browser-item__author">{{ item.authorInfo.user_nicename }}</div>
              <div class="podcasts-browser-item__published" v-if="item.status === 'publish'">
                <svg class="gridicon gridicons-checkmark" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path d="M9 19.414l-6.707-6.707 1.414-1.414L9 16.586 20.293 5.293l1.414 1.414"></path>
                  </g>
                </svg>
                已发布
              </div>
            </div>
          </nuxt-link>
        </li>
      </div>
      <div class="card" v-else>
        <empty-content class="" title="此分类下没有内容" style="padding:15px;" :action="emptyAction"></empty-content>
      </div>
    </div>
  </div>

</template>

<script>
  import FoldableCard from '~/components/foldable-card'
  import EmptyContent from '~/components/empty-content'
  import FileUpload from 'vue-upload-component/src'
  import Spinner from '~/components/spinner'

  export default {
    name: '',
    components: {
      FoldableCard,
      EmptyContent,
      FileUpload,
      Spinner
    },
    props: {
      expandedLink: {
        type: Boolean,
        default: true
      },
      list: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        emptyAction: {
          title: '添加节目',
          url: '/podcast'
        },
        transient: false
      }
    },
    mounted () {
    },
    computed: {
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
        return this.list.length > 0
      }
    },
    methods: {
    }
  }
</script>
