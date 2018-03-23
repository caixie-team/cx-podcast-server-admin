<template>
  <card :class="classes">
    <header-cake-back :text="backText" :href="backLink" @click="handleClick" />
    <div class="c-header-cake__title" @click="handleTitleClick">
      {{ title }}
    </div>
    <slot name="action" class="">
      <!--
      <button class="c-button c-header-cake__back is-spacer is-compact is-borderless" type="button">
        <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </g>
        </svg>
        返回
      </button>
      -->
    </slot>

  </card>
</template>

<script>
  import {Card} from '~/components/card'
  import HeaderCakeBack from './back.vue'

  export default {
    name: 'HeaderCake',
    props: {
      compact: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      },
      backText: String,
      backHref: String
    },
    components: {
      Card,
      HeaderCakeBack
    },
    computed: {
      backLink () {
        return this.backHref ? this.backHref : this.$store.getters.backHref
      },
      classes () {
        return [
          'c-header-cake',
          {
            'is-compact': this.compact
          }
        ]
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event)
      },
      handleTitleClick (event) {
        this.$emit('click-title', event)
      }
    }
  }
</script>
