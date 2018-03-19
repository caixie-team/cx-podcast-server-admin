<template>
  <div class="c-empty-content">
    <!--<img :src="illustration" class="c-empty-content__illustration" :width="illustrationWidth">-->
    <h2 class="c-empty-content__title" v-if="title">{{ title }}</h2>
    <h3 class="c-empty-content__line" v-if="line">{{ line }}</h3>
    <!--<a class="empty-content__action button is-primary" @click="handleClick" v-if="action" :href="action.url">-->
      <!--{{ action.title }}-->
    <!--</a>-->
    <slot name="action" />
    <slot name="secondaryAction" />
    <slot />
  </div>
</template>
<script>
  export default {
    name: 'EmptyContent',
    props: {
      action: {
        type: Object,
        default: () => {
          return {
            title: '添加',
            url: ''
          }
        }
      },
      title: {
        type: String,
        default: '还没有内容'
      },
      line: String,
      illustration: {
        type: String,
        default: '/images/illustrations/illustration-empty-results.svg'
      },
      illustrationWidth: Number,
      isCompact: {
        type: Boolean,
        default: false
      },
      actionURL: {
        type: String
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('on-click', event)
      }
    },
    computed: {
      classes () {
        return [
          'empty-content',
          {
            'is-compact': this.isCompact,
            'has-title-only': this.title && !this.line
          }
        ]
      }
    }
  }
</script>
